"use client";
import React, { useEffect, useRef, useState } from "react";

/*
  CISS Lucknow — full site (People Work language, gold/navy)
  Sections: Nav · Hero · Services · Why Us (scattered) · Process (scroll
  stepper) · Testimonials · Contact form · Footer.
  Fonts: Instrument Serif + Inter (loaded in globals.css).
  Placeholders: all /images/* paths, copy, stats, contact details.
  Contact form is UI-only (wiring is a later step).
*/



// ---------- helpers ----------
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

const LineIcon = ({ name, size = 22 }) => {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  const map = {
    shield: <path {...p} d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
    check: <><path {...p} d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" /><path {...p} d="M9 11l2 2 4-4" /></>,
    clock: <><circle {...p} cx="12" cy="12" r="8" /><path {...p} d="M12 8v4l3 2" /></>,
    doc: <><path {...p} d="M6 3h8l4 4v14H6z" /><path {...p} d="M9 13l2 2 4-4" /></>,
    star: <path {...p} d="M12 4l2.3 4.7 5.2.8-3.8 3.6.9 5.1L12 15.9 7.4 18.3l.9-5.1L4.5 9.5l5.2-.8z" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24">{map[name]}</svg>;
};

// ---------- focus carousel ----------
function FocusCarousel({ items, renderCard, cardClass }) {
  const ref = useRef(null);
  const paused = useRef(false);
  const timer = useRef(null);
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
        const ccx = r.left + r.width / 2;
        const d = Math.abs(ccx - cx);
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
      if (!paused.current && !reduce) {
        el.scrollLeft += 0.45;
      }
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else if (el.scrollLeft < 0) el.scrollLeft += half;
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
    return () => { cancelAnimationFrame(raf); clearTimeout(timer.current); };
  }, [items]);
  const nudge = (dir) => {
    const el = ref.current;
    if (!el) return;
    const w = el.children[0]?.getBoundingClientRect().width || 240;
    el.scrollBy({ left: dir * (w + 16), behavior: "smooth" });
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

// ---------- data ----------
const HERO_CARDS = [
  ["/images/carousel/1.jpg", "On-site guard", "Corporate HQ, Hazratganj"],
  ["/images/carousel/2.jpg", "Event security", "Wedding, Gomti Nagar"],
  ["/images/carousel/3.jpg", "Rajesh, Supervisor", "\u201CDisciplined, calm, always alert.\u201D"],
  ["/images/carousel/4.jpg", "Lady guard", "Mall frisking team"],
  ["/images/carousel/5.jpg", "Night patrol", "Industrial estate"],
];
const SERVICES = [
  ["Industrial & Factory", "/images/services/industrial.jpg"],
  ["Corporate & Office", "/images/services/corporate.jpg"],
  ["Residential & Apartment", "/images/services/residential.jpg"],
  ["Bank & ATM", "/images/services/bank.jpg"],
  ["Hotel & Hospitality", "/images/services/hotel.jpg"],
  ["School & College", "/images/services/school.jpg"],
  ["Events & Wedding", "/images/services/events.jpg"],
  ["Bouncers & VIP", "/images/services/bouncers.jpg"],
  ["Cash Van Services", "/images/services/cashvan.jpg"],
  ["Women Security Guards", "/images/services/women.jpg"],
  ["Ex-Servicemen Supervisors", "/images/services/exservice.jpg"],
  ["Mall & Cinema", "/images/services/mall.jpg"],
  ["Construction & Property", "/images/services/construction.jpg"],
  ["24/7 General Guard", "/images/services/general.jpg"],
];
const WHY = [
  ["shield", "Ex-Defense Leadership", "Founded and led by ex-servicemen \u2014 real command experience, not clipboard managers.", { left: 10, top: 12, rot: -3 }],
  ["check", "Rigorously Vetted Guards", "Police verification, background checks, and physical fitness screening on every single hire.", { left: 358, top: 0, rot: 2 }],
  ["clock", "24/7 Rapid Response", "A live control room and Quick Response Team, reachable any hour, any day of the year.", { left: 700, top: 44, rot: -2 }],
  ["doc", "100% PSARA Compliant", "Fully licensed under PSARA, with PF, ESI and statutory paperwork handled for you.", { left: 150, top: 300, rot: 3 }],
  ["star", "Trained & Turned Out", "Regular drills, fire and first-aid basics, and a smart uniformed presence that reflects on you.", { left: 520, top: 322, rot: -1.5 }],
];
const STEPS = [
  ["01", "Consult", "We assess your security needs", "We start with a site visit and a straight conversation \u2014 mapping your risks, entry points, shift timings, and the kind of presence you need. No jargon, no obligation.", "A clear security plan and a transparent quote.", "/images/process/consult.jpg"],
  ["02", "Deploy", "We hire, vet & match guards", "Based on the assessment, we handpick guards, run background and police checks, and match the right personnel and supervisor to your site \u2014 briefed on your specific protocols.", "Trained, verified guards deployed and ready from day one.", "/images/process/deploy.jpg"],
  ["03", "Support", "All-time support & monitoring", "After deployment we stay hands-on \u2014 supervisor rounds, muster monitoring, quick replacements, and a 24/7 control room \u2014 so standards never slip over time.", "Consistent protection that holds up long after day one.", "/images/process/support.jpg"],
];
const TESTI = [
  { img: "/images/clients/1.jpg", logo: "HALDEN ESTATE", name: "R. Verma", role: "Facility Head, Gomti Nagar", quote: "\u201CTheir guards are punctual, disciplined, and genuinely alert. We finally stopped worrying about our premises.\u201D", s1: ["-40%", "Security incidents"], s2: ["24/7", "Coverage"] },
  { img: "/images/clients/2.jpg", logo: "AURA MALL", name: "S. Khan", role: "Operations Manager", quote: "\u201CCrowd control at our events is seamless now. The bouncer team is professional and never over-steps.\u201D", s1: ["12+", "Events secured"], s2: ["0", "Incidents"] },
  { img: "/images/clients/3.jpg", logo: "NIRMAN GROUP", name: "A. Tripathi", role: "Site Director", quote: "\u201CEven our remote construction sites feel covered. Replacements are fast and supervision is real.\u201D", s1: ["6", "Sites covered"], s2: ["100%", "Compliance"] },
];
const NAV = [["Services", "#services"], ["Why Us", "#why"], ["Process", "#process"], ["Clients", "#clients"], ["Contact", "#contact"]];

// ---------- sections ----------
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav">
      <div className="nav-bar">
        <span className="logo">CISS<sup>™</sup></span>
        <ul className="nav-links">
          {NAV.map(([l, h]) => <li key={l}><a href={h}>{l}</a></li>)}
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button className="pill pill-gold">Get a Quote</button>
          <button className="hamburger" aria-label="Menu" onClick={() => setOpen((o) => !o)}><span /><span /><span /></button>
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

function Hero() {
  return (
    <header className="hero">
      <div className="wrap">
        <img className="hero-logo" src="/images/logo.png" alt="CISS Lucknow logo" />
        <h1 className="serif">Protection that&rsquo;s <span className="italic">never</span> off duty</h1>
        <p className="sub">Trained, vetted guards and 24&times;7 protection for businesses, events, and homes across Lucknow.</p>
        <div className="hero-cta">
          <button className="pill pill-white">Talk to us <span className="arrow-circ">&rarr;</span></button>
          <button className="pill pill-grey">View services</button>
        </div>
      </div>
      <FocusCarousel
        items={HERO_CARDS}
        cardClass="hero-card"
        renderCard={([path, name, role]) => (
          <>
            <div className="focus-img"><span className="focus-path">{path}</span></div>
            <div className="focus-cap focus-overlay">
              <div className="hero-name">{name}</div>
              <div className="hero-role">{role}</div>
            </div>
          </>
        )}
      />
      <div className="hint" style={{ color: "#7d827c" }}>&larr; guards &amp; locations, auto-scrolling &rarr;</div>
    </header>
  );
}

function Services() {
  return (
    <section className="svc" id="services">
      <div className="wrap" style={{ textAlign: "center" }}>
        <span className="eyebrow">Our Services</span>
        <h2 className="serif">Security for every <span className="italic">kind</span> of site.</h2>
      </div>
      <div style={{ marginTop: 30 }}>
        <FocusCarousel
          items={SERVICES}
          cardClass="svc-card"
          renderCard={([label, path]) => (
            <>
              <div className="focus-img svc-img"><span className="focus-path">{path}</span></div>
              <div className="svc-label">{label}</div>
              <div className="svc-arrow">&rarr;</div>
            </>
          )}
        />
        <div className="hint">14 services &mdash; the one in focus shows in colour</div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="sec" id="why">
      <div className="sec-head">
        <span className="eyebrow dark">Why Us</span>
        <h2 className="serif">What sets us <span className="italic">apart</span></h2>
        <p className="sub">Anyone can put a person in a uniform. Here&rsquo;s what makes our watch different.</p>
      </div>
      <div className="wrap">
        <div className="why-wrap">
          {WHY.map(([icon, t, d, pos]) => (
            <div
              key={t}
              className="why-card"
              style={{ left: pos.left, top: pos.top, transform: `rotate(${pos.rot}deg)` }}
            >
              <div className="why-ico"><LineIcon name={icon} /></div>
              <div className="why-t">{t}</div>
              <div className="why-d">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const isD = useIsDesktop();
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  useEffect(() => {
    if (!isD) return;
    const onScroll = () => {
      const t = trackRef.current;
      if (!t) return;
      const rect = t.getBoundingClientRect();
      const total = t.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setActive(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isD]);

  const Head = (
    <div className="sec-head" style={{ paddingTop: 60 }}>
      <span className="eyebrow dark">Process</span>
      <h2 className="serif">A clear <span className="italic">process</span>, from first call to daily watch</h2>
      <p className="sub">A straightforward model focused on clarity, speed, and protection that actually holds.</p>
    </div>
  );

  if (!isD) {
    return (
      <section className="sec" id="process" style={{ paddingTop: 0 }}>
        {Head}
        <div className="wrap">
          {STEPS.map(([n, tag, title, desc, get, img]) => (
            <div className="proc-m-step" key={n}>
              <div className="proc-m-tag">{n} &middot; {tag}</div>
              <div className="proc-img" style={{ height: 220, marginBottom: 14 }}>{img}</div>
              <div className="proc-card">
                <div className="proc-title">{title}</div>
                <div className="proc-desc">{desc}</div>
                <div className="proc-get" style={{ marginTop: 18 }}>
                  <div className="k">What you get</div>
                  <div className="v">{get}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const [n, tag, title, desc, get, img] = STEPS[active];
  return (
    <section id="process">
      {Head}
      <div ref={trackRef} style={{ height: `${STEPS.length * 100}vh`, position: "relative" }}>
        <div className="proc-sticky">
          <div className="wrap proc-grid">
            <div className="proc-rail">
              {STEPS.map(([sn, stag], i) => (
                <div key={sn} className={"proc-step" + (i === active ? " active" : "")}>
                  <span className="proc-num">{sn}</span> {stag}
                </div>
              ))}
            </div>
            <div className="proc-img proc-fade" key={"i" + active}>{img}</div>
            <div className="proc-card proc-fade" key={"c" + active}>
              <div className="proc-tag">Step {n}</div>
              <div className="proc-title">{title}</div>
              <div className="proc-desc">{desc}</div>
              <div className="proc-get">
                <div className="k">What you get</div>
                <div className="v">{get}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const ref = useRef(null);
  const by = (dir) => ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  return (
    <section className="sec" id="clients">
      <div className="sec-head">
        <span className="eyebrow dark">Clients</span>
        <h2 className="serif">What our clients <span className="italic">say</span></h2>
      </div>
      <div className="tst-scroll" ref={ref}>
        {TESTI.map((t, i) => (
          <div className="tst-slide" key={i}>
            <div className="tst-img">
              <span className="focus-path" style={{ color: "#40483f" }}>{t.img}</span>
              <div className="tst-logo">{t.logo}</div>
              <div className="tst-name">
                <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                <div style={{ fontSize: 12, opacity: .85 }}>{t.role}</div>
              </div>
            </div>
            <div className="tst-review">
              <div className="tst-quote">{t.quote}</div>
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
        <button className="tst-arrow" onClick={() => by(-1)} aria-label="Previous">&larr;</button>
        <button className="tst-arrow" onClick={() => by(1)} aria-label="Next">&rarr;</button>
      </div>
    </section>
  );
}

function ContactForm() {
  const [f, setF] = useState({ name: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <section className="cform" id="contact">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Get Started</span>
          <h2 className="serif">Request a free <span className="italic">assessment</span></h2>
          <p className="sub">Tell us about your site. We&rsquo;ll respond within a few hours &mdash; we&rsquo;re available 24/7 for urgent needs.</p>
        </div>
        <div className="cf-grid">
          <div className="cf-side">
            <div className="cf-side-card">
              <div className="t">Free, no-obligation visit</div>
              <div className="d">We assess your premises in person and quote transparently &mdash; no pressure, no hidden costs.</div>
            </div>
            <div className="cf-side-card">
              <div className="t">Reach us directly</div>
              <div className="d">Phone / WhatsApp: +91 00000 00000<br />Email: hello@cisslucknow.com<br />[Office address placeholder], Lucknow</div>
            </div>
          </div>
          <div className="cf-form">
            {sent ? (
              <div style={{ padding: "40px 6px", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Thanks &mdash; we&rsquo;ll be in touch shortly.</div>
                <div style={{ fontSize: 13.5, color: "#aeb7c6", marginTop: 8 }}>(Live form submission gets wired up in the next step.)</div>
              </div>
            ) : (
              <>
                <div className="cf-field"><label>Name</label><input value={f.name} onChange={set("name")} /></div>
                <div className="cf-field"><label>Phone / WhatsApp</label><input type="tel" value={f.phone} onChange={set("phone")} /></div>
                <div className="cf-field"><label>Service needed</label>
                  <select value={f.service} onChange={set("service")}>
                    <option value="">Select a service</option>
                    {SERVICES.map(([s]) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="cf-field"><label>Message</label><textarea rows={3} value={f.message} onChange={set("message")} /></div>
                <button className="cf-submit" onClick={() => setSent(true)}>Request Assessment</button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    ["Services", ["Guards", "Bouncers & VIP", "Events", "Cash Van", "Women Guards"]],
    ["Company", ["About Us", "Why CISS", "Careers", "Gallery"]],
    ["Contact", ["Get a Quote", "Call Us", "WhatsApp", "Office"]],
    ["Legal", ["PSARA License", "Privacy", "Terms"]],
  ];
  return (
    <footer className="footer">
      <div className="footer-card">
        <div className="footer-promo">
          <img src="/images/logo.png" alt="CISS" />
          <div className="pt">Security you can stand behind.</div>
          <span className="pb">Get a Quote &rarr;</span>
        </div>
        <div>
          <div className="footer-links">
            {cols.map(([h, links]) => (
              <div className="fcol" key={h}>
                <h4>{h}</h4>
                {links.map((l) => <a href="#" key={l}>{l}</a>)}
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 CISS Lucknow &mdash; Civil &amp; Industrial Security Services.</span>
            <span>Lucknow, Uttar Pradesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Site() {
  return (
    <div className="pw">
      <Nav />
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
}
