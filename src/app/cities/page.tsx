import { getCities } from "@/lib/content";
import { CityIndexTeaser } from "@/components/CityIndexTeaser";

export default async function CitiesIndexPage() {
  const cities = await getCities();
  return (
    <div className="wrap" style={{ paddingTop: 40, paddingBottom: 64 }}>
      <p className="eyebrow" style={{ marginBottom: 8 }}>All Cities</p>
      <h1 style={{ fontSize: 34, marginBottom: 32 }}>The Collection</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        {cities.map((city, i) => (
          <CityIndexTeaser key={city.slug} city={city} index={i} />
        ))}
      </div>
    </div>
  );
}
