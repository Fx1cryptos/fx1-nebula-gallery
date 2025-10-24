import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';
import { BASE_CONFIG } from './base';

export const config = getDefaultConfig({
  appName: BASE_CONFIG.manifest.name,
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'f7c3ac3a3e6d8c8f3e3a3e6d8c8f3e3a',
  chains: [base],
  ssr: false,
});
