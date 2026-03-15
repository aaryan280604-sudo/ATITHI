"use client"
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useGeolocation } from "@/hooks/use-geolocation";
import { Search, Loader2, Navigation, MapPin, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

import "leaflet/dist/leaflet.css";
import L from "leaflet";

const defaultCenter = { lat: 26.9124, lng: 75.7873 };

const iconPerson = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const getMarkerIcon = (type: string) => {
  let color = "blue";
  if (type === "food") color = "red";
  if (type === "market") color = "green";
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

export default function MapClient() {
  const { location, loading: geoLoading } = useGeolocation();
  
  const [isMounted, setIsMounted] = useState(false);
  const [food, setFood] = useState<any[]>([]);
  const [stays, setStays] = useState<any[]>([]);
  const [markets, setMarkets] = useState<any[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function fetchData() {
      let foodUrl = "/api/getFood";
      let staysUrl = "/api/getStays";
      let marketsUrl = "/api/getMarkets";
      
      if (location) {
        const query = `?lat=${location.lat}&lng=${location.lng}&radius=50`;
        foodUrl += query;
        staysUrl += query;
        marketsUrl += query;
      }

      try {
        const [foodRes, staysRes, marketRes] = await Promise.all([
          fetch(foodUrl), fetch(staysUrl), fetch(marketsUrl)
        ]);
        
        const [fJson, sJson, mJson] = await Promise.all([
          foodRes.json(), staysRes.json(), marketRes.json()
        ]);

        setFood(fJson.data?.map((i: any) => ({...i, type: 'food'})) || []);
        setStays(sJson.data?.map((i: any) => ({...i, type: 'stay'})) || []);
        setMarkets(mJson.data?.map((i: any) => ({...i, type: 'market'})) || []);
      } catch (err) {
        console.error("Failed to fetch map data", err);
      }
    }
    if (!geoLoading) fetchData();
  }, [location, geoLoading]);

  const triggerAiSuggestion = async (selectedMarker: any) => {
    setAiLoading(true);
    setAiSuggestion(null);
    try {
      const response = await fetch("/api/ai/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          city: "Jaipur", 
          budget: 500, // arbitrary small budget to gauge suggestion
          duration: `1 hour visit at ${selectedMarker.name}`,
          lat: location?.lat || selectedMarker.lat,
          lng: location?.lng || selectedMarker.lng
        }),
      });
      const data = await response.json();
      setAiSuggestion(data.plan || "AI integration pending.");
    } catch {
      setAiSuggestion("Failed to load AI suggestion");
    } finally {
      setAiLoading(false);
    }
  };

  const allMarkers = [...food, ...stays, ...markets];

  if (!isMounted) {
    return (
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex-1 flex items-center justify-center bg-zinc-100">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const centerObj = location || defaultCenter;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="bg-background border-b p-4 flex gap-4 items-center z-20 relative shadow-sm">
        <h1 className="font-heading font-bold text-xl hidden sm:block">Map Explorer</h1>
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search Jaipur areas..." 
            className="w-full pl-9 pr-4 py-2 bg-secondary rounded-full text-sm border-none focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-semibold">
            <div className="h-2 w-2 rounded-full bg-red-500"></div> Food
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div> Stays
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">
            <div className="h-2 w-2 rounded-full bg-green-500"></div> Markets
          </div>
        </div>
      </div>
      
      <div className="flex-1 relative bg-zinc-200 dark:bg-zinc-800 overflow-hidden z-10">
        <MapContainer
          center={[centerObj.lat, centerObj.lng]}
          zoom={location ? 14 : 13}
          style={{ height: "100%", width: "100%", zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {location && (
            <Marker position={[location.lat, location.lng]} icon={iconPerson}>
              <Popup>
                 <div className="font-semibold text-center">You are here</div>
              </Popup>
            </Marker>
          )}
          
          {allMarkers.map((item) => (
            <Marker 
              key={`${item.type}-${item.id}`}
              position={[item.lat, item.lng]}
              icon={getMarkerIcon(item.type)}
              eventHandlers={{ click: () => setAiSuggestion(null) }}
            >
               <Popup>
                 <div className="p-1 max-w-[220px] space-y-2 text-zinc-900">
                    <h3 className="font-bold text-sm leading-tight border-b pb-1">{item.name}</h3>
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-primary">
                        {item.type === 'food' && `₹${item.price}`}
                        {item.type === 'stay' && `₹${item.price}/night`}
                        {item.type === 'market' && `₹${item.fairPriceMin}-${item.fairPriceMax}`}
                      </span>
                      {item.distance && (
                        <span className="text-zinc-500 text-[10px]">{item.distance}</span>
                      )}
                    </div>
                    
                    {(item.tags || item.category) && (
                      <div className="flex gap-1 flex-wrap mt-2">
                        {(item.tags || [item.category]).slice(0, 3).map((tag: string) => (
                          <span key={tag} className="bg-zinc-100 border border-zinc-200 text-zinc-600 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-2 mt-2 border-t">
                      <Button size="sm" onClick={() => triggerAiSuggestion(item)} disabled={aiLoading} className="w-full h-8 text-[10px] bg-purple-600 hover:bg-purple-700 text-white">
                        {aiLoading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
                        AI Tips nearby
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
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
