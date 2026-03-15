"use client"
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, MapPin, CalendarClock, Loader2, Utensils } from "lucide-react";

export default function AIPlannerPage() {
  const [city, setCity] = useState("Jaipur");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("1 Day");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget) return;
    
    setLoading(true);
    setItinerary(null);
    
    try {
      const response = await fetch("/api/ai/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, budget: Number(budget), duration }),
      });
      
      const data = await response.json();
      if (data.plan) {
        setItinerary(data.plan);
      } else if (data.error) {
        setItinerary(`Error from AI Planner: ${data.error}`);
      } else {
        setItinerary("Could not generate a plan. Please check if the OpenAI API key is configured.");
      }
    } catch (error) {
      setItinerary("An error occurred. Make sure API routes are functioning.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-4 py-16 mx-auto">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-2xl mb-4 shadow-sm border border-purple-200 dark:border-purple-800">
          <Sparkles className="h-6 w-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4 tracking-tight">AI Travel Planner</h1>
        <p className="text-lg text-muted-foreground">
          Tell us your constraint, and our AI will build an optimized itinerary utilizing real market prices and local spots.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Input Form */}
        <Card className="border-border shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <MapPin className="mr-2 h-5 w-5 text-primary" /> Trip Constraints
            </CardTitle>
            <CardDescription>Enter your exact total budget for the trip.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Destination City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    value={city} 
                    onChange={e => setCity(e.target.value)} 
                    placeholder="E.g., Jaipur" 
                    className="pl-9 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Total Budget (₹)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-medium text-muted-foreground">₹</span>
                  <Input 
                    type="number"
                    value={budget} 
                    onChange={e => setBudget(e.target.value)} 
                    placeholder="800"
                    className="pl-8 h-12 bg-secondary/30"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">Include all food, entry fees, and local transport.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time Duration</label>
                <div className="relative">
                  <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select 
                    value={duration} 
                    onChange={e => setDuration(e.target.value)}
                    className="flex h-12 w-full pl-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="1 Day">1 Day</option>
                    <option value="2 Days">2 Days</option>
                    <option value="3 Days">3 Days</option>
                  </select>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-base font-bold bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600 transition-all shadow-md group relative overflow-hidden" 
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating Plan...</>
                ) : (
                  <>Generate Itinerary <Sparkles className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" /></>
                )}
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card className="border-border shadow-md bg-secondary/10 flex flex-col min-h-[400px]">
          <CardHeader>
            <CardTitle className="text-xl">Your Itinerary</CardTitle>
            <CardDescription>
              AI-generated plan matching your budget constraints.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4 py-12">
                <Loader2 className="h-10 w-10 animate-spin text-purple-500" />
                <p className="animate-pulse">Analyzing local food stalls...</p>
              </div>
            ) : itinerary ? (
              <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed p-4 bg-background rounded-lg border border-border/50 shadow-inner">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-xl font-extrabold bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent mb-3 pb-1 border-b border-purple-200 dark:border-purple-800">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-base font-bold text-purple-600 dark:text-purple-400 mt-4 mb-2">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-sm font-bold text-rose-500 dark:text-rose-400 mt-3 mb-1">{children}</h3>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold text-purple-700 dark:text-purple-300">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="text-muted-foreground not-italic text-xs">{children}</em>
                    ),
                    hr: () => (
                      <hr className="my-3 border-purple-200 dark:border-purple-800" />
                    ),
                    ul: ({ children }) => (
                      <ul className="space-y-1 my-2 pl-1">{children}</ul>
                    ),
                    li: ({ children }) => (
                      <li className="flex gap-2 items-start text-sm">
                        <span className="text-green-500 mt-0.5 flex-shrink-0">●</span>
                        <span>{children}</span>
                      </li>
                    ),
                    p: ({ children }) => {
                      const text = String(children);
                      const isCostLine = text.toLowerCase().includes("total estimated cost");
                      return isCostLine ? (
                        <p className="mt-3 p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 font-bold text-amber-700 dark:text-amber-300 text-sm">{children}</p>
                      ) : (
                        <p className="text-sm text-foreground/80 leading-relaxed my-1">{children}</p>
                      );
                    },
                  }}
                >
                  {itinerary}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-muted-foreground border-2 border-dashed border-border rounded-xl p-8 py-20 bg-background/50">
                <div className="space-y-4">
                  <Utensils className="h-8 w-8 mx-auto opacity-20" />
                  <p>Fill out the form and hit generate to see your budget-friendly itinerary here.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
