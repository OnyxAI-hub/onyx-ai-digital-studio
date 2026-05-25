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

    const body = await req.json().catch(() => ({}));
    const prompt: string | undefined = body?.prompt;
    const safety: string | undefined = body?.safety;
    // Accept either referenceImageUrl or imageUrl from client
    const referenceImageUrl: string | undefined = body?.referenceImageUrl ?? body?.imageUrl;

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

    const isImageToImage = typeof referenceImageUrl === "string" && referenceImageUrl.length > 0;
    const model = isImageToImage
      ? "fal-ai/flux/dev/image-to-image"
      : (SAFETY_MODEL_MAP[safety as string] ?? "fal-ai/flux/dev");

    const falBody = isImageToImage
      ? { prompt, image_url: referenceImageUrl, strength: 0.85, num_images: 1 }
      : { prompt, num_images: 1, image_size: "square_hd" };

    const falRes = await fetch(`https://fal.run/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Key ${FAL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(falBody),
    });

    if (!falRes.ok) {
      const text = await falRes.text();
      console.error("fal.ai error:", falRes.status, text);
      return new Response(JSON.stringify({ error: `fal.ai error: ${text}` }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = await falRes.json();
    const resultUrl = result?.images?.[0]?.url;
    if (!resultUrl) {
      return new Response(JSON.stringify({ error: "No image returned", result }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ imageUrl: resultUrl }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("generate-image error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
