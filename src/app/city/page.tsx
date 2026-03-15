"use client"
import { useState, useEffect } from "react";
import { useGeolocation } from "@/hooks/use-geolocation";
import { TOURIST_SPOTS } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Loader2 } from "lucide-react";

export default function CityExplorerPage() {
  const { location, loading: geoLoading } = useGeolocation();
  const [foodPlaces, setFoodPlaces] = useState<any[]>([]);
  const [stays, setStays] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let foodUrl = "/api/getFood";
      let staysUrl = "/api/getStays";
      
      if (location) {
        foodUrl += `?lat=${location.lat}&lng=${location.lng}&radius=50`;
        staysUrl += `?lat=${location.lat}&lng=${location.lng}&radius=50`;
      }
      
      try {
        const [foodRes, staysRes] = await Promise.all([
          fetch(foodUrl),
          fetch(staysUrl)
        ]);
        
        const foodJson = await foodRes.json();
        const staysJson = await staysRes.json();
        
        setFoodPlaces(foodJson.data || []);
        setStays(staysJson.data || []);
      } catch (err) {
        console.error("Failed to fetch city data", err);
      } finally {
        setLoading(false);
      }
    }
    
    if (!geoLoading) fetchData();
  }, [location, geoLoading]);

  return (
    <div className="container px-4 py-12 mx-auto space-y-12">
      <div>
        <h1 className="text-4xl font-heading font-bold mb-2">Jaipur</h1>
        <p className="text-muted-foreground">The Pink City. Explore the best budget options.</p>
      </div>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Affordable Food</h2>
          <a href="/food" className="text-primary hover:underline text-sm font-medium">View all</a>
        </div>
        
        {loading ? (
          <div className="py-8 flex justify-center text-primary"><Loader2 className="w-6 h-6 animate-spin" /></div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {foodPlaces.slice(0, 4).map((place) => (
              <Card key={place.id} className="min-w-[280px] snap-start border-none shadow-md overflow-hidden bg-secondary/30">
                <div className="h-40 w-full bg-zinc-200 dark:bg-zinc-800 relative">
                  {/* Fallback image style since unsplash might block or fail */}
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-background/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-md">
                    ₹{place.price}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold truncate">{place.name}</h3>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" /> {place.distance}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {place.tags.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="text-[10px] uppercase font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Budget Stays</h2>
          <a href="/stays" className="text-primary hover:underline text-sm font-medium">View all</a>
        </div>
        
        {loading ? (
          <div className="py-8 flex justify-center text-primary"><Loader2 className="w-6 h-6 animate-spin" /></div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {stays.slice(0, 4).map((stay) => (
              <Card key={stay.id} className="min-w-[280px] snap-start border-none shadow-md overflow-hidden bg-secondary/30">
                <div className="h-40 w-full bg-zinc-200 dark:bg-zinc-800 relative">
                  <img src={stay.image} alt={stay.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-background/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-md">
                    ₹{stay.price}/night
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold truncate flex-1">{stay.name}</h3>
                    <div className="flex items-center text-xs font-medium text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                      ★ {stay.rating}
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 mt-1">{stay.type}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <MapPin className="h-3 w-3 mr-1" /> {stay.distance}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Tourist Spots</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {TOURIST_SPOTS.map((spot) => (
            <Card key={spot.id} className="border shadow-sm flex items-center p-3 gap-4">
              <div className="h-16 w-16 rounded-md bg-zinc-200 overflow-hidden flex-shrink-0">
                <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{spot.name}</h3>
                <p className="text-xs text-muted-foreground">{spot.type}</p>
              </div>
              <div className="text-sm font-bold bg-secondary px-2 py-1 rounded">
                ₹{spot.fee}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
