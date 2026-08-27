import { getPlaces } from "@/lib/content";
import { FavouritesView } from "@/components/FavouritesView";

export default async function FavouritesPage() {
  const places = await getPlaces();
  return (
    <div className="wrap" style={{ paddingTop: 40, paddingBottom: 64 }}>
      <p className="eyebrow" style={{ marginBottom: 8 }}>Everything in one place</p>
      <h1 style={{ fontSize: 34, marginBottom: 24 }}>Favourites</h1>
      <FavouritesView allPlaces={places} />
    </div>
  );
}
