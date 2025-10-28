import { sdk } from "@farcaster/miniapp-sdk";

// Your $FDH / $FX1_HUBS token contract address
export const FX1_TOKEN_ADDRESS = "0x24c42adfb620f3835fcb31fbdf3c1773fac76970";

// Check if user holds the token
export async function checkTokenHolder(userAddress: string) {
  try {
    const balance = await sdk.tokens.getBalance(userAddress, FX1_TOKEN_ADDRESS);
    return balance > 0;
  } catch (err) {
    console.error("Error checking token balance:", err);
    return false;
  }
}