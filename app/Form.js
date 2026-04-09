"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link"
import { getSessionId } from "./utils/session";

export default function UploadAndAsk() {
  const [pdfFile, setPdfFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingAsk, setLoadingAsk] = useState(false);
  const [response, setResponse] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [responseMode, setResponseMode] = useState("");
  const fileInputRef = useRef(null);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
  const id = getSessionId();
  setSessionId(id);
}, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setPdfFile(file);
  };

  const handleUpload = async () => {
    if (!pdfFile) return;
    const formData = new FormData();
    formData.append("file", pdfFile);
    try {
      setLoadingUpload(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
        method: "POST",
        headers: {
          "x-session-id": sessionId,
        },
        body: formData,
      });
      const data = await res.json();
      setUploadSuccess(true);
      setResponse(JSON.stringify(data, null, 2));
    } catch {
      setResponse("Upload failed");
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) return;
    try {
      setLoadingAsk(true);
      setResponse("");
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ask`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",  
          "x-session-id": sessionId 
        },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setResponseMode(data.mode || "");
      setResponse(data.answer || JSON.stringify(data));
    } catch {
      setResponse("Ask API failed");
    } finally {
      setLoadingAsk(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">

      {/* ══════════════════════════════
          LEFT PANEL — Upload
      ══════════════════════════════ */}
      <div className="relative flex w-[42%] flex-shrink-0 flex-col overflow-hidden bg-zinc-950 px-10 py-8">

        {/* Top accent bar */}
        <div className="absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-transparent" />

        {/* Logo mark */}
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
            DocAsk
          </span>
        </div>
        <div>
          <Link href="/about_project"
  className="flex items-center gap-1.5 text-sm font-bold text-orange-500 transition hover:text-orange-400"
>
  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-orange-500 text-xs font-bold">i</span>
  About
</Link>
</div>
        </div>
        {/* Headline */}
        <div className="mt-12">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
            Step 01 — Upload
          </p>
          <h1 className="text-[2.6rem] font-light leading-[1.1] text-zinc-100">
            Drop your<br />
            <span className="font-semibold italic text-orange-400">document.</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500 max-w-[28ch]">
            Upload a PDF or TXT file, then ask anything about its contents on the right.
          </p>
        </div>

        {/* Drop zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`mt-8 cursor-pointer rounded-2xl border-[1.5px] border-dashed px-6 py-8 text-center transition-all duration-200
            ${isDragging
              ? "border-orange-500 bg-orange-950/40"
              : "border-zinc-700 bg-zinc-900/50 hover:border-orange-700 hover:bg-orange-950/20"
            }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,text/plain,.txt"
            className="hidden"
            onChange={(e) => {
              setPdfFile(e.target.files?.[0] || null);
              setUploadSuccess(false);
            }}
          />
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-zinc-300">
            Click or drag & drop
          </p>
          <p className="mt-1 text-xs text-zinc-600">PDF or TXT supported</p>
        </div>

        {/* File pill */}
        {pdfFile && (
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-orange-900/50 bg-orange-950/25 px-3 py-2.5">
            <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-400" />
            <span className="flex-1 truncate text-xs text-orange-300">{pdfFile.name}</span>
            <button
              onClick={() => { setPdfFile(null); setUploadSuccess(false); }}
              className="text-zinc-600 transition-colors hover:text-red-400"
            >
              ×
            </button>
          </div>
        )}

        {/* Success state */}
        {uploadSuccess && (
          <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Uploaded successfully
          </div>
        )}

        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={loadingUpload || !pdfFile}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-900/30 disabled:cursor-not-allowed disabled:opacity-40 active:translate-y-0"
        >
          {loadingUpload ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Uploading…
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload Document
            </>
          )}
        </button>

        {/* Footer */}
        <div className="mt-5 border-t border-zinc-800/70 pt-4 text-[10px] uppercase tracking-[0.16em] text-zinc-700">
            Made by <a className="font-bold text-orange-500 no-underline hover:underline">Prateek Dixit</a>
          </div>
      </div>

      {/* ══════════════════════════════
          VERTICAL DIVIDER
      ══════════════════════════════ */}
      <div className="w-px bg-zinc-800 flex-shrink-0" />

      {/* ══════════════════════════════
          RIGHT PANEL — Ask & Response
      ══════════════════════════════ */}
      <div className="flex flex-1 flex-col overflow-hidden bg-zinc-50">

        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-10 py-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
            Step 02 — Ask a Question
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full transition-all ${
                uploadSuccess
                  ? "bg-emerald-400 shadow-[0_0_8px_theme(colors.emerald.400)]"
                  : "bg-zinc-300"
              }`}
            />
            <span className="text-xs font-medium text-zinc-400">
              {uploadSuccess ? "Document ready" : "Waiting for upload"}
            </span>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-10 py-8">

          {/* Textarea */}
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
              Your Question
            </label>
            <textarea
              rows={5}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleAsk();
              }}
              placeholder="e.g. What is the main conclusion of this document?"
              className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 placeholder-zinc-300 shadow-sm outline-none transition-all duration-200 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/8"
            />
            <p className="mt-1.5 text-right text-xs text-zinc-300">
              ⌘ + Enter to send
            </p>
          </div>

          {/* Ask button */}
          <div>
            <button
              onClick={handleAsk}
              disabled={loadingAsk || !question.trim()}
              className="flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-700 hover:shadow-lg hover:shadow-zinc-900/15 disabled:cursor-not-allowed disabled:opacity-40 active:translate-y-0"
            >
              {loadingAsk ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Thinking…
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Ask Question
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-zinc-200" />

          {/* Response */}
          <div className="flex-1">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                Response
              </span>
              {responseMode && (
                <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-0.5 text-xs font-semibold text-orange-500">
                  {responseMode === "agent" ? "🌐 Web Agent" : "🤖 LLM"}
                </span>
              )}
            </div>

            {response ? (
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <pre className="whitespace-pre-wrap font-mono text-[13px] leading-7 text-zinc-700">
                  {response}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-zinc-200 py-20 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-300">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <p className="text-base font-medium text-zinc-400">No answer yet</p>
                <p className="text-xs leading-relaxed text-zinc-300 max-w-[24ch]">
                  Upload a document and ask a question to see the response here.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}