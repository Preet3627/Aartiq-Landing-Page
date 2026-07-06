import { NextRequest, NextResponse } from 'next/server';
import { WebSocketServer, WebSocket } from 'ws';

declare global {
  var wssSync: WebSocketServer | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const clients = new Map<any, any>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rooms = new Map<any, any>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const signalingMessages = new Map<any, any>();

let wss: WebSocketServer | null = null;

function getWss() {
  if (!global.wssSync) {
    global.wssSync = new WebSocketServer({ noServer: true });
    global.wssSync.on('connection', handleConnection);
  }
  return global.wssSync;
}

interface DeviceInfo {
  id: string;
  name: string;
  type: 'desktop' | 'mobile';
  publicKey?: string;
}

interface SignalingMessage {
  type: 'offer' | 'answer' | 'ice-candidate' | 'join' | 'leave' | 'devices' | 'sync' | 'clipboard' | 'file';
  roomId: string;
  from: string;
  to?: string;
  data?: any;
}

function generateRoomId(): string {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function generateDeviceId(): string {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  return `device_${Date.now()}_${Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')}`;
}

async function handleConnection(ws: WebSocket, request: any) {
  const deviceId = generateDeviceId();
  const deviceInfo: DeviceInfo = {
    id: deviceId,
    name: request?.url?.split('?')[1]?.split('=')[1] || 'Unknown Device',
    type: 'desktop'
  };

  clients.set(deviceId, { ws, info: deviceInfo });

  console.log(`[Sync] Device connected: ${deviceId}`);

  ws.on('message', async (data) => {
    try {
      const message: SignalingMessage = JSON.parse(data.toString());
      console.log(`[Sync] Message from ${deviceId}:`, message.type);

      switch (message.type) {
        case 'join':
          handleJoin(deviceId, message);
          break;
        case 'leave':
          handleLeave(deviceId, message);
          break;
        case 'offer':
        case 'answer':
        case 'ice-candidate':
          handleSignaling(deviceId, message);
          break;
        case 'devices':
          handleGetDevices(deviceId);
          break;
        case 'sync':
          handleSync(deviceId, message);
          break;
        case 'clipboard':
          handleClipboard(deviceId, message);
          break;
        case 'file':
          handleFile(deviceId, message);
          break;
      }
    } catch (error) {
      console.error('[Sync] Error handling message:', error);
    }
  });

  ws.on('close', () => {
    console.log(`[Sync] Device disconnected: ${deviceId}`);
    clients.delete(deviceId);
    
    for (const [roomId, roomClients] of rooms.entries()) {
      if (roomClients.has(deviceId)) {
        roomClients.delete(deviceId);
        broadcastToRoom(roomId, {
          type: 'leave',
          from: deviceId,
          roomId
        }, deviceId);
        
        if (roomClients.size === 0) {
          rooms.delete(roomId);
        }
      }
    }
  });

  ws.send(JSON.stringify({ type: 'connected', deviceId }));
}

function handleJoin(deviceId: string, message: SignalingMessage) {
  const roomId = message.roomId;
  const publicKey = message.data?.publicKey;

  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Map());
  }

  const roomClients = rooms.get(roomId) as Map<string, { publicKey?: string }>;
  roomClients.set(deviceId, { publicKey });

  const client = clients.get(deviceId);
  if (client) client.info.publicKey = publicKey;

  const existingDevices: Array<{ id: string; publicKey?: string; info?: DeviceInfo }> = [];
  roomClients.forEach((info, id) => {
    if (id !== deviceId) {
      existingDevices.push({
        id,
        publicKey: info.publicKey,
        info: clients.get(id)?.info
      });
    }
  });

  if (client) {
    client.ws.send(JSON.stringify({
      type: 'joined',
      roomId,
      devices: existingDevices,
      yourId: deviceId
    }));
  }

  broadcastToRoom(roomId, {
    type: 'device-joined',
    from: deviceId,
    roomId,
    publicKey
  }, deviceId);

  console.log(`[Sync] Device ${deviceId} joined room ${roomId}`);
}

function handleLeave(deviceId: string, message: SignalingMessage) {
  const roomId = message.roomId;
  
  if (rooms.has(roomId)) {
    rooms.get(roomId).delete(deviceId);
    
    broadcastToRoom(roomId, {
      type: 'leave',
      from: deviceId,
      roomId
    });

    if (rooms.get(roomId).size === 0) {
      rooms.delete(roomId);
    }
  }
}

function handleSignaling(deviceId: string, message: SignalingMessage) {
  const { type, roomId, to, data } = message;

  if (to && clients.has(to)) {
    clients.get(to).ws.send(JSON.stringify({
      type,
      from: deviceId,
      roomId,
      data
    }));
  }
}

function handleGetDevices(deviceId: string) {
  const allDevices = Array.from(clients.entries())
    .filter(([id]) => id !== deviceId)
    .map(([id, client]) => ({
      id,
      ...client.info
    }));

  clients.get(deviceId)?.ws.send(JSON.stringify({
    type: 'devices',
    devices: allDevices
  }));
}

function handleSync(deviceId: string, message: SignalingMessage) {
  const { roomId, data } = message;

  signalingMessages.set(`${roomId}_${deviceId}`, {
    ...data,
    timestamp: Date.now()
  });

  broadcastToRoom(roomId, {
    type: 'sync',
    from: deviceId,
    roomId,
    data
  }, deviceId);
}

function handleClipboard(deviceId: string, message: SignalingMessage) {
  const { roomId, data } = message;

  broadcastToRoom(roomId, {
    type: 'clipboard',
    from: deviceId,
    roomId,
    data
  }, deviceId);
}

function handleFile(deviceId: string, message: SignalingMessage) {
  const { roomId, data } = message;

  broadcastToRoom(roomId, {
    type: 'file',
    from: deviceId,
    roomId,
    data
  }, deviceId);
}

function broadcastToRoom(roomId: string, message: any, exclude?: string) {
  if (!rooms.has(roomId)) return;

  const messageStr = JSON.stringify(message);
  for (const [deviceId] of rooms.get(roomId)) {
    if (deviceId !== exclude && clients.has(deviceId)) {
      try {
        clients.get(deviceId).ws.send(messageStr);
      } catch (e) {
        console.error(`[Sync] Failed to send to ${deviceId}:`, e);
      }
    }
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  switch (action) {
    case 'status':
      return NextResponse.json({
        online: true,
        clients: clients.size,
        rooms: rooms.size,
        timestamp: Date.now()
      });

    case 'rooms':
      return NextResponse.json({
        rooms: Array.from(rooms.entries()).map(([id, clients]) => ({
          id,
          clients: Array.from(clients.keys())
        }))
      });

    case 'devices':
      const allDevices = Array.from(clients.entries()).map(([id, client]) => ({
        id,
        ...client.info
      }));
      return NextResponse.json({ devices: allDevices });

    case 'create-room':
      const newRoomId = generateRoomId();
      rooms.set(newRoomId, new Map());
      return NextResponse.json({ roomId: newRoomId });

    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, roomId, deviceId, data } = body;

    switch (action) {
      case 'sync-clipboard':
        signalingMessages.set(`clipboard_${roomId}_${Date.now()}`, {
          roomId,
          deviceId,
          content: data.content,
          type: data.type,
          timestamp: Date.now()
        });
        return NextResponse.json({ success: true });

      case 'sync-history':
        signalingMessages.set(`history_${roomId}_${Date.now()}`, {
          roomId,
          deviceId,
          history: data.history,
          timestamp: Date.now()
        });
        return NextResponse.json({ success: true });

      case 'sync-chats':
        signalingMessages.set(`chats_${roomId}_${Date.now()}`, {
          roomId,
          deviceId,
          chats: data.chats,
          timestamp: Date.now()
        });
        return NextResponse.json({ success: true });

      case 'get-messages':
        const prefix = data.type || 'sync';
        const messages = Array.from(signalingMessages.entries())
          .filter(([key]) => key.startsWith(`${prefix}_${roomId}`))
          .map(([, value]) => value);
        return NextResponse.json({ messages });

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
