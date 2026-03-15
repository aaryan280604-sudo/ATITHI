import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Utensils, Home, Compass, ArrowRight, ShieldAlert, Smartphone } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-48 overflow-hidden bg-background">
        {/* Abstract Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100 via-background to-background dark:from-rose-950/40 dark:via-background dark:to-background -z-10" />
        
        <div className="container px-4 mx-auto flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-background/50 backdrop-blur-sm text-muted-foreground shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-rose-500 mr-2 animate-pulse"></span>
            Now available in Jaipur
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight max-w-4xl">
            Travel Smarter, <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">Spend Less.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-sans">
            Discover affordable food, budget stays, and authentic markets in any city. 
            Real prices, authentic experiences, zero tourist traps.
          </p>
          
          <div className="flex w-full max-w-md flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base rounded-full shadow-lg hover:shadow-primary/25 transition-all" asChild>
              <Link href="/city">Explore City</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base rounded-full shadow-sm" asChild>
              <Link href="/ai-planner">Plan Trip with AI</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="w-full py-20 bg-secondary/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">Travel shouldn't be a guessing game</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Skip the endless research and avoid overpaying. We solve the biggest pain points for budget travellers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center text-primary mb-2">
                <Utensils className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-lg">Finding Cheap Food</h3>
              <p className="text-sm text-muted-foreground">Stop relying on expensive tourist restaurant reviews. Find where locals eat.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center text-orange-500 mb-2">
                <Compass className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-lg">Overpriced Markets</h3>
              <p className="text-sm text-muted-foreground">Never get scammed again. Know the fair price before you bargain.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center text-blue-500 mb-2">
                <Home className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-lg">Hidden Budget Stays</h3>
              <p className="text-sm text-muted-foreground">Discover clean, safe hostels and lodges that aren't on major booking sites.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center text-purple-500 mb-2">
                <MapPin className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-lg">Stressful Planning</h3>
              <p className="text-sm text-muted-foreground">Let our AI build an optimized, budget-friendly itinerary in seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="w-full py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Everything you need to survive on a budget</h2>
              <p className="text-lg text-muted-foreground">
                Our tools are designed specifically for backpackers, students, and solo explorers.
              </p>
            </div>
            <Button variant="ghost" className="hidden md:flex items-center" asChild>
              <Link href="/city">See all tools <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg shadow-black/[0.03] dark:shadow-white/[0.02] bg-gradient-to-br from-card to-secondary/20 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 mb-4">
                  <Utensils className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Budget Food Discovery</CardTitle>
                <CardDescription className="text-base pt-2">
                  Find street food, local dhabas, and hidden gems structured by strict price tiers (Under ₹50, ₹100, ₹200).
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg shadow-black/[0.03] dark:shadow-white/[0.02] bg-gradient-to-br from-card to-secondary/20 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 mb-4">
                  <Home className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Budget Stay Finder</CardTitle>
                <CardDescription className="text-base pt-2">
                  Locate cheap dorm beds, authentic guesthouses, and local lodges with uncompromised safety ratings.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg shadow-black/[0.03] dark:shadow-white/[0.02] bg-gradient-to-br from-card to-secondary/20 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-500 mb-4">
                  <Search className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Market Price Intelligence</CardTitle>
                <CardDescription className="text-base pt-2">
                  Search for any tourist item to see the fair market price. We analyze thousands of reports to protect you from markups.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Travel Intelligence */}
      <section className="w-full py-24 bg-zinc-950 text-zinc-50 dark:bg-zinc-900/50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm font-medium text-zinc-400">
                <span className="text-rose-500 font-bold mr-2">AI powered</span>
                Intelligent routing
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
                Tell us your budget, we'll build your day.
              </h2>
              <p className="text-lg text-zinc-400">
                Our AI trip planner doesn't just list places. It calculates transit times, verifies current prices, and generates a realistic day plan perfectly fitted to your wallet.
              </p>
              
              <Button size="lg" className="h-12 px-8 text-base rounded-full bg-rose-500 hover:bg-rose-600 text-white border-0" asChild>
                <Link href="/ai-planner">Try the AI Planner</Link>
              </Button>
            </div>
            
            <div className="relative">
              {/* Fake AI Output UI */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden backdrop-blur">
                <div className="border-b border-zinc-800 p-4 bg-zinc-900/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-center text-sm text-zinc-400 border-b border-zinc-800 pb-4">
                    <span>Generated Plan: <strong>Jaipur</strong></span>
                    <span>Total Cost: <strong>₹410</strong></span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 bg-zinc-900 p-2 rounded-lg text-zinc-400">
                        <Utensils className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-zinc-200">Breakfast: Poha Stall</h4>
                          <span className="text-rose-400 font-medium">₹40</span>
                        </div>
                        <p className="text-sm text-zinc-500 mt-1">Sodala Circle, authentic local taste.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="mt-1 bg-zinc-900 p-2 rounded-lg text-zinc-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-zinc-200">Visit: Hawa Mahal</h4>
                          <span className="text-rose-400 font-medium">₹50</span>
                        </div>
                        <p className="text-sm text-zinc-500 mt-1">Student entry ticket price.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="mt-1 bg-zinc-900 p-2 rounded-lg text-zinc-400">
                        <Utensils className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-zinc-200">Lunch: Local Thali</h4>
                          <span className="text-rose-400 font-medium">₹120</span>
                        </div>
                        <p className="text-sm text-zinc-500 mt-1">Unlimited vegetarian thali at Sharma Bhojnalaya.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative blurs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-500/20 blur-3xl rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-24 bg-background">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16">How it works</h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative max-w-5xl mx-auto">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-border -z-10 -translate-y-1/2"></div>
            
            <div className="flex flex-col items-center flex-1 bg-background">
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xl mb-6 shadow-sm border border-border">1</div>
              <h3 className="font-semibold text-lg mb-2">Choose your city</h3>
              <p className="text-muted-foreground text-sm">Select from our supported destinations to load the local intelligence datamaps.</p>
            </div>
            
            <div className="flex flex-col items-center flex-1 bg-background">
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xl mb-6 shadow-sm border border-border">2</div>
              <h3 className="font-semibold text-lg mb-2">Explore cheap venues</h3>
              <p className="text-muted-foreground text-sm">Browse manually or use filters to find stays and food that actually fit your strict budget.</p>
            </div>
            
            <div className="flex flex-col items-center flex-1 bg-background">
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xl mb-6 shadow-sm border border-border">3</div>
              <h3 className="font-semibold text-lg mb-2">Plan your day</h3>
              <p className="text-muted-foreground text-sm">Use the AI planner to string together an optimized route that avoids tourist traps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety and Future */}
      <section className="w-full py-20 border-t bg-secondary/30">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Coming Soon to अतिथि</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-background border px-4 py-2 text-sm text-muted-foreground shadow-sm">
              <ShieldAlert className="w-4 h-4" /> SOS Emergency Hub
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-background border px-4 py-2 text-sm text-muted-foreground shadow-sm">
              <Smartphone className="w-4 h-4" /> iOS & Android Mobile App
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-background border px-4 py-2 text-sm text-muted-foreground shadow-sm">
              <Search className="w-4 h-4" /> Offline City Guides
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
