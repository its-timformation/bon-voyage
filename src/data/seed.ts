import { City, Place, JournalPost, Route } from "@/lib/types";

// This is the static fallback content layer — see src/lib/content.ts. It is what
// the site builds from when no Notion integration is configured, and it is also
// what a fresh clone of this repo runs on out of the box with zero setup.

export const cities: City[] = [
  {
    slug: "belfast",
    name: "Belfast",
    placeCount: 41,
    updated: "Aug 2026",
    teaserLine: "Everything is twenty minutes away. Including the hills.",
    heroImage: "/images/belfast_warm_hero.jpg",
    description:
      "Northern Ireland's capital, and compact — about 340,000 people, with most of the centre crossable on foot in twenty minutes. It divides into quarters: Cathedral for bars and live music, Queen's for the university, the Botanic Gardens and the Ulster Museum, Titanic for the shipyard, the museum and the two yellow cranes visible from most of the city. Cave Hill rises to the north, about forty minutes up for the view back over the lough. The city airport is ten minutes from the centre, and the Causeway Coast is a comfortable day trip.",
  },
  {
    slug: "nashville",
    name: "Nashville",
    placeCount: 37,
    updated: "Aug 2026",
    teaserLine: "Turn left off Broadway and it gets good.",
    heroImage: "/images/nashville_hero.jpg",
    description:
      "Tennessee's capital, about 690,000 people, laid out wide enough that a car or a rideshare makes sense for most of it. Downtown means Broadway — live music from late morning, no cover, every door open. The Ryman Auditorium is a block away, the Grand Ole Opry sits out at Opryland, and the Station Inn and the Bluebird are the small listening rooms where writers try new material. Food is meat-and-threes and hot chicken. East Nashville, Germantown and 12South hold most of the thirty-seven places.",
  },
  {
    slug: "toronto",
    name: "Toronto",
    placeCount: 41,
    updated: "Aug 2026",
    teaserLine: "Six cities in a trench coat.",
    description:
      "Canada's largest city, around three million in the city proper and six across the region, and one of the most immigrant-shaped places anywhere — close to half the population was born outside the country, hence the food is the main event. It runs on a grid, and the streetcars along King, Queen, Dundas and College are the practical way across it. Kensington Market, Chinatown and Dundas West sit west of downtown, Leslieville and Riverside east. Summer brings patios and the island ferries; winter moves indoors through the PATH, thirty kilometres of walkway under the core.",
  },
  {
    slug: "london",
    name: "London",
    placeCount: 68,
    updated: "Aug 2026",
    teaserLine: 'Too big to "do". These are the hits worth the tube fare.',
    description:
      "Nine million people across thirty-two boroughs. The tube is zoned and priced by zone, contactless caps automatically each day, and adjacent neighbourhoods are often quicker on foot than underground. The national museums are free — the British Museum, the V&A, the Natural History, both Tates — and the parks are built for breaking up a day: Hyde, Regent's, Hampstead Heath, Richmond with its deer. Sixty-eight places, concentrated in the centre and the east: Soho, Shoreditch, Hackney, Peckham.",
  },
];

export const places: Place[] = [
  // ── Belfast ──────────────────────────────────────────────────────────────
  {
    slug: "nordr",
    citySlug: "belfast",
    city: "Belfast",
    name: "Nordr",
    category: "Dine",
    verdict: "Don't Miss",
    take: "Seven courses from that morning's catch. No menu until you sit down.",
    practicalPills: ["Open Late"],
    neighbourhood: "Cathedral Quarter",
    cost: "Luxury",
    body: [
      "The room seats eighteen and the menu is read aloud, which sounds like an affectation until you understand it changes daily and printing it would make it a lie. What arrives depends on what the boats brought in that morning — turbot one week, hake and langoustine the next.",
      "Book three weeks out for a Friday, or take a Tuesday at six and have the room half to yourself. The wine list is short, mostly Loire and Mosel, and the pairing is worth taking; the by-the-glass markup is the gentlest in the city.",
    ],
    skipItIf:
      "Skip it if you want to linger — the two-sitting model means the table is needed back. Skip it too if anyone in the party is a fussy eater: there is no menu to negotiate with, and the kitchen will not build you an alternative.",
    facts: [
      { label: "Address", value: "14 Hill St, Belfast BT1 2LB" },
      { label: "Hours", value: "Tue–Sat, sittings at 18:00 and 20:30" },
      { label: "Typical Spend", value: "£95pp with the pairing, £60 without" },
      { label: "Nearest", value: "6 min walk from Writers' Square" },
      { label: "Booking", value: "Required — online, 3 weeks ahead" },
    ],
  },

  // ── Nashville ────────────────────────────────────────────────────────────
  {
    slug: "station-inn",
    citySlug: "nashville",
    city: "Nashville",
    name: "Station Inn",
    category: "Activity",
    verdict: "Worth It",
    take: "A squat stone building the high-rises grew around. Bluegrass nightly, no cover.",
    practicalPills: ["No Cover"],
    neighbourhood: "The Gulch",
    cost: "Low",
    heroImage: "/images/station-inn.jpg",
  },
  {
    slug: "butchertown-hall",
    citySlug: "nashville",
    city: "Nashville",
    name: "Butchertown Hall",
    category: "Dine",
    verdict: "Editors Pick",
    take: "Fourteen-hour brisket, a queso that's basically a local celebrity, and a dining room with a live tree growing through the middle of it.",
    practicalPills: ["Book Ahead"],
    neighbourhood: "Germantown",
    cost: "Medium",
    heroImage: "/images/butchertown-hall.jpg",
    gallery: ["/images/butchertown-hall.jpg"],
    body: [
      "The brisket is the reason people plan around this place: fourteen hours over white oak, sliced to order, served with tortillas and pickles rather than a plate you're meant to eat with a fork. It sits on a menu that starts as Texas Hill Country barbecue and keeps drifting toward Mexico — mole-roasted tacos, hearth-roasted oysters with chimichurri, four house sausages — under forty-foot ceilings, white subway tile, and black steel that make the room feel more like a reclaimed rail depot than a smokehouse.",
      "Go for dinner if you want the full smoker menu, especially the brisket plate and the 22-ounce rib eye. Go for brunch if you'd rather dodge the evening wait — the queso turns up there too, next to the breakfast tacos. Either way, book ahead: Germantown draws a crowd on a Friday, and the patio fills before the dining room does.",
    ],
    skipItIf:
      "Skip it if you want something quiet. This can be a big, loud room at times especially if there are groups, there isn't much on the menu if you're not eating meat.",
    facts: [
      { label: "Address", value: "1416 4th Ave N, Nashville, TN 37208" },
      { label: "Website", value: "butchertownhall.com" },
      { label: "Hours", value: "Dinner: Sun–Thu 4–9pm · Fri–Sat 4–10pm" },
      { label: "Brunch", value: "Fri 11am–3pm · Sat–Sun 10am–3pm" },
      { label: "Typical Spend", value: "$30–45pp with a drink" },
      { label: "Nearest", value: "10 min walk from Sounds Stadium" },
      { label: "Booking", value: "Recommended, especially weekend brunch — walk-ins seated as available" },
      { label: "Payment", value: "Card and cash, service not included" },
    ],
  },
  {
    slug: "ole-smoky-distillery",
    citySlug: "nashville",
    city: "Nashville",
    name: "Ole Smoky Distillery",
    category: "Drink",
    take: "Tennessee's first licensed moonshine. Beer garden, cornhole and a live stage.",
    practicalPills: ["Open Late"],
    neighbourhood: "Downtown",
    cost: "Low",
    heroImage: "/images/ole-smoky-distillery.jpg",
  },
  {
    slug: "edleys-bar-b-que",
    citySlug: "nashville",
    city: "Nashville",
    name: "Edley's Bar-B-Que",
    category: "Dine",
    take: "Order at the counter. The Tuck Special is brisket, sunny egg, pimento cheese.",
    practicalPills: ["Counter Service"],
    neighbourhood: "12 South",
    cost: "Low",
    heroImage: "/images/edleys-bar-b-que.jpg",
  },
  {
    slug: "the-parthenon",
    citySlug: "nashville",
    city: "Nashville",
    name: "The Parthenon",
    category: "Discover",
    take: "A full-scale replica, with a 42-foot gilded Athena standing inside it.",
    practicalPills: ["Ticketed"],
    neighbourhood: "Centennial Park",
    cost: "Low",
    heroImage: "/images/the-parthenon.jpg",
  },
  {
    slug: "reds-hot-chicken",
    citySlug: "nashville",
    city: "Nashville",
    name: "Red's Hot Chicken",
    category: "Dine",
    take: "A walk-up window and four heat levels. The crunchwrap is the one to order.",
    practicalPills: ["Walk-Up Window"],
    neighbourhood: "Midtown",
    cost: "Low",
    heroImage: "/images/reds-hot-chicken.jpg",
  },
  {
    slug: "the-listening-room-cafe",
    citySlug: "nashville",
    city: "Nashville",
    name: "The Listening Room Cafe",
    category: "Activity",
    take: "The writers play their own hits, and talking is kept to a whisper.",
    practicalPills: ["Ticketed"],
    neighbourhood: "SoBro",
    cost: "Low",
    heroImage: "/images/the-listening-room-cafe.jpg",
  },
  {
    slug: "roberts-western-world",
    citySlug: "nashville",
    city: "Nashville",
    name: "Robert's Western World",
    category: "Drink",
    take: "A steel guitar shop turned honky-tonk. Six dollars buys the whole meal.",
    practicalPills: ["No Cover"],
    neighbourhood: "Broadway",
    cost: "Low",
    heroImage: "/images/roberts-western-world.jpg",
  },
  {
    slug: "urban-cowboy",
    citySlug: "nashville",
    city: "Nashville",
    name: "Urban Cowboy",
    category: "Drink",
    take: "Stirred drinks in a converted carriage house. Fire pits and lanterns out back.",
    practicalPills: [],
    neighbourhood: "East Nashville",
    cost: "Medium",
    heroImage: "/images/urban-cowboy.jpg",
  },
];

export const journalPosts: JournalPost[] = [
  {
    slug: "four-openings-worth-the-walk",
    title: "Four openings worth the walk across town",
    citySlug: "belfast",
    city: "Belfast",
    date: "June 2026",
    readMins: 4,
    heroImage: "/images/belfast_jrnl.jpg",
  },
  {
    slug: "bridges-nobody-photographs",
    title: "The bridges nobody photographs",
    citySlug: "london",
    city: "London",
    date: "June 2026",
    readMins: 4,
    heroImage: "/images/london_jrnl.jpg",
  },
  {
    slug: "six-cities-trench-coat",
    title: "Six cities in a trench coat, one afternoon each",
    citySlug: "toronto",
    city: "Toronto",
    date: "June 2026",
    readMins: 4,
    heroImage: "/images/toronto_jrnl.jpg",
  },
];

export const routes: Route[] = [
  {
    slug: "old-quarter-walk",
    citySlug: "nashville",
    city: "Belfast",
    title: "The Old Quarter Walk",
    note: "Everything is twenty minutes away. Including the hills.",
    stops: 5,
    minutes: 90,
  },
  {
    slug: "second-nashville-route",
    citySlug: "nashville",
    city: "Belfast",
    title: "The Old Quarter Walk",
    note: "Everything is twenty minutes away. Including the hills.",
    stops: 5,
    minutes: 90,
  },
];

export const categoryPills = ["All", "Dine", "Drink", "Discover", "Activity", "Stay"] as const;
