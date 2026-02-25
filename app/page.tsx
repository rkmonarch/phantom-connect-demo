"use client";

import {
  useModal,
  usePhantom,
  useDisconnect,
  useSolana,
} from "@phantom/react-sdk";

type PhantomAddress = {
  address?: string;
  chainId?: string;
  addressType?: string;
  type?: string;
};

export default function WalletButton() {
  const { solana, isAvailable } = useSolana();
  const { open } = useModal();
  const { disconnect } = useDisconnect();
  const { isConnected, user } = usePhantom();

  const addresses = (user?.addresses ?? []) as PhantomAddress[];
  const solanaAddress =
    addresses.find((entry) => {
      const marker =
        `${entry.chainId ?? ""} ${entry.addressType ?? ""} ${entry.type ?? ""}`.toLowerCase();
      return marker.includes("solana");
    })?.address ?? addresses[0]?.address;

  const signMessage = async () => {
    if (!solana || !isAvailable) {
      return;
    }
    const message = "Hello, world!";
    const signature = await solana.signMessage(message);
    console.log(signature);
  };

  if (isConnected) {
    return (
      <main className="page-shell">
        <section className="wallet-card animate-fade-in">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Wallet Connected
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-zinc-900 md:text-3xl">
            Phantom Demo
          </h1>
          <p className="mt-4 break-all text-sm text-zinc-600">{solanaAddress}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => signMessage()} className="btn-secondary">
              Sign Message
            </button>
            <button onClick={() => disconnect()} className="btn-primary">
              Disconnect
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="wallet-card animate-fade-in">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Solana Wallet
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900 md:text-4xl">
          Connect with Phantom
        </h1>
        <p className="mt-4 text-sm text-zinc-600 md:text-base">
          Securely connect your wallet to sign messages and fetch balance data.
        </p>
        <div className="mt-8 flex items-center justify-center">
          <button onClick={open} className="btn-primary">
            Connect Wallet
          </button>
        </div>
      </section>
    </main>
  );
}
