"use client";

import { useCallback, useRef, useState } from "react";
import { SAPLE_LOGO_URL } from "@/types/signature";

interface LogoUploaderProps {
  logoUrl: string;
  logoBase64: string;
  onLogoUrlChange: (url: string) => void;
  onLogoBase64Change: (base64: string) => void;
}

export default function LogoUploader({
  logoUrl,
  logoBase64,
  onLogoUrlChange,
  onLogoBase64Change,
}: LogoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) onLogoBase64Change(result);
      };
      reader.readAsDataURL(file);
    },
    [onLogoBase64Change]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const previewSrc = logoBase64 || logoUrl;
  const isDefault = logoUrl === SAPLE_LOGO_URL && !logoBase64;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        Logo
      </h3>

      {/* Logo URL input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Logo-URL
        </label>
        <input
          type="url"
          value={logoUrl}
          onChange={(e) => {
            onLogoUrlChange(e.target.value);
            if (e.target.value) onLogoBase64Change("");
          }}
          placeholder="https://example.com/logo.png"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
        />
        <p className="text-xs text-gray-400 mt-1">
          Das Logo muss online gehostet sein, damit es in E-Mails angezeigt wird.
        </p>
      </div>

      {/* Drag & drop upload for preview */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-yellow-400 bg-yellow-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
      >
        {previewSrc ? (
          <div className="flex flex-col items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewSrc}
              alt="Logo"
              className="max-h-16 max-w-[200px] object-contain"
            />
            <p className="text-xs text-gray-500">
              {isDefault ? "SAPLE (Standard)" : "Eigenes Logo"}
              {" — Klicken oder ziehen zum Ändern"}
            </p>
          </div>
        ) : (
          <div className="py-4">
            <svg
              className="mx-auto h-8 w-8 text-gray-400 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <p className="text-sm text-gray-600">Logo hochladen (Vorschau)</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG oder SVG</p>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>

      {logoBase64 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-amber-700">
            Hochgeladene Bilder werden nur in der Vorschau angezeigt.
            Für die E-Mail-Signatur muss das Logo unter einer URL gehostet sein
            (z.B. auf deiner Website oder einem Bildhosting-Dienst).
          </p>
        </div>
      )}

      {!isDefault && (
        <button
          onClick={() => {
            onLogoUrlChange(SAPLE_LOGO_URL);
            onLogoBase64Change("");
          }}
          className="text-xs text-gray-500 hover:text-gray-700 underline"
        >
          Zurück zum SAPLE-Logo
        </button>
      )}
    </div>
  );
}
