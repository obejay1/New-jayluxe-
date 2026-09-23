import { HomepageHero } from "@/components/store/home/HomepageHero";
import { CategoryTiles } from "@/components/store/home/CategoryTiles";
import { ProductRailSection } from "@/components/store/home/ProductRailSection";
import { EditsSection } from "@/components/store/home/EditsSection";
import { EditorialBlock } from "@/components/store/home/EditorialBlock";
import { TrustSection } from "@/components/store/home/TrustSection";
import { ReviewsSection } from "@/components/store/home/ReviewsSection";
import { SocialGallery } from "@/components/store/home/SocialGallery";
import {
  getNewArrivals,
  getBestSellers,
} from "@/lib/data/products";
import { NewsletterSection } from "@/components/store/NewsletterSection";

export default function HomePage() {
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();

  return (
    <>
      <HomepageHero />
      <CategoryTiles />
      <ProductRailSection
        eyebrow="Just in"
        title="New arrivals"
        description="Fresh pieces, arriving weekly and rarely lasting long."
        products={newArrivals}
        viewAllHref="/shop?sort=newest"
      />
      <EditsSection />
      <EditorialBlock />
      <ProductRailSection
        eyebrow="Most wanted"
        title="Best sellers"
        description="The pieces our clients keep coming back for."
        products={bestSellers}
        viewAllHref="/shop?sort=best-selling"
      />
      <TrustSection />
      <ReviewsSection />
      <SocialGallery />
      <NewsletterSection />
    </>
  );
}