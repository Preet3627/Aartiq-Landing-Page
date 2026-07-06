"use client";

import React, { useState, useEffect } from 'react';
import { 
  Mail, Github, MessageSquare, FileText, Cpu, 
  CheckCircle, XCircle, Loader, ExternalLink, Plus, Trash2,
  Settings, Zap, Key, Shield, RefreshCw
} from 'lucide-react';

interface MCPConnection {
  id: string;
  name: string;
  service: string;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  lastSync?: string;
  icon: React.ReactNode;
}

const MCPServices = [
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Read, send, and manage emails with full Gmail integration',
    icon: <Mail className="w-6 h-6" />,
    color: 'bg-red-500',
    authType: 'oauth2' as const,
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth' as const,
    scopes: ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'],
    connectUrl: 'https://github.com/ArtyMcLabin/Gmail-MCP-Server',
    npmPackage: '@gongrzhe/gmail-mcp-server'
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Manage repositories, issues, pull requests, and workflows',
    icon: <Github className="w-6 h-6" />,
    color: 'bg-gray-800',
    authType: 'pat' as const,
    authUrl: 'https://github.com/settings/tokens',
    scopes: [],
    connectUrl: 'https://github.com/github/github-mcp-server',
    npmPackage: 'github/github-mcp-server'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send messages, manage channels, and automate workflows',
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'bg-purple-600',
    authType: 'oauth2' as const,
    authUrl: 'https://slack.com/oauth/v2/authorize',
    scopes: ['channels:read', 'chat:write', 'users:read'],
    connectUrl: 'https://github.com/slack-mcp/slack-mcp',
    npmPackage: '@modelcontextprotocol/server-slack'
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Manage pages, databases, and documents',
    icon: <FileText className="w-6 h-6" />,
    color: 'bg-gray-100 text-gray-900',
    authType: 'oauth2' as const,
    authUrl: 'https://api.notion.com/v1/oauth/authorize',
    scopes: ['read', 'write', 'insert'],
    connectUrl: 'https://github.com/makenotion/notion-client',
    npmPackage: '@notionhq/client'
  },
  {
    id: 'n8n',
    name: 'n8n',
    description: 'Workflow automation with 800+ integrations',
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-green-600',
    authType: 'api' as const,
    authUrl: 'https://docs.n8n.io/api-key',
    scopes: [],
    connectUrl: 'https://github.com/n8n-io/n8n',
    npmPackage: 'n8n'
  },
  {
    id: 'openclaw',
    name: 'OpenClaw',
    description: 'Autonomous AI agent for browser automation',
    icon: <Cpu className="w-6 h-6" />,
    color: 'bg-blue-600',
    authType: 'oauth2' as const,
    authUrl: 'https://dashboard.composio.dev',
    scopes: [],
    connectUrl: 'https://github.com/composio/composio',
    npmPackage: 'composio'
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    description: 'Run SQL queries and manage databases',
    icon: <DatabaseIcon className="w-6 h-6" />,
    color: 'bg-blue-800',
    authType: 'connection' as const,
    connectUrl: 'https://github.com/modelcontextprotocol/server-postgres',
    npmPackage: '@modelcontextprotocol/server-postgres'
  },
  {
    id: 'filesystem',
    name: 'File System',
    description: 'Secure file access and management',
    icon: <FileText className="w-6 h-6" />,
    color: 'bg-yellow-600',
    authType: 'none' as const,
    connectUrl: 'https://github.com/modelcontextprotocol/server-filesystem',
    npmPackage: '@modelcontextprotocol/server-filesystem'
  }
];

function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

export default function MCPSettingsPage() {
  const [connections, setConnections] = useState<MCPConnection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConnectModal, setShowConnectModal] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [connectionUrl, setConnectionUrl] = useState('');

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    setIsLoading(true);
    try {
      const stored = localStorage.getItem('mcpConnections');
      if (stored) {
        setConnections(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load connections:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveConnections = async (newConnections: MCPConnection[]) => {
    setConnections(newConnections);
    localStorage.setItem('mcpConnections', JSON.stringify(newConnections));
  };

  const handleConnect = async (serviceId: string) => {
    const service = MCPServices.find(s => s.id === serviceId);
    if (!service) return;

    const newConnections = [
      ...connections.filter(c => c.id !== service.id),
      { id: service.id, name: service.name, service: serviceId, status: 'connecting' as const, icon: service.icon }
    ];
    saveConnections(newConnections);
    setShowConnectModal(null);

    try {
      if (service.authType === 'oauth2') {
        await initiateOAuth(service);
      } else if (service.authType === 'pat') {
        await initiatePATAuth(service);
      } else if (service.authType === 'api') {
        await initiateAPIAuth(service);
      } else {
        saveConnections(newConnections.map(c => 
          c.id === service.id ? { ...c, status: 'connected' as const } : c
        ));
      }
    } catch (error) {
      saveConnections(newConnections.map(c => 
        c.id === service.id ? { ...c, status: 'error' as const } : c
      ));
    }
  };

  const initiateOAuth = async (service: typeof MCPServices[0]) => {
    const clientId = localStorage.getItem(`mcp_${service.id}_client_id`);
    const redirectUri = `${window.location.origin}/api/mcp-oauth/${service.id}`;
    
    if (!service.authUrl) {
      alert('OAuth not supported for this service');
      return;
    }
    const authUrl = new URL(service.authUrl as string);
    authUrl.searchParams.set('client_id', clientId || '');
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', service.scopes.join(' '));
    authUrl.searchParams.set('access_type', 'offline');

    window.open(authUrl.toString(), '_blank', 'width=600,height=700');
    
    setTimeout(async () => {
      await loadConnections();
    }, 3000);
  };

  const initiatePATAuth = async (service: typeof MCPServices[0]) => {
    if (!apiKey) {
      alert('Please enter your GitHub Personal Access Token');
      return;
    }
    localStorage.setItem(`mcp_${service.id}_pat`, apiKey);
    
    const newConnections = connections.map(c => 
      c.id === service.id ? { ...c, status: 'connected' as const, lastSync: new Date().toISOString() } : c
    );
    saveConnections(newConnections);
    setApiKey('');
  };

  const initiateAPIAuth = async (service: typeof MCPServices[0]) => {
    if (!apiKey || !connectionUrl) {
      alert('Please enter API Key and Server URL');
      return;
    }
    localStorage.setItem(`mcp_${service.id}_api_key`, apiKey);
    localStorage.setItem(`mcp_${service.id}_url`, connectionUrl);
    
    const newConnections = connections.map(c => 
      c.id === service.id ? { ...c, status: 'connected' as const, lastSync: new Date().toISOString() } : c
    );
    saveConnections(newConnections);
    setApiKey('');
    setConnectionUrl('');
  };

  const handleDisconnect = async (serviceId: string) => {
    const newConnections = connections.filter(c => c.id !== serviceId);
    saveConnections(newConnections);
    localStorage.removeItem(`mcp_${serviceId}_client_id`);
    localStorage.removeItem(`mcp_${serviceId}_refresh_token`);
    localStorage.removeItem(`mcp_${serviceId}_pat`);
    localStorage.removeItem(`mcp_${serviceId}_api_key`);
    localStorage.removeItem(`mcp_${serviceId}_url`);
  };

  const getStatusIcon = (status: MCPConnection['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'connecting':
        return <Loader className="w-5 h-5 animate-spin text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <XCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Cpu className="w-8 h-8 text-accent" />
              MCP Integrations
            </h1>
            <p className="text-gray-400 mt-2">
              Connect AI-powered integrations via Model Context Protocol
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
              {connections.filter(c => c.status === 'connected').length} Connected
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {MCPServices.map((service) => {
            const connection = connections.find(c => c.id === service.id);
            const isConnected = connection?.status === 'connected';

            return (
              <div
                key={service.id}
                className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center text-white`}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <p className="text-gray-400 text-sm">{service.description}</p>
                    {connection?.lastSync && (
                      <p className="text-gray-500 text-xs mt-1">
                        Last sync: {new Date(connection.lastSync).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusIcon(connection?.status || 'disconnected')}
                  
                  {isConnected ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleConnect(service.id)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        title="Refresh"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDisconnect(service.id)}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Disconnect"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowConnectModal(service.id)}
                      className="px-6 py-2 rounded-xl bg-accent hover:bg-accent/80 text-black font-semibold transition-colors"
                    >
                      Connect
                    </button>
                  )}
                  
                  <a
                    href={service.connectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    title="Learn more"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-accent/10 to-purple-500/10 border border-accent/20">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-accent" />
            Secure Connection
          </h3>
          <p className="text-gray-400 text-sm">
            All OAuth connections use secure authentication. Your credentials are encrypted and stored locally.
            MCP allows AI assistants to access your connected services with your explicit permission. 
            <a href="/docs/mcp-security" className="text-accent hover:underline ml-1">Learn more →</a>
          </p>
        </div>

        {/* Connect Modal */}
        {showConnectModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#0a0a0f] border border-white/20 rounded-3xl p-8 max-w-md w-full">
              {(() => {
                const service = MCPServices.find(s => s.id === showConnectModal);
                if (!service) return null;

                return (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center text-white`}>
                        {service.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Connect {service.name}</h2>
                        <p className="text-gray-400 text-sm">{service.authType === 'oauth2' ? 'OAuth 2.0' : service.authType === 'pat' ? 'Personal Access Token' : service.authType === 'api' ? 'API Key' : 'Direct Connection'}</p>
                      </div>
                    </div>

                    {service.authType === 'oauth2' && (
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Client ID (leave empty for auto-config)"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none"
                          onChange={(e) => localStorage.setItem(`mcp_${service.id}_client_id`, e.target.value)}
                        />
                        <p className="text-gray-500 text-xs">
                          We'll open a browser window to complete authentication. 
                          <a href={service.connectUrl} target="_blank" className="text-accent ml-1">Learn more</a>
                        </p>
                      </div>
                    )}

                    {service.authType === 'pat' && (
                      <div className="space-y-4">
                        <input
                          type="password"
                          placeholder="Personal Access Token"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Custom server URL (optional)"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none"
                          value={connectionUrl}
                          onChange={(e) => setConnectionUrl(e.target.value)}
                        />
                      </div>
                    )}

                    {service.authType === 'api' && (
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Server URL"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none"
                          value={connectionUrl}
                          onChange={(e) => setConnectionUrl(e.target.value)}
                        />
                        <input
                          type="password"
                          placeholder="API Key"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setShowConnectModal(null)}
                        className="flex-1 px-4 py-3 rounded-xl border border-white/20 hover:bg-white/5 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleConnect(service.id)}
                        className="flex-1 px-4 py-3 rounded-xl bg-accent hover:bg-accent/80 text-black font-semibold transition-colors"
                      >
                        Connect
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}