import { NextResponse } from "next/server";
import { STAYS } from "@/lib/data";
import { calculateDistance } from "@/lib/geo";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius") || "10"; // Default 10km radius

  let results = [...STAYS];

  if (lat && lng) {
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    const maxRadius = parseFloat(radius as string);

    results = results.map(stay => {
      const actualDistance = calculateDistance(userLat, userLng, stay.lat, stay.lng);
      return {
        ...stay,
        calculatedDistance: actualDistance,
        distance: `${actualDistance.toFixed(1)} km`,
      };
    }).filter(stay => stay.calculatedDistance <= maxRadius)
      .sort((a, b) => a.calculatedDistance - b.calculatedDistance);
  }

  return NextResponse.json({ data: results });
}
