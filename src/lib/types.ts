export type PillType = "Dine" | "Drink" | "Discover" | "Activity" | "Stay" | "Practical" | "All";
export type Verdict = "Don't Miss" | "Worth It" | "Worth It If" | "Editors Pick";
export type CostTier = "Low" | "Medium" | "High" | "Luxury";

export interface Fact {
  label: string;
  value: string;
}

export interface Place {
  slug: string;
  citySlug: string;
  city: string;
  name: string;
  category: PillType;
  verdict?: Verdict;
  take: string; // one-line description shown on cards + place page subhead
  practicalPills: string[]; // e.g. ["Open Late"], ["Ticketed"], [] for none
  neighbourhood: string;
  cost: CostTier;
  heroImage?: string;
  gallery?: string[];
  body?: string[]; // paragraphs for the place page
  skipItIf?: string;
  facts?: Fact[]; // Address / Website / Hours / Typical Spend / Nearest / Booking / Payment
}

export interface City {
  slug: string;
  name: string;
  country?: string;
  placeCount: number;
  description: string;
  heroImage?: string;
  updated: string;
  teaserLine: string; // short line for the home/city-index teaser card
}

export interface JournalPost {
  slug: string;
  title: string;
  citySlug: string;
  city: string;
  date: string;
  readMins: number;
  heroImage?: string;
}

export interface RouteStop {
  time: string;
  name: string;
  note: string;
}

export interface Route {
  slug: string;
  citySlug: string;
  city: string;
  title: string;
  note: string;
  stops: number;
  minutes: number;
}
