"use client";

import { useState, useEffect } from "react";
import { getSessionId } from "./utils/session";
import Left_panel from "./components/left_panel";
import Right_panel from "./components/right_panel";

export default function UploadAndAsk() {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const id = getSessionId();
    setSessionId(id);
  }, []);

  return (
    <>
      <div className="docask-layout">

        {/* ══ LEFT PANEL — Upload ══ */}
        <Left_panel sessionId={sessionId} />
        {/* ══ DIVIDERS ══ */}
        <div className="vertical-divider" />
        <div className="horizontal-divider" />

        {/* ══ RIGHT PANEL — Ask & Response ══ */}
        <Right_panel sessionId={sessionId} />
      </div>
    </>
  );
}