import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Globe2,
  Instagram,
  Landmark,
  MessageCircle,
  Minus,
  PenTool,
  Plus,
  Star,
  Store,
  X,
} from "lucide-react";
import { CATEGORIES, POPULAR, SLIDES, serviceUrl, waLink, type Category } from "../lib/site";
import { asset } from "../lib/demo";
import { serviceInfo } from "../lib/bot/knowledge";
import { useSite } from "../queries/site";
import { LeadForm } from "../components/lead-form";
import { WaIcon } from "../components/header";

/* ───────────────────────── shared bits ───────────────────────── */

function PlusMark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`plus-mark ${className}`}>
      +
    </span>
  );
}

function Heading({ title, text, center = false }: { title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto mb-10 max-w-2xl text-center" : "mb-10 max-w-2xl"}>
      <h2 className={`flex items-center gap-3 text-[28px] font-extrabold leading-tight sm:text-[36px] ${center ? "justify-center" : ""}`}>
        <PlusMark className="text-[30px] sm:text-[34px]" />
        {title}
      </h2>
      {text && <p className={`mt-3 text-[16px] ${center ? "" : "pl-[30px] sm:pl-[33px]"}`}>{text}</p>}
    </div>
  );
}

const MS = CATEGORIES.find((c) => c.slug === "microsoft-certifications")!;
const OTHER_CATS = CATEGORIES.filter((c) => c.slug !== "microsoft-certifications");
const countLabel = (c: Category) => `${c.services.length} ${c.slug === "microsoft-certifications" ? "Exams" : "Services"}`;

/* ───────────────────────── 1. hero + form ───────────────────────── */

function Hero() {
  const slide = SLIDES.find((s) => s.link.includes("microsoft")) ?? SLIDES[0];
  return (
    <section className="relative overflow-hidden bg-white">
      {/* geometric colour blocks */}
      <div aria-hidden className="absolute left-0 top-0 hidden h-[46%] w-[6.5%] bg-lav-2 lg:block" />
      <div aria-hidden className="absolute right-0 top-0 hidden h-[74%] w-[17%] bg-lime lg:block">
        <PlusMark className="absolute left-[38%] top-[34%] text-[44px]" />
      </div>
      <div aria-hidden className="absolute -right-10 top-0 h-40 w-28 bg-lime lg:hidden" />

      <div className="container-x relative grid gap-10 pb-10 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-6 lg:pb-12 lg:pt-12">
        <div className="relative">
          <p className="label-caps rise">{MS.title}</p>
          <h1 className="rise mt-4 text-[44px] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-[60px] lg:text-[66px]" style={{ animationDelay: "60ms" }}>
            Get Microsoft
            <br />
            <span className="bg-gradient-to-r from-brand to-[#a98bff] bg-clip-text text-transparent">Certified</span>
          </h1>
          <p className="rise mt-6 max-w-[460px] text-[17px] leading-relaxed" style={{ animationDelay: "120ms" }}>
            {slide.text}
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "180ms" }}>
            <Link to={`/services/${MS.slug}`} className="btn-brand">
              Browse All Exams
            </Link>
            <Link to="/contact" className="btn-outline">
              Talk to an expert
            </Link>
          </div>
          <div className="rise mt-8 flex flex-wrap items-center gap-x-1 gap-y-2 text-[13.5px]" style={{ animationDelay: "240ms" }}>
            <span className="mr-2 font-semibold text-ink">Also:</span>
            {OTHER_CATS.map((c, i) => (
              <span key={c.slug} className="flex items-center">
                <Link to={`/services/${c.slug}`} className="font-medium text-body underline-offset-4 hover:text-brand hover:underline">
                  {c.menu}
                </Link>
                {i < OTHER_CATS.length - 1 && <span className="mx-2 h-1 w-1 rounded-full bg-lav-2" />}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px] lg:mr-[6%]">
          <div aria-hidden className="absolute -bottom-4 -left-4 h-24 w-24 bg-lav-2 sm:-bottom-5 sm:-left-5" />
          <img
            src={asset("/images/hero.jpg")}
            alt=""
            className="relative aspect-[4/3] w-full rounded-md object-cover shadow-[0_30px_60px_-30px_rgba(15,23,42,0.45)]"
          />
          <div className="absolute -bottom-6 right-4 flex items-center gap-3 rounded-md border border-line bg-white px-4 py-3 shadow-[0_18px_40px_-20px_rgba(15,23,42,0.4)] sm:right-8">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-lime text-ink">
              <BadgeCheck className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-[15px] font-extrabold text-ink">{MS.services.length} Fundamentals exams</span>
              <span className="text-[12.5px]">Training · Practice tests · Booking</span>
            </span>
          </div>
        </div>
      </div>

      <div id="enquiry" className="container-x relative scroll-mt-28 pb-10">
        <div className="rounded-md border border-line bg-white p-5 shadow-[0_20px_50px_-36px_rgba(15,23,42,0.5)] sm:p-6">
          <LeadForm cta="Get Free Call" />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 2. stats band ───────────────────────── */

const STATS = [
  { big: "4.8", small: "Google Rating" },
  { big: "1,000+", small: "Happy Clients" },
  { big: "Pan-India", small: "Service Coverage" },
  { big: "100%", small: "Online Process" },
];

function Stats() {
  return (
    <section className="bg-lav">
      <div className="container-x grid grid-cols-2 py-8 md:grid-cols-4 md:py-10">
        {STATS.map((s, i) => (
          <div
            key={s.small}
            className={`px-3 py-3 text-center ${i % 2 === 1 ? "border-l border-lav-2/60" : ""} ${i > 0 ? "md:border-l md:border-lav-2/60" : ""} ${i > 1 ? "max-md:border-t max-md:border-lav-2/60" : ""}`}
          >
            <p className="text-[30px] font-extrabold leading-none tracking-tight text-ink sm:text-[36px]">{s.big}</p>
            <p className="mt-2.5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-ink/70">{s.small}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── 3. services accordion ───────────────────────── */

function ServicesExplorer() {
  const [open, setOpen] = useState<string>(CATEGORIES[0].slug);
  const [preview, setPreview] = useState<string>(CATEGORIES[0].slug);
  const active = CATEGORIES.find((c) => c.slug === preview) ?? CATEGORIES[0];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <Heading title="What Do You Need Help With?" text="Pick a category to see every service inside." />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-14">
          <div className="border-t border-line">
            {CATEGORIES.map((c, i) => {
              const isOpen = open === c.slug;
              return (
                <div
                  key={c.slug}
                  onMouseEnter={() => setPreview(c.slug)}
                  className={`border-b border-line transition-colors ${isOpen ? "bg-lav/60" : "hover:bg-surface"}`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(isOpen ? "" : c.slug);
                      setPreview(c.slug);
                    }}
                    aria-expanded={isOpen}
                    className="relative flex w-full items-center gap-4 py-5 pl-4 pr-3 text-left sm:gap-6 sm:pl-6"
                  >
                    <span className={`absolute inset-y-0 left-0 w-1 transition ${isOpen ? "bg-brand" : "bg-transparent"}`} />
                    <span className="w-7 shrink-0 text-[13px] font-bold tabular-nums text-brand">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[19px] font-extrabold leading-tight text-ink sm:text-[22px]">{c.title}</span>
                      <span className="mt-1 block text-[13px] font-medium text-body">{countLabel(c)}</span>
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-md border transition ${
                        isOpen ? "border-brand bg-brand text-white" : "border-line bg-white text-brand"
                      }`}
                    >
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>

                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className="pb-6 pl-4 pr-3 sm:pl-[76px] sm:pr-6">
                        <img src={c.image} alt="" loading="lazy" className="mb-4 aspect-[2/1] w-full rounded-md object-cover lg:hidden" />
                        <p className="text-[15px]">{c.short}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {c.services.map((s) => (
                            <Link
                              key={s.name}
                              to={serviceUrl(c.slug, s.name)}
                              className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-1.5 text-[13px] font-semibold text-ink transition hover:border-brand hover:text-brand"
                            >
                              <span className="h-2 w-2 shrink-0 rounded-full bg-lime ring-2 ring-lime/30" />
                              {s.name}
                            </Link>
                          ))}
                        </div>
                        <Link to={`/services/${c.slug}`} className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-brand hover:gap-2.5">
                          View all {c.menu.toLowerCase()} {c.slug === "microsoft-certifications" ? "exams" : "services"} <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* sticky preview (desktop) */}
          <div className="sticky top-28 hidden lg:block">
            <div className="relative">
              <div aria-hidden className="absolute -right-4 -top-4 h-[70%] w-[42%] bg-lime" />
              <div className="relative overflow-hidden rounded-md border border-line bg-white shadow-[0_30px_60px_-36px_rgba(15,23,42,0.5)]">
                <img key={active.slug} src={active.image} alt="" className="rise aspect-[2/1] w-full object-cover" />
                <div className="p-6">
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">{countLabel(active)}</p>
                  <h3 className="mt-2 text-[24px] font-extrabold">{active.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed">{active.intro}</p>
                  <Link to={`/services/${active.slug}`} className="btn-brand mt-5 !px-5 !py-2.5 !text-[14px]">
                    Explore {active.menu} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <PlusMark className="absolute -bottom-8 -left-2 text-[34px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 4. Microsoft comparison table ───────────────────────── */

function CertTable() {
  const rows = MS.services.map((s) => {
    const [code, ...rest] = s.name.split(":");
    return {
      name: s.name,
      code: code.trim(),
      title: rest.join(":").trim(),
      covers: s.text,
      time: (serviceInfo(s.name).days ?? "").replace(/\s*training$/, ""),
    };
  });
  return (
    <section className="bg-white pb-16 sm:pb-24">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-md bg-navy">
          <img src={asset("/images/ms-banner.jpg")} alt="" className="absolute inset-y-0 right-0 -z-10 h-full w-full object-cover md:w-[58%]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0f1827_0%,#0f1827_45%,rgba(15,24,39,0.55)_70%,rgba(15,24,39,0.1)_100%)] max-md:bg-[linear-gradient(90deg,#0f1827_20%,rgba(15,24,39,0.75)_100%)]" />
          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <h2 className="text-[28px] font-extrabold !text-white sm:text-[34px]">{MS.title}</h2>
            <p className="mt-3 max-w-md text-[16px] leading-relaxed text-white/85">{MS.intro}</p>
            <Link to={`/services/${MS.slug}`} className="btn-lime mt-6 !px-5 !py-2.5 !text-[14px]">
              Browse All Exams
            </Link>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-md border border-line">
          <div className="hidden grid-cols-[100px_1.1fr_1.8fr_110px_100px] gap-4 bg-lav px-6 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-ink/70 md:grid">
            <span>Code</span>
            <span>Exam</span>
            <span>What it covers</span>
            <span>Training</span>
            <span className="text-right">Action</span>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.code}
              className={`grid gap-2 px-5 py-4 transition hover:bg-surface md:grid-cols-[100px_1.1fr_1.8fr_110px_100px] md:items-center md:gap-4 md:px-6 ${i ? "border-t border-line" : ""}`}
            >
              <span>
                <span className="inline-block rounded-md bg-brand/10 px-2.5 py-1 text-[13px] font-extrabold text-brand">{r.code}</span>
              </span>
              <Link to={serviceUrl(MS.slug, r.name)} className="text-[15.5px] font-bold text-ink hover:text-brand">
                {r.title}
              </Link>
              <span className="text-[13.5px] leading-relaxed">
                {r.covers}
              </span>
              <span className="text-[14px] font-medium text-ink">
                <span className="mr-1 font-semibold md:hidden">Training:</span>
                {r.time}
              </span>
              <span className="md:text-right">
                <Link
                  to={serviceUrl(MS.slug, r.name)}
                  className="inline-flex items-center gap-1 rounded-md border-[1.5px] border-brand px-3.5 py-1.5 text-[13px] font-bold text-brand transition hover:bg-brand hover:text-white"
                >
                  Enquire
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 5. popular services ───────────────────────── */

const POP_ICONS = [FileText, Landmark, BadgeCheck, Store, PenTool, Globe2, Instagram, MessageCircle];
const MOST_CHOSEN = new Set(["GST Registration", "Business Website"]);

function Popular() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="container-x">
        <Heading center title="Most Popular Services" text="These are what most of our customers start with." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR.map((p, idx) => {
            const Icon = POP_ICONS[idx];
            const chosen = MOST_CHOSEN.has(p.name);
            return (
              <Link
                key={p.name}
                to={serviceUrl(p.cat, p.name)}
                className={`group relative flex gap-4 rounded-md border bg-white p-5 pt-6 transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-26px_rgba(109,74,255,0.6)] ${
                  chosen ? "border-brand/50" : "border-line hover:border-brand/40"
                }`}
              >
                {chosen && (
                  <span className="absolute -top-px right-4 rounded-b-md bg-lime px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-ink">
                    Most chosen
                  </span>
                )}
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-lav text-brand transition group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-[22px] w-[22px]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15.5px] font-bold leading-snug text-ink">{p.name}</span>
                  <span className="mt-1 block text-[13.5px]">{p.days}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-[13.5px] font-bold text-brand underline decoration-brand/30 underline-offset-4 group-hover:gap-2">
                    Know More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 6. vertical process timeline ───────────────────────── */

const STEPS = [
  { title: "Tell Us What You Need", text: "Fill the form or call us. It takes 1 minute." },
  { title: "Share Your Documents", text: "Send them on WhatsApp or email. No office visit." },
  { title: "We Get It Done", text: "You get updates at every step until it's complete." },
];

function Process() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="label-caps !text-brand">How it works</p>
          <h2 className="mt-3 flex items-center gap-3 text-[28px] font-extrabold leading-tight sm:text-[36px]">
            <PlusMark className="text-[30px] sm:text-[34px]" /> Simple 3-Step Process
          </h2>
          <p className="mt-4 max-w-md text-[16px]">From your first message to the final certificate — clear, quick and fully online.</p>
          <div className="relative mt-8 overflow-hidden rounded-md bg-navy p-6 text-white">
            <span aria-hidden className="absolute -right-8 -top-8 h-24 w-24 rotate-12 bg-lime" />
            <span aria-hidden className="absolute -bottom-6 right-16 h-12 w-12 bg-brand" />
            <p className="relative text-[12px] font-bold uppercase tracking-[0.18em] text-lime">No office visit</p>
            <p className="relative mt-2 max-w-xs text-[18px] font-bold leading-snug !text-white">
              Everything happens on phone and WhatsApp, from anywhere in India.
            </p>
          </div>
        </div>

        <ol className="relative">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative flex gap-6 pb-8 last:pb-0">
              {i < STEPS.length - 1 && (
                <span aria-hidden className="absolute bottom-0 left-[27px] top-14 w-[2px] bg-[repeating-linear-gradient(to_bottom,var(--color-lav-2)_0_8px,transparent_8px_14px)]" />
              )}
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-lime text-[17px] font-extrabold text-brand ring-[6px] ring-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 rounded-md border border-line bg-white p-6 transition hover:border-brand/40 hover:shadow-[0_18px_40px_-28px_rgba(109,74,255,0.6)]">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">Step {i + 1}</p>
                <h3 className="mt-1.5 text-[20px] font-extrabold">{s.title}</h3>
                <p className="mt-1.5 text-[15px]">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── 7. alone vs with us ───────────────────────── */

const ALONE = [
  "Running to different agencies for registration, logo and website",
  "Costs that keep changing as you go",
  "Office visits, queues and printouts",
  "Working out forms and rules on your own",
];
const WITH_US = [
  { title: "One place for everything", text: "Registration, branding, website and marketing — no running around." },
  { title: "Clear pricing", text: "You know the full cost before we start. No hidden charges." },
  { title: "Fully online", text: "Do everything from your phone, from anywhere in India." },
  { title: "Real experts", text: "CA, CS and design experts guide you at every step." },
];

function Comparison() {
  const site = useSite();
  return (
    <section className="relative overflow-hidden bg-lav py-16 sm:py-24">
      <div aria-hidden className="absolute -left-10 bottom-0 hidden h-40 w-24 bg-lav-2 md:block" />
      <div className="container-x relative">
        <Heading center title="Why Businesses Trust Us" text={`Doing it alone vs doing it with ${site.siteName}.`} />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-md border border-line bg-white/60 p-7">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-slate-400">Doing it alone</p>
            <ul className="mt-5 space-y-4">
              {ALONE.map((t) => (
                <li key={t} className="flex gap-3 text-[15.5px] text-slate-500">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-slate-200 text-slate-500">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-md border-2 border-brand bg-white p-7 shadow-[0_30px_60px_-40px_rgba(109,74,255,0.8)]">
            <span className="absolute -top-3 left-7 rounded-md bg-lime px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink">
              With {site.siteName}
            </span>
            <ul className="mt-2 space-y-4">
              {WITH_US.map((w) => (
                <li key={w.title} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-brand text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span>
                    <span className="block text-[15.5px] font-bold text-ink">{w.title}</span>
                    <span className="text-[14.5px]">{w.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 8. testimonial spotlight ───────────────────────── */

const REVIEWS = [
  { name: "Ravi K.", city: "Hyderabad", text: "My GST and company registration were done in a week. Very smooth, and they explained everything simply." },
  { name: "Priya S.", city: "Bengaluru", text: "They designed our logo and website together. Looks very professional and customers notice it." },
  { name: "Arjun M.", city: "Pune", text: "Our Instagram enquiries doubled in 2 months. The team posts on time every week." },
];

function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = REVIEWS.length;
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((v) => (v + 1) % n), 6500);
    return () => clearTimeout(t);
  }, [i, paused, n]);
  const r = REVIEWS[i];
  return (
    <section className="bg-white py-16 sm:py-24" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container-x grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
        <div>
          <h2 className="flex items-center gap-3 text-[28px] font-extrabold leading-tight sm:text-[36px]">
            <PlusMark className="text-[30px] sm:text-[34px]" /> What Our Clients Say
          </h2>
          <div className="mt-5 flex items-center gap-3">
            <span className="text-[44px] font-extrabold leading-none text-ink">4.8</span>
            <span>
              <span className="flex text-[#f5b400]">
                {[0, 1, 2, 3, 4].map((k) => (
                  <Star key={k} className="h-5 w-5 fill-current" />
                ))}
              </span>
              <span className="text-[13px] font-medium">on Google</span>
            </span>
          </div>
          <div className="mt-8 flex gap-2">
            <button
              onClick={() => setI((i - 1 + n) % n)}
              aria-label="Previous review"
              className="grid h-11 w-11 place-items-center rounded-md border border-line text-ink transition hover:border-brand hover:bg-brand hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setI((i + 1) % n)}
              aria-label="Next review"
              className="grid h-11 w-11 place-items-center rounded-md bg-brand text-white transition hover:bg-brand-dark"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative">
        <span aria-hidden className="absolute -right-3 -top-3 h-20 w-20 bg-lime" />
        <figure className="relative rounded-md border border-line bg-surface p-8 sm:p-12">
          <span aria-hidden className="absolute left-8 top-2 font-serif text-[90px] leading-none text-lav-2 sm:left-12">
            “
          </span>
          <blockquote key={i} className="rise relative mt-8 text-[21px] font-semibold leading-relaxed text-ink sm:text-[26px]">
            {r.text}
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-between gap-4">
            <span className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-[17px] font-extrabold text-white">{r.name[0]}</span>
              <span>
                <span className="block font-bold text-ink">{r.name}</span>
                <span className="text-[13.5px]">{r.city}</span>
              </span>
            </span>
            <span className="flex gap-1.5">
              {REVIEWS.map((x, k) => (
                <button
                  key={x.name}
                  onClick={() => setI(k)}
                  aria-label={`Show review ${k + 1}`}
                  className={`h-2 rounded-full transition-all ${k === i ? "w-7 bg-brand" : "w-2 bg-lav-2"}`}
                />
              ))}
            </span>
          </figcaption>
        </figure>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 9. FAQ ───────────────────────── */

const FAQS = [
  { q: "Do I need to visit your office?", a: "No. Everything is done online. You can share documents on WhatsApp or email." },
  { q: "How long does GST registration take?", a: "Usually 3 to 7 working days, once we have all your documents." },
  { q: "Can you do registration and the website together?", a: "Yes. Many clients start with registration and logo, then add a website. We offer combo prices." },
  { q: "How do I pay?", a: "You can pay by UPI, debit/credit card or bank transfer. You get a proper GST invoice." },
  { q: "I'm not sure which registration I need. Can you help?", a: "Yes — that's what the free consultation is for. Our expert will suggest the right option for you." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white pb-16 sm:pb-24">
      <div className="container-x max-w-3xl">
        <div className="mb-8 text-center">
          <span className="inline-block rounded-md bg-lime px-3 py-1 text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-ink">FAQ</span>
          <h2 className="mt-3 text-[28px] font-extrabold sm:text-[36px]">Common Questions</h2>
        </div>
        <div className="border-t border-line">
          {FAQS.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <div key={f.q} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-[16px] font-bold text-ink hover:text-brand"
                  aria-expanded={isOpen}
                >
                  {f.q}
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-md transition ${isOpen ? "bg-brand text-white" : "bg-lav text-brand"}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-10 text-[15px] leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 10. CTA (also used on inner pages) ───────────────────────── */

export function CtaBand() {
  const site = useSite();
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <div aria-hidden className="absolute inset-y-0 left-0 -z-10 w-[22%] bg-lav-2 [clip-path:polygon(0_0,100%_0,55%_100%,0_100%)] max-md:w-[30%] max-md:opacity-90" />
      <div aria-hidden className="absolute inset-y-0 right-0 -z-10 w-[20%] bg-lime [clip-path:polygon(45%_0,100%_0,100%_100%,0_100%)] max-md:w-[28%]" />
      <div className="container-x py-14 text-center sm:py-16">
        <h2 className="text-[28px] font-extrabold !text-white sm:text-[38px]">Ready to Grow Your Business?</h2>
        <p className="mx-auto mt-3 max-w-lg text-[16px] text-white/80">Talk to our expert today. The first consultation is free.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn-lime">
            Get Free Consultation
          </Link>
          <a href={waLink(site.whatsapp)} target="_blank" rel="noreferrer" className="btn-ghost">
            <WaIcon /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesExplorer />
      <CertTable />
      <Popular />
      <Process />
      <Comparison />
      <Testimonials />
      <Faq />
      <CtaBand />
    </>
  );
}

