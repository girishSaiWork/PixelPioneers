import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
    const output = await replicate.run("sdxl-emoji@sha256:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e", {
      input: { 
        width: 64,
        height: 64,
        prompt: prompt,
        refine: "no refiner",
        scheduler: "K_ELUER",
        lora_scale: 0.7,
        num_outputs: 1,
        guidance_scale: 5,
        apply_watermark: false,
        num_inference_steps: 30
      },
    });

    return NextResponse.json({ success: true, emoji: output[0] });
  } catch (error) {
    console.error('Error generating emoji:', error);
    return NextResponse.json({ success: false, error: 'Failed to generate emoji' }, { status: 500 });
  }
}