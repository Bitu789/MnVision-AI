import React, { useState } from "react";
import { predictProspectivity } from "./api";
import {
  Activity,
  Map,
  TrendingDown,
  BarChart3,
  BrainCircuit,
  Menu,
  X,
  Sparkles,
  MapPin,
  Target,
  Factory,
  AlertTriangle,
  CheckCircle,
  Database,
  Satellite,
  Cpu,
  Layers,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/* =========================
   DEMO DATA
========================= */

const zones = [
  {
    name: "Zone A",
    score: 91,
    confidence: 82,
    status: "High Potential",
    lat: "20.45",
    lon: "80.31",
    geology: "Manganese-bearing formation",
  },
  {
    name: "Zone B",
    score: 76,
    confidence: 78,
    status: "High Potential",
    lat: "20.39",
    lon: "80.42",
    geology: "Favorable geological structure",
  },
  {
    name: "Zone C",
    score: 58,
    confidence: 71,
    status: "Moderate Potential",
    lat: "20.51",
    lon: "80.52",
    geology: "Mixed surface indicators",
  },
  {
    name: "Zone D",
    score: 29,
    confidence: 67,
    status: "Low Potential",
    lat: "20.33",
    lon: "80.61",
    geology: "Limited supporting indicators",
  },
];

const productionData = [
  { month: "Jan", target: 100, actual: 91 },
  { month: "Feb", target: 100, actual: 94 },
  { month: "Mar", target: 100, actual: 89 },
  { month: "Apr", target: 100, actual: 86 },
  { month: "May", target: 100, actual: 88 },
  { month: "Jun", target: 100, actual: 87.5 },
];

const rootFactors = [
  { name: "Equipment Downtime", value: 42 },
  { name: "Blast Delay", value: 27 },
  { name: "Rainfall", value: 16 },
  { name: "Working Hours", value: 10 },
  { name: "Other", value: 5 },
];

/* =========================
   DASHBOARD
========================= */

function Dashboard({ setPage, selected, setSelected }) {
  const zone = zones[selected];

  return (
    <div className="page-content">
      <section className="hero-grid">
        <div className="hero-card">
          <div className="hero-label">
            <Sparkles size={15} />
            AI-POWERED MINING INTELLIGENCE
          </div>

          <h2>From Space to Strategy</h2>

          <p>
            Discover manganese prospectivity, estimate resources, predict
            production shortfalls and generate actionable mining
            recommendations.
          </p>

          <div className="hero-actions">
            <button
              className="primary-btn"
              onClick={() => setPage("prospectivity")}
            >
              Explore Prospectivity
              <ArrowUpRight size={17} />
            </button>

            <button
              className="secondary-btn"
              onClick={() => setPage("production")}
            >
              Production Intelligence
            </button>
          </div>
        </div>

        <div className="pipeline-card">
          <div className="section-title">
            <span>Decision Intelligence Pipeline</span>
          </div>

          <div className="pipeline">
            <PipelineItem
              number="01"
              title="FIND"
              text="Identify prospective zones"
              icon={<Satellite size={18} />}
            />
            <PipelineItem
              number="02"
              title="ESTIMATE"
              text="Estimate mineral resources"
              icon={<Layers size={18} />}
            />
            <PipelineItem
              number="03"
              title="PREDICT"
              text="Forecast production"
              icon={<TrendingDown size={18} />}
            />
            <PipelineItem
              number="04"
              title="EXPLAIN"
              text="Find production causes"
              icon={<BrainCircuit size={18} />}
            />
            <PipelineItem
              number="05"
              title="SOLVE"
              text="Generate actions"
              icon={<CheckCircle size={18} />}
            />
          </div>
        </div>
      </section>

      {/* KPI CARDS */}
      <section className="stats-grid">
        <StatCard
          icon={<Map />}
          title="High Potential Zones"
          value="2"
          subtitle="Priority exploration areas"
          onClick={() => setPage("prospectivity")}
        />

        <StatCard
          icon={<Target />}
          title="Best Prospectivity"
          value="91%"
          subtitle="Zone A model score"
          onClick={() => setPage("prospectivity")}
        />

        <StatCard
          icon={<Factory />}
          title="Expected Production"
          value="87.5K T"
          subtitle="Current forecast"
          onClick={() => setPage("production")}
        />

        <StatCard
          icon={<AlertTriangle />}
          title="Shortfall Risk"
          value="84%"
          subtitle="Illustrative demo"
          onClick={() => setPage("production")}
        />
      </section>

      {/* MAP + INSIGHT */}
      <section className="content-grid">
        <div className="panel map-panel">
          <div className="panel-header">
            <div>
              <h3>Mn Prospectivity Map</h3>
              <p>AI-assisted exploration priority zones</p>
            </div>

            <button
              className="small-btn"
              onClick={() => setPage("prospectivity")}
            >
              Open Analysis
            </button>
          </div>

          <div className="demo-map">
            <div className="map-grid"></div>

            {zones.map((z, index) => (
              <button
                key={z.name}
                className={`map-zone zone-${index + 1}`}
                onClick={() => setSelected(index)}
              >
                <span>{z.name}</span>
                <strong>{z.score}</strong>
              </button>
            ))}

            <div className="map-label">
              <MapPin size={14} />
              Demonstration GIS Layer
            </div>
          </div>

          <div className="zone-summary">
            <div>
              <span>Selected Zone</span>
              <strong>{zone.name}</strong>
            </div>

            <div>
              <span>Score</span>
              <strong>{zone.score}%</strong>
            </div>

            <div>
              <span>Confidence</span>
              <strong>{zone.confidence}%</strong>
            </div>
          </div>
        </div>

        <div className="panel insight-panel">
          <div className="panel-header">
            <div>
              <h3>AI Insights</h3>
              <p>Current demonstration analysis</p>
            </div>
            <Sparkles size={20} />
          </div>

          <Insight
            icon={<Satellite />}
            title="Exploration Priority"
            text="Zone A shows the strongest combination of geological and satellite-derived surface indicators."
          />

          <Insight
            icon={<TrendingDown />}
            title="Production Risk"
            text="The current demonstration forecast indicates a production shortfall against the target."
          />

          <Insight
            icon={<BrainCircuit />}
            title="Root Cause"
            text="Equipment downtime is the largest illustrative contributor to the predicted shortfall."
          />

          <button
            className="full-btn"
            onClick={() => setPage("analytics")}
          >
            View Integrated Analytics
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}

/* =========================
   PROSPECTIVITY PAGE
========================= */

function Prospectivity({ selected, setSelected, zone, runDemo }) {
  return (
    <div className="page-content">
      <section className="page-intro">
        <div>
          <div className="eyebrow">FIND • SATELLITE + GEOLOGY</div>
          <h2>Manganese Prospectivity Detection</h2>
          <p>
            Combine satellite-derived surface indicators with geological
            information and known occurrences to prioritize areas for
            exploration.
          </p>
        </div>

        <div className="source-badge">
          <Satellite size={16} />
          Sentinel-2 Ready
        </div>
      </section>

      <div className="zone-selector">
        {zones.map((z, index) => (
          <button
            key={z.name}
            className={selected === index ? "zone-card active" : "zone-card"}
            onClick={() => setSelected(index)}
          >
            <div>
              <span>{z.name}</span>
              <small>{z.status}</small>
            </div>
            <strong>{z.score}</strong>
          </button>
        ))}
      </div>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>{zone.name} Analysis</h3>
              <p>Demonstration prospectivity assessment</p>
            </div>
            <div className="score-circle">{zone.score}</div>
          </div>

          <div className="analysis-grid">
            <Metric label="Prospectivity Score" value={`${zone.score}%`} />
            <Metric label="Model Confidence" value={`${zone.confidence}%`} />
            <Metric label="Latitude" value={zone.lat} />
            <Metric label="Longitude" value={zone.lon} />
          </div>

          <div className="indicator-box">
            <h4>Surface & Geological Indicators</h4>
            <div className="indicator-list">
              <Indicator name="Vegetation Index" value="0.31 NDVI" />
              <Indicator name="Moisture Index" value="0.24 NDMI" />
              <Indicator name="Elevation" value="645 m" />
              <Indicator name="Slope" value="8°" />
              <Indicator name="Geology Score" value="0.85" />
            </div>
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              runDemo(`${zone.name} exploration priority generated`)
            }
          >
            Generate Exploration Priority
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Exploration Workflow</h3>
              <p>Prototype methodology</p>
            </div>
            <Cpu size={21} />
          </div>

          <WorkflowStep
            number="01"
            title="Satellite Data"
            text="Use Sentinel-2 spectral bands and derived indices."
          />
          <WorkflowStep
            number="02"
            title="Feature Engineering"
            text="Calculate NDVI, NDMI, terrain and geological features."
          />
          <WorkflowStep
            number="03"
            title="ML Classification"
            text="Random Forest prototype estimates prospectivity probability."
          />
          <WorkflowStep
            number="04"
            title="Priority Map"
            text="Classify areas into low, medium and high prospectivity."
          />

          <div className="info-note">
            <ShieldCheck size={17} />
            <span>
              Satellite imagery is used for surface indicators. It does not
              directly detect underground manganese ore.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================
   PRODUCTION PAGE
========================= */

function Production({ runDemo }) {
  return (
    <div className="page-content">
      <section className="page-intro">
        <div>
          <div className="eyebrow">PREDICT • EXPLAIN • SOLVE</div>
          <h2>Production Shortfall Prediction</h2>
          <p>
            Forecast expected production and identify operational factors
            contributing to potential shortfalls.
          </p>
        </div>

        <div className="risk-badge">
          <AlertTriangle size={16} />
          84% Risk
        </div>
      </section>

      <section className="stats-grid">
        <StatCard
          icon={<Target />}
          title="Production Target"
          value="100K T"
          subtitle="Illustrative monthly target"
        />
        <StatCard
          icon={<Factory />}
          title="Expected Production"
          value="87.5K T"
          subtitle="AI forecast"
        />
        <StatCard
          icon={<TrendingDown />}
          title="Expected Shortfall"
          value="12.5K T"
          subtitle="Against target"
        />
        <StatCard
          icon={<AlertTriangle />}
          title="Shortfall Risk"
          value="84%"
          subtitle="Illustrative demo"
        />
      </section>

      <section className="content-grid">
        <div className="panel chart-panel">
          <div className="panel-header">
            <div>
              <h3>Production Trend</h3>
              <p>Target vs actual/forecast production</p>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="6 6"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#14b8a6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Root Cause Analysis</h3>
              <p>Illustrative SHAP-style explanation</p>
            </div>
            <BrainCircuit size={20} />
          </div>

          <div className="factor-list">
            {rootFactors.map((factor) => (
              <div className="factor" key={factor.name}>
                <div className="factor-top">
                  <span>{factor.name}</span>
                  <strong>{factor.value}%</strong>
                </div>
                <div className="factor-bar">
                  <div style={{ width: `${factor.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel action-panel">
        <div className="panel-header">
          <div>
            <h3>Recommended Action Plan</h3>
            <p>Operational responses generated from the demonstration scenario</p>
          </div>
          <CheckCircle size={21} />
        </div>

        <div className="action-grid">
          <Action
            number="01"
            title="Optimize Equipment Allocation"
            text="Reallocate available equipment toward critical production faces."
          />
          <Action
            number="02"
            title="Reschedule Blasting"
            text="Coordinate blast preparation and execution to reduce delays."
          />
          <Action
            number="03"
            title="Prioritize Production Face"
            text="Focus mining sequence on high-priority ore availability."
          />
        </div>

        <button
          className="primary-btn"
          onClick={() => runDemo("Action plan generated successfully")}
        >
          Generate Action Plan
          <Sparkles size={16} />
        </button>
      </section>
    </div>
  );
}

/* =========================
   ANALYTICS PAGE
========================= */

function Analytics() {
  return (
    <div className="page-content">
      <section className="page-intro">
        <div>
          <div className="eyebrow">INTEGRATED ANALYTICS</div>
          <h2>Mining Intelligence Analytics</h2>
          <p>
            Unified view of exploration, resources and production decision support.
          </p>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Exploration Summary</h3>
              <p>Priority zone distribution</p>
            </div>
            <Map size={20} />
          </div>

          <div className="analytics-stat">
            <strong>91%</strong>
            <span>Highest prospectivity score</span>
          </div>

          <div className="analytics-stat">
            <strong>2</strong>
            <span>High-priority zones</span>
          </div>

          <div className="analytics-stat">
            <strong>82%</strong>
            <span>Maximum model confidence</span>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Production Intelligence</h3>
              <p>Current demonstration scenario</p>
            </div>
            <Factory size={20} />
          </div>

          <div className="analytics-stat">
            <strong>87.5K T</strong>
            <span>Expected production</span>
          </div>

          <div className="analytics-stat">
            <strong>12.5K T</strong>
            <span>Expected shortfall</span>
          </div>

          <div className="analytics-stat">
            <strong>42%</strong>
            <span>Largest illustrative risk factor</span>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>MnVision-AI Architecture</h3>
            <p>End-to-end intelligence pipeline</p>
          </div>
          <Database size={20} />
        </div>

        <div className="architecture">
          <ArchitectureBox
            icon={<Satellite />}
            title="Satellite Data"
            text="Sentinel-2"
          />
          <div className="arrow">→</div>
          <ArchitectureBox
            icon={<Database />}
            title="Geological Data"
            text="Occurrences + geology"
          />
          <div className="arrow">→</div>
          <ArchitectureBox
            icon={<Cpu />}
            title="ML Engine"
            text="Random Forest"
          />
          <div className="arrow">→</div>
          <ArchitectureBox
            icon={<Map />}
            title="Decision Support"
            text="Maps + predictions"
          />
        </div>
      </section>
    </div>
  );
}

/* =========================
   ABOUT PAGE
========================= */

function About() {
  return (
    <div className="page-content">
      <section className="page-intro">
        <div>
          <div className="eyebrow">SMART INDIA HACKATHON 2026</div>
          <h2>About MnVision-AI</h2>
          <p>
            An AI-assisted mining intelligence platform designed to support
            manganese exploration and production planning.
          </p>
        </div>
        <div className="prototype-tag">Prototype Mode</div>
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Problem</h3>
              <p>
                Manganese exploration and production planning require multiple
                data sources and operational decisions.
              </p>
            </div>
            <AlertTriangle />
          </div>

          <ul className="feature-list">
            <li>Fragmented geological and spatial information</li>
            <li>Difficult exploration prioritization</li>
            <li>Production uncertainty</li>
            <li>Limited visibility into shortfall causes</li>
          </ul>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Innovation</h3>
              <p>Integrated decision-support workflow</p>
            </div>
            <Sparkles />
          </div>

          <ul className="feature-list">
            <li>Satellite-derived surface indicators</li>
            <li>Geological occurrence information</li>
            <li>Machine-learning prospectivity prediction</li>
            <li>Production shortfall forecasting</li>
            <li>Explainable root-cause analysis</li>
            <li>Action-oriented recommendations</li>
          </ul>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>Technology Stack</h3>
            <p>Prototype implementation</p>
          </div>
        </div>

        <div className="tech-grid">
          <Tech name="React" />
          <Tech name="Vite" />
          <Tech name="FastAPI" />
          <Tech name="Python" />
          <Tech name="Scikit-learn" />
          <Tech name="Random Forest" />
          <Tech name="Sentinel-2" />
          <Tech name="GIS" />
        </div>
      </section>

      <div className="disclaimer">
        <AlertTriangle size={17} />
        <span>
          Current dashboard values are demonstration/synthetic data for
          prototype presentation. Real deployment requires authorized
          geological, satellite and operational datasets.
        </span>
      </div>
    </div>
  );
}

/* =========================
   SMALL COMPONENTS
========================= */

function PipelineItem({ number, title, text, icon }) {
  return (
    <div className="pipeline-item">
      <div className="pipeline-icon">{icon}</div>
      <div>
        <span>{number}</span>
        <strong>{title}</strong>
        <small>{text}</small>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, onClick }) {
  return (
    <button className="stat-card" onClick={onClick}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{subtitle}</small>
      </div>
      <ArrowUpRight size={16} />
    </button>
  );
}

function Insight({ icon, title, text }) {
  return (
    <div className="insight">
      <div className="insight-icon">{icon}</div>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Indicator({ name, value }) {
  return (
    <div className="indicator">
      <span>{name}</span>
      <strong>{value}</strong>
    </div>
  );
}

function WorkflowStep({ number, title, text }) {
  return (
    <div className="workflow-step">
      <div className="workflow-number">{number}</div>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

function Action({ number, title, text }) {
  return (
    <div className="action-card">
      <span>{number}</span>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

function ArchitectureBox({ icon, title, text }) {
  return (
    <div className="architecture-box">
      <div className="architecture-icon">{icon}</div>
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  );
}

function Tech({ name }) {
  return (
    <div className="tech">
      <Cpu size={16} />
      {name}
    </div>
  );
}

/* =========================
   MAIN APP COMPONENT
========================= */

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [selected, setSelected] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [message, setMessage] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const zone = zones[selected];

  const title = {
    dashboard: "Mining Intelligence Dashboard",
    prospectivity: "Manganese Prospectivity Detection",
    production: "Production Shortfall Prediction",
    analytics: "Integrated Mining Analytics",
    about: "About MnVision-AI",
  }[page];

  const runDemo = (text) => {
    setMessage(text);
    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const navigate = (p) => {
    setPage(p);
    setMobile(false);
  };

  /* REAL ML API CALL */
  const runPrediction = async () => {
    setLoading(true);
    try {
      const result = await predictProspectivity({
        ndvi: 0.31,
        ndmi: 0.24,
        elevation: 645,
        slope: 8,
        b4: 0.18,
        b8: 0.42,
        b11: 0.28,
        geology_score: 0.85,
      });
      setPrediction(result);
    } catch (error) {
      console.error(error);
      alert("Prediction failed. Ensure the FastAPI backend is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className={`sidebar ${mobile ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">Mn</div>
          <div>
            <b>MnVision-AI</b>
            <small>Mining Intelligence</small>
          </div>
        </div>

        <nav>
          {[
            ["dashboard", "Dashboard", Activity],
            ["prospectivity", "Mn Prospectivity", Map],
            ["production", "Production Intelligence", TrendingDown],
            ["analytics", "Analytics", BarChart3],
            ["about", "About Solution", BrainCircuit],
          ].map(([id, label, Icon]) => (
            <button
              key={id}
              className={page === id ? "active" : ""}
              onClick={() => navigate(id)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div>SMART INDIA HACKATHON 2026</div>
          <span>● Prototype Mode</span>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">
        <header className="topbar">
          <div
            className="mobile-menu"
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </div>

          <div>
            <h1>{title}</h1>
            <p>AI-assisted exploration and production decision support</p>
          </div>

          <div className="status">
            <span />
            SYSTEM ONLINE
            <em>DEMO DATA</em>
          </div>
        </header>

        {message && (
          <div className="toast">
            <Sparkles size={16} />
            {message}
          </div>
        )}

        {page === "dashboard" && (
          <Dashboard
            setPage={navigate}
            selected={selected}
            setSelected={setSelected}
          />
        )}

        {page === "prospectivity" && (
          <Prospectivity
            selected={selected}
            setSelected={setSelected}
            zone={zone}
            runDemo={runDemo}
          />
        )}

        {page === "production" && (
          <Production runDemo={runDemo} setPage={navigate} />
        )}

        {page === "analytics" && <Analytics />}

        {page === "about" && <About />}

        {/* ML PREDICTION PANEL */}
        <section className="ai-prediction-panel">
          <div>
            <div className="eyebrow">LIVE ML PROTOTYPE</div>
            <h3>Run Mn Prospectivity AI</h3>
            <p>
              Sends demonstration satellite and geological features to the
              FastAPI Random Forest model.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={runPrediction}
            disabled={loading}
          >
            {loading ? "Running AI..." : "Run Mn Prospectivity AI"}
            <Sparkles size={16} />
          </button>

          {prediction && (
            <div className="prediction-result">
              <div className="prediction-score">
                <span>Prospectivity Score</span>
                <strong>{prediction.prospectivity_score}%</strong>
              </div>

              <div className="prediction-class">
                <span>Classification</span>
                <strong>{prediction.classification}</strong>
              </div>

              <div className="prediction-model">
                <span>Model</span>
                <strong>{prediction.model}</strong>
              </div>

              <div className="prediction-data">
                <Database size={15} />
                {prediction.data_type}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}