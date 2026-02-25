"use client";

import {
  useModal,
  usePhantom,
  useDisconnect,
  useSolana,
} from "@phantom/react-sdk";

export default function WalletButton() {
  const { solana, isAvailable } = useSolana();

  const { open } = useModal();
  const { disconnect } = useDisconnect();
  const { isConnected, user } = usePhantom();

  const signMessage = async () => {
    if (!solana || !isAvailable) {
      return;
    }
    const message = "Hello, world!";
    const signature = await solana.signMessage(message);
    console.log(signature);
  };

  const getBalance = async () => {
    if (!solana || !isAvailable) {
      return;
    }
  };

  if (isConnected) {
    return (
      <div className="rounded-full border px-6 py-3 text-sm font-medium">
        users wallets:{" "}
        {user?.addresses.map((wallet) => wallet.address).join(", ")}
        <br />
        <br />
        <button onClick={() => signMessage()}> sign message</button>
        <br />
        <br />
        <button onClick={() => getBalance()}> get balance</button>
        <div className="flex gap-2">
          <button onClick={() => disconnect()}> Disconnect</button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={open}
      className="h-12 rounded-full bg-black px-6 text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
    >
      Connect Wallet
    </button>
  );
}
