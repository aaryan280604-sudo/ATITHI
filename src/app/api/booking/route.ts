import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  
  if (!lat || !lng) {
    return NextResponse.json({ error: "Missing lat/lng" }, { status: 400 });
  }

  // Booking.com API usually searches by destination/bbox/coordinatess -> hotels. 
  // We'll proxy a nearest coordinate search for properties.
  try {
    const response = await fetch(`https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?latitude=${lat}&longitude=${lng}&children_ages=0&page_number=0&filter_by_currency=USD&units=metric&room_number=1&adults_number=1&order_by=popularity`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
        'x-rapidapi-host': 'booking-com.p.rapidapi.com'
      }
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json({ error: "Failed to fetch hotels" }, { status: 500 });
  }
}
