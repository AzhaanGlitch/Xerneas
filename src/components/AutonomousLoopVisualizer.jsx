import React, { useState } from 'react';
import { 
  Activity, 
  Cpu, 
  GitBranch, 
  Terminal, 
  CheckCircle2, 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Database,
  ArrowRight
} from 'lucide-react';

const LOOP_NODES = [
  {
    id: 'telemetry',
    step: '01',
    title: 'Telemetry Stream',
    stat: '10.4k ev/s',
    sub: 'Real-time Redis sliding window ingestion',
    icon: Activity,
    badge: 'INGESTION',
    badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    details: {
      heading: 'High-Throughput Telemetry Buffer',
      description: 'Distributed micro-agents emit kernel, cgroup, and RPC telemetry over Redis Stream at 10,240 events per second. The pipeline maintains a 120-frame sliding window with sub-millisecond write latencies.',
      metrics: [
        { label: 'Ingest Rate', value: '10,420 ev/s' },
        { label: 'Stream Buffer', value: '64 Client Pods' },
        { label: 'Frame Window', value: '120 sliding frames' },
        { label: 'Network Wait', value: '1.2ms' }
      ],
      terminalSnippet: `[INFO] redis-stream: Buffered 10,240 events from 64 client agents into stream:telemetry:raw.
[INFO] frame-aggregator: Sliding window updated (120 frames compiled, 0 dropped frames).
[INFO] telemetry-bus: Ready for inference queue.`
    }
  },
  {
    id: 'anomaly',
    step: '02',
    title: 'Isolation Forest Anomaly',
    stat: 'p99 3.1ms',
    sub: 'ONNX runtime metric tree evaluation',
    icon: Cpu,
    badge: 'DETECTION',
    badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    details: {
      heading: 'Lightweight Unsupervised Anomaly Engine',
      description: 'Metric frames are scored against an Isolation Forest model optimized through ONNX DirectML. Identifies multivariate deviations (CPU spikes, memory bloat, I/O saturation) within 3.1ms without cloud model round-trips.',
      metrics: [
        { label: 'Inference Latency', value: '3.1ms (p99)' },
        { label: 'Anomaly Threshold', value: '0.85 score' },
        { label: 'Current Score', value: '0.942 [TRIGGERED]' },
        { label: 'Model Type', value: 'Isolation Forest (100 Trees)' }
      ],
      terminalSnippet: `[WARN] onnx-directml: Evaluated 120 metric frames. Isolation Forest anomaly score: 0.954 (> 0.85 threshold).
[WARN] classifier: Multi-metric correlation detected OOM_EARLY_WARNING.
[ALERT] routing: Triggering LangGraph autonomous SRE supervisor state machine.`
    }
  },
  {
    id: 'langgraph',
    step: '03',
    title: 'LangGraph Multi-Agent',
    stat: 'Self-Correcting',
    sub: 'DAG routing, RAG retrieval & AST check',
    icon: GitBranch,
    badge: 'DIAGNOSIS',
    badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
    details: {
      heading: 'Cyclic Graph State Machine Diagnosis',
      description: 'LangGraph multi-agent architecture performs root cause analysis. It matches historical incident vectors from Qdrant RAG, generates tailored bash/kubectl remediation scripts, and self-corrects upon error.',
      metrics: [
        { label: 'Graph Nodes', value: '6 State Nodes' },
        { label: 'RAG DB', value: 'Qdrant Vector Engine' },
        { label: 'Self-Correction', value: 'Enabled (Cyclic Loop)' },
        { label: 'Confidence Score', value: '98.4%' }
      ],
      terminalSnippet: `[LANGGRAPH] node:analyze_telemetry -> correlated pod "deployment/payment-processor" with 98.4% confidence.
[LANGGRAPH] node:retrieve_runbooks -> matched runbook RB-702 (Qdrant score: 0.941).
[LANGGRAPH] node:generate_remediation -> synthesized container heap dump & restart plan.
[LANGGRAPH] node:guardrail_eval -> passed to AST security analyzer.`
    }
  },
  {
    id: 'sandbox',
    step: '04',
    title: 'Docker AST Sandbox',
    stat: '0 Blast Radius',
    sub: 'Isolated dry-run container execution',
    icon: Terminal,
    badge: 'REMEDIATION',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    details: {
      heading: 'Zero-Blast-Radius AST Guardrail Execution',
      description: 'All generated remediation commands are parsed into Abstract Syntax Trees (AST) to blacklist destructive wildcards (`rm -rf /`, raw disk rewrites) before dry-running in an isolated ephemeral Docker container.',
      metrics: [
        { label: 'Sandbox Isolation', value: '100% Isolated Docker' },
        { label: 'AST Validation', value: 'ALLOW (Exit Code: 0)' },
        { label: 'Target Pod', value: 'payment-processor-7c89f' },
        { label: 'Verification MTTD', value: '8.4s resolved' }
      ],
      terminalSnippet: `[GUARDRAIL] AST Inspect: "kubectl scale deployment/payment-processor --replicas=3" -> PASSED.
[SANDBOX] Spawning ephemeral Docker container ID: c894ef201b...
[SANDBOX] Dry-run executed successfully. Metrics normalized.
[REMEDIATION] Applied to cluster. Incident closed automatically in 1m 42s.`
    }
  }
];

export default function AutonomousLoopVisualizer() {
  const [selectedNode, setSelectedNode] = useState(LOOP_NODES[0]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white select-none">
      
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
          <Zap size={13} className="text-red-500" />
          <span>Interactive Architecture Flow</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight uppercase">
          Live Autonomous Loop
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base font-light max-w-2xl mx-auto">
          Explore how Xerneas identifies multivariate anomalies, reasons with LangGraph agents, and autonomously mitigates incidents with zero human delay.
        </p>
      </div>

      {/* 4-Step Interactive Flowchart Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {LOOP_NODES.map((node, index) => {
          const isSelected = selectedNode.id === node.id;
          const IconComponent = node.icon;

          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`group relative text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected 
                  ? 'bg-white/[0.07] border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.06)]' 
                  : 'bg-black/60 border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
              }`}
            >
              <div>
                {/* Top Row: Step & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-slate-500 tracking-wider">
                    {node.step}
                  </span>
                  <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full border ${node.badgeColor}`}>
                    {node.badge}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`p-2 rounded-lg border ${isSelected ? 'border-white/30 bg-white/10 text-white' : 'border-white/10 bg-black text-slate-400'}`}>
                    <IconComponent size={18} />
                  </div>
                  <h3 className="text-base font-medium tracking-tight text-white">
                    {node.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 font-light mt-1 line-clamp-2">
                  {node.sub}
                </p>
              </div>

              {/* Bottom Stat */}
              <div className="mt-6 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-slate-300">
                  {node.stat}
                </span>
                <ChevronRight 
                  size={15} 
                  className={`transition-transform duration-200 ${isSelected ? 'translate-x-1 text-white' : 'text-slate-600 group-hover:text-slate-300'}`} 
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Detail Console for Selected Node */}
      <div className="relative rounded-2xl border border-white/15 bg-black/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
        
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-950/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Description & Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
                  Phase {selectedNode.step} Deep-Dive
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${selectedNode.badgeColor}`}>
                  {selectedNode.badge}
                </span>
              </div>
              
              <h4 className="text-xl sm:text-2xl font-light tracking-tight text-white mb-3">
                {selectedNode.details.heading}
              </h4>
              
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mb-6">
                {selectedNode.details.description}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              {selectedNode.details.metrics.map((m, i) => (
                <div key={i} className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02]">
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    {m.label}
                  </span>
                  <span className="block text-xs sm:text-sm font-mono font-medium text-white mt-0.5">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Simulated Real-Time Terminal Snippet */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-2.5 rounded-t-xl border border-white/10 bg-white/[0.03] text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="ml-2 text-slate-300">xerneas-kernel-trace.log</span>
              </div>
              <span className="text-[10px] text-slate-500">LIVE SYNC</span>
            </div>
            
            <pre className="p-4 sm:p-5 rounded-b-xl border-x border-b border-white/10 bg-black font-mono text-xs sm:text-[13px] leading-relaxed text-slate-300 overflow-x-auto selection:bg-slate-700">
              <code>{selectedNode.details.terminalSnippet}</code>
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
}

