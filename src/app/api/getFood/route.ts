import { NextResponse } from "next/server";
import { FOOD_PLACES } from "@/lib/data";
import { calculateDistance } from "@/lib/geo";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius") || "5"; // Default 5km radius

  let results = [...FOOD_PLACES];

  // If user provided location, filter by radius and append actual calculated distance
  if (lat && lng) {
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    const maxRadius = parseFloat(radius as string);

    results = results.map(place => {
      const actualDistance = calculateDistance(userLat, userLng, place.lat, place.lng);
      return {
        ...place,
        calculatedDistance: actualDistance,
        // Update the display string dynamically
        distance: `${actualDistance.toFixed(1)} km`,
      };
    }).filter(place => place.calculatedDistance <= maxRadius)
      .sort((a, b) => a.calculatedDistance - b.calculatedDistance);
  }

  return NextResponse.json({ data: results });
}
