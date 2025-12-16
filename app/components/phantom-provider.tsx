"use client";

import { PhantomProvider, darkTheme, AddressType } from "@phantom/react-sdk";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PhantomProvider
      config={{
        providers: ["google", "apple", "injected"],
        appId: "85254667-f372-4083-b135-ab4d0df0ec04",
        addressTypes: [AddressType.solana],
        authOptions: {
          redirectUrl: "http://localhost:3000",
        },
      }}
      theme={darkTheme}
      appIcon="https://phantom-portal20240925173430423400000001.s3.ca-central-1.amazonaws.com/icons/577d4b35-027b-44ab-ac68-ea55c5c77607.jpg"
      appName="jon snow"
    >
      {children}
    </PhantomProvider>
  );
}
