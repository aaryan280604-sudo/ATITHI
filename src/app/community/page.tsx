import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UploadCloud, MessageSquareHeart } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="container px-4 py-16 mx-auto max-w-2xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-orange-100 dark:bg-orange-900/30 text-orange-500 rounded-full mb-6">
          <MessageSquareHeart className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-heading font-bold mb-4">Add to our Database</h1>
        <p className="text-lg text-muted-foreground">
          Help fellow travellers by contributing hidden cheap food spots, authentic lodgings, and fair market prices.
        </p>
      </div>

      <Card className="border shadow-lg bg-card">
        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">What are you sharing?</label>
              <div className="flex gap-2">
                <Button variant="default" className="flex-1 bg-primary text-primary-foreground">Food Place</Button>
                <Button variant="outline" className="flex-1">Hostel/Stay</Button>
                <Button variant="outline" className="flex-1">Market Price</Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Name of the Place</label>
              <Input placeholder="e.g., Sharma's Tea Stall" className="bg-background" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location/Address</label>
              <Input placeholder="Search maps or enter address" className="bg-background" />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Price (₹)</label>
                <Input type="number" placeholder="40" className="bg-background" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Is this per person?</label>
                <select className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option>Yes, Per Person</option>
                  <option>Per Room / Night</option>
                  <option>Per Item</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Upload a Photo</label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-secondary/50 transition-colors">
                <UploadCloud className="h-8 w-8 text-muted-foreground mb-3" />
                <p className="font-medium text-sm">Click to upload image</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between">
            <p className="text-xs text-muted-foreground max-w-xs">
              All submissions are manually verified by our team before publishing to prevent spam.
            </p>
            <Button size="lg" className="px-8 font-semibold">Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
