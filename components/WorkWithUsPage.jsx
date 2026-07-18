"use client";

import React, { useState, useCallback } from "react";
import { Nav, Footer, QuoteModal, ApplyModal, JOBS } from "./Site";

export default function WorkWithUsPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const openQuote = useCallback(() => setQuoteOpen(true), []);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);

  const [applyJob, setApplyJob] = useState(null);
  const openApply = useCallback((job) => setApplyJob(job), []);
  const closeApply = useCallback(() => setApplyJob(null), []);

  return (
    <div className="pw">
      <Nav onQuote={openQuote} />

      <div className="spg-head">
        <span className="eyebrow dark">We&rsquo;re Hiring</span>
        <h1 className="serif">Work with <span className="italic">CISS</span></h1>
        <p className="sub">Every open role across Lucknow, Kanpur, Unnao and Gautam Buddha Nagar — join a disciplined, growing team.</p>
      </div>

      <div className="wrap">
        <div className="job-list" style={{ maxWidth: 900, margin: "56px auto 0" }}>
          {JOBS.map(([title, loc, type]) => (
            <div className="job-row" key={title}>
              <div className="job-main">
                <div className="job-title">{title}</div>
                <div className="job-meta">{loc} &middot; {type}</div>
              </div>
              <button type="button" className="pill pill-outline" onClick={() => openApply(title)}>Apply</button>
            </div>
          ))}
        </div>
      </div>

      <div className="spg-cta">
        <button type="button" className="pill pill-dark" onClick={openQuote}>Get a Quote</button>
      </div>

      <Footer onQuote={openQuote} />
      {quoteOpen && <QuoteModal onClose={closeQuote} />}
      {applyJob && <ApplyModal job={applyJob} onClose={closeApply} />}
    </div>
  );
}
