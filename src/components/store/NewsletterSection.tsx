import { NewsletterForm } from "@/components/store/NewsletterForm";
import { FadeUp } from "@/components/ui/Motion";

export function NewsletterSection() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="newsletter-heading">
      <div className="container-store">
        <FadeUp>
          <div className="relative overflow-hidden rounded-2xl bg-obsidian px-6 py-14 text-center sm:px-12 sm:py-20">
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle at 20% 20%, #b89a62 1px, transparent 1px)",
                backgroundSize: "34px 34px",
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                The Inner Circle
              </span>
              <h2 className="mx-auto mt-4 max-w-xl font-serif text-3xl leading-tight font-medium text-ivory sm:text-4xl">
                First look at everything.
                <br />
                Before everyone else.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ivory/75">
                New drops, private sales and early access — delivered to your inbox,
                never spam. Plus 10% off your first order.
              </p>
              <div className="mx-auto mt-7 max-w-md">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}