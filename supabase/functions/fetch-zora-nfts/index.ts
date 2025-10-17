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
    const ZORA_API_KEY = Deno.env.get("ZORA_API_KEY");
    if (!ZORA_API_KEY) {
      throw new Error("ZORA_API_KEY is not configured");
    }

    const { contractAddress } = await req.json();
    
    // Fetch NFT collection data from Zora API
    const zoraResponse = await fetch(
      `https://api.zora.co/v1/collections/${contractAddress}`,
      {
        headers: {
          "Authorization": `Bearer ${ZORA_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!zoraResponse.ok) {
      const errorText = await zoraResponse.text();
      console.error("Zora API error:", zoraResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to fetch from Zora API" }),
        { status: zoraResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await zoraResponse.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in fetch-zora-nfts:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
