import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENSEA_API_KEY = Deno.env.get("OPENSEA_API_KEY");
    if (!OPENSEA_API_KEY) {
      throw new Error("OPENSEA_API_KEY is not configured");
    }

    const { walletAddress } = await req.json();
    const wallet = walletAddress || "0x17af2b27d43fa612aab0698214ef2c44b08845ee";
    
    // Fetch NFTs from OpenSea API
    const openseaResponse = await fetch(
      `https://api.opensea.io/api/v2/chain/base/account/${wallet}/nfts`,
      {
        headers: {
          "X-API-KEY": OPENSEA_API_KEY,
          "accept": "application/json",
        },
      }
    );

    if (!openseaResponse.ok) {
      const errorText = await openseaResponse.text();
      console.error("OpenSea API error:", openseaResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to fetch from OpenSea API", details: errorText }),
        { status: openseaResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await openseaResponse.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in fetch-opensea-nfts:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
