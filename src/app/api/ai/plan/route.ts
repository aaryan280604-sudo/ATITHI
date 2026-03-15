import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { FOOD_PLACES, TOURIST_SPOTS } from "@/lib/data";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "dummy",
});

export async function POST(req: Request) {
  try {
    const { city, budget, duration, lat, lng } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY || "";
    
    // Check if the key is missing or invalid
    if (!apiKey || apiKey === "ENTER_API_KEY_HERE" || apiKey.includes("***") || apiKey.trim().length < 20) {
      // Fallback for when API key is not valid (mock experience)
      return NextResponse.json({
        plan: `*Generating mock plan for ${city} since Gemini key is currently missing or invalid.*\n\n**Activity:**\n${duration}\n\n**Recommended nearby:**\n${FOOD_PLACES[0].name} - ₹${FOOD_PLACES[0].price} (Distance based on ${lat},${lng})\n\n**Total Estimated Cost: ₹${
          budget
        }**\n\n_Note: This is a fallback mock itinerary. Add a valid GEMINI_API_KEY to .env.local for realtime AI generation._`,
      });
    }

    // Prepare context for the prompt
    const foodOptions = FOOD_PLACES.map((p) => `- ${p.name} (₹${p.price})`).join("\n");
    const spotsOptions = TOURIST_SPOTS.map((s) => `- ${s.name} (₹${s.fee})`).join("\n");
    
    let locationContext = "";
    if (lat && lng) {
      locationContext = `\nThe user's or selected spot's current coordinates are: Latitude ${lat}, Longitude ${lng}. Please prioritize suggesting food or activities that are geographically relevant or nearby this location if possible.`;
    }

    const prompt = `You are a local travel planner.

Create a travel plan for ${city}.

User budget: ₹${budget}
Duration: ${duration}${locationContext}

Available food options:
${foodOptions}

Available attractions:
${spotsOptions}

Return a simple day plan with estimated costs. Use the provided food and attraction options where appropriate to fit the budget. Format the output with clear headings and bullet points. At the end, state the total estimated cost. Keep it realistic, concise, and heavily geared toward budget travelers.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: prompt,
    });

    return NextResponse.json({
      plan: response.text,
    });
  } catch (error: any) {
    console.error("Gemini App Error:", error);
    return NextResponse.json(
      { error: `Failed to generate itinerary: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
