import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownRight, ArrowUpRight, ArrowRight, Menu, X, Target, BarChart3,
  ShoppingBag, MousePointerClick, LineChart, Layers3, MessageCircle,
  Search, Settings2, Instagram, Mail, Linkedin, ChevronRight, Sparkles,
  Gauge, Megaphone, Code2, CheckCircle2
} from "lucide-react";
import "./styles.css";

const clients = [
  "KISNA Jewels", "Enagen Bio", "Valiente Caps", "The Thread Tales",
  "The Wisdom Club", "Nuhome Furnishings", "Build Bricks Interior",
  "The Latest Label", "Lilliput World", "True Diamond"
];

const caseStudies = [
  {
    number: "01", name: "Enagen Bio", type: "E-COMMERCE · META ADS",
    headline: "Turning paid media into measurable revenue growth.",
    description: "Managed and optimised Meta Ads campaigns with a focus on purchase volume, revenue efficiency and sustainable acquisition. Worked across campaign structure, budget allocation, audience strategy and ongoing optimisation.",
    metrics: [
      { label: "Ad spend", value: "₹92.6K", note: "Jun 11–30, 2026" },
      { label: "Revenue", value: "₹2.52L", note: "Reported campaign snapshot" },
      { label: "Purchases", value: "146", note: "Purchase events" },
      { label: "ROAS", value: "2.72×", note: "Snapshot ROAS" }
    ],
    extra: "A subsequent reporting window (July 1–20, 2026) recorded ₹2.43L spend, ₹8.01L revenue, 419 purchases and 3.30× ROAS. These are separate reporting periods, not cumulative totals.",
    tags: ["Meta Ads", "E-commerce", "Budget optimisation", "Purchase campaigns"]
  },
  {
    number: "02", name: "KISNA Jewels", type: "JEWELLERY · E-COMMERCE",
    headline: "Campaign architecture for a high-AOV jewellery brand.",
    description: "Worked on e-commerce campaign planning and optimisation for a jewellery brand where purchase value mattered more than simply driving order volume. Reviewed catalogue performance, prospecting and remarketing structures, audience quality, placement mix and budget distribution.",
    metrics: [
      { label: "Best campaign ROAS", value: "14.61×", note: "Under ₹30K catalogue campaign" },
      { label: "Other campaign ROAS", value: "8.14×", note: "ROAS goal campaign snapshot" }
    ],
    extra: "These are individual campaign-level figures from a historical audit, not overall account ROAS. Work included Tier 1 city focus, age and placement analysis, Instagram vs Facebook performance review, prospecting and remarketing audience setup, and budget reallocation.",
    tags: ["Meta Ads", "Catalogue ads", "High-AOV", "Remarketing", "Audience strategy"]
  },
  {
    number: "03", name: "The Thread Tales", type: "D2C · E-COMMERCE",
    headline: "Driving purchase activity for a Shopify brand.",
    description: "Supported paid acquisition and campaign optimisation for a Shopify-based e-commerce brand, with attention to purchase performance and revenue contribution.",
    metrics: [
      { label: "Orders", value: "19", note: "Reported campaign result" },
      { label: "Revenue", value: "₹70,490", note: "Reported revenue" }
    ],
    extra: "The figures are a reported result shared during campaign discussions. No additional ROAS or CPA is inferred because the corresponding spend was not provided.",
    tags: ["Meta Ads", "Shopify", "D2C", "Purchase optimisation"]
  },
  {
    number: "04", name: "True Diamond", type: "JEWELLERY · WHATSAPP MARKETING",
    headline: "Customer conversations as the campaign destination.",
    description: "Worked on WhatsApp marketing for a diamond jewellery brand. The activity focused on using WhatsApp as a direct communication and customer-engagement channel rather than a tracked website purchase funnel.",
    metrics: [
      { label: "Primary channel", value: "WhatsApp", note: "Marketing & engagement" },
      { label: "Measurement", value: "Not tracked", note: "No verified conversion data available" }
    ],
    extra: "Conversion rates, revenue, ROAS and purchase attribution were not available for this work. This case study therefore describes the channel and scope of work without claiming performance outcomes.",
    tags: ["WhatsApp marketing", "Jewellery", "Customer engagement"]
  },
  {
    number: "05", name: "Valiente Caps", type: "D2C · E-COMMERCE",
    headline: "Restructuring campaigns around efficiency.",
    description: "Worked on campaign reviews and optimisation, including identifying underperforming campaigns, pausing inefficient activity and refining remarketing objectives to improve the focus of spend.",
    metrics: [
      { label: "Core focus", value: "ROAS", note: "Efficiency-led optimisation" },
      { label: "Workstream", value: "Remarketing", note: "Campaign restructuring" }
    ],
    extra: "No quantified performance lift is claimed here because a verified before-and-after result was not available.",
    tags: ["Meta Ads", "Remarketing", "Campaign audit", "Optimisation"]
  },
  {
    number: "06", name: "The Wisdom Club", type: "LEAD GENERATION",
    headline: "Lead-generation campaigns built around acquisition quality.",
    description: "Worked across lead-generation activity, including campaign planning, audience direction, budget allocation and performance monitoring. Focused on the relationship between lead volume, cost and campaign quality.",
    metrics: [
      { label: "Campaign type", value: "Lead gen", note: "Lead acquisition" },
      { label: "Optimisation", value: "CPL", note: "Cost and lead quality focus" }
    ],
    extra: "Specific CPL and conversion improvements are not published because verified figures were not available for this portfolio.",
    tags: ["Meta Ads", "Lead generation", "CPL", "Audience targeting"]
  },
  {
    number: "07", name: "Other Brand Experience", type: "MULTI-CATEGORY · PAID MEDIA",
    headline: "Experience across multiple categories and campaign needs.",
    description: "Additional campaign exposure across Nuhome Furnishings, Build Bricks Interior, The Latest Label and Lilliput World. Work included paid-media execution and optimisation across e-commerce and lead-generation requirements.",
    metrics: [
      { label: "Brands", value: "4", note: "Additional client experience" },
      { label: "Channels", value: "Meta + Google", note: "Depending on campaign scope" }
    ],
    extra: "These brands are included as client experience, not as standalone quantified case studies. Detailed outcomes can be added when validated reporting is available.",
    tags: ["Meta Ads", "Google Ads", "E-commerce", "Lead generation"]
  }
];

const skillGroups = [
  { icon: Target, title: "Paid media strategy", items: ["Media planning & budget allocation", "Campaign architecture", "Prospecting & remarketing", "Audience research & segmentation", "Creative testing strategy"] },
  { icon: BarChart3, title: "Performance optimisation", items: ["ROAS, CPA, CPL & CTR analysis", "Budget pacing & reallocation", "Campaign audits", "Conversion funnel analysis", "Performance reporting"] },
  { icon: Code2, title: "Tracking & measurement", items: ["GA4 & Google Tag Manager", "Meta Pixel & event QA", "GCLID & Conversion Linker", "Conversion tracking diagnostics", "Measurement troubleshooting"] },
  { icon: Layers3, title: "Platforms & formats", items: ["Meta Ads", "Google Search Ads", "Performance Max", "YouTube Ads", "Catalogue & Shopping campaigns"] }
];

function Header() {
  const [open, setOpen] = useState(false);
  const links = [["Work", "#work"], ["Expertise", "#expertise"], ["About", "#about"], ["Contact", "#contact"]];
  return <header className="header">
    <a href="#top" className="brand">RJ<span>.</span></a>
    <nav className={open ? "nav nav-open" : "nav"}>
      {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Let's talk <ArrowUpRight size={15}/></a>
    </nav>
    <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
  </header>;
}

function Reveal({ children, className = "" }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = document.getElementById(React.useId ? "" : "");
  }, []);
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Metric({ value, label, note }) {
  return <div className="metric">
    <div className="metric-value">{value}</div>
    <div className="metric-label">{label}</div>
    <div className="metric-note">{note}</div>
  </div>;
}

function CaseCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  return <article className={`case-card ${index % 2 ? "case-reverse" : ""}`}>
    <div className="case-topline">
      <span className="mono">CASE / {item.number}</span>
      <span className="case-type">{item.type}</span>
    </div>
    <div className="case-content">
      <div className="case-copy">
        <div className="eyebrow">{item.name}</div>
        <h3>{item.headline}</h3>
        <p>{item.description}</p>
        <div className="tag-row">{item.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
        <button className="text-button" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Hide details" : "More about this work"} <ArrowUpRight size={16}/>
        </button>
        {expanded && <p className="case-extra">{item.extra}</p>}
      </div>
      <div className={`metrics-panel ${item.metrics.length === 2 ? "metrics-two" : ""}`}>
        {item.metrics.map(m => <Metric key={m.label} {...m}/>)}
      </div>
    </div>
    <div className="case-bottom"><span>RAJ JADHAV / PERFORMANCE MARKETING</span><span>{item.name.toUpperCase()}</span></div>
  </article>;
}

function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "E-commerce", "Lead generation", "WhatsApp"];
  const filtered = caseStudies.filter(c => activeFilter === "All" ||
    (activeFilter === "E-commerce" && /E-COMMERCE|D2C/.test(c.type)) ||
    (activeFilter === "Lead generation" && c.type.includes("LEAD")) ||
    (activeFilter === "WhatsApp" && c.name === "True Diamond"));
  return <>
    <Header/>
    <main id="top">
      <section className="hero section-wrap">
        <div className="hero-meta"><span><i className="status-dot"/> AVAILABLE FOR SELECT PROJECTS</span><span className="mono">MUMBAI, INDIA · IST</span></div>
        <div className="hero-grid">
          <div className="hero-main">
            <div className="eyebrow"><span className="eyebrow-line"/> PERFORMANCE MARKETING SPECIALIST</div>
            <h1>Make every<br/>click <em>count.</em></h1>
            <p className="hero-desc">I build, manage and optimise paid media campaigns that connect strategy, data and creative execution to business growth.</p>
            <div className="hero-actions">
              <a className="button-primary" href="#work">Explore my work <ArrowDownRight size={17}/></a>
              <a className="button-quiet" href="#contact">Get in touch <ArrowUpRight size={16}/></a>
            </div>
          </div>
          <div className="hero-aside">
            <div className="orbit-card">
              <div className="orbit-label mono">THE PERFORMANCE LOOP</div>
              <div className="orbit">
                <div className="orbit-ring ring-one"/><div className="orbit-ring ring-two"/>
                <div className="orbit-core"><Gauge size={30}/><span>GROWTH</span></div>
                <span className="orbit-node node-a">PLAN</span><span className="orbit-node node-b">TEST</span><span className="orbit-node node-c">LEARN</span><span className="orbit-node node-d">SCALE</span>
              </div>
              <div className="orbit-foot"><span>STRATEGY</span><span>→</span><span>MEASUREMENT</span><span>→</span><span>ITERATION</span></div>
            </div>
            <div className="hero-note"><span className="note-mark">✳</span><p>Not just campaign management.<br/><strong>A growth mindset, backed by data.</strong></p></div>
          </div>
        </div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span className="scroll-line"/></div>
      </section>

      <section className="intro-strip">
        <div className="section-wrap intro-inner">
          <span className="mono">01 / THE APPROACH</span>
          <p>Good marketing isn't about spending more. It's about understanding <em>what moves the numbers</em> — then building a system to do more of it.</p>
        </div>
      </section>

      <section className="work section-wrap" id="work">
        <div className="section-heading">
          <div><div className="eyebrow"><span className="eyebrow-line"/> SELECTED EXPERIENCE</div><h2>Work that<br/><em>moves metrics.</em></h2></div>
          <p className="section-aside">A selection of brands and campaign work across e-commerce, D2C, lead generation and WhatsApp marketing.</p>
        </div>
        <div className="client-band">
          <span className="mono">BRANDS I'VE WORKED WITH</span>
          <div className="client-list">{clients.map(c => <span key={c}>{c}</span>)}</div>
        </div>
        <div className="filter-row">
          <span className="mono">CASE STUDIES / {String(filtered.length).padStart(2, "0")}</span>
          <div className="filters">{filters.map(f => <button key={f} className={activeFilter === f ? "filter active" : "filter"} onClick={() => setActiveFilter(f)}>{f}</button>)}</div>
        </div>
        <div className="case-list">{filtered.map((item, i) => <CaseCard key={item.number} item={item} index={i}/>)}</div>
        <p className="disclaimer"><span>NOTE</span> Performance figures are historical snapshots shared during campaign work. Reporting windows and campaign scopes differ. Where verified conversion or revenue data was unavailable, no performance result has been assumed or estimated.</p>
      </section>

      <section className="expertise" id="expertise">
        <div className="section-wrap">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="eyebrow-line"/> WHAT I BRING</div><h2>Strategy meets<br/><em>execution.</em></h2></div>
            <p className="section-aside">From the first media plan to tracking validation and daily optimisation, I work across the full paid-media workflow.</p>
          </div>
          <div className="skill-grid">{skillGroups.map((group, i) => {
            const Icon = group.icon;
            return <div className="skill-card" key={group.title}>
              <div className="skill-card-head"><span className="skill-icon"><Icon size={20}/></span><span className="mono">0{i+1}</span></div>
              <h3>{group.title}</h3>
              <ul>{group.items.map(item => <li key={item}><CheckCircle2 size={14}/>{item}</li>)}</ul>
            </div>;
          })}</div>
          <div className="platform-row"><span className="mono">PLATFORM EXPERIENCE</span><div className="platforms"><span>Meta Ads</span><span>Google Ads</span><span>Performance Max</span><span>YouTube Ads</span><span>Google Analytics 4</span><span>Google Tag Manager</span></div></div>
        </div>
      </section>

      <section className="method section-wrap">
        <div className="method-title"><div className="eyebrow"><span className="eyebrow-line"/> HOW I WORK</div><h2>Clarity at every<br/><em>stage.</em></h2></div>
        <div className="method-steps">
          {[
            ["01", "Understand", "Business model, audience, offer, unit economics and what success actually means."],
            ["02", "Build", "Campaign structure, channel mix, budget allocation, tracking and measurement foundations."],
            ["03", "Optimise", "Read the signals, diagnose friction, test deliberately and move budget with intent."],
            ["04", "Scale", "Double down on validated opportunities while protecting efficiency and lead quality."]
          ].map(([n, title, desc]) => <div className="method-step" key={n}><span className="mono">{n}</span><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight size={18}/></div>)}
        </div>
      </section>

      <section className="about" id="about">
        <div className="section-wrap about-grid">
          <div><div className="eyebrow"><span className="eyebrow-line"/> A LITTLE ABOUT ME</div><h2>Curious by nature.<br/><em>Analytical by habit.</em></h2></div>
          <div className="about-copy">
            <p className="about-lead">I'm Raj Jadhav, a performance marketer working across paid acquisition, e-commerce growth and lead generation.</p>
            <p>My work sits at the intersection of media strategy, campaign execution and measurement. I enjoy understanding why a campaign performs, where the funnel is losing momentum and what practical change can improve the outcome.</p>
            <p>I've worked with brands across jewellery, wellness, fashion, home and lifestyle, and service-led categories — adapting the campaign approach to the customer journey rather than forcing every brand into the same playbook.</p>
            <div className="about-stats"><div><strong>Meta + Google</strong><span>PAID MEDIA</span></div><div><strong>D2C + Lead Gen</strong><span>CAMPAIGN TYPES</span></div><div><strong>Full funnel</strong><span>WORKING APPROACH</span></div></div>
          </div>
        </div>
      </section>

      <section className="contact section-wrap" id="contact">
        <div className="contact-top"><div className="eyebrow"><span className="eyebrow-line"/> HAVE A PROJECT IN MIND?</div><span className="mono">LET'S BUILD WHAT'S NEXT</span></div>
        <h2>Let's make<br/><em>growth happen.</em></h2>
        <div className="contact-bottom">
          <p>Looking for a performance marketer or want to discuss a campaign? I'd be happy to connect.</p>
          <div className="contact-links">
            <a href="mailto:YOUR_EMAIL@example.com"><Mail size={17}/> YOUR_EMAIL@example.com <ArrowUpRight size={15}/></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={15}/></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram size={17}/> Instagram <ArrowUpRight size={15}/></a>
          </div>
        </div>
      </section>
    </main>
    <footer className="footer section-wrap"><a href="#top" className="brand">RJ<span>.</span></a><span>© {new Date().getFullYear()} RAJ JADHAV</span><span>BUILT AROUND PERFORMANCE.</span><a href="#top">BACK TO TOP ↑</a></footer>
  </>;
}

createRoot(document.getElementById("root")).render(<App/>);
