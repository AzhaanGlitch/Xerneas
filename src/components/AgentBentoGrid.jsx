import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChatCircle,
  Brain,
  Database,
  TerminalWindow,
  Check,
  CircleNotch,
  Clock,
  Minus,
  Globe,
  Cpu,
  ShieldCheck,
  Pulse
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { evaluateIsolationForest } from "@/services/anomalyEngine";

/* ──────────────────────────────────────────────────────
   FeatCard: Clean card wrapper with ample inner margin
   and distinct separation between title, visual, and border.
────────────────────────────────────────────────────── */
export function FeatCard({ title, description, children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: '36px 32px',
        borderRadius: '26px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        backgroundColor: 'rgba(18, 18, 18, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden text-white transition-all duration-300 hover:border-white/30",
        className
      )}
    >
      {/* Card Header: Title & Description with clear separation from outer border */}
      <div className="z-10 flex flex-col gap-2 mb-6" style={{ padding: '0 4px' }}>
        <h3 className="font-semibold text-white text-lg tracking-tight font-exo">{title}</h3>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-[95%]">{description}</p>
      </div>

      {/* Inner Visual Screen Container: Plentiful internal padding & nested rounded border */}
      <div
        style={{
          padding: '24px 20px',
          borderRadius: '18px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(0, 0, 0, 0.65)'
        }}
        className="relative flex-1 w-full overflow-hidden flex items-center justify-center"
      >
        {children}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Card 1 – Live AIOps Pipeline (Minimalist Monochrome)
───────────────────────────────────────────── */
const VW = 320;
const VH = 220;

const NODES = [
  { id: 'TELEMETRY', x: 50, y: 110, icon: Pulse, label: "TELEMETRY", type: 'box' },
  { id: 'Router', x: 125, y: 110, type: 'circle' },
  { id: 'AGENT', x: 200, y: 110, icon: Brain, label: "AGENT", type: 'box' },
  { id: 'MEMORY', x: 275, y: 48, icon: Database, label: "QDRANT", type: 'box' },
  { id: 'SANDBOX', x: 275, y: 172, icon: TerminalWindow, label: "SANDBOX", type: 'box' },
];

const PATHS = [
  { id: "a-to-router", d: "M 78 110 L 113 110", steps: ["stream"] },
  { id: "router-to-agent", d: "M 137 110 L 172 110", steps: ["infer"] },
  { id: "agent-to-memory", d: "M 200 82 L 200 48 L 247 48", steps: ["rag"] },
  { id: "agent-to-tools", d: "M 200 138 L 200 172 L 247 172", steps: ["remediate"] },
  { id: "return-flow", d: "M 172 110 L 137 110 L 113 110 L 78 110", steps: ["resolved"] },
];

export function Card1() {
  const [stepIdx, setStepIdx] = useState(0);
  const phases = ["stream", "infer", "rag", "remediate", "resolved"];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIdx((p) => (p + 1) % phases.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const currentPhase = phases[stepIdx];

  const isNodeActive = (id) => {
    if (currentPhase === "stream") return id === "TELEMETRY";
    if (currentPhase === "infer") return id === "Router" || id === "AGENT";
    if (currentPhase === "rag") return id === "AGENT" || id === "MEMORY";
    if (currentPhase === "remediate") return id === "AGENT" || id === "SANDBOX";
    if (currentPhase === "resolved") return id === "TELEMETRY" || id === "AGENT";
    return false;
  };

  return (
    <div className="w-full h-full relative select-none flex items-center justify-center">
      <svg
        className="w-full h-full max-h-[220px]"
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <path d="M 78 110 L 113 110" fill="none" stroke="#27272a" strokeWidth="1.5" />
        <path d="M 137 110 L 172 110" fill="none" stroke="#27272a" strokeWidth="1.5" />
        <path d="M 200 82 L 200 48 L 247 48" fill="none" stroke="#27272a" strokeWidth="1.5" />
        <path d="M 200 138 L 200 172 L 247 172" fill="none" stroke="#27272a" strokeWidth="1.5" />

        {PATHS.map((p) => {
          if (!p.steps.includes(currentPhase)) return null;
          return (
            <g key={p.id}>
              <motion.path
                d={p.d}
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
                strokeOpacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.85, ease: "easeInOut" }}
              />
              <motion.path
                d={p.d}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.85, ease: "easeInOut" }}
              />
            </g>
          );
        })}

        {NODES.map((node) => {
          const isBox = node.type === 'box';
          const w = isBox ? 56 : 24;
          const h = isBox ? 56 : 24;
          const active = isNodeActive(node.id);

          return (
            <foreignObject
              key={node.id}
              x={node.x - w / 2}
              y={node.y - h / 2}
              width={w}
              height={h}
              className="overflow-visible"
            >
              <div className="w-full h-full flex items-center justify-center">
                {isBox && node.icon ? (
                  <motion.div
                    animate={{ scale: active ? 1.08 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`w-full h-full rounded-[14px] border flex flex-col items-center justify-center shadow-lg text-white ${
                      active
                        ? 'bg-neutral-800 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                        : 'bg-neutral-900 border-white/10 text-zinc-400'
                    }`}
                  >
                    <node.icon className="w-5 h-5 mb-0.5" weight={active ? "fill" : "regular"} />
                    <span className="text-[8px] font-mono font-semibold tracking-wider select-none">
                      {node.label}
                    </span>
                  </motion.div>
                ) : (
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      active ? 'border-white bg-white/20' : 'border-zinc-700 bg-neutral-900'
                    }`}
                  >
                    <motion.div
                      className={`w-2 h-2 rounded-full border border-dashed ${active ? 'border-white' : 'border-zinc-500'}`}
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    />
                  </div>
                )}
              </div>
            </foreignObject>
          );
        })}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card 2 – Live Telemetry (Minimalist Monochrome)
───────────────────────────────────────────── */
export function Card2() {
  const [metrics, setMetrics] = useState({
    cpu: 28.4,
    mem: 54.2,
    anomalyScore: 0.18,
    isAnomalous: false,
    evalLatency: 2.85,
  });

  const [bars, setBars] = useState([24, 32, 28, 45, 60, 42, 35]);
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "NOW"];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextCpu = Number((24 + Math.random() * 18).toFixed(1));
      const nextMem = Number((48 + Math.random() * 16).toFixed(1));
      const evalRes = evaluateIsolationForest({
        cpu_usage: nextCpu,
        memory_rss: nextMem,
        io_wait: 2.4,
        tx_error_rate: 0.04
      });

      setMetrics({
        cpu: nextCpu,
        mem: nextMem,
        anomalyScore: evalRes.score,
        isAnomalous: evalRes.isAnomalous,
        evalLatency: evalRes.evalLatencyMs,
      });

      setBars(prev => [...prev.slice(1), Math.round(nextCpu + 15)]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between gap-4">
      <div className="grid grid-cols-2 gap-3.5">
        <div className="rounded-xl border border-white/10 bg-neutral-950/90 p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">ML INFERENCE</span>
            <span className="text-[9px] font-mono text-white font-bold">{metrics.evalLatency}ms</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-mono text-white">{metrics.anomalyScore}</span>
            <span className="text-[10px] font-mono text-zinc-500">score</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[8px] font-mono text-zinc-400">NOMINAL (&lt;0.85)</span>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-neutral-950/90 p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">STREAM RATE</span>
            <span className="text-[9px] font-mono text-white font-bold">+12.4k/s</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-mono text-white">{metrics.cpu}%</span>
            <span className="text-[10px] font-mono text-zinc-500">CPU</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-[8px] font-mono text-zinc-400">MEM RSS: {metrics.mem}%</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-end gap-2 px-1 min-h-[75px]">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 h-full rounded-lg bg-neutral-950/70 border border-white/5 relative overflow-hidden"
          >
            <motion.div
              className={`absolute bottom-0 left-0 right-0 rounded-t-md transition-all duration-700 ${
                i === bars.length - 1 ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]' : 'bg-zinc-600'
              }`}
              style={{ height: `${Math.min(95, Math.max(15, h))}%` }}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-2 px-1">
        {days.map((d, i) => (
          <p key={i} className={`flex-1 text-center text-[8px] font-mono ${i === days.length - 1 ? 'text-white font-bold' : 'text-zinc-500'}`}>
            {d}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card 3 – LangGraph Steps (Minimalist Monochrome)
───────────────────────────────────────────── */
export function Card3() {
  const steps = [
    { node: "diagnose_node", agent: "RCA Agent", action: "Matched runbook via Qdrant 384d vector cosine similarity", status: "PASSED", t: "0.4s" },
    { node: "sandbox_test_node", agent: "AST Validator", action: "Isolated AST command check in Docker scratch container", status: "PASSED", t: "1.2s" },
    { node: "self_reflection_node", agent: "Reflector", action: "Evaluating blast radius & rollback hash parity", status: "RUNNING", t: "2.1s" },
    { node: "rollout_guardrail_node", agent: "Canary Engine", action: "Canary traffic step: 5% -> 25% -> 100%", status: "PENDING", t: "—" },
    { node: "postmortem_generator", agent: "SRE Reporter", action: "Compiling markdown incident audit trail", status: "IDLE", t: "—" },
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % steps.length);
    }, 2600);
    return () => clearInterval(timer);
  }, [steps.length]);

  const getSlot = (i) => {
    const N = steps.length;
    let rel = i - activeIdx;
    if (rel > Math.floor(N / 2)) rel -= N;
    if (rel < -Math.floor(N / 2)) rel += N;
    return rel;
  };

  const Y = { "-2": -72, "-1": -40, "0": 0, "1": 40, "2": 72 };

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
      {steps.map((s, i) => {
        const slot = getSlot(i);
        const abs = Math.abs(slot);
        const isActive = slot === 0;
        const isVisible = abs <= 2;

        const yOffset = Y[String(slot)] ?? (slot < 0 ? -130 : 130);
        const scale = isActive ? 1 : abs === 1 ? 0.94 : 0.88;
        const opacity = isActive ? 1 : abs === 1 ? 0.65 : 0.35;
        const zIndex = isActive ? 30 : abs === 1 ? 20 : 10;

        return (
          <motion.div
            key={s.node}
            className="absolute left-0 right-0 mx-auto px-2"
            style={{ zIndex }}
            animate={{
              y: isVisible ? yOffset : slot < 0 ? -150 : 150,
              scale,
              opacity: isVisible ? opacity : 0,
            }}
            transition={{
              y: { type: "spring", stiffness: 450, damping: 32 },
              scale: { type: "spring", stiffness: 450, damping: 32 },
              opacity: { duration: 0.25 },
            }}
          >
            <div className={`w-full rounded-2xl border flex items-center gap-3 ${
              isActive
                ? "px-4 py-3 bg-neutral-900 border-white/25 shadow-xl"
                : "px-3 py-2 bg-neutral-950/80 border-white/5"
            }`}>
              <div className={`shrink-0 rounded-[10px] flex items-center justify-center border ${
                isActive ? "bg-white text-black border-white w-8 h-8 font-bold" : "bg-neutral-800 text-zinc-400 border-white/10 w-6 h-6"
              }`}>
                {s.status === "RUNNING" ? (
                  <CircleNotch weight="bold" className={`${isActive ? "w-4 h-4" : "w-3 h-3"} animate-spin`} />
                ) : s.status === "PASSED" ? (
                  <Check weight="bold" className={`${isActive ? "w-4 h-4" : "w-3 h-3"}`} />
                ) : (
                  <Clock weight="bold" className={`${isActive ? "w-4 h-4" : "w-3 h-3"}`} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-mono font-semibold text-white ${isActive ? "text-[11px]" : "text-[10px]"}`}>
                    {s.agent}
                  </span>
                  <span className={`font-mono uppercase px-1.5 py-0.5 rounded text-[8px] font-bold ${
                    isActive ? "bg-white/15 text-white" : "bg-neutral-800 text-zinc-500"
                  }`}>
                    {s.status}
                  </span>
                </div>
                {isActive && (
                  <p className="text-[10px] text-zinc-400 truncate mt-1 leading-tight">{s.action}</p>
                )}
              </div>

              {isActive && (
                <span className="text-[10px] font-mono text-zinc-500 shrink-0">{s.t}</span>
              )}
            </div>
          </motion.div>
        );
      })}

      <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1.5">
        {steps.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full bg-white/40"
            animate={{
              width: i === activeIdx ? 16 : 4,
              opacity: i === activeIdx ? 0.9 : 0.25,
            }}
            style={{ height: 3 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card 4 – Qdrant RAG Memory (Monochrome)
───────────────────────────────────────────── */
const RETRIEVAL_QUERIES = [
  { ns: "k8s", q: "Pod OOMKilled RSS memory limit expansion", sim: "96.2%" },
  { ns: "database", q: "PgBouncer port 5432 connection starvation", sim: "94.8%" },
  { ns: "network", q: "gRPC RST_STREAM 503 gateway retry storm", sim: "92.4%" },
  { ns: "security", q: "AST fork-bomb / rm -rf command interception", sim: "98.9%" },
];

export function Card4() {
  const namespaces = [
    { name: "k8s", title: "k8s-runbooks", hits: 342, fill: 92, icon: Cpu },
    { name: "database", title: "db-blueprints", hits: 218, fill: 74, icon: Database },
    { name: "network", title: "mesh-topologies", hits: 145, fill: 58, icon: Globe },
    { name: "security", title: "ast-guardrails", hits: 88, fill: 42, icon: ShieldCheck },
  ];

  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => (prev + 1) % RETRIEVAL_QUERIES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const activeNs = RETRIEVAL_QUERIES[tick].ns;

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-7 items-center justify-between">
      <div className="flex-1 flex flex-col justify-between w-full h-full">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">VECTOR EMBEDDING INDEX</span>
          <span className="text-[9px] font-mono text-white font-bold">bge-small 384d</span>
        </div>

        <div className="flex flex-col gap-3.5 flex-1 justify-center">
          {namespaces.map((ns) => {
            const isActive = ns.name === activeNs;
            const Icon = ns.icon;

            return (
              <div key={ns.name} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  isActive ? 'bg-white text-black shadow-md scale-105' : 'bg-neutral-900 border border-white/10 text-zinc-400'
                }`}>
                  <Icon size={16} weight="bold" />
                </div>

                <span className={`text-[11px] font-mono w-28 shrink-0 ${isActive ? 'text-white font-bold' : 'text-zinc-400'}`}>
                  {ns.title}
                </span>

                <div className="flex-1 h-2 bg-neutral-950 rounded-full overflow-hidden border border-white/5 relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-white rounded-full"
                    style={{ width: `${ns.fill}%` }}
                    animate={{ opacity: isActive ? 1 : 0.3 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <span className="text-[10px] font-mono text-zinc-500 w-10 text-right">{ns.hits}</span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 pt-2 mt-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-[9px] font-mono text-zinc-400">Qdrant HNSW: Ready</span>
        </div>
      </div>

      <div className="hidden md:block w-px bg-white/10 self-stretch my-1" />

      <div className="w-full md:w-[240px] flex flex-col justify-between h-full">
        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-2">LIVE RAG QUERY STREAM</span>
        
        <div className="flex flex-col gap-2 flex-1 justify-center">
          {RETRIEVAL_QUERIES.map((q, idx) => {
            const isTarget = idx === tick;
            return (
              <div
                key={idx}
                className={`rounded-xl border p-2.5 transition-all duration-300 ${
                  isTarget ? 'bg-neutral-900 border-white/25 shadow-lg' : 'bg-neutral-950/70 border-white/5 opacity-40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[8px] font-mono uppercase px-1.5 py-0.5 rounded font-bold bg-white/10 text-white">
                    {q.ns}
                  </span>
                  <span className="text-[8px] font-mono text-zinc-300 font-bold">{q.sim} match</span>
                </div>
                <p className="text-[9px] text-zinc-300 font-mono truncate leading-snug">{q.q}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card 5 – Guardrail Inspector (Monochrome)
───────────────────────────────────────────── */
export function Card5() {
  const tools = [
    { name: "Docker AST Exec", calls: 42, icon: TerminalWindow, latency: "1.2s", rate: "100% Pass" },
    { name: "Prometheus Scan", calls: 128, icon: Pulse, latency: "14ms", rate: "Zero Drift" },
    { name: "Qdrant Cosine", calls: 86, icon: Database, latency: "4.1ms", rate: "98.4% Top-1" },
    { name: "Canary Verify", calls: 19, icon: ShieldCheck, latency: "800ms", rate: "0 Rollbacks" },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-2 gap-3.5 w-full">
        {tools.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="rounded-[16px] border border-white/10 bg-neutral-950/80 p-3.5 flex flex-col justify-between hover:border-white/20 transition-all shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/10 text-white border border-white/15">
                <t.icon weight="fill" className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-white">{t.calls} runs</span>
            </div>

            <div className="mt-2.5">
              <p className="text-[10px] font-mono font-semibold text-white tracking-tight">{t.name}</p>
              <div className="flex items-center justify-between mt-1 text-[8px] font-mono text-zinc-400">
                <span>{t.latency}</span>
                <span className="text-white font-bold">{t.rate}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Bento Grid Component
───────────────────────────────────────────── */
const CARDS = [
  {
    title: "Autonomous Pipeline",
    description: "Multi-agent loop: Telemetry -> ML Anomaly -> LangGraph RCA -> AST Sandbox.",
    visual: <Card1 />,
    colSpan: "lg:col-span-1",
    height: "min-h-[350px] h-full",
  },
  {
    title: "Isolation Forest & Telemetry",
    description: "Live ONNX DirectML inference score (p99 < 5ms) on multivariate system metrics.",
    visual: <Card2 />,
    colSpan: "lg:col-span-1",
    height: "min-h-[350px] h-full",
  },
  {
    title: "LangGraph State Machine",
    description: "Continuous self-reflection and multi-turn automated diagnostic flow.",
    visual: <Card3 />,
    colSpan: "lg:col-span-1",
    height: "min-h-[350px] h-full",
  },
  {
    title: "Qdrant RAG Runbook Memory",
    description: "Cosine similarity search over curated Kubernetes and database self-healing blueprints.",
    visual: <Card4 />,
    colSpan: "lg:col-span-2",
    height: "min-h-[350px] h-full",
  },
  {
    title: "Docker Sandbox Guardrails",
    description: "Zero-trust AST bash AST inspector validating safe blast radius before production.",
    visual: <Card5 />,
    colSpan: "lg:col-span-1",
    height: "min-h-[350px] h-full",
  }
];

export function AgentBentoGrid({ className }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full max-w-6xl mx-auto items-stretch", className)}>
      {CARDS.map((card, idx) => (
        <FeatCard
          key={idx}
          title={card.title}
          description={card.description}
          className={cn(card.colSpan, card.height)}
        >
          {card.visual}
        </FeatCard>
      ))}
    </div>
  );
}

export default AgentBentoGrid;
