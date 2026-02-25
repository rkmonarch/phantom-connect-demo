export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return Response.json({ error: "Missing address" }, { status: 400 });
  }

  const walletAddress = `solana:101/address:${address}`;
  const upstreamUrl = new URL(
    "https://api.phantom.app/portfolio/v1/fungibles/balances",
  );

  upstreamUrl.searchParams.set("walletAddresses", walletAddress);
  upstreamUrl.searchParams.set("includePrices", "true");

  const res = await fetch(upstreamUrl.toString(), {
    cache: "no-store",
    headers: {
      accept: "application/json",
    },
  });

  console.log(res);

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
