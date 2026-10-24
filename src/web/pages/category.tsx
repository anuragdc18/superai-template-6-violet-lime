import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import { PageHero } from "../components/page-hero";
import { CATEGORIES, serviceUrl, slugify } from "../lib/site";
import { LeadForm } from "../components/lead-form";
import { CtaBand } from "./index";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const cat = CATEGORIES.find((c) => c.slug === slug);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
        el.classList.add("ring-2", "ring-brand");
        setTimeout(() => el.classList.remove("ring-2", "ring-brand"), 2200);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [slug]);

  if (!cat) {
    return (
      <div className="container-x py-32 text-center">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <Link to="/" className="btn-brand mt-6">Go Home</Link>
      </div>
    );
  }

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: cat.title }]}
        label={`${cat.services.length} ${cat.slug === "microsoft-certifications" ? "exams" : "services"}`}
        title={cat.title}
        text={cat.intro}
        image={cat.image}
      >
        <a href="#enquire" className="btn-brand">
          Get Free Consultation <ArrowRight className="h-4 w-4" />
        </a>
      </PageHero>

      <div className="sticky top-[72px] z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="container-x flex gap-2 overflow-x-auto py-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/services/${c.slug}`}
              className={`whitespace-nowrap rounded-md px-4 py-2 text-[13.5px] font-bold transition ${
                c.slug === cat.slug ? "bg-brand text-white" : "bg-lav text-ink hover:bg-lav-2/60"
              }`}
            >
              {c.title}
            </Link>
          ))}
        </div>
      </div>

      <section className="bg-surface py-14">
        <div className="container-x grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-extrabold sm:text-3xl"><span className="plus-mark text-[30px]">+</span>{cat.slug === "microsoft-certifications" ? "All Microsoft Certifications" : `All ${cat.title} Services`}</h2>
            <p className="mt-2">{cat.slug === "microsoft-certifications" ? 'Tap "Learn More" to see who it is for and what you get.' : 'Tap "Learn More" to see details, documents and time taken.'}</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {cat.services.map((s) => (
                <div
                  key={s.name}
                  id={slugify(s.name)}
                  className="scroll-mt-40 group flex flex-col rounded-md border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_18px_36px_-26px_rgba(109,74,255,0.6)]"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-lime ring-4 ring-lime/25" />
                    <div>
                      <h3 className="text-[16px] font-bold leading-snug">{s.name}</h3>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed">{s.text}</p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4 pl-[22px]">
                    <Link
                      to={serviceUrl(cat.slug, s.name)}
                      className="inline-flex items-center gap-1 text-[13.5px] font-bold text-brand underline decoration-brand/30 underline-offset-4 hover:gap-2"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                    {s.days ? (
                      <span className="flex items-center gap-1.5 rounded-md bg-lav px-2 py-1 text-[12.5px] font-semibold text-ink"><Clock className="h-3.5 w-3.5 text-brand" /> {s.days}</span>
                    ) : <span />}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside id="enquire" className="relative scroll-mt-40 overflow-hidden rounded-md border-2 border-brand bg-white p-6 shadow-[0_30px_60px_-34px_rgba(109,74,255,0.6)] lg:sticky lg:top-40">
            <span aria-hidden className="absolute -right-5 -top-5 h-14 w-14 rotate-12 bg-lime" />
            <h3 className="relative text-xl font-extrabold">Get a Free Call</h3>
            <p className="mt-1 text-[14px]">Our expert will call you and explain everything.</p>
            <div className="mt-5">
              <LeadForm layout="stack" source={`category:${cat.slug}`} defaultService={cat.services[0].name} />
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
