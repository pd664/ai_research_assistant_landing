"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { handleDrop } from "../utils/handleDrop";
import { handleUpload } from "../utils/handleUpload";

function Left_panel({ sessionId }) {
  const [pdfFile, setPdfFile] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [response, setResponse] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleUploadFile = async () => {
    await handleUpload(pdfFile, sessionId, setLoadingUpload, setUploadSuccess, setResponse);
  };

  const handleDropFile = async (e) => {
    await handleDrop(e, setIsDragging, setPdfFile);
  };

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        .left-panel-fixed {
          /* Fixed width — never grows regardless of page content */
          width: 320px;
          min-width: 320px;
          max-width: 320px;
          flex-shrink: 0;

          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 100vh;

          background: #111113;
          padding: 2rem 2rem 2rem;
          box-sizing: border-box;
          overflow: hidden;
        }

        .left-panel-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          /* Leave space for pinned footer */
          padding-bottom: 56px;
          overflow-y: auto;
        }

        .left-panel-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 14px 2rem 18px;
          border-top: 1px solid rgba(39,39,42,0.7);
          background: #111113;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #3f3f46;
        }

        /* ── Responsive ── */

        /* Tablet: shrink panel a bit */
        @media (max-width: 900px) {
          .left-panel-fixed {
            width: 260px;
            min-width: 260px;
            max-width: 260px;
            padding: 1.5rem 1.25rem 1.5rem;
          }
          .left-panel-footer {
            padding: 14px 1.25rem 18px;
          }
        }

        /* Mobile: full width, horizontal layout collapsed */
        @media (max-width: 640px) {
          .left-panel-fixed {
            width: 100% !important;
            min-width: unset !important;
            max-width: unset !important;
            min-height: unset;
            height: auto;
            padding: 1.25rem 1rem 1rem;
          }
          .left-panel-content {
            padding-bottom: 0;
          }
          .left-panel-footer {
            display: none;
          }
        }
      `}</style>

      <div className="left-panel-fixed">

        {/* Top accent bar */}
        <div style={{
          position: "absolute", top: 0, left: "2rem", right: "2rem",
          height: "2px",
          background: "linear-gradient(to right, #f97316, #fb923c, transparent)"
        }} />

        {/* Scrollable content area */}
        <div className="left-panel-content">

          {/* Logo + About */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: "#f97316",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>
                DocAsk
              </span>
            </div>
            <Link href="/about_project" style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 13, fontWeight: 700, color: "#f97316",
              textDecoration: "none", transition: "color 0.15s",
              flexShrink: 0
            }}>
              <span style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 20, height: 20, borderRadius: "50%",
                border: "1px solid #f97316", fontSize: 11, fontWeight: 700
              }}>i</span>
              About
            </Link>
          </div>

          {/* Headline */}
          <div style={{ marginTop: "2.5rem" }}>
            <p style={{ marginBottom: 12, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#f97316", margin: "0 0 12px" }}>
              Step 01 — Upload
            </p>
            <h1 style={{ fontSize: "2.4rem", fontWeight: 300, lineHeight: 1.1, color: "#f4f4f5", margin: 0 }}>
              Drop your<br />
              <span style={{ fontWeight: 600, fontStyle: "italic", color: "#fb923c" }}>document.</span>
            </h1>
            <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.7, color: "#71717a", maxWidth: "28ch" }}>
              Upload a PDF or TXT file, then ask anything about its contents on the right.
            </p>
          </div>

          {/* Drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDropFile}
            style={{
              marginTop: 28, cursor: "pointer", borderRadius: 16,
              border: `1.5px dashed ${isDragging ? "#f97316" : "#3f3f46"}`,
              background: isDragging ? "rgba(249,115,22,0.08)" : "rgba(24,24,27,0.5)",
              padding: "2rem 1.5rem", textAlign: "center",
              transition: "all 0.2s"
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,text/plain,.txt"
              style={{ display: "none" }}
              onChange={(e) => {
                setPdfFile(e.target.files?.[0] || null);
                setUploadSuccess(false);
              }}
            />
            <div style={{
              margin: "0 auto 12px", width: 48, height: 48, borderRadius: 12,
              background: "rgba(249,115,22,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fb923c"
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#d4d4d8", margin: 0 }}>Click or drag & drop</p>
            <p style={{ marginTop: 4, fontSize: 12, color: "#52525b", margin: "4px 0 0" }}>PDF or TXT supported</p>
          </div>

          {/* File pill */}
          {pdfFile && (
            <div style={{
              marginTop: 10, display: "flex", alignItems: "center", gap: 8,
              borderRadius: 10, border: "1px solid rgba(154,52,18,0.4)",
              background: "rgba(67,20,7,0.25)", padding: "10px 12px"
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fb923c", flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 12, color: "#fdba74", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {pdfFile.name}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); setPdfFile(null); setUploadSuccess(false); }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#52525b", fontSize: 18, lineHeight: 1, padding: 0, transition: "color 0.15s" }}
              >×</button>
            </div>
          )}

          {/* Success */}
          {uploadSuccess && (
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 500, color: "#34d399" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Uploaded successfully
            </div>
          )}

          {/* Upload button */}
          <button
            onClick={handleUploadFile}
            disabled={loadingUpload || !pdfFile}
            style={{
              marginTop: 14, width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
              gap: 8, borderRadius: 12, background: "#f97316", padding: "12px 0",
              fontSize: 14, fontWeight: 600, letterSpacing: "0.03em", color: "#fff",
              border: "none", cursor: loadingUpload || !pdfFile ? "not-allowed" : "pointer",
              opacity: loadingUpload || !pdfFile ? 0.4 : 1,
              transition: "all 0.2s"
            }}
          >
            {loadingUpload ? (
              <>
                <span style={{
                  width: 16, height: 16, borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff", animation: "spin 0.7s linear infinite",
                  display: "inline-block"
                }} />
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
        </div>

        {/* Footer — pinned to bottom */}
        <div className="left-panel-footer">
          Made by{" "}
          <a
            href="https://www.linkedin.com/in/prateek-dixit-929834220"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 700, color: "#f97316", textDecoration: "none" }}
          >
            Prateek Dixit
          </a>
        </div>
      </div>
    </>
  );
}

export default Left_panel;