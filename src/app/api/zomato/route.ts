import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  
  if (!lat || !lng) {
    return NextResponse.json({ error: "Missing lat/lng" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://developers.zomato.p.rapidapi.com/search?lat=${lat}&lon=${lng}&radius=5000`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
        'x-rapidapi-host': 'developers.zomato.p.rapidapi.com'
      }
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Zomato API error:", error);
    return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 });
  }
}
