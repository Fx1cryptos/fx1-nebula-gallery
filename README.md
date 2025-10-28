# FX1 Nebula Mini App 🌌

**Styling the Blockchain | Powered by $FX1_HUBS & $FDH Tokens**

Welcome to **FX1 Nebula Mini App**, an immersive onchain fashion and digital creativity hub built on **Base**. Explore, create, and interact with digital fashion while unlocking exclusive features using our **creator coin $FX1_HUBS** and utility token **$FDH**.

---

## 🚀 Project Overview

FX1 Nebula Mini App is a **React + TypeScript Vite project** integrated with the **Base Mini App SDK**. It’s designed as a **gamified, token-powered social experience**, where users can:

- Explore digital fashion galleries.
- Create and showcase their NFT art.
- Participate in runways and fashion events.
- Earn rewards, stake tokens, and access premium content.
- Unlock features based on $FX1_HUBS / $FDH token holdings.

This app is fully optimized for **mobile and desktop**, ensuring smooth interaction with Base wallets and token utilities.

---

## 🎯 Features

- **Onchain Fashion Experience:** Digital wardrobe, runway, and gallery powered by Base blockchain.
- **Token Utility Integration:** Unlock exclusive features based on $FX1_HUBS & $FDH balances.
- **Interactive Mini App:** Fast, responsive, and user-friendly interface.
- **Gamified Experience:** Stake, trade, and earn rewards while exploring digital creativity.
- **Social & Referral Systems:** Connect, share, and earn with your community.

---

## 🛠 Tech Stack

- **Framework:** React 18 + TypeScript
- **Bundler:** Vite
- **Routing:** React Router DOM
- **UI & Animations:** ShadCN UI, Radix UI, Sonner, TailwindCSS
- **3D & Graphics:** React Three Fiber, Drei, Three.js
- **Web3 & Tokens:** Base Mini App SDK, Viem, Wagmi, Thirdweb
- **State & Data:** React Query, Zod, Supabase
- **Wallet Integration:** Coinbase Wallet, RainbowKit
- **Deployment:** Vercel

---

## ⚡ Base Mini App Integration

This mini app is fully integrated with **Base Mini App SDK**. Key integration steps:

```ts
import { sdk } from '@farcaster/miniapp-sdk';

useEffect(() => {
  sdk.actions.ready()
    .then(() => console.log("FX1 Mini App is live on Base!"))
    .catch(console.error);
}, []);