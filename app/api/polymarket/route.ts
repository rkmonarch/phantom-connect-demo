// src/app/api/candidates/route.ts
export const runtime = "nodejs";

export async function GET() {
    const res = await fetch("https://gamma-api.polymarket.com/events?active=true&closed=false&limit=50&offset=0", {
        cache: "no-store",
    });

    if (!res.ok) {
        return new Response("Upstream failed", { status: 502 });
    }

    const data = await res.json();
    return Response.json(data);
}