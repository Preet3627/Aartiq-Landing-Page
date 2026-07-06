import { NextRequest, NextResponse } from "next/server";
import { searchDocs } from "@/lib/search-index";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || searchParams.get("query") || "";
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  
  if (query.length < 2) {
    return NextResponse.json({
      results: [],
      query,
      total: 0,
      message: "Query must be at least 2 characters"
    });
  }
  
  const results = searchDocs(query, limit);
  
  return NextResponse.json({
    results,
    query,
    total: results.length,
    timestamp: new Date().toISOString()
  }, {
    headers: {
      "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
    }
  });
}
