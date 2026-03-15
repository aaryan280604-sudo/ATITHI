"use client"
import { useState, useEffect } from "react";
import { useGeolocation } from "@/hooks/use-geolocation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";

export default function MarketIntelligencePage() {
  const [query, setQuery] = useState("");
  const [checkPrice, setCheckPrice] = useState<{ [key: number]: number }>({});
  const [marketItems, setMarketItems] = useState<any[]>([]);
  const { location, loading: geoLoading } = useGeolocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let url = "/api/getMarkets";
      if (location) {
        url += `?lat=${location.lat}&lng=${location.lng}&radius=50`; 
      }
      try {
        const res = await fetch(url);
        const json = await res.json();
        setMarketItems(json.data || []);
      } catch (err) {
        console.error("Failed to fetch markets", err);
      } finally {
        setLoading(false);
      }
    }
    if (!geoLoading) fetchData();
  }, [location, geoLoading]);

  const filteredItems = query
    ? marketItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    : marketItems;

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-2xl mb-4">
          <Search className="h-6 w-6" />
        </div>
        <h1 className="text-4xl font-heading font-bold mb-4">Market Price Intelligence</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Don't get scammed. Search for any item to see its real, authentic fair price before bargaining in tourist markets.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for items e.g., 'Scarf', 'Shoes', 'Jewelry'..." 
          className="h-14 pl-12 text-lg rounded-2xl shadow-sm border-zinc-200 dark:border-zinc-800 focus-visible:ring-emerald-500"
        />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {filteredItems.map(item => {
          const userPrice = checkPrice[item.id] || 0;
          const isOverpaying = userPrice > item.fairPriceMax;
          const isGoodDeal = userPrice > 0 && userPrice <= item.fairPriceMax;

          return (
            <Card key={item.id} className="overflow-hidden border-border transition-all">
              <div className="flex flex-col md:flex-row">
                <div className="p-6 md:w-1/2 border-b md:border-b-0 md:border-r border-border bg-secondary/20">
                  <div className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.name}</h3>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">AI Calculated Fair Price Range:</p>
                    <p className="text-3xl font-bold tracking-tight">
                      ₹{item.fairPriceMin} <span className="text-muted-foreground font-normal text-xl">–</span> ₹{item.fairPriceMax}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-4 text-xs text-muted-foreground">
                    <span className="bg-secondary px-2 py-1 rounded">Reported highest: ₹{Math.max(...item.pricesReported)}</span>
                  </div>
                </div>
                
                <div className="p-6 md:w-1/2 flex flex-col justify-center">
                  <h4 className="font-semibold mb-3">Checking a price?</h4>
                  <div className="flex gap-2 mb-4">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                      <Input 
                        type="number" 
                        placeholder="Quoted price" 
                        className="pl-8"
                        onChange={(e) => setCheckPrice(prev => ({...prev, [item.id]: Number(e.target.value)}))}
                      />
                    </div>
                  </div>

                  {isOverpaying && (
                    <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                      <p><strong>Warning!</strong> You are being overcharged. The fair max price is ₹{item.fairPriceMax}. Try to bargain down or walk away.</p>
                    </div>
                  )}

                  {isGoodDeal && (
                    <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-lg text-sm">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                      <p><strong>Good deal!</strong> This price is within the fair market value. Go ahead and buy it.</p>
                    </div>
                  )}

                  {!userPrice && (
                    <p className="text-sm text-muted-foreground italic">Enter what the shopkeeper quoted you to analyze if it's a tourist trap.</p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
        {loading && (
          <div className="py-12 flex justify-center text-emerald-500">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )}
        {!loading && filteredItems.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No items found. Try different keywords.
          </div>
        )}
      </div>
    </div>
  );
}
