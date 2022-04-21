import type { NextRequest, NextFetchEvent } from "next/server";

// Global Middleware of Next.js
export function middleware(req: NextRequest, fe: NextFetchEvent) {
  console.log(req.page);
}