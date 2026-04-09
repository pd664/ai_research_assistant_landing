export function getSessionId() {
  if (typeof window === "undefined") return null;

  try {
    let sessionId = localStorage.getItem("session_id");

    if (!sessionId) {
      sessionId = generateId();
      localStorage.setItem("session_id", sessionId);
    }

    return sessionId;
  } catch (err) {
    console.error("Session error:", err);
    return null;
  }
}

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // fallback (very important)
  return "sess_" + Math.random().toString(36).substring(2, 15);
}