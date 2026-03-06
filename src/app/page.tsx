"use client";

import { useState } from "react";
import { SignatureData, defaultSignatureData } from "@/types/signature";
import { getSignatureHtml } from "@/templates";
import { SAPLE_LOGO_BASE64 } from "@/templates/default-logo";
import SignatureForm from "@/components/SignatureForm";
import SignaturePreview from "@/components/SignaturePreview";
import TemplateSelector from "@/components/TemplateSelector";
import LogoUploader from "@/components/LogoUploader";
import ColorPicker from "@/components/ColorPicker";
import CopyButton from "@/components/CopyButton";
import type { TemplateKey } from "@/templates";

export default function Home() {
  const [data, setData] = useState<SignatureData>(defaultSignatureData);

  const logoSrc = data.logoBase64 || SAPLE_LOGO_BASE64;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SAPLE_LOGO_BASE64}
              alt="SAPLE"
              className="h-8"
            />
            <span className="text-gray-300">|</span>
            <h1 className="text-lg font-semibold text-gray-800">
              Signature Generator
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <TemplateSelector
                selected={data.template}
                onSelect={(template: TemplateKey) =>
                  setData({ ...data, template })
                }
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <SignatureForm data={data} onChange={setData} />
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <LogoUploader
                logoBase64={data.logoBase64}
                defaultLogo={SAPLE_LOGO_BASE64}
                onLogoChange={(logoBase64) =>
                  setData({ ...data, logoBase64 })
                }
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <ColorPicker
                primaryColor={data.primaryColor}
                accentColor={data.accentColor}
                onPrimaryChange={(primaryColor) =>
                  setData({ ...data, primaryColor })
                }
                onAccentChange={(accentColor) =>
                  setData({ ...data, accentColor })
                }
              />
            </div>
          </div>

          {/* Right: Preview + Copy */}
          <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">
            <SignaturePreview data={data} logoSrc={logoSrc} />
            <CopyButton
              getHtml={() => getSignatureHtml(data, logoSrc)}
            />
            <p className="text-xs text-gray-400 text-center">
              HTML wird in die Zwischenablage kopiert — einfach in die
              E-Mail-Signatur-Einstellungen einfügen.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
