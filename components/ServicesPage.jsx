"use client";

import React, { useState, useCallback } from "react";
import { Nav, Footer, QuoteModal, SERVICES } from "./Site";

/* Optional image: renders <img> if the file exists, else shows the path placeholder */
function Img({ src, alt }) {
  const [ok, setOk] = useState(true);
  if (!ok) return <span className="focus-path">{src}</span>;
  return <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} />;
}

export default function ServicesPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const openQuote = useCallback(() => setQuoteOpen(true), []);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);

  return (
    <div className="pw">
      <Nav onQuote={openQuote} />

      <div className="spg-head">
        <span className="eyebrow dark">Our Services</span>
        <h1 className="serif">Security for every <span className="italic">kind</span> of site.</h1>
        <p className="sub">The full range of guarding services we deploy across Lucknow, Kanpur, Unnao and Gautam Buddha Nagar — every guard trained, PSARA-licensed, and matched to your site.</p>
      </div>

      <div className="spg-grid">
        {SERVICES.map(([label, path]) => (
          <div className="spg-card" key={label}>
            <div className="spg-img grain"><Img src={path} alt={`${label} in Lucknow`} /></div>
            <h3 className="spg-label">{label}</h3>
          </div>
        ))}
      </div>

      <div className="spg-cta">
        <button type="button" className="pill pill-dark" onClick={openQuote}>Get a Quote</button>
      </div>

      <Footer onQuote={openQuote} />
      {quoteOpen && <QuoteModal onClose={closeQuote} />}
    </div>
  );
}
