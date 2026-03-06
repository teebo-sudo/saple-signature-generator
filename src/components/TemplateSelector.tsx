"use client";

import { TemplateKey, templates } from "@/templates";

interface TemplateSelectorProps {
  selected: TemplateKey;
  onSelect: (template: TemplateKey) => void;
}

export default function TemplateSelector({
  selected,
  onSelect,
}: TemplateSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        Template
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {(Object.keys(templates) as TemplateKey[]).map((key) => {
          const t = templates[key];
          const isSelected = selected === key;
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                isSelected
                  ? "border-yellow-400 bg-yellow-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="text-sm font-medium">{t.name}</div>
              <div className="text-xs text-gray-500 mt-1">{t.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
