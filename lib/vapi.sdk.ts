
// lib/vapi.sdk.ts
import Vapi from "@vapi-ai/web";

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);


// (Optional) tiny helper to ensure we fail fast if the key is missing
if (!process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
     
    console.warn(
        "NEXT_PUBLIC_VAPI_PUBLIC_KEY is missing. vapi.start() will fail at runtime."
    );
}
