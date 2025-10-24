import { base } from 'wagmi/chains';

export const BASE_CONFIG = {
  chain: base,
  tokens: {
    FDH: {
      address: '0x1f85705d939Bb6Fa1AEbE99d7105AdCee75CE380',
      symbol: '$FDH',
      name: 'FX1 Digital Hub Token',
      decimals: 18,
    },
    FX1_HUBS: {
      zoraProfile: '@fx1_hubs',
      name: '$FX1_HUBS Creator Coin',
    }
  },
  wallet: {
    allowedAddress: '0x5f188E67C374feF892Cc3BaC4aE0689166C6a620'
  },
  manifest: {
    version: '1',
    name: 'FX1 Nebula Gallery',
    homeUrl: 'https://fx1-nebula-gallery.lovable.app',
    subtitle: 'Styling the Blockchain',
    description: 'FX1 DIGITAL HUBS brings the future of onchain fashion and digital creativity. Experience $FX1_HUBS & $FDH token utilities in a gamified, social mini app.',
    primaryCategory: 'social',
    tags: ['FX1', 'miniapp', 'NFT', 'Base', 'blockchain', 'digital fashion'],
  }
} as const;
