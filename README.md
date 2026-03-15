<div align="center">

# 🪔 अतिथि — Atithi

### *अतिथि देवो भव — The Guest is God*

**A Travel Intelligence Platform for Budget Explorers**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=for-the-badge&logo=openstreetmap&logoColor=white)](https://www.openstreetmap.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<br/>

> **Atithi** is not a review platform. It's a **travel intelligence system** that answers the questions every budget traveller actually asks — *Where can I eat within my budget? Where can I stay cheaply? What is the fair price of items in tourist markets? How much will exploring this city cost?*

<br/>

</div>

---

## 📖 Table of Contents

- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Platform Features](#-platform-features)
- [Tech Stack](#-tech-stack)
- [Architecture & Workflow](#-architecture--workflow)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [The Team](#-the-team)

---

## 🚨 The Problem

Every year, millions of students, solo travellers, and backpackers explore Indian cities with tight budgets. They face the same set of problems:

| ❌ Problem | 😤 Reality |
|---|---|
| Tourist trap pricing | A handicraft scarf sold for ₹1,200 is fairly priced at ₹400 |
| Hidden restaurant costs | A "budget" restaurant charges ₹350 for food worth ₹120 |
| No sleep-cheap options | Hostel aggregators only show hotels, not student-friendly stays |
| No consolidated AI planning | Fragmented info across 10 different apps |
| No real city cost insight | No one tells you that exploring Jaipur for 1 day costs ~₹400 total |

Existing platforms like Zomato, Booking.com, or Google Maps **list** places. They don't **guide** you.

---

## 💡 Our Solution

**Atithi** is a **data-driven travel intelligence platform** — not just another listing app.

Instead of asking *"What restaurants are near me?"*, Atithi answers:

> 🍛 *"Here are 5 meals under ₹100, sorted by distance from you, with real local prices."*

> 🏨 *"Here's a dorm bed for ₹350/night, 2 km from the old city, with a high safety rating."*

> 🛍️ *"The fair price for a Blue Pottery bowl is ₹200–₹300. You were about to pay ₹800."*

> 🤖 *"Based on your ₹800 budget and 1-day trip to Jaipur, here is your complete AI-planned itinerary."*

---

## ✨ Platform Features

### 🗺️ Interactive Map Explorer
- OpenStreetMap powered (zero cost, no Google Maps dependency)
- Live GPS-based "You are here" marker
- Color-coded markers: 🔴 Food · 🔵 Stays · 🟢 Markets
- Click any marker to see price, distance, rating, and tags
- Integrated AI Trip Planner accessible directly from map popups

### 🍛 Budget Food Discovery
- Discover local food stalls and eateries within your price range
- Geolocation-based proximity sorting
- Budget filters, tags (breakfast, street food, thali, student-friendly)
- Real average prices — no inflated restaurant estimates

### 🏨 Budget Stay Finder
- Hostels, guesthouses, dorm beds — not just hotels
- Safety ratings, room type, distance from city centre
- Perfect for backpackers and students

### 🛒 Tourist Market Intelligence
- Know the **fair price** of popular souvenirs before you walk into the market
- Crowdsourced price reports from travellers
- Instant alert if a price seems inflated

### 🤖 AI Trip Planner (Gemini Powered)
- Input: City, Budget (₹), Duration (1/2/3 days)
- Output: Complete hour-by-hour itinerary tailored to your budget
- Suggests real local food and spots from our database
- Rich formatted plan with morning/afternoon/evening breakdown

### 🌆 City Explorer
- Quick cost overview of any Indian city
- Estimated daily spend for budget/mid-range travellers

### 🛡️ Safety & SOS Hub
- Emergency contacts, nearest police, hospitals
- Designed for solo travellers and women travellers

### 💬 Community Contributions
- Let locals and travellers submit new stalls, hostels, and market prices
- Keeps the platform fresh and ground-truth accurate

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js 16 (App Router) | Full-stack React framework |
| **Styling** | TailwindCSS 4 | Utility-first CSS |
| **UI Components** | shadcn/ui + Lucide Icons | Design system |
| **Maps** | Leaflet.js + OpenStreetMap | Free, open-source interactive maps |
| **AI** | Google Gemini 2.5 Flash | AI trip itinerary generation |
| **Backend** | Next.js API Routes (Node.js) | Serverless backend, no separate server |
| **Data** | Static JSON (TypeScript) | Mock dataset for Jaipur |
| **External APIs** | Zomato RapidAPI, Booking.com RapidAPI | Dynamic restaurant & hotel data |
| **Geolocation** | Browser Navigator API | Live user GPS location |
| **Deployment** | Vercel (recommended) | Zero-config Next.js hosting |

---

## 🔄 Architecture & Workflow

```
┌──────────────────────────────────────────────────────┐
│                    USER BROWSER                      │
│                                                      │
│   Next.js Pages (React)                              │
│   ┌────────┐ ┌────────┐ ┌────────┐ ┌─────────────┐ │
│   │  Food  │ │ Stays  │ │ Market │ │ AI Planner  │ │
│   └───┬────┘ └───┬────┘ └───┬────┘ └──────┬──────┘ │
│       │          │          │             │         │
│   useGeolocation() ← GPS Location         │         │
│       │                                  │         │
└───────┼──────────────────────────────────┼─────────┘
        │                                  │
        ▼                                  ▼
┌──────────────────────┐      ┌─────────────────────────┐
│  Next.js API Routes  │      │   Google Gemini API      │
│  (Serverless)        │      │   gemini-2.5-flash       │
│                      │      │                          │
│  /api/getFood        │      │  Prompt: city + budget   │
│  /api/getStays       │      │  + duration + local data │
│  /api/getMarkets     │      │                          │
│  /api/zomato (proxy) │      │  Response: Itinerary ✨  │
│  /api/booking(proxy) │      └─────────────────────────┘
│  /api/ai/plan        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   src/lib/data.ts    │
│   (Mock Database)    │
│                      │
│  30+ Food Places     │
│  20+ Stays           │
│  13 Tourist Spots    │
│  10 Market Items     │
└──────────────────────┘
```

---

## 📁 Project Structure

```
src/
├── app/                        ← Next.js App Router Pages
│   ├── page.tsx                ← Homepage
│   ├── food/page.tsx           ← Budget Food Discovery
│   ├── stays/page.tsx          ← Budget Stay Finder
│   ├── market/page.tsx         ← Market Price Intelligence
│   ├── map/page.tsx            ← Map Explorer
│   ├── ai-planner/page.tsx     ← AI Trip Planner
│   ├── city/page.tsx           ← City Explorer
│   ├── community/page.tsx      ← Community Contributions
│   ├── safety/page.tsx         ← Safety & SOS Hub
│   ├── about/page.tsx          ← About the Platform
│   └── api/                    ← Backend API Routes
│       ├── getFood/route.ts    ← Geolocation-aware food listing
│       ├── getStays/route.ts   ← Geolocation-aware stays listing
│       ├── getMarkets/route.ts ← Market price data
│       ├── zomato/route.ts     ← Zomato RapidAPI proxy
│       ├── booking/route.ts    ← Booking.com RapidAPI proxy
│       └── ai/plan/route.ts    ← Gemini AI trip planner
│
├── components/
│   ├── ui/                     ← Button, Card, Input, etc.
│   ├── layout/navbar.tsx       ← Top navigation
│   ├── layout/footer.tsx       ← Footer
│   └── interactive-leaflet-map.tsx ← Full-featured Leaflet map
│
├── hooks/
│   └── use-geolocation.ts      ← Live GPS hook
│
└── lib/
    ├── data.ts                 ← Mock database (30+ places)
    └── geo.ts                  ← Haversine distance calculator
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- A free [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/aaryan280604-sudo/ATITHI.git
cd ATITHI

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your API keys

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👨‍💻 The Team

> *Built with ❤️ by four friends who wanted smarter travel.*

<table>
  <tr>
    <td align="center"><b>Aaryan Singh</b></td>
    <td align="center"><b>Aditya Raj</b></td>
    <td align="center"><b>Dablu Kumar</b></td>
    <td align="center"><b>Akhil Thakur</b></td>
  </tr>
</table>

---

## 🎯 Target Audience

| 👤 Who | 💭 What They Need |
|---|---|
| 🎓 **Students** | Eat well under ₹100, sleep for ₹350/night |
| 🧳 **Solo Travellers** | Safe stays, real local prices, quick planning |
| 💰 **Budget Travellers** | Know the fair price before you pay |
| 🏕️ **Backpackers** | Authentic experiences, not tourist traps |
| 🏙️ **City Explorers** | Discover a new city without overspending |

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made in India 🇮🇳 · For Travellers by Travellers**

*"The world is a book, and those who do not travel read only one page."*

⭐ If you find this useful, please star the repository!

</div>
