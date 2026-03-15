import Link from "next/link"
import { Compass } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-8 md:py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Compass className="h-5 w-5 text-primary" />
            <span className="font-heading font-bold text-lg">अतिथि</span>
          </Link>
          <p className="text-center md:text-left text-sm text-muted-foreground max-w-xs">
            Travel smarter. Spend less. Discover the real cost of exploring new cities.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-16">
          <div className="flex flex-col space-y-3">
            <h4 className="font-medium">Discover</h4>
            <Link href="/food" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Budget Food</Link>
            <Link href="/stays" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Budget Stays</Link>
            <Link href="/market" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Market Intel</Link>
          </div>
          <div className="flex flex-col space-y-3">
            <h4 className="font-medium">Platform</h4>
            <Link href="/ai-planner" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Trip Planner</Link>
            <Link href="/map" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Map Explorer</Link>
            <Link href="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Community</Link>
          </div>
          <div className="flex flex-col space-y-3">
            <h4 className="font-medium">Company</h4>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
            <Link href="/safety" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Safety / SOS</Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t flex items-center justify-between">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} अतिथि Intelligence Platform. All rights reserved.</p>
        <div className="flex space-x-4">
          {/* Social icons can go here */}
        </div>
      </div>
    </footer>
  )
}
