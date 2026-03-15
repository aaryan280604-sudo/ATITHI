import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Compass } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Compass className="h-6 w-6 text-primary" />
          <span className="font-heading font-bold text-xl tracking-tight">अतिथि</span>
        </Link>
        <nav className="md:flex items-center space-x-6 text-sm font-medium hidden">
          <Link href="/city" className="transition-colors hover:text-foreground/80 text-foreground/60">City Explorer</Link>
          <Link href="/food" className="transition-colors hover:text-foreground/80 text-foreground/60">Budget Food</Link>
          <Link href="/stays" className="transition-colors hover:text-foreground/80 text-foreground/60">Budget Stays</Link>
          <Link href="/market" className="transition-colors hover:text-foreground/80 text-foreground/60">Market Intel</Link>
          <Link href="/map" className="transition-colors hover:text-foreground/80 text-foreground/60">Map</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/community">Contribute</Link>
          </Button>
          <Button asChild>
            <Link href="/ai-planner">Plan Trip with AI</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
