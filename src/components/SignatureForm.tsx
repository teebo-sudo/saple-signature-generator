"use client";

import { SignatureData } from "@/types/signature";

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

export default function SignatureForm({ data, onChange }: SignatureFormProps) {
  const update = (field: keyof SignatureData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <Section title="Persönliche Daten">
        <Field
          label="Name"
          value={data.name}
          onChange={(v) => update("name", v)}
          placeholder="Max Mustermann"
        />
        <Field
          label="Position"
          value={data.title}
          onChange={(v) => update("title", v)}
          placeholder="Head of Marketing"
        />
        <Field
          label="Unternehmen"
          value={data.company}
          onChange={(v) => update("company", v)}
          placeholder="SAPLE"
        />
      </Section>

      <Section title="Kontakt">
        <Field
          label="E-Mail"
          value={data.email}
          onChange={(v) => update("email", v)}
          placeholder="name@firma.de"
          type="email"
        />
        <Field
          label="Telefon"
          value={data.phone}
          onChange={(v) => update("phone", v)}
          placeholder="+49 (0) 123 456 789"
        />
        <Field
          label="Website"
          value={data.website}
          onChange={(v) => update("website", v)}
          placeholder="www.firma.de"
        />
        <Field
          label="Adresse"
          value={data.address}
          onChange={(v) => update("address", v)}
          placeholder="Musterstraße 1, 12345 Berlin"
        />
      </Section>

      <Section title="Social Media">
        <Field
          label="LinkedIn"
          value={data.linkedin}
          onChange={(v) => update("linkedin", v)}
          placeholder="https://linkedin.com/in/username"
        />
        <Field
          label="Twitter / X"
          value={data.twitter}
          onChange={(v) => update("twitter", v)}
          placeholder="https://x.com/username"
        />
        <Field
          label="Instagram"
          value={data.instagram}
          onChange={(v) => update("instagram", v)}
          placeholder="https://instagram.com/username"
        />
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
      />
    </div>
  );
}
