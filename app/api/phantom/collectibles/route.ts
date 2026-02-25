export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return Response.json({ error: "Missing address" }, { status: 400 });
  }

  const res = await fetch("https://api.phantom.app/collectibles/v1", {
    method: "POST",
    cache: "no-store",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      addresses: [
        {
          chainId: "solana:101",
          address,
        },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return Response.json(
      { error: "Upstream failed", status: res.status, details: text },
      { status: 502 },
    );
  }

  const data = await res.json();
  return Response.json(data);
}
