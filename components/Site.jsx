"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

/*
  CISS Lucknow — full site
  ------------------------
  EDIT ME:
   - WEB3FORMS_KEY  : paste your key from web3forms.com
   - MAPS_QUERY / ADDRESS / PHONE / EMAIL : business details
   - SERVICES / WHY / STEPS / TESTI / CLIENT_LOGOS : content arrays
   - Images: see public/images/PLACEHOLDERS.md
*/

// ============ CONFIG — EDIT THESE ============
const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE"; // get from https://web3forms.com
const PHONE = "+91 9415348999";
const PHONE_TEL = "+919415348999";
const EMAIL = "contact.cisslucknow@gmail.com";
const ADDRESS = "B-5/434, Viraj Khand, Gomti Nagar, Lucknow, Uttar Pradesh";
// Google Maps: replace with your exact address or business name
const MAPS_QUERY = "Civil Industrial Security Services Lucknow";
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`;

// ============ DATA ============
export const SERVICES = [
  ["Industrial & Factory Security", "/images/services/industrial.jpg"],
  ["Corporate & Office Security", "/images/services/corporate.jpg"],
  ["Residential & Apartment Guards", "/images/services/residential.jpg"],
  ["Bank & ATM Security", "/images/services/bank.jpg"],
  ["Hotel & Hospitality Security", "/images/services/hotel.jpg"],
  ["School & College Security", "/images/services/school.jpg"],
  ["Event & Wedding Security", "/images/services/events.jpg"],
  ["Bouncers & VIP Protection", "/images/services/bouncers.jpg"],
  ["Cash Van Services", "/images/services/cashvan.jpg"],
  ["Women Security Guards", "/images/services/women.jpg"],
  ["Ex-Servicemen Supervisors", "/images/services/exservice.jpg"],
  ["Mall & Cinema Security", "/images/services/mall.jpg"],
  ["Construction & Property Guards", "/images/services/construction.jpg"],
  ["24/7 General Security Guards", "/images/services/general.jpg"],
];
const WHY = [
  ["shield", "Rigorously Vetted Guards", "Police verification, background checks, and physical fitness screening on every single hire."],
  ["clock", "24/7 Rapid Response", "A live control room and Quick Response Team, reachable any hour, any day of the year."],
  ["doc", "100% PSARA Compliant", "Fully licensed under PSARA, with PF, ESI and statutory paperwork handled for you."],
  ["badge", "Trained & Turned Out", "Regular drills, fire and first-aid basics, and a smart uniformed presence that reflects on you."],
];

const STEPS = [
  ["01", "Consult", "We assess your security needs",
   "We start with a site visit and a straight conversation \u2014 mapping your risks, entry points, shift timings, and the kind of presence you need. No jargon, no obligation.",
   "A clear security plan and a transparent quote.", "/images/process/consult.jpg"],
  ["02", "Deploy", "We hire, vet & match guards",
   "Based on the assessment, we handpick guards, run background and police checks, and match the right personnel and supervisor to your site \u2014 briefed on your specific protocols.",
   "Trained, verified guards deployed and ready from day one.", "/images/process/deploy.jpg"],
  ["03", "Support", "All-time support & monitoring",
   "After deployment we stay hands-on \u2014 supervisor rounds, muster monitoring, quick replacements, and a 24/7 control room \u2014 so standards never slip over time.",
   "Consistent protection that holds up long after day one.", "/images/process/support.jpg"],
];

const TESTI = [
  { img: "/images/clients/1.jpg", logo: "HALDEN ESTATE", name: "R. Verma", role: "Facility Head, Gomti Nagar",
    quote: "\u201CTheir guards are punctual, disciplined, and genuinely alert. We finally stopped worrying about our premises.\u201D",
    s1: ["-40%", "Security incidents"], s2: ["24/7", "Coverage"] },
  { img: "/images/clients/2.jpg", logo: "AURA MALL", name: "S. Khan", role: "Operations Manager",
    quote: "\u201CCrowd control at our events is seamless now. The bouncer team is professional and never over-steps.\u201D",
    s1: ["12+", "Events secured"], s2: ["0", "Incidents"] },
  { img: "/images/clients/3.jpg", logo: "NIRMAN GROUP", name: "A. Tripathi", role: "Site Director",
    quote: "\u201CEven our remote construction sites feel covered. Replacements are fast and supervision is real.\u201D",
    s1: ["6", "Sites covered"], s2: ["100%", "Compliance"] },
];

const FAQS = [
  ["Are your security guards licensed and trained?",
   "Yes, we instruct and mentor our personnel thoroughly to make sure they do not falter in any situation.\n\nYou should also know that each of our staff is licensed under the Private Security Agencies Regulation Act. This means that they are prepared to launch the appropriate critical incident response at any time."],
  ["Do you provide both armed and unarmed security guards in Lucknow?",
   "You can feel free to hire armed or unarmed security guards from us after assessing your protection necessities in Lucknow. If you are on the fence about your choice, you may also ask our experts to suggest the right step for you and your asset."],
  ["What industries do you serve?",
   "At CISS, we vouch to serve all kinds of industries because our clients are our prime focus. It does not matter if your requirements stem from the corporate, industrial, residential, healthcare, education, retail, or event security sector, we can be for you without any further challenges."],
  ["Do you offer 24/7 security services?",
   "Yes, we offer rotating shifts to our expert professionals so that your property or asset can be under watch at all times. Our staff is also free to pick schedules of their own, making sure you can feel at ease in your house or office."],
  ["Do you provide short-term and long-term security contracts?",
   "You can get your hands on both short-term and long-term security contracts from us, based on your requirements.\n\nWe can even customize a security plan for you with your chosen duration for the best experience. At CISS, we believe in flexibility because we understand that customers have unique demands."],
  ["How do you assess security risks for my property or business?",
   "If you are curious about how we conduct our security risk assessment session, the first thing you should know is this is done by our reliable experts. Once they visit your place, they check the site, look for possible vulnerabilities, and suggest protection measures that can get rid of these risks."],
  ["Can I request female security guards?",
   "Absolutely! Feel free to ask for female security guards from us if you have chosen CISS as your protection partner. We understand the need for gender-specific duties, so we have personnel of all genders at our disposal."],
  ["Do you offer CCTV monitoring and electronic security?",
   "Yes, we have various kinds of unified security systems that we can utilize to monitor your property in detail. Remote monitoring, entry control, and high-tech security solutions are some of the high-tech options you will get from us. Hence, call us today and secure your premises immediately!"],
];

// Client / partner names — swap for <img src="/images/clients/logos/x.svg" /> when you have real logos.
// The second value picks a placeholder mark from LogoMark until then.
const LOGOS_ROW_1 = [
  ["HALDEN ESTATE", "rings"],
  ["AURA MALL", "sparkle"],
  ["NIRMAN GROUP", "triangles"],
  ["SHREE TEXTILES", "target"],
  ["AVADH HOSPITAL", "cross"],
  ["LUCKNOW HEIGHTS", "blocks"],
];
const LOGOS_ROW_2 = ["GOMTI RESIDENCY", "KISAN COLD STORAGE", "ROYAL BANQUETS", "UNITY BANK", "CAPITAL MOTORS", "ORION SCHOOL"];

// Cities served — cycles in the hero headline
const CITIES = ["Lucknow", "Noida", "Greater Noida", "Kanpur", "Unnao"];

// Open roles — shown in the Notice Board section, each opens the apply modal
export const JOBS = [
  ["Security Guard (Male)", "Lucknow", "Full-time"],
  ["Security Guard (Female)", "Kanpur", "Full-time"],
  ["Site Supervisor", "Unnao", "Full-time"],
  ["Bouncer / Event Security", "Lucknow", "Contract"],
  ["Ex-Servicemen Supervisor", "Gautam Buddha Nagar", "Full-time"],
  ["Cash Van Guard", "Lucknow", "Full-time"],
];

const NAV = [["Services", "#services"], ["Why Us", "#why"], ["Process", "#process"], ["Careers", "#careers"], ["Clients", "#clients"], ["Contact", "#contact"]];

// ============ HELPERS ============
// Cycles through phrases with a type / pause / delete effect.
function useTypewriter(words, { type = 70, del = 38, hold = 1600 } = {}) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0, i = words[0].length, deleting = false, timer;
    const tick = () => {
      const word = words[w];
      if (!deleting) {
        i++;
        setText(word.slice(0, i));
        if (i >= word.length) { deleting = true; timer = setTimeout(tick, hold); return; }
        timer = setTimeout(tick, type);
      } else {
        i--;
        setText(word.slice(0, Math.max(0, i)));
        if (i <= 0) { deleting = false; w = (w + 1) % words.length; timer = setTimeout(tick, 260); return; }
        timer = setTimeout(tick, del);
      }
    };
    timer = setTimeout(tick, hold);
    return () => clearTimeout(timer);
  }, [words, type, del, hold]);
  return text;
}

function useIsDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width:860px)");
    const f = () => setD(m.matches);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return d;
}

/* Scroll-reveal wrapper: `variant` = "rise" (swipe up) or "fade" */
function Reveal({ children, variant = "rise", delay = 0, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className={`${variant} ${className}`}>{children}</div>;
}

/* Thin-line icons, matching the Fylla "what we do" icon style */
function LineIcon({ name, size = 40 }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round", strokeLinejoin: "round" };
  const map = {
    shield: <path {...p} d="M20 3.5l13 5v9.5c0 8.5-5.6 14-13 16.5C12.6 32 7 26.5 7 18V8.5l13-5z" />,
    clock: <>
      <circle {...p} cx="20" cy="20" r="15.5" />
      <path {...p} d="M20 11v9l6.5 4" />
    </>,
    doc: <>
      <path {...p} d="M11 4h13l6.5 6.5V36H11V4z" />
      <path {...p} d="M24 4v7h7" />
      <path {...p} d="M15.5 22l3 3 6.5-7" />
    </>,
    badge: <>
      <polygon {...p} points="20,4 23.2,7.9 28,6.1 28.8,11.2 33.9,12 32.1,16.8 36,20 32.1,23.2 33.9,28 28.8,28.8 28,33.9 23.2,32.1 20,36 16.8,32.1 12,33.9 11.2,28.8 6.1,28 7.9,23.2 4,20 7.9,16.8 6.1,12 11.2,11.2 12,6.1 16.8,7.9" />
      <path {...p} d="M16 20l3 3 5.5-6" />
    </>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      {map[name]}
    </svg>
  );
}

/* Simple geometric marks standing in for client logos until real ones are supplied. */
function LogoMark({ shape, size = 18 }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 2.0, strokeLinecap: "round", strokeLinejoin: "round" };
  const shapes = {
    rings: <><circle {...p} cx="8" cy="10" r="7.5" /><circle {...p} cx="13" cy="10" r="7.5" /></>,
    sparkle: <path {...p} d="M10 1.5l2 6.5 6.5 2-6.5 2-2 6.5-2-6.5L1.5 10l6.5-2z" />,
    triangles: <><path {...p} d="M4 16l5-11.5 5 11.5z" /><path {...p} d="M10.5 16l4.5-9.5 4.5 9.5z" /></>,
    target: <><circle {...p} cx="10" cy="10" r="8" /><circle {...p} cx="10" cy="10" r="4.3" /><circle cx="10" cy="10" r="1.1" fill="currentColor" /></>,
    cross: <><circle {...p} cx="10" cy="10" r="8" /><path {...p} d="M10 6v8M6 10h8" /></>,
    blocks: <><rect {...p} x="2" y="8.5" width="6.5" height="9.5" /><rect {...p} x="10.5" y="3" width="6.5" height="15" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      {shapes[shape]}
    </svg>
  );
}

/* Optional image: renders <img> if the file exists, else shows the path placeholder */
function Img({ src, alt }) {
  const [ok, setOk] = useState(true);
  if (!ok) return <span className="focus-path">{src}</span>;
  return <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} />;
}

// ============ QUOTE MODAL ============
export function QuoteModal({ onClose }) {
  const [f, setF] = useState({ name: "", email: "", phone: "", company: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    if (f.company) { setStatus("sent"); return; } // honeypot
    if (!f.name.trim() || !f.phone.trim()) { setError("Please add your name and phone number."); return; }
    setError(""); setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "New quote request — CISS Lucknow website",
          from_name: "CISS Lucknow Website",
          name: f.name, email: f.email || "Not provided", phone: f.phone,
        }),
      });
      const data = await res.json();
      if (data.success) setStatus("sent");
      else { setStatus("idle"); setError(data.message || "Something went wrong. Please call us directly."); }
    } catch {
      setStatus("idle");
      setError("Network error. Please try again, or call / WhatsApp us directly.");
    }
  };

  return (
    <div className="modal-back" onClick={onClose} role="dialog" aria-modal="true" aria-label="Get a quote">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Close">&times;</button>
        {status === "sent" ? (
          <div style={{ padding: "30px 0", textAlign: "center" }}>
            <h2 className="serif">Thank you.</h2>
            <p className="m-sub">We&rsquo;ve received your request and will call you back shortly.</p>
            <button className="cf-submit" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h2 className="serif">Get a <span className="italic">quote</span></h2>
            <p className="m-sub">Leave your details and our team will call you back &mdash; usually within a few hours.</p>
            <form onSubmit={submit}>
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hp"
                value={f.company} onChange={set("company")} aria-hidden="true" />
              <div className="cf-field">
                <label htmlFor="q-name">Name</label>
                <input id="q-name" value={f.name} onChange={set("name")} required />
              </div>
              <div className="cf-field">
                <label htmlFor="q-email">Email</label>
                <input id="q-email" type="email" value={f.email} onChange={set("email")} />
              </div>
              <div className="cf-field">
                <label htmlFor="q-phone">Phone / WhatsApp</label>
                <input id="q-phone" type="tel" value={f.phone} onChange={set("phone")} required />
              </div>
              {error && <div className="cf-err">{error}</div>}
              <button className="cf-submit" type="submit" disabled={status === "sending"}
                style={{ opacity: status === "sending" ? 0.7 : 1 }}>
                {status === "sending" ? "Sending\u2026" : "Request Callback"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* "Talk to us" opens this — contact details, not a lead form. */
export function ContactModal({ onClose }) {
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-back" onClick={onClose} role="dialog" aria-modal="true" aria-label="Contact CISS Lucknow">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Close">&times;</button>
        <h2 className="serif">Talk to <span className="italic">us</span></h2>
        <p className="m-sub">We&rsquo;re available 24/7 for urgent security needs &mdash; reach us directly.</p>
        <div className="cf-side-card">
          <div className="t">Reach us directly</div>
          <p className="d">
            Phone / WhatsApp: <a href={`tel:${PHONE_TEL}`}>{PHONE}</a><br />
            Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a><br />
            {ADDRESS}
          </p>
          <a className="map-btn" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            View on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}

// ============ SECTIONS ============
export function Nav({ onQuote }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav">
      <div className="nav-bar">
        <a href="#top" aria-label="CISS Lucknow home">
          <img className="nav-logo" src="/images/logo.png" alt="CISS — Civil & Industrial Security Services, Lucknow" />
        </a>
        <ul className="nav-links">
          {NAV.map(([l, h]) => <li key={l}><a href={h}>{l}</a></li>)}
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button className="pill pill-light" onClick={onQuote}>Get a Quote</button>
          <button className="hamburger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
      {open && (
        <div className="nav-menu">
          {NAV.map(([l, h]) => <a key={l} href={h} onClick={() => setOpen(false)}>{l}</a>)}
        </div>
      )}
    </nav>
  );
}

/* Bordered, rounded video card for the hero right-hand side.
   Drop a looping clip at /videos/hero-loop.mp4 — falls back to the guard photo if it's missing. */
function HeroVideo() {
  const [videoOk, setVideoOk] = useState(true);
  return (
    <div className="hero-video-card">
      {videoOk ? (
        <video
          autoPlay muted loop playsInline
          poster="/images/hero-guard.jpg"
          onError={() => setVideoOk(false)}
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>
      ) : (
        <Img src="/images/hero-guard.jpg" alt="CISS Lucknow security guard on duty" />
      )}
    </div>
  );
}

/* Client logo strip directly under the hero — reuses the same LOGOS_ROW_1 data as ClientLogos. */
function HeroClients() {
  const loop = [...LOGOS_ROW_1, ...LOGOS_ROW_1];
  return (
    <div className="hero-clients">
      <div className="wrap hc-grid">
        <div className="hc-side"><span className="hc-label">Our Clients</span></div>
        <div className="hc-track-wrap">
          <div className="mq-track hc-track">
            {loop.map(([n, shape], i) => (
              <span className="mq-item hc-item" key={i}>
                <LogoMark shape={shape} />
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NoticeBoard({ onApply }) {
  return (
    <section className="careers" id="careers" aria-labelledby="careers-h">
      <div className="wrap careers-grid">
        <div className="careers-side">
          <h2 className="careers-title" id="careers-h">Notice Board</h2>
        </div>
        <div className="careers-main">
          <div className="job-list">
            {JOBS.map(([title, loc, type]) => (
              <div className="job-row" key={title}>
                <div className="job-main">
                  <div className="job-title">{title}<span className="job-meta italic"> ({loc})</span></div>
                </div>
                <button type="button" className="pill pill-outline" onClick={() => onApply(title)}>Apply</button>
              </div>
            ))}
          </div>
          <div className="careers-cta">
            <a href="/workwithus" className="btn-rect">View All Openings</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hero({ onContact }) {
  const city = useTypewriter(CITIES);
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1>Security Guard Services in <br/><span className="city-word">{city}<span className="type-caret" /></span></h1>
          <p className="sub">From weddings to industrial sites, we match you with highly-trained, PSARA-licensed guards in as little as 48 hours.</p>
          <div className="hero-cta">
            <button className="pill pill-dark" onClick={onContact}>Talk to us <span className="arrow-circ" aria-hidden="true">&rarr;</span></button>
            <a href="#services" className="pill pill-outline" style={{ textDecoration: "none" }}>View Services</a>
          </div>
          <div className="hero-stats">
            <div className="hstat">
              <div className="hstat-n">
                4.6
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="hstat-star" aria-hidden="true">
                  <path d="M12 4l2.3 4.7 5.2.8-3.8 3.6.9 5.1L12 15.9 7.4 18.3l.9-5.1L4.5 9.5l5.2-.8z" />
                </svg>
              </div>
              <div className="hstat-l">Client rating</div>
            </div>
            <span className="hstat-div" />
            <div className="hstat">
              <div className="hstat-n">200+</div>
              <div className="hstat-l">Guards deployed</div>
            </div>
          </div>
        </div>
        <div className="hero-visual"><HeroVideo /></div>
      </div>
      <HeroClients />
    </header>
  );
}

function Services() {
  const shown = SERVICES.slice(0, 6);
  return (
    <section className="svc" id="services" aria-labelledby="svc-h">
      <div className="wrap svc-grid">
        <div className="svc-side">
          <h2 className="serif" id="svc-h">Security for every <span className="italic">kind</span> of site.</h2>
          <p className="sub">From industrial plants to weddings, we deploy trained, PSARA-licensed guards matched to your site.</p>
          <a href="/services" className="btn-rect-white">See All Services</a>
        </div>
        <div className="svc-cards">
          {shown.map(([label, path]) => (
            <div className="svc-card" key={label}>
              <div className="svc-img grain"><Img src={path} alt={`${label} in Lucknow`} /></div>
              <h3 className="svc-label">{label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="why" id="why" aria-labelledby="why-h">
      <div className="why-head">
        <h2 className="why-title" id="why-h">What Sets Us Apart</h2>
      </div>
      <div className="wrap why-body">
        {/* Founder — fades in */}
        <Reveal variant="fade" className="why-founder-wrap">
          <div className="why-founder">
            <div className="why-founder-photo"><Img src="/images/founder.jpg" alt="Founder of CISS Lucknow, a retired IPS officer" /></div>
            <div className="why-founder-name">M.R. Singh</div>
            <div className="why-founder-role">Ex-Deputy Inspector General (IPS)</div>
            <ul className="why-founder-list">
              <li>Over three decades of experience serving in the Indian Police Service.</li>
              <li>Brings that same discipline and integrity to private security across UP</li>
            </ul>
          </div>
        </Reveal>

        {/* Feature grid — plain, cross-divided, thin-line icon above each title */}
        <div className="why-cards">
          {WHY.map(([icon, t, d]) => (
            <div className="why-card" key={t}>
              <div className="why-ico"><LineIcon name={icon} /></div>
              <h3 className="why-t">{t}</h3>
              <p className="why-d">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientLogos() {
  const row = (list) => [...list, ...list].map((n, i) => <span className="mq-item" key={i}>{n}</span>);
  return (
    <section className="logos" aria-labelledby="logos-h">
      <h2 className="serif" id="logos-h">Our clients &amp; partners</h2>
      <p className="lsub">Trusted by businesses and residences across Lucknow.</p>
      <div className="marquee">
        <div className="mq-track mq-a">{row(LOGOS_ROW_1)}</div>
        <div className="mq-track mq-b">{row(LOGOS_ROW_2)}</div>
      </div>
    </section>
  );
}

/* Ambient slideshow — cycles through the three step photos with a slow crossfade. */
function ProcessImage() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % STEPS.length), 3800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="proc-img">
      {STEPS.map(([n, tag, , , , img], idx) => (
        <img
          key={n}
          src={img}
          alt={`${tag} — CISS Lucknow`}
          className={"proc-img-layer" + (idx === i ? " active" : "")}
          onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
        />
      ))}
    </div>
  );
}

function Process() {
  return (
    <section id="process" className="proc" aria-labelledby="proc-h">
      <div className="proc-head">
        <h2 className="why-title" id="proc-h">A Clear Process</h2>
      </div>

      <div className="wrap">
        <div className="proc-grid">
          <ProcessImage />

          <div className="proc-list">
            {STEPS.map(([n, tag, , desc]) => (
              <div className="proc-item" key={n}>
                <div className="proc-item-head">
                  <span className="proc-circle">{n}</span>
                  <h3 className="proc-item-title">{tag}</h3>
                </div>
                <p className="proc-item-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


export function ApplyModal({ job, onClose }) {
  const [f, setF] = useState({ name: "", email: "", phone: "", message: "", company: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    if (f.company) { setStatus("sent"); return; } // honeypot
    if (!f.name.trim() || !f.phone.trim()) { setError("Please add your name and phone number."); return; }
    setError(""); setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New job application — ${job} — CISS Lucknow website`,
          from_name: "CISS Lucknow Website",
          name: f.name, email: f.email || "Not provided", phone: f.phone,
          position: job, message: f.message || "—",
        }),
      });
      const data = await res.json();
      if (data.success) setStatus("sent");
      else { setStatus("idle"); setError(data.message || "Something went wrong. Please call us directly."); }
    } catch {
      setStatus("idle");
      setError("Network error. Please try again, or call / WhatsApp us directly.");
    }
  };

  return (
    <div className="modal-back" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Apply for ${job}`}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Close">&times;</button>
        {status === "sent" ? (
          <div style={{ padding: "30px 0", textAlign: "center" }}>
            <h2 className="serif">Application received.</h2>
            <p className="m-sub">Thanks for applying for {job}. We&rsquo;ll call you back shortly.</p>
            <button className="cf-submit" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h2 className="serif">Apply for <span className="italic">{job}</span></h2>
            <p className="m-sub">Share your details and we&rsquo;ll call you back to schedule an interview.</p>
            <form onSubmit={submit}>
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hp"
                value={f.company} onChange={set("company")} aria-hidden="true" />
              <div className="cf-field">
                <label htmlFor="a-name">Name</label>
                <input id="a-name" value={f.name} onChange={set("name")} required />
              </div>
              <div className="cf-field">
                <label htmlFor="a-phone">Phone / WhatsApp</label>
                <input id="a-phone" type="tel" value={f.phone} onChange={set("phone")} required />
              </div>
              <div className="cf-field">
                <label htmlFor="a-email">Email</label>
                <input id="a-email" type="email" value={f.email} onChange={set("email")} />
              </div>
              {error && <div className="cf-err">{error}</div>}
              <button className="cf-submit" type="submit" disabled={status === "sending"}
                style={{ opacity: status === "sending" ? 0.7 : 1 }}>
                {status === "sending" ? "Sending…" : "Submit Application"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Testimonials() {
  const ref = useRef(null);
  const paused = useRef(false);
  const nudging = useRef(false);
  const timer = useRef(null);
  const nudgeTimer = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let raf;
    const tick = () => {
      if (!nudging.current) {
        if (!paused.current && !reduce) el.scrollLeft += 0.4;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        else if (el.scrollLeft < 0) el.scrollLeft += half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const pause = () => { paused.current = true; clearTimeout(timer.current); };
    const resume = () => { clearTimeout(timer.current); timer.current = setTimeout(() => (paused.current = false), 1800); };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });
    el.addEventListener("wheel", () => { pause(); resume(); }, { passive: true });
    return () => { cancelAnimationFrame(raf); clearTimeout(timer.current); clearTimeout(nudgeTimer.current); };
  }, []);

  const by = (dir) => {
    const el = ref.current;
    if (!el) return;
    paused.current = true;
    nudging.current = true;
    clearTimeout(nudgeTimer.current);
    el.scrollBy({ left: dir * (el.children[0]?.getBoundingClientRect().width + 16 || 360), behavior: "smooth" });
    nudgeTimer.current = setTimeout(() => {
      nudging.current = false;
      timer.current = setTimeout(() => (paused.current = false), 1500);
    }, 620);
  };

  const loop = [...TESTI, ...TESTI];
  return (
    <section className="tst" id="clients" aria-labelledby="cl-h">
      <div className="tst-head">
        <h2 className="why-title" id="cl-h">What Our Clients Say</h2>
      </div>
      <div className="tst-scroll" ref={ref}>
        {loop.map((t, i) => (
          <div className="tst-slide" key={i}>
            <div className="tst-card">
              <div className="tst-top">
                <div className="tst-avatar"><Img src={t.img} alt={t.name} /></div>
                <div>
                  <div className="tst-person-name">{t.name}</div>
                  <div className="tst-person-role">{t.role} &middot; {t.logo}</div>
                </div>
              </div>
              <blockquote className="tst-quote">{t.quote}</blockquote>
              <div className="tst-stats">
                {[t.s1, t.s2].map(([nn, ll]) => (
                  <div className="tst-stat" key={ll}>
                    <div className="n">{nn}</div><div className="l">{ll}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="tst-arrows">
        <button className="tst-arrow" onClick={() => by(-1)} aria-label="Previous testimonial">&larr;</button>
        <button className="tst-arrow" onClick={() => by(1)} aria-label="Next testimonial">&rarr;</button>
      </div>
    </section>
  );
}

function FAQ({ onContact }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" id="faq" aria-labelledby="faq-h">
      <div className="wrap faq-grid">
        <div className="faq-side">
          <h2 className="faq-title" id="faq-h">FAQs</h2>
          <button type="button" className="btn-rect" onClick={onContact}>Get in Touch</button>
        </div>
        <div className="faq-list">
          {FAQS.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div className="faq-item" key={q}>
                <button
                  type="button"
                  className="faq-q"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{q}</span>
                  <span className={"faq-toggle" + (isOpen ? " open" : "")} aria-hidden="true">+</span>
                </button>
                {isOpen && (
                  <div className="faq-a">
                    {a.split("\n\n").map((p, pi) => <p key={pi}>{p}</p>)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [f, setF] = useState({ name: "", phone: "", service: "", message: "", company: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (f.company) { setStatus("sent"); return; } // honeypot
    if (!f.name.trim() || !f.phone.trim()) { setError("Please add your name and phone number."); return; }
    setError(""); setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "New security enquiry — CISS Lucknow website",
          from_name: "CISS Lucknow Website",
          name: f.name, phone: f.phone,
          service: f.service || "Not specified",
          message: f.message || "\u2014",
        }),
      });
      const data = await res.json();
      if (data.success) setStatus("sent");
      else { setStatus("idle"); setError(data.message || "Something went wrong. Please try again, or call us directly."); }
    } catch {
      setStatus("idle");
      setError("Network error. Please try again, or call / WhatsApp us directly.");
    }
  };

  return (
    <section className="cform" id="contact" aria-labelledby="ct-h">
      <div className="wrap cf-grid">
        <div className="cf-side">
          <h2 className="cf-title" id="ct-h">Request a free assessment</h2>
          <div className="cf-reach">
            <div className="k">Reach us directly</div>
            <p className="d">
              Phone / WhatsApp: <a href={`tel:${PHONE_TEL}`}>{PHONE}</a><br />
              Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a><br />
              {ADDRESS}
            </p>
            <a className="cf-maplink" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
              View on Google Maps &rarr;
            </a>
          </div>
        </div>

        {status === "sent" ? (
          <div className="cf-form-min">
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Thanks &mdash; we&rsquo;ll be in touch shortly.</div>
            <div style={{ fontSize: 13.5, color: "#aeb7c6", marginTop: 8 }}>
              Your request has reached our team. For anything urgent, call or WhatsApp us directly.
            </div>
          </div>
        ) : (
          <form className="cf-form-min" onSubmit={submit}>
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hp"
              value={f.company} onChange={set("company")} aria-hidden="true" />
            <div className="cf-field-min">
              <input id="c-name" placeholder="Your Name" aria-label="Your name" value={f.name} onChange={set("name")} required />
            </div>
            <div className="cf-field-min">
              <input id="c-phone" type="tel" placeholder="Your Phone / WhatsApp" aria-label="Your phone number" value={f.phone} onChange={set("phone")} required />
            </div>
            <div className="cf-field-min">
              <select id="c-svc" aria-label="Service needed" value={f.service} onChange={set("service")}>
                <option value="">Service needed (optional)</option>
                {SERVICES.map(([s]) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="cf-field-min">
              <textarea id="c-msg" rows={3} placeholder="Your Message" aria-label="Your message" value={f.message} onChange={set("message")} />
            </div>
            {error && <div className="cf-err">{error}</div>}
            <button className="cf-submit-min" type="submit" disabled={status === "sending"}
              style={{ opacity: status === "sending" ? 0.7 : 1 }}>
              {status === "sending" ? "Sending\u2026" : "Request Assessment"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <div className="mapwrap">
      <iframe src={MAPS_EMBED} title="CISS Lucknow office location on Google Maps"
        loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      {/* <div className="map-card">
        <div className="t">CISS Lucknow</div>
        <p className="a">{ADDRESS}</p>
        <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">Get directions &rarr;</a>
      </div> */}
    </div>
  );
}

export function Footer({ onQuote }) {
  const cols = [
    ["Services", [["Security Guards", "#services"], ["Bouncers & VIP", "#services"], ["Event Security", "#services"], ["Cash Van", "#services"]]],
    ["Company", [["Why CISS", "#why"], ["Our Process", "#process"], ["Careers", "#careers"], ["Clients", "#clients"], ["Contact", "#contact"]]],
    ["Contact", [[PHONE, `tel:${PHONE_TEL}`], ["Email us", `mailto:${EMAIL}`], ["Find us", MAPS_LINK]]],
    ["Legal", [["PSARA License", "#"], ["Privacy", "#"], ["Terms", "#"]]],
  ];
  return (
    <footer className="footer2">
      <div className="wrap footer2-top">
        <div className="footer2-brand-block">
          <div className="footer2-brand">
            <img className="footer2-logo" src="/images/logo.png" alt="" />
            <span className="footer2-name">CISS</span>
          </div>
          <p className="footer2-addr">{ADDRESS}</p>
          <div className="footer2-social">
            <a className="footer2-circle" href={`tel:${PHONE_TEL}`} aria-label="Call us">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2.2z" />
              </svg>
            </a>
            <a className="footer2-circle" href={`mailto:${EMAIL}`} aria-label="Email us">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16v16H4z" /><path d="m4 4 8 8 8-8" />
              </svg>
            </a>
            <a className="footer2-circle" href={MAPS_LINK} target="_blank" rel="noopener noreferrer" aria-label="Find us on Google Maps">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer2-links">
          {cols.map(([h, links]) => (
            <div className="footer2-col" key={h}>
              <h3>{h}</h3>
              {links.map(([l, href]) => <a href={href} key={l}>{l}</a>)}
            </div>
          ))}
          <button type="button" className="btn-rect footer2-cta" onClick={onQuote}>Get a Quote</button>
        </div>
      </div>

      <div className="wrap footer2-bottom">
        <span>&copy; {new Date().getFullYear()} CISS Lucknow &mdash; Civil &amp; Industrial Security Services.</span>
        <span>Lucknow, Uttar Pradesh</span>
      </div>
    </footer>
  );
}

// ============ PAGE ============
export default function Site() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const openQuote = useCallback(() => setQuoteOpen(true), []);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);

  const [contactOpen, setContactOpen] = useState(false);
  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);

  const [applyJob, setApplyJob] = useState(null);
  const openApply = useCallback((job) => setApplyJob(job), []);
  const closeApply = useCallback(() => setApplyJob(null), []);

  return (
    <div className="pw">
      <Nav onQuote={openQuote} />
      <Hero onContact={openContact} />
      <NoticeBoard onApply={openApply} />
      <Services />
      <WhyUs />

      <Process />
      <Testimonials />
      <FAQ onContact={openContact} />
      <ContactForm />
      <MapSection />
      <Footer onQuote={openQuote} />
      {quoteOpen && <QuoteModal onClose={closeQuote} />}
      {contactOpen && <ContactModal onClose={closeContact} />}
      {applyJob && <ApplyModal job={applyJob} onClose={closeApply} />}
    </div>
  );
}
