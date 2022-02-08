import { NextResponse } from "next/server";

export default function middleware(req, ev) {
    const url = req.nextUrl.clone();
    const cookies = req.cookies;

    if (!cookies.connected && url.pathname !== "/login") {
        return NextResponse.rewrite(url.origin + "/login");
    }

};