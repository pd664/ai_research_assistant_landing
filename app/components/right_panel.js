"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { handleAsk } from "../utils/handleAsk";

function right_panel({ sessionId }) {
    const [question, setQuestion] = useState("");
    const [loadingAsk, setLoadingAsk] = useState(false);
    const [response, setResponse] = useState(`RAG and fine-tuning solve different problems in domain-specific QA systems:

RAG (Retrieval-Augmented Generation):

Retrieves relevant documents at query time
Grounds responses in external knowledge → reduces hallucination
Easily updatable without retraining
Slight latency overhead due to retrieval

Fine-tuning:

Encodes domain knowledge directly into model weights
Faster inference (no retrieval step)
Hard to update (requires retraining)
Can still hallucinate if knowledge is incomplete

When to use:

Use RAG when knowledge changes frequently or corpus is large
Use fine-tuning when patterns are stable and low-latency is critical
Combine both for best performance in production systemsRAG and fine-tuning solve different problems in domain-specific QA systems:

RAG (Retrieval-Augmented Generation):

Retrieves relevant documents at query time
Grounds responses in external knowledge → reduces hallucination
Easily updatable without retraining
Slight latency overhead due to retrieval

Fine-tuning:

Encodes domain knowledge directly into model weights
Faster inference (no retrieval step)
Hard to update (requires retraining)
Can still hallucinate if knowledge is incomplete

When to use:

Use RAG when knowledge changes frequently or corpus is large
Use fine-tuning when patterns are stable and low-latency is critical
Combine both for best performance in production systemsRAG and fine-tuning solve different problems in domain-specific QA systems:

RAG (Retrieval-Augmented Generation):

Retrieves relevant documents at query time
Grounds responses in external knowledge → reduces hallucination
Easily updatable without retraining
Slight latency overhead due to retrieval

Fine-tuning:

Encodes domain knowledge directly into model weights
Faster inference (no retrieval step)
Hard to update (requires retraining)
Can still hallucinate if knowledge is incomplete

When to use:

Use RAG when knowledge changes frequently or corpus is large
Use fine-tuning when patterns are stable and low-latency is critical
Combine both for best performance in production systemsRAG and fine-tuning solve different problems in domain-specific QA systems:

RAG (Retrieval-Augmented Generation):

Retrieves relevant documents at query time
Grounds responses in external knowledge → reduces hallucination
Easily updatable without retraining
Slight latency overhead due to retrieval

Fine-tuning:

Encodes domain knowledge directly into model weights
Faster inference (no retrieval step)
Hard to update (requires retraining)
Can still hallucinate if knowledge is incomplete

When to use:

Use RAG when knowledge changes frequently or corpus is large
Use fine-tuning when patterns are stable and low-latency is critical
Combine both for best performance in production systems`);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [responseMode, setResponseMode] = useState("");

    const handleAskQues = async () => {
        await handleAsk(question, setLoadingAsk, sessionId, setResponse, setResponseMode)
    }
    return (
        <div className="right-panel">

            {/* Top bar */}
            <div className="right-topbar" style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderBottom: "1px solid #e4e4e7", background: "#fff",
                padding: "1rem 2.5rem"
            }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a1a1aa" }}>
                    Step 02 — Ask a Question
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: uploadSuccess ? "#4ade80" : "#d4d4d8",
                        boxShadow: uploadSuccess ? "0 0 8px #4ade80" : "none",
                        transition: "all 0.3s", display: "inline-block"
                    }} />
                    <span style={{ fontSize: 12, fontWeight: 500, color: "#a1a1aa" }}>
                        {uploadSuccess ? "Document ready" : "Waiting for upload"}
                    </span>
                </div>
            </div>

            {/* Scrollable body */}
            <div className="right-body">

                {/* Textarea */}
                <div>
                    <label style={{ display: "block", marginBottom: 8, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a1a1aa" }}>
                        Your Question
                    </label>
                    <textarea
                        rows={5}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleAsk(); }}
                        placeholder="e.g. What is the main conclusion of this document?"
                        style={{
                            width: "100%", boxSizing: "border-box", resize: "none",
                            borderRadius: 12, border: "1px solid #e4e4e7",
                            background: "#fff", padding: "12px 16px",
                            fontSize: 14, color: "#27272a", outline: "none",
                            transition: "all 0.2s", lineHeight: 1.6,
                            fontFamily: "inherit"
                        }}
                    />
                    <p style={{ marginTop: 6, textAlign: "right", fontSize: 12, color: "#d4d4d8" }}>
                        ⌘ + Enter to send
                    </p>
                </div>

                {/* Ask button */}
                <div>
                    <button
                        onClick={handleAskQues}
                        disabled={loadingAsk || !question.trim()}
                        style={{
                            display: "flex", alignItems: "center", gap: 8,
                            borderRadius: 12, background: "#18181b",
                            padding: "12px 24px", fontSize: 14, fontWeight: 600,
                            letterSpacing: "0.03em", color: "#fff", border: "none",
                            cursor: loadingAsk || !question.trim() ? "not-allowed" : "pointer",
                            opacity: loadingAsk || !question.trim() ? 0.4 : 1,
                            transition: "all 0.2s"
                        }}
                    >
                        {loadingAsk ? (
                            <>
                                <span style={{
                                    width: 16, height: 16, borderRadius: "50%",
                                    border: "2px solid rgba(255,255,255,0.3)",
                                    borderTopColor: "#fff", animation: "spin 0.7s linear infinite",
                                    display: "inline-block"
                                }} />
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
                <div style={{ height: 1, background: "#e4e4e7" }} />

                {/* Response */}
                <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a1a1aa" }}>
                            Response
                        </span>
                        {responseMode && (
                            <span style={{
                                borderRadius: 999, border: "1px solid #fed7aa",
                                background: "#fff7ed", padding: "2px 12px",
                                fontSize: 12, fontWeight: 600, color: "#f97316"
                            }}>
                                {responseMode === "agent" ? "🌐 Web Agent" : "🤖 LLM"}
                            </span>
                        )}
                    </div>

                    {response ? (
                        <div style={{
                            borderRadius: 16, border: "1px solid #e4e4e7",
                            background: "#fff", padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
                        }}>
                            <pre style={{ whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: 13, lineHeight: 1.75, color: "#3f3f46", margin: 0 }}>
                                {response}
                            </pre>
                        </div>
                    ) : (
                        <div style={{
                            display: "flex", flexDirection: "column", alignItems: "center",
                            justifyContent: "center", gap: 12, borderRadius: 16,
                            border: "1px dashed #e4e4e7", padding: "4rem 1rem", textAlign: "center"
                        }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: 12,
                                background: "#f4f4f5", color: "#d4d4d8",
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                            </div>
                            <p style={{ fontSize: 15, fontWeight: 500, color: "#a1a1aa", margin: 0 }}>No answer yet</p>
                            <p style={{ fontSize: 12, lineHeight: 1.6, color: "#d4d4d8", maxWidth: "24ch", margin: 0 }}>
                                Upload a document and ask a question to see the response here.
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default right_panel