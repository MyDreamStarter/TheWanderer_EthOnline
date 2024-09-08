"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Client } from "@xmtp/xmtp-js";
import { ethers } from "ethers";
import { useAccount } from 'wagmi';

// Extend the Window interface to include the ethereum property
declare global {
  interface Window {
    ethereum?: ethers.providers.ExternalProvider;
  }
}

type XmtpContextType = {
  xmtp: Client | null;
};

const XmtpContext = createContext<XmtpContextType>({ xmtp: null });

export const useXmtp = () => useContext(XmtpContext);

export const XmtpProvider = ({ children }: { children: ReactNode }) => {
  const { address: walletAddress } = useAccount();

  const [xmtp, setXmtp] = useState<Client | null>(null);

  useEffect(() => {
    const initXmtp = async () => {
      if (typeof window !== "undefined" && window.ethereum && walletAddress) {
        const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
        const signer = provider.getSigner();
        const xmtpClient = await Client.create(signer);
        setXmtp(xmtpClient);
      }
    };

    if (walletAddress) {
      initXmtp();
    }
  }, [walletAddress]);

  return (
    <XmtpContext.Provider value={{ xmtp }}>
      {children}
    </XmtpContext.Provider>
  );
};
