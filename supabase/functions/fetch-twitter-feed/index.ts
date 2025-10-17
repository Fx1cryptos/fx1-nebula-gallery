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
    const BEARER_TOKEN = Deno.env.get("TWITTER_BEARER_TOKEN");
    if (!BEARER_TOKEN) {
      throw new Error("TWITTER_BEARER_TOKEN is not configured");
    }

    // Fetch user's timeline using Twitter API v2
    const twitterResponse = await fetch(
      "https://api.twitter.com/2/tweets/search/recent?query=from:FX1_CRYPTO&max_results=10&tweet.fields=created_at,public_metrics,entities&expansions=author_id&user.fields=profile_image_url,username",
      {
        headers: {
          "Authorization": `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!twitterResponse.ok) {
      const errorText = await twitterResponse.text();
      console.error("Twitter API error:", twitterResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to fetch from Twitter API", details: errorText }),
        { status: twitterResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await twitterResponse.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in fetch-twitter-feed:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
