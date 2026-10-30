import { useState } from "react";
import { CheckCircle2, ChevronDown, Loader2, Phone, User, Briefcase } from "lucide-react";
import { CATEGORIES } from "../lib/site";
import { useCreateLead } from "../queries/leads";
import { useContent } from "../queries/content";

type Props = {
  layout?: "row" | "stack";
  source?: string;
  defaultService?: string;
  cta?: string;
  withEmail?: boolean;
  withMessage?: boolean;
};

export function LeadForm({
  layout = "row",
  source = "home",
  defaultService = "",
  cta = "Call Me Back",
  withEmail = false,
  withMessage = false,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(defaultService);
  const packages = useContent().packages;
  const known = (s: string) =>
    s === "Not sure / Other" || CATEGORIES.some((c) => c.services.some((x) => x.name === s)) || packages.some((p) => `${p.name} package` === s);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const create = useCreateLead();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const digits = phone.replace(/\D/g, "").slice(-10);
    if (name.trim().length < 2) return setError("Please enter your name.");
    if (!/^[6-9]\d{9}$/.test(digits)) return setError("Please enter a valid 10-digit mobile number.");
    if (!service) return setError("Please select a service.");
    create.mutate(
      { name, phone: digits, email, service, message, source },
      { onError: () => setError("Something went wrong. Please call or WhatsApp us.") },
    );
  };

  if (create.isSuccess) {
    return (
      <div className="flex flex-col items-center gap-2 py-4 text-center">
        <CheckCircle2 className="h-10 w-10 text-wa" />
        <p className="text-lg font-bold text-ink">Thank you, {name.split(" ")[0]}!</p>
        <p className="text-[15px]">Our expert will call you on +91 {phone.replace(/\D/g, "").slice(-10)} within 30 minutes.</p>
      </div>
    );
  }

  const row = layout === "row";
  const cap = (t: string) =>
    row ? <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink/60">{t}</span> : <span className="sr-only">{t}</span>;
  return (
    <form onSubmit={submit} noValidate>
      <div className={row ? "grid gap-3 md:grid-cols-[1fr_1fr_1.1fr_auto] md:items-end md:gap-4" : "grid gap-3"}>
        <label className="block">
          {cap("Your name")}
          <span className="relative block">
            {!row && <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />}
            <input aria-label="Your name" className={`field ${row ? "" : "!pl-11"}`} placeholder={row ? "Enter your name" : "Your Name"} value={name} onChange={(e) => setName(e.target.value)} />
          </span>
        </label>
        <label className="block">
          {cap("+91 Phone number")}
          <span className="relative block">
            {!row && (
              <span className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center gap-1.5 text-[15px] text-ink">
                <Phone className="h-4 w-4 text-slate-400" /> +91
              </span>
            )}
            <input
              aria-label="Mobile number"
              className={`field ${row ? "" : "!pl-[4.6rem]"}`}
              inputMode="numeric"
              maxLength={10}
              placeholder={row ? "Enter phone number" : "Mobile Number"}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            />
          </span>
        </label>
        {withEmail && (
          <input aria-label="Email" className="field" type="email" placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} />
        )}
        <label className="block">
          {cap("Select service")}
          <span className="relative block">
            {!row && <Briefcase className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />}
            <select
              aria-label="Select service"
              className={`field appearance-none !pr-10 ${row ? "" : "!pl-11"} ${service ? "" : "!text-slate-400"}`}
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="">{row ? "Choose a service" : "Select Service"}</option>
              {CATEGORIES.map((c) => (
                <optgroup key={c.slug} label={c.title}>
                  {c.services.map((s) => (
                    <option key={s.name} value={s.name} className="text-ink">
                      {s.name}
                    </option>
                  ))}
                </optgroup>
              ))}
              {packages.length > 0 && (
                <optgroup label="Packages">
                  {packages.map((p) => (
                    <option key={p.id} value={`${p.name} package`} className="text-ink">
                      {p.name} package
                    </option>
                  ))}
                </optgroup>
              )}
              {service && !known(service) && (
                <option value={service} className="text-ink">
                  {service}
                </option>
              )}
              <option value="Not sure / Other" className="text-ink">
                Not sure / Other
              </option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </span>
        </label>
        {withMessage && (
          <textarea
            aria-label="Message"
            className="field !h-28 py-3"
            placeholder="Tell us a little about your business (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        )}
        <button type="submit" disabled={create.isPending} className={`btn-brand h-12 whitespace-nowrap ${row ? "md:min-w-[170px]" : ""}`}>
          {create.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {create.isPending ? "Sending..." : cta}
        </button>
      </div>
      <p className={`mt-3 text-[13px] ${error ? "font-medium text-red-600" : "text-slate-500"} ${row ? "text-center md:text-left" : ""}`}>
        {error ?? "Free call. No spam. We reply within 30 minutes."}
      </p>
    </form>
  );
}
