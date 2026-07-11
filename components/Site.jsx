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
const ADDRESS = "[Office address], Lucknow, Uttar Pradesh";
// Google Maps: replace with your exact address or business name
const MAPS_QUERY = "Civil Industrial Security Services Lucknow";
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`;

// ============ DATA ============
const SERVICES = [
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
const MOCK_SERVICES = [
  "Industrial & Factory Security",
  "School & College Security",
  "Mall & Cinema Security",
  "Event & Wedding Security",
  "Women Security Guards",
];

const WHY = [
  ["check", "Rigorously Vetted Guards", "Police verification, background checks, and physical fitness screening on every single hire."],
  ["clock", "24/7 Rapid Response", "A live control room and Quick Response Team, reachable any hour, any day of the year."],
  ["doc", "100% PSARA Compliant", "Fully licensed under PSARA, with PF, ESI and statutory paperwork handled for you."],
  ["star", "Trained & Turned Out", "Regular drills, fire and first-aid basics, and a smart uniformed presence that reflects on you."],
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

// Client / partner names — swap for <img src="/images/clients/logos/x.svg" /> when you have real logos
const LOGOS_ROW_1 = ["HALDEN ESTATE", "AURA MALL", "NIRMAN GROUP", "SHREE TEXTILES", "AVADH HOSPITAL", "LUCKNOW HEIGHTS"];
const LOGOS_ROW_2 = ["GOMTI RESIDENCY", "KISAN COLD STORAGE", "ROYAL BANQUETS", "UNITY BANK", "CAPITAL MOTORS", "ORION SCHOOL"];

const NAV = [["Services", "#services"], ["Why Us", "#why"], ["Process", "#process"], ["Clients", "#clients"], ["Contact", "#contact"]];

// ============ HELPERS ============
// Cycles through phrases with a type / pause / delete effect.
function useTypewriter(words, { type = 70, del = 40, hold = 1400 } = {}) {
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

const LineIcon = ({ name, size = 22 }) => {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  const map = {
    shield: <path {...p} d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
    check: <><path {...p} d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" /><path {...p} d="M9 11l2 2 4-4" /></>,
    clock: <><circle {...p} cx="12" cy="12" r="8" /><path {...p} d="M12 8v4l3 2" /></>,
    doc: <><path {...p} d="M6 3h8l4 4v14H6z" /><path {...p} d="M9 13l2 2 4-4" /></>,
    star: <path {...p} d="M12 4l2.3 4.7 5.2.8-3.8 3.6.9 5.1L12 15.9 7.4 18.3l.9-5.1L4.5 9.5l5.2-.8z" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">{map[name]}</svg>;
};

/* Optional image: renders <img> if the file exists, else shows the path placeholder */
function Img({ src, alt }) {
  const [ok, setOk] = useState(true);
  if (!ok) return <span className="focus-path">{src}</span>;
  return <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} />;
}

// ============ FOCUS CAROUSEL ============
/* Auto-scrolls; centre card renders in colour. Arrow buttons work because the
   rAF loop stands down while a manual nudge animates (this was the old bug). */
function FocusCarousel({ items, renderCard, cardClass }) {
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

    const focus = () => {
      const box = el.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const radius = box.width * 0.5;
      for (const child of el.children) {
        const r = child.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - cx);
        const ratio = Math.max(0, Math.min(1, 1 - d / radius));
        const eased = ratio * ratio;
        child.style.filter = `grayscale(${(1 - eased) * 100}%) brightness(${0.82 + eased * 0.18})`;
        child.style.transform = `scale(${0.9 + eased * 0.1})`;
        child.style.opacity = `${0.55 + eased * 0.45}`;
        child.style.zIndex = eased > 0.5 ? "2" : "1";
        const ov = child.querySelector(".focus-overlay");
        if (ov) ov.style.opacity = `${Math.max(0, (eased - 0.55) / 0.45)}`;
      }
    };

    const tick = () => {
      if (!nudging.current) {
        if (!paused.current && !reduce) el.scrollLeft += 0.45;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        else if (el.scrollLeft < 0) el.scrollLeft += half;
      }
      focus();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const pause = () => { paused.current = true; clearTimeout(timer.current); };
    const resume = () => { clearTimeout(timer.current); timer.current = setTimeout(() => (paused.current = false), 1600); };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });
    el.addEventListener("wheel", () => { pause(); resume(); }, { passive: true });
    el.scrollLeft = el.scrollWidth * 0.08;

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer.current);
      clearTimeout(nudgeTimer.current);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, [items]);

  const nudge = (dir) => {
    const el = ref.current;
    if (!el) return;
    paused.current = true;
    nudging.current = true; // stop the loop fighting the smooth scroll
    clearTimeout(nudgeTimer.current);
    clearTimeout(timer.current);
    const w = el.children[0]?.getBoundingClientRect().width || 240;
    el.scrollBy({ left: dir * (w + 16), behavior: "smooth" });
    nudgeTimer.current = setTimeout(() => {
      nudging.current = false;
      timer.current = setTimeout(() => (paused.current = false), 1400);
    }, 620);
  };

  const loop = [...items, ...items];
  return (
    <>
      <div className="fc-scroll" ref={ref}>
        {loop.map((it, i) => (
          <div className={"focus-card " + cardClass} key={i}>{renderCard(it, i)}</div>
        ))}
      </div>
      <div className="fc-arrows">
        <button className="fc-arrow" onClick={() => nudge(-1)} aria-label="Previous">&larr;</button>
        <button className="fc-arrow" onClick={() => nudge(1)} aria-label="Next">&rarr;</button>
      </div>
    </>
  );
}

// ============ QUOTE MODAL ============
function QuoteModal({ onClose }) {
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

// ============ SECTIONS ============
function Nav({ onQuote }) {
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
          <button className="pill pill-gold" onClick={onQuote}>Get a Quote</button>
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

/* Right-hand visual: a "find your guard" product moment.
   Search card -> matched guard result, with annotation chips. */
function Sparkle({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <path d="M12 1.5l2.1 6.3 6.4 2.2-6.4 2.2L12 18.5l-2.1-6.3L3.5 10l6.4-2.2z"
        fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function HeroMock() {
   const typed = useTypewriter(MOCK_SERVICES);
  return (
    <div className="mock" aria-hidden="true">
      <Sparkle className="mock-sparkle" />

      {/* the "search" card */}
      <div className="mock-search">
        <div className="mock-field active">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor"
            strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
          </svg>
          <span>{typed}<span className="type-caret" /></span>
        </div>
        <div className="mock-skeleton">
          <i /><b />
        </div>
        <div className="mock-field muted">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor"
            strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          <span>Gomti Nagar, Lucknow</span>
        </div>
      </div>

      {/* the matched result */}
      <div className="mock-result">
        <div className="mock-photo">
          <img className="mock-badge" src="/images/logo.png" alt="" />
        </div>
        <div className="mock-meta">
          <div className="mock-name">Guard matched<span className="mock-caret" /></div>
          <div className="mock-sub">Deployed in 48 hrs</div>
        </div>
      </div>

      {/* annotation chips */}
      <span className="chip chip-verified"><i /> Verified</span>
      <span className="chip chip-psara"><i /> PSARA</span>
      <span className="chip chip-247"><i /> 24&times;7</span>
    </div>
  );
}

function Hero({ onQuote }) {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 className="serif">Find your <span className="italic">guard</span>, not just an agency</h1>
          <p className="sub">Vetted, PSARA-licensed guards matched to your site &mdash; and a team that stays on watch long after day one.</p>
          <div className="hero-cta">
            <button className="pill pill-white" onClick={onQuote}>Talk to us <span className="arrow-circ" aria-hidden="true">&rarr;</span></button>
            <a href="#services" className="pill pill-grey" style={{ textDecoration: "none" }}>View services</a>
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
        <div className="hero-visual"><HeroMock /></div>
      </div>
    </header>
  );
}

function Services() {
  return (
    <section className="svc" id="services" aria-labelledby="svc-h">
      <div className="wrap" style={{ textAlign: "center" }}>
        <span className="eyebrow">Our Services</span>
        <h2 className="serif" id="svc-h">Security for every <span className="italic">kind</span> of site.</h2>
      </div>
      <div style={{ marginTop: 30 }}>
        <FocusCarousel
          items={SERVICES}
          cardClass="svc-card"
          renderCard={([label, path]) => (
            <>
              <div className="focus-img svc-img"><Img src={path} alt={`${label} in Lucknow`} /></div>
              <h3 className="svc-label">{label}</h3>
              <div className="svc-arrow" aria-hidden="true">&rarr;</div>
            </>
          )}
        />
        <p className="hint">14 services &mdash; swipe or use the arrows</p>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="sec" id="why" aria-labelledby="why-h">
      <div className="sec-head">
        <span className="eyebrow dark">Why Us</span>
        <h2 className="serif" id="why-h">What sets us <span className="italic">apart</span></h2>
        <p className="sub">Anyone can put a person in a uniform. Here&rsquo;s what makes our watch different.</p>
      </div>
      <div className="why-grid">
        {/* Founder card — fades in */}
        <Reveal variant="fade" className="why-founder-wrap">
          <div className="why-founder">
            <div className="photo"><Img src="/images/founder.jpg" alt="Founder of CISS Lucknow, a retired IPS officer" /></div>
            <div className="body">
              <span className="badge">Founder &middot; Former IPS Officer</span>
              <div className="name">[Founder Name]</div>
              <div className="role">IPS (Retd.) &middot; Ex-Superintendent of Police</div>
              <p className="blurb">
                Over two decades in the Indian Police Service. After a distinguished career in law
                enforcement, he founded CISS to bring that same discipline, integrity, and command
                to private security across Lucknow.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Feature cards — swipe up, staggered */}
        <div className="why-cards">
          {WHY.map(([icon, t, d], i) => (
            <Reveal key={t} variant="rise" delay={i * 110}>
              <div className="why-card">
                <div className="why-ico"><LineIcon name={icon} /></div>
                <h3 className="why-t">{t}</h3>
                <p className="why-d">{d}</p>
              </div>
            </Reveal>
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

function Process() {
  const isD = useIsDesktop();
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const sentinels = useRef([]);
  const lockRef = useRef(false);
  const settleRef = useRef(null);

  useEffect(() => () => clearInterval(settleRef.current), []);

  // Scroll → active step. Listens on `document` in the capture phase so it works
  // whether the page scrolls on `window` or inside a nested scroll container.
  useEffect(() => {
    const onScroll = () => {
      if (lockRef.current) return;
      const t = trackRef.current;
      if (!t) return;
      const vh = window.innerHeight;
      const total = t.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-t.getBoundingClientRect().top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setActive(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length * 0.999)));
    };
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
    };
  }, [isD]);

  // Jump to a step by scrolling its sentinel into view (container-agnostic).
  // The lock is released only once the smooth scroll has *settled* — a fixed
  // timer would expire mid-flight and snap the step back.
  const goTo = useCallback((i) => {
    const idx = Math.max(0, Math.min(STEPS.length - 1, i));
    const target = sentinels.current[idx];
    if (!target) return;
    setActive(idx);
    lockRef.current = true;
    clearInterval(settleRef.current);
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    let last = null;
    let stable = 0;
    let ticks = 0;
    settleRef.current = setInterval(() => {
      const t = trackRef.current;
      const pos = t ? Math.round(t.getBoundingClientRect().top) : 0;
      if (pos === last) stable += 1;
      else stable = 0;
      last = pos;
      ticks += 1;
      // settled for ~150ms, or hard stop after 3s
      if (stable >= 3 || ticks > 60) {
        clearInterval(settleRef.current);
        lockRef.current = false;
      }
    }, 50);
  }, []);

  const [n, tag, title, desc, get, img] = STEPS[active];

  return (
    <section id="process" aria-labelledby="proc-h">
      <div ref={trackRef} className="proc-track" style={{ height: `${STEPS.length * 90}vh` }}>
        {/* invisible scroll targets, one per step */}
        {STEPS.map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            ref={(el) => (sentinels.current[i] = el)}
            className="proc-sentinel"
            style={{ top: `${i * 90}vh` }}
          />
        ))}

        <div className="proc-sticky">
          <div className="wrap">
            {/* heading lives inside the pinned frame so it stays with the step */}
            <div className="proc-head">
              <span className="eyebrow dark">Process</span>
              <h2 className="serif" id="proc-h">A clear <span className="italic">process</span>, from first call to daily watch</h2>
            </div>

            {/* mobile step pills */}
            {!isD && (
              <div className="proc-mrail">
                {STEPS.map(([sn, stag], i) => (
                  <button key={sn} className={"proc-dot" + (i === active ? " active" : "")}
                    onClick={() => goTo(i)} aria-current={i === active}>
                    {sn} &middot; {stag}
                  </button>
                ))}
              </div>
            )}

            <div className="proc-grid">
              {isD && (
                <div className="proc-rail">
                  {STEPS.map(([sn, stag], i) => (
                    <button key={sn} className={"proc-step" + (i === active ? " active" : "")}
                      onClick={() => goTo(i)} aria-current={i === active}>
                      <span className="proc-num">{sn}</span> {stag}
                    </button>
                  ))}
                  {/* down arrow sits under the three step buttons */}
                  {/* <div className="proc-next">
                    <button onClick={() => goTo(active + 1)} disabled={active >= STEPS.length - 1}
                      aria-label="Next step">&darr;</button>
                  </div> */}
                </div>
              )}

              <div className="proc-img proc-fade" key={"i" + active}>
                <Img src={img} alt={`${title} — CISS Lucknow`} />
              </div>

              <div className="proc-card proc-fade" key={"c" + active}>
                <div className="proc-tag">Step {n}</div>
                <h3 className="proc-title">{title}</h3>
                <p className="proc-desc">{desc}</p>
                <div className="proc-get">
                  <div className="k">What you get</div>
                  <div className="v">{get}</div>
                </div>
              </div>
            </div>

            {!isD && (
              <div className="proc-next">
                <button onClick={() => goTo(active + 1)} disabled={active >= STEPS.length - 1}
                  aria-label="Next step">&darr;</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
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
    <section className="sec" id="clients" aria-labelledby="cl-h" style={{ paddingTop: 34, paddingBottom: 30 }}>
      <div className="sec-head">
        <span className="eyebrow dark">Clients</span>
        <h2 className="serif" id="cl-h">What our clients <span className="italic">say</span></h2>
      </div>
      <div className="tst-scroll" ref={ref}>
        {loop.map((t, i) => (
          <div className="tst-slide" key={i}>
            <div className="tst-img">
              <Img src={t.img} alt={`${t.name}, ${t.role}`} />
              <div className="tst-logo">{t.logo}</div>
              <div className="tst-name">
                <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                <div style={{ fontSize: 12, opacity: 0.85 }}>{t.role}</div>
              </div>
            </div>
            <div className="tst-review">
              <blockquote className="tst-quote" style={{ margin: 0 }}>{t.quote}</blockquote>
              <div>
                <div className="tst-stats">
                  {[t.s1, t.s2].map(([nn, ll]) => (
                    <div className="tst-stat" key={ll}>
                      <div className="n">{nn}</div><div className="l">{ll}</div>
                    </div>
                  ))}
                </div>
                <button className="pill pill-grey" style={{ padding: "12px 22px" }}>Read story</button>
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
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Get Started</span>
          <h2 className="serif" id="ct-h">Request a free <span className="italic">assessment</span></h2>
          <p className="sub">Tell us about your site. We&rsquo;ll respond within a few hours &mdash; we&rsquo;re available 24/7 for urgent needs.</p>
        </div>
        <div className="cf-grid">
          <div className="cf-side">
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

          {status === "sent" ? (
            <div className="cf-form">
              <div style={{ padding: "40px 6px", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Thanks &mdash; we&rsquo;ll be in touch shortly.</div>
                <div style={{ fontSize: 13.5, color: "#aeb7c6", marginTop: 8 }}>
                  Your request has reached our team. For anything urgent, call or WhatsApp us directly.
                </div>
              </div>
            </div>
          ) : (
            <form className="cf-form" onSubmit={submit}>
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hp"
                value={f.company} onChange={set("company")} aria-hidden="true" />
              <div className="cf-field">
                <label htmlFor="c-name">Name</label>
                <input id="c-name" value={f.name} onChange={set("name")} required />
              </div>
              <div className="cf-field">
                <label htmlFor="c-phone">Phone / WhatsApp</label>
                <input id="c-phone" type="tel" value={f.phone} onChange={set("phone")} required />
              </div>
              <div className="cf-field">
                <label htmlFor="c-svc">Service needed</label>
                <select id="c-svc" value={f.service} onChange={set("service")}>
                  <option value="">Select a service</option>
                  {SERVICES.map(([s]) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="cf-field">
                <label htmlFor="c-msg">Message</label>
                <textarea id="c-msg" rows={3} value={f.message} onChange={set("message")} />
              </div>
              {error && <div className="cf-err">{error}</div>}
              <button className="cf-submit" type="submit" disabled={status === "sending"}
                style={{ opacity: status === "sending" ? 0.7 : 1 }}>
                {status === "sending" ? "Sending\u2026" : "Request Assessment"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <div className="mapwrap">
      <iframe src={MAPS_EMBED} title="CISS Lucknow office location on Google Maps"
        loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      <div className="map-card">
        <div className="t">CISS Lucknow</div>
        <p className="a">{ADDRESS}</p>
        <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">Get directions &rarr;</a>
      </div>
    </div>
  );
}

function Footer({ onQuote }) {
  const cols = [
    ["Services", [["Security Guards", "#services"], ["Bouncers & VIP", "#services"], ["Event Security", "#services"], ["Cash Van", "#services"]]],
    ["Company", [["Why CISS", "#why"], ["Our Process", "#process"], ["Clients", "#clients"], ["Contact", "#contact"]]],
    ["Contact", [[PHONE, `tel:${PHONE_TEL}`], ["Email us", `mailto:${EMAIL}`], ["Find us", MAPS_LINK]]],
    ["Legal", [["PSARA License", "#"], ["Privacy", "#"], ["Terms", "#"]]],
  ];
  return (
    <footer className="footer">
      <div className="footer-card">
        <div className="footer-promo">
          <img src="/images/logo-white.png" alt="CISS Lucknow" />
          <div className="pt">Security you can stand behind.</div>
          <button className="pb" onClick={onQuote}>Get a Quote &rarr;</button>
        </div>
        <div>
          <div className="footer-links">
            {cols.map(([h, links]) => (
              <div className="fcol" key={h}>
                <h3>{h}</h3>
                {links.map(([l, href]) => <a href={href} key={l}>{l}</a>)}
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} CISS Lucknow &mdash; Civil &amp; Industrial Security Services.</span>
            <span>Lucknow, Uttar Pradesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============ PAGE ============
export default function Site() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const openQuote = useCallback(() => setQuoteOpen(true), []);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);

  return (
    <div className="pw">
      <Nav onQuote={openQuote} />
      <Hero onQuote={openQuote} />
      <Services />
      <WhyUs />
      <ClientLogos />
      <Process />
      <Testimonials />
      <ContactForm />
      <MapSection />
      <Footer onQuote={openQuote} />
      {quoteOpen && <QuoteModal onClose={closeQuote} />}
    </div>
  );
}
