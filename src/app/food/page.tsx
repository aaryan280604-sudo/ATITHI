"use client"
import { useState, useEffect } from "react";
import { useGeolocation } from "@/hooks/use-geolocation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Utensils, Loader2 } from "lucide-react";

export default function FoodDiscoveryPage() {
  const [filter, setFilter] = useState<number | null>(null);
  const [places, setPlaces] = useState<{id: number, name: string, price: number, distance: string, tags: string[], image: string}[]>([]);
  const { location, loading: geoLoading } = useGeolocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let url = "/api/getFood";
      if (location) {
        url += `?lat=${location.lat}&lng=${location.lng}&radius=50`; // 50km radius
      }
      try {
        const res = await fetch(url);
        const json = await res.json();
        setPlaces(json.data || []);
      } catch (err) {
        console.error("Failed to fetch food places", err);
      } finally {
        setLoading(false);
      }
    }
    if (!geoLoading) fetchData();
  }, [location, geoLoading]);

  const filteredPlaces = filter 
    ? places.filter(p => p.price <= filter)
    : places;

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-red-900/30 text-rose-500 rounded-2xl mb-4">
          <Utensils className="h-6 w-6" />
        </div>
        <h1 className="text-4xl font-heading font-bold mb-4">Budget Food Discovery</h1>
        <p className="text-lg text-muted-foreground">Find the best authentic and cheap food places in town.</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <Button 
          variant={filter === null ? "default" : "outline"} 
          onClick={() => setFilter(null)}
          className="rounded-full"
        >
          All
        </Button>
        <Button 
          variant={filter === 50 ? "default" : "outline"} 
          onClick={() => setFilter(50)}
          className="rounded-full"
        >
          Under ₹50
        </Button>
        <Button 
          variant={filter === 100 ? "default" : "outline"} 
          onClick={() => setFilter(100)}
          className="rounded-full"
        >
          Under ₹100
        </Button>
        <Button 
          variant={filter === 200 ? "default" : "outline"} 
          onClick={() => setFilter(200)}
          className="rounded-full"
        >
          Under ₹200
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPlaces.map((place) => (
          <Card key={place.id} className="border overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="h-48 w-full bg-zinc-200 relative overflow-hidden">
              <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-3 right-3 bg-background/95 backdrop-blur text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                ₹{place.price}
              </div>
            </div>
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg line-clamp-1">{place.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground mt-2 mb-4">
                <MapPin className="h-3.5 w-3.5 mr-1" /> {place.distance} • Jaipur
              </div>
              <div className="flex flex-wrap gap-1.5">
                {place.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase font-semibold bg-secondary text-secondary-foreground px-2 py-1 rounded text-center">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        {loading && (
          <div className="col-span-full py-20 flex justify-center text-emerald-500">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )}
        {!loading && filteredPlaces.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            No places found in this budget or area. Try a higher filter.
          </div>
        )}
      </div>
    </div>
  );
}
