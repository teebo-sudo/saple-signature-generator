"use client";

import { SignatureData } from "@/types/signature";
import { getSignaturePreview } from "@/templates";

interface SignaturePreviewProps {
  data: SignatureData;
  logoSrc: string;
}

export default function SignaturePreview({
  data,
  logoSrc,
}: SignaturePreviewProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
      <div className="text-xs text-gray-400 uppercase tracking-wide mb-4">
        Vorschau
      </div>
      <div className="border-t border-gray-100 pt-4">
        {getSignaturePreview(data, logoSrc)}
      </div>
    </div>
  );
}
