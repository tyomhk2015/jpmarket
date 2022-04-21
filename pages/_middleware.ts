import { read } from "fs";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

// Global Middleware of Next.js
export function middleware(req: NextRequest, fe: NextFetchEvent) {
  if (!req.url.includes("/enter") && req.url.includes("/api") && !req.cookies) {
    return NextResponse.redirect("/enter");
  }
}