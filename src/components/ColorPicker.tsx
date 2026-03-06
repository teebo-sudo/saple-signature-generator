"use client";

interface ColorPickerProps {
  primaryColor: string;
  accentColor: string;
  onPrimaryChange: (color: string) => void;
  onAccentChange: (color: string) => void;
}

export default function ColorPicker({
  primaryColor,
  accentColor,
  onPrimaryChange,
  onAccentChange,
}: ColorPickerProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        Farben
      </h3>
      <div className="flex gap-6">
        <ColorInput
          label="Textfarbe"
          value={primaryColor}
          onChange={onPrimaryChange}
        />
        <ColorInput
          label="Akzentfarbe"
          value={accentColor}
          onChange={onAccentChange}
        />
      </div>
    </div>
  );
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded border border-gray-300 cursor-pointer p-0"
      />
      <div>
        <div className="text-sm text-gray-700">{label}</div>
        <div className="text-xs text-gray-400 font-mono">{value}</div>
      </div>
    </div>
  );
}
