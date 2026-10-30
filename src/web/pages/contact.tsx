import { useEffect } from "react";
import { useSearch } from "wouter";
import { useContent } from "../queries/content";
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { waLink } from "../lib/site";
import { telHref, useSite } from "../queries/site";
import { LeadForm } from "../components/lead-form";
import { WaIcon } from "../components/header";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const site = useSite();
  const wa = useContent().whatsapp;
  const preset = new URLSearchParams(useSearch()).get("service") ?? "";
  const items: { icon: typeof Phone; label: string; value: string; href?: string }[] = [
    { icon: Phone, label: "Call us", value: site.phone, href: telHref(site.phone) },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Clock, label: "Working hours", value: site.hours },
    ...site.phones.map((p) => ({ icon: Phone, label: p.label || "Phone", value: p.number, href: telHref(p.number) })),
    ...site.emails.map((m) => ({ icon: Mail, label: m.label || "Email", value: m.email, href: `mailto:${m.email}` })),
    ...(site.addresses.length
      ? site.addresses.map((a) => ({ icon: MapPin, label: a.label || "Office", value: a.line, href: a.mapUrl || undefined }))
      : [{ icon: MapPin, label: "Office", value: site.city, href: undefined }]),
  ];
  const socials = (
    [
      ["facebook", Facebook],
      ["instagram", Instagram],
      ["linkedin", Linkedin],
      ["youtube", Youtube],
    ] as const
  ).filter(([k]) => site.socials[k]);
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-20">
      <div aria-hidden className="absolute left-0 top-0 hidden h-56 w-[5%] bg-lav-2 lg:block" />
      <div aria-hidden className="absolute bottom-0 right-0 hidden h-72 w-[12%] bg-lime lg:block" />
      <div className="container-x relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <p className="label-caps mb-3 !text-brand">Contact Us</p>
          <h1 className="text-[38px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[52px]">Let's Talk About <span className="text-brand">Your Business</span></h1>
          <p className="mt-4 max-w-md text-[17px]">Fill the form and our expert will call you within 30 minutes. The first consultation is free.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {items.map((it) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-lav text-brand"><it.icon className="h-5 w-5" /></span>
                  <span>
                    <span className="block text-[13px]">{it.label}</span>
                    <span className="block whitespace-pre-line font-bold text-ink">{it.value}</span>
                  </span>
                </>
              );
              return it.href ? (
                <a key={it.label + it.value} href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-3 rounded-md bg-white p-4 ring-1 ring-line transition hover:ring-brand/50">{inner}</a>
              ) : (
                <div key={it.label + it.value} className="flex items-center gap-3 rounded-md bg-white p-4 ring-1 ring-line">{inner}</div>
              );
            })}
          </div>
          <a href={waLink(site.whatsapp, site.bot.whatsappMessage)} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-md bg-wa px-6 py-3 font-bold text-white hover:brightness-95">
            <WaIcon /> Chat on WhatsApp
          </a>
          {wa.secondNumber && (
            <a href={waLink(wa.secondNumber, site.bot.whatsappMessage)} target="_blank" rel="noreferrer" className="ml-3 mt-6 inline-flex items-center gap-2 rounded-md bg-wa px-6 py-3 font-bold text-white hover:brightness-95">
              <WaIcon /> WhatsApp {wa.secondLabel || "us"}
            </a>
          )}
          {socials.length > 0 && (
            <div className="mt-6 flex gap-2">
              {socials.map(([k, Icon]) => (
                <a key={k} href={site.socials[k]} target="_blank" rel="noreferrer" aria-label={k} className="grid h-11 w-11 place-items-center rounded-md bg-white text-brand ring-1 ring-line hover:bg-brand hover:text-white">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="relative rounded-md border-2 border-brand bg-white p-6 shadow-[0_30px_60px_-34px_rgba(109,74,255,0.55)] sm:p-8">
          <span aria-hidden className="absolute -top-3 left-6 rounded-md bg-lime px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink">Free consultation</span>
          <h2 className="text-2xl font-extrabold">Request a Free Call</h2>
          <p className="mt-1 text-[14px]">Takes less than a minute.</p>
          <div className="mt-6">
            <LeadForm layout="stack" source="contact" cta="Get Free Consultation" withEmail withMessage defaultService={preset} />
          </div>
        </div>
      </div>
    </section>
  );
}
