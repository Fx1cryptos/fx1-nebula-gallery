import { sdk } from "@farcaster/miniapp-sdk";

// Example token utility functions

// Check if user holds your creator coin
export async function checkTokenBalance(userAddress: string, tokenAddress: string) {
  try {
    const balance = await sdk.tokens.getBalance(userAddress, tokenAddress);
    return balance;
  } catch (err) {
    console.error("Error checking token balance:", err);
    return 0;
  }
}

// Unlock a feature if balance > 0
export async function canAccessFeature(userAddress: string, tokenAddress: string) {
  const balance = await checkTokenBalance(userAddress, tokenAddress);
  return balance > 0;
}