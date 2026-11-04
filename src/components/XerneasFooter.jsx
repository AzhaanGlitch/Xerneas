import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function XerneasFooter({ onEnterCockpit }) {
  return (
    <footer 
      style={{ backgroundColor: '#660000' }}
      className="relative w-full min-h-screen text-black overflow-hidden flex flex-col justify-between pt-36 sm:pt-44 lg:pt-48 pb-0 select-none z-30"
    >
      
      {/* ── Main Top & Middle Content Section (Black Typography with Substantial Top Clearance) ── */}
      <div className="w-full max-w-7xl mx-auto px-8 sm:px-14 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-16 flex-1 py-10 lg:py-16">
        
        {/* Left Column: Mission Statement (Span 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-10">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-black/75 block mb-4 font-bold">
              AUTONOMOUS INCIDENT RESPONSE
            </span>
            <h3 
              className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-black mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Zero-Trust Reliability
            </h3>

            <p className="text-sm sm:text-base text-black/85 max-w-md leading-relaxed font-sans font-medium">
              Continuous closed-loop anomaly detection, multi-agent root cause analysis, and AST-sandboxed remediation engineering for mission-critical production infrastructure.
            </p>
          </div>

          {/* Copyright Notice (without language EN button) */}
          <div className="text-xs sm:text-sm font-mono text-black/80 font-medium pt-6">
            ©2026 Xerneas Autonomous SRE. All Rights Reserved.
          </div>
        </div>

        {/* Right Columns: Website Content Oriented Navigation (Span 7) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-10 h-full flex-col justify-between py-2">
          
          {/* Column 1: PLATFORM */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-black mb-6 border-b border-black/25 pb-2">
                PLATFORM
              </h4>
              <ul className="flex flex-col gap-4 text-xs sm:text-sm font-mono uppercase tracking-wider text-black/90 font-semibold">
                <li>
                  <button onClick={onEnterCockpit} className="hover:underline text-left cursor-pointer font-bold text-black flex items-center gap-1.5">
                    <span>LIVE SRE COCKPIT</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                  </button>
                </li>
                <li>
                  <a href="#pipeline" className="hover:underline">
                    AUTONOMOUS LOOP
                  </a>
                </li>
                <li>
                  <a href="#guardrail" className="hover:underline">
                    AST GUARDRAIL
                  </a>
                </li>
                <li>
                  <a href="#qdrant" className="hover:underline">
                    QDRANT RAG RUNBOOKS
                  </a>
                </li>
                <li>
                  <a href="#sandbox" className="hover:underline">
                    DOCKER SANDBOX
                  </a>
                </li>
                <li>
                  <a href="#telemetry" className="hover:underline">
                    ISOLATION FOREST
                  </a>
                </li>
                <li>
                  <a href="#metrics" className="hover:underline">
                    HIGH-FREQ METRICS
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: EXPLORE */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-black mb-6 border-b border-black/25 pb-2">
                EXPLORE
              </h4>
              <ul className="flex flex-col gap-4 text-xs sm:text-sm font-mono uppercase tracking-wider text-black/90 font-semibold">
                <li>
                  <a href="#blueprints" className="hover:underline">
                    K8S BLUEPRINTS
                  </a>
                </li>
                <li>
                  <a href="#distilbert" className="hover:underline">
                    DISTILBERT NLP
                  </a>
                </li>
                <li>
                  <a href="#benchmarks" className="hover:underline">
                    MTTR BENCHMARKS
                  </a>
                </li>
                <li>
                  <a href="#governance" className="hover:underline">
                    ZERO-TRUST GOVERNANCE
                  </a>
                </li>
                <li>
                  <a href="#incident-review" className="hover:underline">
                    POST-MORTEMS
                  </a>
                </li>
                <li>
                  <a href="#api" className="hover:underline">
                    REST &amp; gRPC APIS
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: SUPPORT */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-black mb-6 border-b border-black/25 pb-2">
                SUPPORT
              </h4>
              <ul className="flex flex-col gap-4 text-xs sm:text-sm font-mono uppercase tracking-wider text-black/90 font-semibold">
                <li>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:underline">
                    DOCUMENTATION
                  </a>
                </li>
                <li>
                  <a href="#status" className="hover:underline">
                    CLUSTER STATUS
                  </a>
                </li>
                <li>
                  <a href="#security" className="hover:underline">
                    SECURITY POLICY
                  </a>
                </li>
                <li>
                  <a href="#cve" className="hover:underline">
                    CVE ADVISORIES
                  </a>
                </li>
                <li>
                  <a href="#sla" className="hover:underline">
                    ENTERPRISE SLA
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:underline">
                    INCIDENT HOTLINE
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>

      {/* ── Bottom Giant Brand Typography (Full Bleed Across Viewport Base) ── */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none mt-16 sm:mt-24">
        <h1 
          className="text-[21vw] font-black uppercase text-black tracking-tighter text-center w-full block"
          style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Arial Black', sans-serif",
            lineHeight: 0.74,
            marginBottom: '-0.035em',
            letterSpacing: '-0.06em'
          }}
        >
          XERNEAS
        </h1>
      </div>

    </footer>
  );
}
