import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  Headphones,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { findService, serviceUrl, waLink } from "../lib/site";
import { LeadForm } from "../components/lead-form";
import { WaIcon } from "../components/header";
import { telHref, useSite } from "../queries/site";
import { CtaBand } from "./index";
import { PageHero } from "../components/page-hero";

const STEPS = [
  { title: "Free Call", text: "Tell us what you need. We explain everything simply." },
  { title: "Share Details", text: "Send documents or details on WhatsApp. No office visit." },
  { title: "We Do the Work", text: "Our expert handles it and updates you on every step." },
  { title: "Done", text: "You get the final certificate / files on WhatsApp and email." },
];

function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-line rounded-md border border-line bg-white">
      {items.map((f, i) => (
        <div key={f.q}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-ink hover:text-brand"
          >
            {f.q}
            <ChevronDown className={`h-5 w-5 shrink-0 text-brand transition ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && <p className="px-5 pb-5 text-[15px] leading-relaxed">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}

function Block({ icon: Icon, title, children }: { icon: typeof Users; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-md border border-line bg-white p-6 sm:p-7">
      <h2 className="flex items-center gap-3 text-[21px] font-extrabold">
        <span className="grid h-10 w-10 place-items-center rounded-md bg-lav text-brand">
          <Icon className="h-5 w-5" />
        </span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Ticks({ items, cols = false }: { items: string[]; cols?: boolean }) {
  return (
    <ul className={`grid gap-3 ${cols ? "sm:grid-cols-2" : ""}`}>
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5 text-[15.5px] text-navy">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function ServicePage() {
  const { cat: catSlug, service: serviceSlug } = useParams<{ cat: string; service: string }>();
  const { cat, service } = findService(catSlug, serviceSlug);
  const site = useSite();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [catSlug, serviceSlug]);

  if (!cat || !service) {
    return (
      <div className="container-x py-32 text-center">
        <h1 className="text-3xl font-bold">Service not found</h1>
        <Link to={cat ? `/services/${cat.slug}` : "/"} className="btn-brand mt-6">
          {cat ? `See all ${cat.title}` : "Go Home"}
        </Link>
      </div>
    );
  }

  const who = service.who ?? cat.who;
  const includes = service.includes ?? cat.includes;
  const docs = service.docs ?? cat.docs;
  const related = cat.services.filter((s) => s.name !== service.name).slice(0, 4);
  const isCert = cat.slug === "microsoft-certifications";
  const faqs = [
    ...(isCert ? [] : [{
      q: `How long does ${service.name} take?`,
      a: service.days
        ? `Usually ${service.days}. We tell you the exact timeline on the free call.`
        : "It depends on your needs. We give you a clear timeline on the free call.",
    }]),
    { q: "How much does it cost?", a: "The price depends on your needs. Our expert shares a clear price on the free call — no hidden charges." },
    { q: "Do I need to visit your office?", a: "No. Everything is done online — on phone and WhatsApp — from anywhere in India." },
    { q: "Will you help after the work is done?", a: "Yes. You can call or WhatsApp us any time if you have questions later." },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: cat.title, to: `/services/${cat.slug}` }, { label: service.name }]}
        label={cat.title}
        title={service.name}
        text={service.text}
        image={cat.image}
      >
        <div className="flex flex-wrap gap-2.5 text-[13.5px] font-semibold text-ink">
          {service.days && (
            <span className="flex items-center gap-1.5 rounded-md bg-lav px-3.5 py-2">
              <Clock className="h-4 w-4 text-brand" /> {service.days}
            </span>
          )}
          <span className="flex items-center gap-1.5 rounded-md bg-lav px-3.5 py-2">
            <ShieldCheck className="h-4 w-4 text-brand" /> 100% online
          </span>
          <span className="flex items-center gap-1.5 rounded-md bg-lime px-3.5 py-2">
            <Headphones className="h-4 w-4" /> Free expert call
          </span>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 lg:hidden">
          <a href="#get-started" className="btn-brand">Get Free Consultation <ArrowRight className="h-4 w-4" /></a>
        </div>
      </PageHero>

      <section className="bg-surface py-12 sm:py-16">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="space-y-6">
            <Block icon={Users} title="Who Is This For?">
              <Ticks items={who} />
            </Block>

            <Block icon={BadgeCheck} title="What You Get">
              <Ticks items={includes} cols />
            </Block>

            {docs && docs.length > 0 && (
              <Block icon={FileText} title="Documents Needed">
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {docs.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 rounded-md border border-line bg-surface px-4 py-3 text-[15px] text-ink">
                      <span className="mt-1.5 h-2 w-2 shrink-0 bg-lime" /> {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[14px]">Not sure about a document? Don't worry — we'll guide you on the call.</p>
              </Block>
            )}

            <Block icon={Clock} title="How It Works">
              <ol className="grid gap-4 sm:grid-cols-2">
                {STEPS.map((st, i) => (
                  <li key={st.title} className="flex gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime text-[14px] font-extrabold text-brand">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block font-bold text-ink">{st.title}</span>
                      <span className="block text-[14.5px] leading-relaxed">{st.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Block>

            <div>
              <h2 className="mb-4 flex items-center gap-2 text-[22px] font-extrabold"><span className="plus-mark text-[26px]">+</span> Common Questions</h2>
              <Faq items={faqs} />
            </div>

            {related.length > 0 && (
              <div>
                <h2 className="mb-4 flex items-center gap-2 text-[22px] font-extrabold"><span className="plus-mark text-[26px]">+</span> Related Services</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link
                      key={r.name}
                      to={serviceUrl(cat.slug, r.name)}
                      className="group flex items-center justify-between gap-3 rounded-md border border-line bg-white px-4 py-3.5 hover:border-brand/50"
                    >
                      <span>
                        <span className="block font-bold text-ink">{r.name}</span>
                        {r.days && <span className="block text-[13px] text-slate-500">{r.days}</span>}
                      </span>
                      <ArrowRight className="h-4 w-4 text-brand transition group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside id="get-started" className="scroll-mt-28 space-y-4 lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-md border border-line bg-white shadow-[0_30px_60px_-34px_rgba(15,23,42,0.5)]">
              <div className="relative overflow-hidden bg-navy px-6 py-5">
                <span aria-hidden className="absolute -right-5 -top-5 h-16 w-16 rotate-12 bg-lime" />
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-lime">Get Started</p>
                <h3 className="relative mt-1 text-xl font-extrabold !text-white">Talk to an Expert — Free</h3>
                <p className="mt-1 text-[14px] text-white/75">We'll call you back within 30 minutes.</p>
              </div>
              <div className="p-6">
                <LeadForm key={service.name} layout="stack" source={`service:${serviceSlug}`} defaultService={service.name} cta="Get Free Call" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a href={telHref(site.phone)} className="flex items-center justify-center gap-2 rounded-md bg-white py-3 font-bold text-ink ring-1 ring-line hover:ring-brand/50">
                <Phone className="h-4 w-4 text-brand" /> Call Us
              </a>
              <a
                href={waLink(site.whatsapp, `Hi, I need help with ${service.name}`)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-md bg-wa py-3 font-bold text-white hover:brightness-95"
              >
                <WaIcon /> WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
