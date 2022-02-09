import { NextResponse } from "next/server";

export default function middleware(req, ev) {
    const url = req.nextUrl.clone();
    const cookies = req.cookies;

    if (!cookies.connected && (url.pathname !== "/login" || url.pathname !== "/register")) {
        if (url.pathname === "/register") {
            return NextResponse.rewrite(url.origin + "/register")
        } else {
            return NextResponse.rewrite(url.origin + "/login");
        }
    }
    return NextResponse.rewrite(url);
};