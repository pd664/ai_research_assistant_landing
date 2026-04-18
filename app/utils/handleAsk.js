export const handleAsk = async (question, setLoadingAsk, sessionId, setResponse, setResponseMode) => {
    if (!question.trim()) return;
    try {
      setLoadingAsk(true);
      setResponse("");
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionId,
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