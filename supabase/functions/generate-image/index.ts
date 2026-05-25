import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const FAL_API_KEY = Deno.env.get("FAL_API_KEY");
    if (!FAL_API_KEY) {
      return new Response(JSON.stringify({ error: "FAL_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { prompt, safety } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return new Response(JSON.stringify({ error: "Missing 'prompt' string in body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SAFETY_MODEL_MAP: Record<string, string> = {
      Family: "fal-ai/flux/schnell",
      Safe: "fal-ai/flux/schnell",
      "Teen+": "fal-ai/flux/dev",
      "Mild Suggestive": "fal-ai/flux/dev",
      Mature: "fal-ai/flux-pro",
      Custom: "fal-ai/flux-pro",
    };
    const model = SAFETY_MODEL_MAP[safety as string] ?? "fal-ai/flux/dev";

    const falRes = await fetch(`https://fal.run/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Key ${FAL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        num_images: 1,
        image_size: "square_hd",
      }),
    });

    if (!falRes.ok) {
      const text = await falRes.text();
      return new Response(JSON.stringify({ error: `fal.ai error: ${text}` }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = await falRes.json();
    const imageUrl = result?.images?.[0]?.url;
    if (!imageUrl) {
      return new Response(JSON.stringify({ error: "No image returned", result }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ imageUrl }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
