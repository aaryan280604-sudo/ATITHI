import { Button } from "@/components/ui/button";
import { Compass, Leaf, Users, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container px-4 py-16 mx-auto max-w-4xl space-y-24">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold">The अतिथि Vision</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We believe travel should be inclusive, transparent, and driven by real experiences rather than commercialized listings.
        </p>
      </div>

      {/* The Problem */}
      <section className="bg-secondary/30 p-8 md:p-12 rounded-3xl border border-border">
        <h2 className="text-3xl font-heading font-bold mb-6">The Problem with Traditional Platforms</h2>
        <div className="prose dark:prose-invert max-w-none text-muted-foreground text-lg leading-relaxed space-y-4">
          <p>
            When you search for "cheap food" or "budget stays" on major platforms, you are rarely shown the truly economical options. Instead, you're bombarded with sponsored listings, high-commission hotels, and tourist-trap restaurants that have gamed the SEO system.
          </p>
          <p>
            Authentic, $2 street food stalls and $5-a-night family-run dorms simply cannot afford to compete in this rigged digital marketplace.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="h-12 w-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-500 flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold">Community Sourced</h3>
          <p className="text-muted-foreground">
            Our data comes directly from local students, solo backpackers, and community contributors. Real people sharing real prices.
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 flex items-center justify-center">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold">Radical Transparency</h3>
          <p className="text-muted-foreground">
            We combat overcharging by highlighting the exact fair market value for tourist goods. No hidden fees, no markup algorithms.
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center">
            <Compass className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold">AI Native Planning</h3>
          <p className="text-muted-foreground">
            Rather than making you build complex spreadsheets, our AI takes your exact budget and curates a personalized, stress-free itinerary instantly.
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-500 flex items-center justify-center">
            <Leaf className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold">Supporting Locals</h3>
          <p className="text-muted-foreground">
            By shifting traffic away from massive hotel chains back to local vendors and family-run venues, we keep tourism revenue within the local economy.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-zinc-950 text-white rounded-3xl p-12">
        <h2 className="text-3xl font-heading font-bold mb-6">Join the Movement</h2>
        <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
          Help us map out the world's most authentic, affordable travel spots. Every contribution makes travel more accessible for everyone.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white border-none h-12 px-8" asChild>
            <Link href="/community">Contribute Data</Link>
          </Button>
          <Button size="lg" variant="outline" className="text-zinc-900 bg-white hover:bg-zinc-200 border-transparent h-12 px-8" asChild>
            <Link href="/">Explore Platform</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
