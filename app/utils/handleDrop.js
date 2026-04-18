export const handleDrop = async (setIsDragging, setPdfFile) => {
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setPdfFile(file);
  };