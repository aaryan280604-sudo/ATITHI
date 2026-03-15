"use client"
import { useState, useEffect } from "react";
import { useGeolocation } from "@/hooks/use-geolocation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, MapPin, ShieldCheck, Star, Loader2 } from "lucide-react";

export default function StaysPage() {
  const [sort, setSort] = useState<"price" | "rating">("rating");
  const [stays, setStays] = useState<any[]>([]);
  const { location, loading: geoLoading } = useGeolocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let url = "/api/getStays";
      if (location) {
        url += `?lat=${location.lat}&lng=${location.lng}&radius=50`; 
      }
      try {
        const res = await fetch(url);
        const json = await res.json();
        setStays(json.data || []);
      } catch (err) {
        console.error("Failed to fetch stays", err);
      } finally {
        setLoading(false);
      }
    }
    if (!geoLoading) fetchData();
  }, [location, geoLoading]);

  const sortedStays = [...stays].sort((a, b) => {
    if (sort === "price") return a.price - b.price;
    return b.rating - a.rating;
  });

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-500 rounded-2xl mb-4">
          <Home className="h-6 w-6" />
        </div>
        <h1 className="text-4xl font-heading font-bold mb-4">Budget Stay Finder</h1>
        <p className="text-lg text-muted-foreground">Find safe, affordable hostels, dorms, and local lodges.</p>
      </div>

      <div className="flex flex-wrap items-center justify-between mb-8">
        <h2 className="text-xl font-semibold">Available in Jaipur ({stays.length})</h2>
        <div className="flex gap-2">
          <Button 
            variant={sort === "rating" ? "secondary" : "ghost"} 
            onClick={() => setSort("rating")}
            className="text-sm h-9"
          >
            Top Rated
          </Button>
          <Button 
            variant={sort === "price" ? "secondary" : "ghost"} 
            onClick={() => setSort("price")}
            className="text-sm h-9"
          >
            Lowest Price
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading && (
          <div className="col-span-full py-20 flex justify-center text-blue-500">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )}
        {!loading && sortedStays.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            No stays found nearby.
          </div>
        )}
        {!loading && sortedStays.map((stay) => (
          <Card key={stay.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-border group">
            <div className="h-56 w-full relative overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <img src={stay.image} alt={stay.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-background/90 text-foreground font-medium text-xs px-2.5 py-1 rounded shadow-sm border">
                {stay.type}
              </div>
              <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground font-bold text-lg px-3 py-1.5 rounded-lg shadow-xl">
                ₹{stay.price} <span className="text-xs font-normal opacity-80">/night</span>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-xl line-clamp-1 flex-1 pr-4">{stay.name}</h3>
                <div className="flex items-center text-amber-500 font-medium">
                  <Star className="w-4 h-4 fill-amber-500 mr-1" />
                  {stay.rating}
                </div>
              </div>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" /> 
                  <span className="flex-1">{stay.distance}</span>
                </div>
                
                <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded-md">
                  <ShieldCheck className="w-4 h-4 mr-2" /> 
                  Safety: {stay.safety} Priority
                </div>
              </div>
              
              <Button className="w-full mt-6" variant="outline">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
