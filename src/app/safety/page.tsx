import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Phone, MapPin, Map as MapIcon, Siren } from "lucide-react";

export default function SafetyPage() {
  return (
    <div className="container px-4 py-16 mx-auto max-w-4xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full mb-6">
          <ShieldAlert className="h-10 w-10 animate-pulse" />
        </div>
        <h1 className="text-4xl font-heading font-bold mb-4">Traveler Safety & SOS</h1>
        <p className="text-lg text-muted-foreground">
          Your safety is our priority. Access emergency services and trusted contacts instantly.
        </p>
      </div>

      {/* Main SOS Action */}
      <div className="flex justify-center mb-16">
        <button className="relative group w-48 h-48 rounded-full bg-red-500 hover:bg-red-600 flex flex-col items-center justify-center text-white shadow-[0_0_40px_rgba(239,68,68,0.4)] transition-all active:scale-95">
          <div className="absolute inset-0 rounded-full border-4 border-red-400 group-hover:animate-ping opacity-20"></div>
          <Siren className="h-12 w-12 mb-2" />
          <span className="font-bold text-2xl tracking-widest">SOS</span>
          <span className="text-xs font-medium opacity-80 mt-1 uppercase tracking-widest">Hold to activate</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-border">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Phone className="mr-2 text-primary" /> Emergency Numbers (India)
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                <div>
                  <div className="font-semibold text-lg text-red-500">112</div>
                  <div className="text-sm text-muted-foreground">National Emergency</div>
                </div>
                <Button variant="outline" size="sm">Call</Button>
              </div>

              <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                <div>
                  <div className="font-semibold text-lg text-blue-500">100</div>
                  <div className="text-sm text-muted-foreground">Police</div>
                </div>
                <Button variant="outline" size="sm">Call</Button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                <div>
                  <div className="font-semibold text-lg text-green-500">108</div>
                  <div className="text-sm text-muted-foreground">Ambulance / Medical</div>
                </div>
                <Button variant="outline" size="sm">Call</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <MapPin className="mr-2 text-primary" /> Nearest Safe Zones
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mt-1">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Tourist Police Station</h4>
                  <p className="text-sm text-muted-foreground mb-2">0.8 km away • Open 24/7</p>
                  <Button variant="secondary" size="sm" className="w-full">
                    <MapIcon className="w-4 h-4 mr-2" /> Get Directions
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Share Live Location</h4>
                  <p className="text-sm text-muted-foreground mb-2">Send your current GPS coordinates to trusted contacts.</p>
                  <Button variant="secondary" size="sm" className="w-full text-emerald-600 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400">
                    <ShieldAlert className="w-4 h-4 mr-2" /> Share Details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
