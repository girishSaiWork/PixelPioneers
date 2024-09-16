# Project Overview
Use this guide to build a web app where users can give a text prompt to generate emoj using model hosted on Replicate.

## Feature requirements
- We will use Next.js, Shadcn, Lucid, Supabase, Clerk
- Create a form where users can put in prompt, and clicking on button that calls the replicate model to generate emoji
- Have a nice UI & animation when the emoji is blank or generating
- Display all the images ever generated in grid
- When hover each emoj img, an icon button for download, and an icon button for like should be shown up

### Relaveant docs
#### How to use replicate emoji generator model
  import Replicate from 'replicate';

   const replicate = new Replicate({
       auth: process.env.REPLICATE_API_TOKEN,
   });

   export const generateEmoji = async (prompt) => {
       const output = await replicate.run("sdxl-emoji@sha256:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e", {
           input: { 
            width: 64,
            height: 64,
            prompt: "A TOK emoji man",
            refine: "no refiner",
            scheduler: "K_ELUER",
            lora_scale: 0.7,
            num_outputs: 1,
            guidance_scale: 5,
            apply_watermark: false,
            num_inference_steps: 30
            
            },
       });
       return output;
   };
   
### Current Folder Structure
PIXELPIONEERS
└── pixel_maker/
    ├── .next/
    ├── app/
    │   ├── fonts/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    ├── components/
    │   └── ui/
    │       ├── button.tsx
    │       ├── card.tsx
    │       └── input.tsx
    ├── lib/
    ├── node_modules/
    ├── requirements/
    ├── .eslintrc.json
    ├── .gitignore
    ├── components.json
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── README.md
    ├── tailwind.config.ts
    └── tsconfig.json   

### Rules
- All new components should be in components and should be named like example-component.tsx unless otherwise specified
- All new pages should be in app/ 
