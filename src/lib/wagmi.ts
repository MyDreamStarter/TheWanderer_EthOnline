import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'

// Get projectId from https://cloud.walletconnect.com
export const projectId = "c26b357532f63f7ba31efebac88d0eed"

if (!projectId) throw new Error('Project ID is not defined')

export const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [baseSepolia] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  auth: {
    email: true,
    socials: ["github", "google", "x", "discord", "apple"],
    showWallets: true, // default to true
    walletFeatures: true
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  })
});
