import Link from "next/link";

const features = [
  {
    icon: "📄",
    title: "Document Upload",
    desc: "Upload PDF or text files. Files are sent to the backend for processing.",
  },
  {
    icon: "❓",
    title: "Ask Questions from Documents",
    desc: "Ask questions in natural language. The system returns answers based on your uploaded content.",
  },
  {
    icon: "🌐",
    title: "Web-Based Answers (Optional)",
    desc: "If the answer isn't in your documents, the system can fetch information from online sources.",
  },
  {
    icon: "🔀",
    title: "LLM vs Agent Mode",
    desc: "LLM mode answers from your documents. Agent mode uses web search. The UI shows which mode generated the answer.",
  },
  {
    icon: "🔍",
    title: "Context-Based Responses",
    desc: "Answers are generated using available data — documents or web — helping reduce irrelevant responses.",
  },
  {
    icon: "🔄",
    title: "API-Based Architecture",
    desc: "/upload handles file ingestion. /ask processes your queries. Frontend communicates via REST APIs.",
  },
  {
    icon: "⏳",
    title: "Loading & Feedback States",
    desc: "Loading indicators are shown during upload and query processing so you always know what's happening.",
  },
  {
    icon: "⚡",
    title: "Extendable Design",
    desc: "Built to be extended — chat history, multiple documents, streaming responses, and better UX can all be added.",
  },
];

function FeatureCard({ icon, title, desc }) {
  return (
    <div style={{
      borderRadius: 12, border: "1px solid #e4e4e7", background: "#fff",
      padding: "1.25rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      transition: "border-color 0.2s, box-shadow 0.2s"
    }}>
      <div style={{
        marginBottom: 12, width: 36, height: 36, borderRadius: 10,
        background: "#f4f4f5", display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 16
      }}>
        {icon}
      </div>
      <h3 style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 600, color: "#18181b" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: "#71717a" }}>{desc}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <style>{`
        .about-layout {
          display: flex;
          flex-direction: row;
          min-height: 100dvh;
          width: 100%;
          overflow: hidden;
        }
        .about-left {
          position: relative;
          width: 36%;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          background: #09090b;
          padding: 2rem 2.5rem;
        }
        .about-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #fafafa;
        }
        .about-right-body {
          flex: 1;
          overflow-y: auto;
          padding: 2rem 2.5rem;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .about-vertical-divider {
          width: 1px;
          background: #27272a;
          flex-shrink: 0;
        }
        .about-horizontal-divider { display: none; }
        .about-cta { display: block; }
        .about-left-headline h1 { font-size: 2.2rem; }

        @media (max-width: 767px) {
          .about-layout {
            flex-direction: column;
            overflow: auto;
            height: auto;
          }
          .about-left {
            width: 100%;
            padding: 1.5rem 1.25rem;
            overflow: visible;
          }
          .about-right {
            overflow: visible;
          }
          .about-right-body {
            overflow: visible;
            padding: 1.5rem 1.25rem;
          }
          .feature-grid {
            grid-template-columns: 1fr;
          }
          .about-vertical-divider { display: none; }
          .about-horizontal-divider {
            display: block;
            height: 1px;
            background: #27272a;
            flex-shrink: 0;
          }
          .about-left-headline h1 { font-size: 1.8rem !important; }
          .about-topbar { padding: 0.875rem 1.25rem !important; }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .about-left {
            width: 40%;
            padding: 1.75rem 1.75rem;
          }
          .about-right-body { padding: 1.75rem 1.75rem; }
          .about-left-headline h1 { font-size: 1.9rem !important; }
        }
      `}</style>

      <div className="about-layout">

        {/* ══ LEFT PANEL ══ */}
        <div className="about-left">

          {/* Top accent bar */}
          <div style={{
            position: "absolute", top: 0, left: "2.5rem", right: "2.5rem",
            height: "2px",
            background: "linear-gradient(to right, #f97316, #fb923c, transparent)"
          }} />

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8, background: "#f97316",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>
              DocAsk
            </span>
          </Link>

          {/* Hero text */}
          <div className="about-left-headline" style={{ marginTop: "2.5rem" }}>
            <p style={{ marginBottom: 12, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#f97316" }}>
              About the Project
            </p>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 300, lineHeight: 1.15, color: "#f4f4f5", margin: 0 }}>
              Ask questions<br />
              <span style={{ fontWeight: 600, fontStyle: "italic", color: "#fb923c" }}>from your files.</span>
            </h1>
            <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.8, color: "#71717a" }}>
              A document-based Q&A system with optional web support. Upload files, ask anything — the system answers from your content or the web.
            </p>
          </div>

          {/* What it demonstrates */}
          <div style={{ marginTop: 32 }}>
            <p style={{ marginBottom: 16, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#52525b" }}>
              What this demonstrates
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Frontend + backend API integration",
                "File upload handling in web apps",
                "RAG-style workflow",
                "Document vs web-based answer routing",
                "State management — loading & responses",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ marginTop: 6, width: 6, height: 6, flexShrink: 0, borderRadius: "50%", background: "#f97316" }} />
                  <span style={{ fontSize: 12, lineHeight: 1.6, color: "#71717a" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div style={{ marginTop: 32 }}>
            <p style={{ marginBottom: 12, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#52525b" }}>
              Built with
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Next.js", "FastAPI", "Tailwind CSS", "REST API"].map((t) => (
                <span key={t} style={{
                  borderRadius: 6, border: "1px solid #27272a",
                  background: "#18181b", padding: "4px 10px",
                  fontSize: 11, fontWeight: 500, color: "#a1a1aa"
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: "auto", paddingTop: 24 }}>
            <Link href="/" style={{
              display: "flex", width: "100%", boxSizing: "border-box",
              alignItems: "center", justifyContent: "center", gap: 8,
              borderRadius: 12, background: "#f97316", padding: "12px 0",
              fontSize: 14, fontWeight: 600, letterSpacing: "0.03em",
              color: "#fff", textDecoration: "none", transition: "all 0.2s"
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              Try DocAsk
            </Link>
            <div style={{
              marginTop: 20, borderTop: "1px solid rgba(39,39,42,0.7)", paddingTop: 16,
              fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: "#3f3f46"
            }}>
              Made by <a style={{ fontWeight: 700, color: "#f97316", textDecoration: "none" }}>Prateek Dixit</a>
            </div>
          </div>
        </div>

        {/* ══ DIVIDERS ══ */}
        <div className="about-vertical-divider" />
        <div className="about-horizontal-divider" />

        {/* ══ RIGHT PANEL — Features ══ */}
        <div className="about-right">

          {/* Top bar */}
          <div className="about-topbar" style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderBottom: "1px solid #e4e4e7", background: "#fff",
            padding: "1rem 2.5rem"
          }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a1a1aa" }}>
              Features
            </span>
            <span style={{
              borderRadius: 999, border: "1px solid #fed7aa",
              background: "#fff7ed", padding: "2px 12px",
              fontSize: 12, fontWeight: 600, color: "#f97316"
            }}>
              Read-only
            </span>
          </div>

          {/* Feature grid */}
          <div className="about-right-body">
            <div className="feature-grid">
              {features.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
// import Link from "next/link";

// const features = [
//   {
//     icon: "📄",
//     title: "Document Upload",
//     desc: "Upload PDF or text files. Files are sent to the backend for processing.",
//   },
//   {
//     icon: "❓",
//     title: "Ask Questions from Documents",
//     desc: "Ask questions in natural language. The system returns answers based on your uploaded content.",
//   },
//   {
//     icon: "🌐",
//     title: "Web-Based Answers (Optional)",
//     desc: "If the answer isn't in your documents, the system can fetch information from online sources.",
//   },
//   {
//     icon: "🔀",
//     title: "LLM vs Agent Mode",
//     desc: "LLM mode answers from your documents. Agent mode uses web search. The UI shows which mode generated the answer.",
//   },
//   {
//     icon: "🔍",
//     title: "Context-Based Responses",
//     desc: "Answers are generated using available data — documents or web — helping reduce irrelevant responses.",
//   },
//   {
//     icon: "🔄",
//     title: "API-Based Architecture",
//     desc: "/upload handles file ingestion. /ask processes your queries. Frontend communicates via REST APIs.",
//   },
//   {
//     icon: "⏳",
//     title: "Loading & Feedback States",
//     desc: "Loading indicators are shown during upload and query processing so you always know what's happening.",
//   },
//   {
//     icon: "⚡",
//     title: "Extendable Design",
//     desc: "Built to be extended — chat history, multiple documents, streaming responses, and better UX can all be added.",
//   },
// ];

// function FeatureCard({ icon, title, desc }) {
//   return (
//     <div className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-orange-200 hover:shadow-md">
//       <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-base transition-all group-hover:bg-orange-50">
//         {icon}
//       </div>
//       <h3 className="mb-1.5 text-sm font-semibold text-zinc-800">{title}</h3>
//       <p className="text-xs leading-relaxed text-zinc-500">{desc}</p>
//     </div>
//   );
// }

// export default function AboutPage() {
//   return (
//     <div className="flex h-screen w-screen overflow-hidden">

//       {/* ══════════════════════════════
//           LEFT PANEL — fixed, no scroll
//       ══════════════════════════════ */}
//       <div className="relative flex w-[36%] flex-shrink-0 flex-col overflow-hidden bg-zinc-950 px-10 py-8">

//         {/* Top accent bar */}
//         <div className="absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-transparent" />

//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2 no-underline">
//           <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500">
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
//               <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
//               <polyline points="14 2 14 8 20 8" />
//             </svg>
//           </div>
//           <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
//             DocAsk
//           </span>
//         </Link>

//         {/* Hero text */}
//         <div className="mt-12">
//           <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
//             About the Project
//           </p>
//           <h1 className="text-[2.2rem] font-light leading-[1.15] text-zinc-100">
//             Ask questions<br />
//             <span className="font-semibold italic text-orange-400">from your files.</span>
//           </h1>
//           <p className="mt-4 text-sm leading-[1.8] text-zinc-500">
//             A document-based Q&A system with optional web support. Upload files, ask anything — the system answers from your content or the web.
//           </p>
//         </div>

//         {/* What it demonstrates */}
//         <div className="mt-10">
//           <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
//             What this demonstrates
//           </p>
//           <div className="flex flex-col gap-2.5">
//             {[
//               "Frontend + backend API integration",
//               "File upload handling in web apps",
//               "RAG-style workflow",
//               "Document vs web-based answer routing",
//               "State management — loading & responses",
//             ].map((item) => (
//               <div key={item} className="flex items-start gap-2.5">
//                 <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500" />
//                 <span className="text-xs leading-relaxed text-zinc-500">{item}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Tech stack */}
//         <div className="mt-10">
//           <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
//             Built with
//           </p>
//           <div className="flex flex-wrap gap-2">
//             {["Next.js", "FastAPI", "Tailwind CSS", "REST API"].map((t) => (
//               <span
//                 key={t}
//                 className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-zinc-400"
//               >
//                 {t}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* CTA — pinned to bottom */}
//         <div className="mt-auto">
//           <Link
//             href="/"
//             className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-sm font-semibold tracking-wide text-white no-underline transition-all duration-200 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-900/30"
//           >
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
//               <line x1="22" y1="2" x2="11" y2="13" />
//               <polygon points="22 2 15 22 11 13 2 9 22 2" />
//             </svg>
//             Try DocAsk
//           </Link>
//           <div className="mt-5 border-t border-zinc-800/70 pt-4 text-[10px] uppercase tracking-[0.16em] text-zinc-700">
//             Made by <a className="font-bold text-orange-500 no-underline hover:underline">Prateek Dixit</a>
//           </div>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="w-px flex-shrink-0 bg-zinc-800" />

//       {/* ══════════════════════════════
//           RIGHT PANEL — Features
//       ══════════════════════════════ */}
//       <div className="flex flex-1 flex-col overflow-hidden bg-zinc-50">

//         {/* Top bar */}
//         <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-10 py-4">
//           <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
//             Features
//           </span>
//           <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-0.5 text-xs font-semibold text-orange-500">
//             Read-only
//           </span>
//         </div>

//         {/* Scrollable feature grid */}
//         <div className="flex-1 overflow-y-auto px-10 py-8">
//           <div className="grid grid-cols-2 gap-4">
//             {features.map((f) => (
//               <FeatureCard key={f.title} {...f} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }