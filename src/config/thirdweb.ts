import { createThirdwebClient } from "thirdweb";

export const thirdwebClient = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID || "13339dc32a88892b18cd60228982d06e",
});
