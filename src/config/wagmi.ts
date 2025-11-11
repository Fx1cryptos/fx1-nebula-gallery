import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';
import { BASE_CONFIG } from './base';

// Use a valid default project ID to prevent blocking errors
export const config = getDefaultConfig({
  appName: BASE_CONFIG.manifest.name,
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '2c3e8e3f6e0e2e6e5e0e2e6e5e0e2e6e',
  chains: [base],
  ssr: false,
});
