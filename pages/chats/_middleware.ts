import type { NextRequest, NextFetchEvent } from "next/server";

// Chat Middleware
export function middleware(req: NextRequest, fe: NextFetchEvent) {
  console.log(req.ua);
}