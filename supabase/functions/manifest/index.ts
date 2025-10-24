import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function withValidProperties(properties: Record<string, undefined | string | string[]>) {
  return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
  );
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const manifest = {
      accountAssociation: {
        header: "",
        payload: "",
        signature: ""
      },
      baseBuilder: {
        allowedAddresses: ["0x5f188E67C374feF892Cc3BaC4aE0689166C6a620"]
      },
      miniapp: {
        version: "1",
        name: "FX1 Nebula Gallery",
        homeUrl: "https://fx1-nebula-gallery.lovable.app",
        iconUrl: "https://fx1-nebula-gallery.lovable.app/logo.png",
        splashImageUrl: "https://fx1-nebula-gallery.lovable.app/logo.png",
        splashBackgroundColor: "#001F3F",
        webhookUrl: "https://fx1-nebula-gallery.lovable.app/api/webhook",
        subtitle: "Styling the Blockchain",
        description: "FX1 DIGITAL HUBS brings the future of onchain fashion and digital creativity. Experience $FX1_HUBS & $FDH token utilities in a gamified, social mini app.",
        screenshotUrls: [],
        primaryCategory: "social",
        tags: ["FX1", "miniapp", "NFT", "Base", "blockchain", "digital fashion"],
        heroImageUrl: "https://fx1-nebula-gallery.lovable.app/logo.png",
        tagline: "Experience Onchain Fashion & Utility",
        ogTitle: "FX1 Nebula Gallery",
        ogDescription: "Discover $FX1_HUBS & $FDH token utility while exploring digital fashion on Base.",
        ogImageUrl: "https://fx1-nebula-gallery.lovable.app/logo.png",
        noindex: false
      }
    };

    return new Response(JSON.stringify(withValidProperties(manifest)), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in manifest:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
