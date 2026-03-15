import { NextResponse } from "next/server";
import { MARKET_ITEMS } from "@/lib/data";
import { calculateDistance } from "@/lib/geo";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius") || "5"; 

  let results = [...MARKET_ITEMS];

  if (lat && lng) {
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    const maxRadius = parseFloat(radius as string);

    results = results.map(item => {
      const actualDistance = calculateDistance(userLat, userLng, item.lat, item.lng);
      return {
        ...item,
        calculatedDistance: actualDistance,
      };
    }).filter(item => item.calculatedDistance <= maxRadius)
      .sort((a, b) => a.calculatedDistance - b.calculatedDistance);
  }

  return NextResponse.json({ data: results });
}
