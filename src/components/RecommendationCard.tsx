import Link from "next/link";
import { Place } from "@/lib/types";
import { CategoryPill, PracticalPill, VerdictPill, CostBadge } from "./Badges";
import { FavouriteButton } from "./FavouriteButton";
import styles from "./RecommendationCard.module.css";

const CATEGORY_TINT: Record<string, string> = {
  Dine: "var(--bv-category-dine-solid)",
  Drink: "var(--bv-category-drink-solid)",
  Discover: "var(--bv-category-discover-solid)",
  Activity: "var(--bv-category-activities-solid)",
  Stay: "var(--bv-category-stays-solid)",
};

// Ported from Figma's Recommendation Card (1281:12239) + Favourite (1275:9418).
export function RecommendationCard({ place }: { place: Place }) {
  return (
    <Link href={`/place/${place.slug}`} className={styles.card}>
      <div className={styles.photo}>
        {place.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={place.heroImage} alt="" />
        ) : (
          <div
            className={styles.photoPlaceholder}
            style={{ ["--photo-tint" as string]: CATEGORY_TINT[place.category] }}
          >
            {place.city}
          </div>
        )}
        <div className={styles.tags}>
          <div className={styles.tagsLeft}>
            <CategoryPill type={place.category} />
            {place.verdict && <VerdictPill choice={place.verdict} />}
          </div>
          <FavouriteButton slug={place.slug} name={place.name} />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.headerGroup}>
          <p className={styles.title}>{place.name}</p>
          <p className={styles.desc}>{place.take}</p>
        </div>
        {place.practicalPills.length > 0 && (
          <div className={styles.actionRow}>
            {place.practicalPills.map((label) => (
              <PracticalPill key={label} label={label} />
            ))}
          </div>
        )}
        <div className={styles.footer}>
          <span className={styles.location}>{place.neighbourhood}</span>
          <CostBadge tier={place.cost} />
        </div>
      </div>
    </Link>
  );
}
