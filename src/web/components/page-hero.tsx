import { Fragment } from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; to?: string };

/** Light page header used on category and service pages (violet & lime template). */
export function PageHero({
  crumbs,
  label,
  title,
  text,
  image,
  children,
}: {
  crumbs: Crumb[];
  label: string;
  title: string;
  text: string;
  image: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div aria-hidden className="absolute left-0 top-0 hidden h-[55%] w-[5%] bg-lav-2 lg:block" />
      <div aria-hidden className="absolute right-0 top-0 hidden h-[62%] w-[14%] bg-lime lg:block" />
      <div className="container-x relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
        <div>
          <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-body">
            {crumbs.map((c, i) => (
              <Fragment key={c.label}>
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-lav-2" />}
                {c.to ? (
                  <Link to={c.to} className="hover:text-brand">
                    {c.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-ink">{c.label}</span>
                )}
              </Fragment>
            ))}
          </nav>
          <p className="label-caps rise mt-6 !text-brand">{label}</p>
          <h1 className="rise mt-3 text-[36px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[50px]" style={{ animationDelay: "60ms" }}>
            {title}
          </h1>
          <p className="rise mt-4 max-w-xl text-[17px] leading-relaxed" style={{ animationDelay: "120ms" }}>
            {text}
          </p>
          {children && (
            <div className="rise mt-7" style={{ animationDelay: "180ms" }}>
              {children}
            </div>
          )}
        </div>
        <div className="relative lg:mr-[8%]">
          <div aria-hidden className="absolute -bottom-4 -left-4 h-[60%] w-[35%] bg-lav-2" />
          <img src={image} alt="" className="relative aspect-[2/1] w-full rounded-md object-cover shadow-[0_30px_60px_-34px_rgba(15,23,42,0.5)] lg:aspect-[16/10]" />
          <span aria-hidden className="plus-mark absolute -right-2 -top-7 text-[34px] max-lg:hidden">
            +
          </span>
        </div>
      </div>
    </section>
  );
}
