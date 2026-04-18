export const handleUpload = async (pdfFile, sessionId, setLoadingUpload, setUploadSuccess, setResponse) => {
    if (!pdfFile) return;
    const formData = new FormData();
    formData.append("file", pdfFile);
    try {
      setLoadingUpload(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
        method: "POST",
        headers: { "x-session-id": sessionId },
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