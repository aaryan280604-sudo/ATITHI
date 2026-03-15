"use client"
import InteractiveLeafletMap from "@/components/interactive-leaflet-map";
import { useGeolocation } from "@/hooks/use-geolocation";
import { Map, Loader2 } from "lucide-react";

export default function LeafletPage() {
  const { location, loading } = useGeolocation();

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="bg-background border-b p-4 flex gap-4 items-center z-10 relative">
        <Map className="h-6 w-6 text-primary" />
        <h1 className="font-heading font-bold text-xl">Interactive Leaflet Map</h1>
      </div>
      
      <div className="flex-1 relative bg-zinc-100 p-4">
        {loading ? (
             <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 rounded-xl space-y-4">
               <Loader2 className="w-8 h-8 animate-spin text-primary" />
               <p className="text-muted-foreground font-medium">Fetching your secure location...</p>
             </div>
        ) : (
          <InteractiveLeafletMap 
            userLocation={location}
            city="Jaipur" 
            budget={100} 
            duration="1 day"
          />
        )}
      </div>
    </div>
  );
}
