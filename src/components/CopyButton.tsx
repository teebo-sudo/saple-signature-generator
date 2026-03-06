"use client";

import { useState } from "react";

interface CopyButtonProps {
  getHtml: () => string;
}

export default function CopyButton({ getHtml }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const html = getHtml();
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([html], { type: "text/plain" }),
        }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`w-full py-3 px-6 rounded-lg font-medium text-sm transition-all ${
        copied
          ? "bg-green-500 text-white"
          : "bg-black text-white hover:bg-gray-800"
      }`}
    >
      {copied ? "Kopiert!" : "Signatur kopieren"}
    </button>
  );
}
