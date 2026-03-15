"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dynamically import react-leaflet components since they require the window object
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

// Leaflet CSS needs to be imported manually in Next.js
import "leaflet/dist/leaflet.css";

// Icons are loaded lazily (client-side only) to avoid SSR `window is not defined`
async function makeIcon(color: string) {
  const L = (await import("leaflet")).default;
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

interface InteractiveLeafletMapProps {
  userLocation: { lat: number; lng: number } | null;
  city: string;
  budget?: number;
  duration?: string;
}

export default function InteractiveLeafletMap({
  userLocation,
  city,
  budget = 500,
  duration = "1 day",
}: InteractiveLeafletMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [restaurants, setRestaurants] = useState<Record<string, any>[]>([]);
  const [hotels, setHotels] = useState<Record<string, any>[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [icons, setIcons] = useState<{
    person: import("leaflet").Icon | null;
    restaurant: import("leaflet").Icon | null;
    hotel: import("leaflet").Icon | null;
  }>({ person: null, restaurant: null, hotel: null });

  // Avoid hydration mismatch by only rendering the map client-side
  useEffect(() => {
    setIsMounted(true);
    // Load Leaflet icons only on the client
    Promise.all([makeIcon("gold"), makeIcon("red"), makeIcon("blue")]).then(
      ([person, restaurant, hotel]) => setIcons({ person, restaurant, hotel })
    );
  }, []);

  useEffect(() => {
    if (!userLocation) return;
    
    async function fetchExternalData() {
      try {
        // Fetch Zomato Restaurants
        const zomatoRes = await fetch(`/api/zomato?lat=${userLocation?.lat}&lng=${userLocation?.lng}`);
        const zData = await zomatoRes.json();
        // Zomato API search results are in `restaurants` array
        if (zData && zData.restaurants) {
          setRestaurants(zData.restaurants.map((item: Record<string, any>) => item.restaurant));
        }

        // Fetch Booking.com Hotels
        const bookingRes = await fetch(`/api/booking?lat=${userLocation?.lat}&lng=${userLocation?.lng}`);
        const bData = await bookingRes.json();
        // Booking.com coordinate search returns array in `result`
        if (bData && bData.result) {
          setHotels(bData.result.slice(0, 15)); // Limit to first 15 for performance
        }
      } catch (err) {
        console.error("External API fetching failed:", err);
      }
    }
    fetchExternalData();
  }, [userLocation]);

  const triggerAI = async (lat: number, lng: number, placeName: string) => {
    setAiLoading(true);
    setAiSuggestion(null);
    try {
      const response = await fetch("/api/ai/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city,
          budget,
          duration: `Focus exclusively on a quick itinerary around ${placeName}. ${duration}`,
          lat,
          lng
        }),
      });
      const data = await response.json();
      setAiSuggestion(data.plan);
    } catch {
      setAiSuggestion("Failed to load AI suggestions.");
    } finally {
      setAiLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-100 rounded-xl">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Fallback to Jaipur coordinates if no user location
  const center = userLocation || { lat: 26.9124, lng: 75.7873 };

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden border shadow-sm">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={userLocation ? 14 : 12}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && icons.person && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={icons.person}>
            <Popup>
              <div className="font-semibold text-center">You are here</div>
            </Popup>
          </Marker>
        )}

        {restaurants.map((rest, i) => {
          if (!rest.location?.latitude || !rest.location?.longitude) return null;
          return (
            <Marker
              key={`rest-${i}`}
              position={[parseFloat(rest.location.latitude), parseFloat(rest.location.longitude)]}
              icon={icons.restaurant ?? undefined}
            >
              <Popup>
                <div className="p-1 max-w-[200px] space-y-1">
                  <h3 className="font-bold text-sm leading-tight border-b pb-1 mb-1">{rest.name}</h3>
                  <p className="text-xs text-muted-foreground">{rest.cuisines}</p>
                  <p className="text-xs font-semibold text-emerald-600">Avg Cost: {rest.currency}{rest.average_cost_for_two} / two</p>
                  
                  <div className="pt-2 mt-2 border-t">
                     <Button 
                       size="sm" 
                       onClick={() => triggerAI(parseFloat(rest.location.latitude), parseFloat(rest.location.longitude), rest.name)} 
                       disabled={aiLoading} 
                       className="w-full h-7 text-[10px] bg-purple-600 hover:bg-purple-700 text-white"
                     >
                       {aiLoading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
                       AI Planner here
                     </Button>
                     {aiSuggestion && (
                       <div className="mt-2 text-[10px] bg-purple-50 p-1.5 rounded border border-purple-100 text-purple-900 max-h-32 overflow-y-auto">
                         {aiSuggestion}
                       </div>
                     )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {hotels.map((hotel, i) => {
          if (!hotel.latitude || !hotel.longitude) return null;
          return (
            <Marker
              key={`hotel-${i}`}
              position={[hotel.latitude, hotel.longitude]}
              icon={icons.hotel ?? undefined}
            >
              <Popup>
                <div className="p-1 max-w-[200px] space-y-1">
                  <h3 className="font-bold text-sm leading-tight border-b pb-1 mb-1">{hotel.hotel_name}</h3>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-blue-600">{hotel.min_total_price ? `~${Math.round(hotel.min_total_price)} ${hotel.currencycode}` : 'Check rates'}</span>
                    <span className="text-amber-500">★ {hotel.class}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground line-clamp-2">{hotel.address}</p>
                  
                  <div className="pt-2 mt-2 border-t">
                     <Button 
                       size="sm" 
                       onClick={() => triggerAI(hotel.latitude, hotel.longitude, hotel.hotel_name)} 
                       disabled={aiLoading} 
                       className="w-full h-7 text-[10px] bg-purple-600 hover:bg-purple-700 text-white"
                     >
                       {aiLoading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
                       AI Planner here
                     </Button>
                     {aiSuggestion && (
                       <div className="mt-2 text-[10px] bg-purple-50 p-1.5 rounded border border-purple-100 text-purple-900 max-h-32 overflow-y-auto">
                         {aiSuggestion}
                       </div>
                     )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
