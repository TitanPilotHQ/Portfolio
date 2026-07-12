"use client";

import { useId } from "react";

export function MultiSelectField({
  label,
  options,
  value,
  onChange,
  otherValue,
  onOtherChange,
}: {
  label: string;
  options: readonly string[];
  value: string[];
  onChange: (value: string[]) => void;
  otherValue: string;
  onOtherChange: (value: string) => void;
}) {
  const groupId = useId();
  const showOther = value.includes("Other");

  function toggle(option: string) {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-surface/80 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30";

  return (
    <fieldset>
      <legend id={groupId} className="mb-2 text-xs font-medium text-secondary">
        {label}
      </legend>
      <div className="grid gap-2 sm:grid-cols-2" role="group" aria-labelledby={groupId}>
        {options.map((option) => {
          const id = `${groupId}-${option}`;
          return (
            <label
              key={option}
              htmlFor={id}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/10 bg-surface/60 px-3.5 py-2.5 text-sm text-secondary transition-colors hover:border-white/20 has-[:checked]:border-cyan/40 has-[:checked]:bg-cyan/5 has-[:checked]:text-white"
            >
              <input
                id={id}
                type="checkbox"
                checked={value.includes(option)}
                onChange={() => toggle(option)}
                className="size-4 rounded border-white/20 bg-transparent text-cyan focus:ring-1 focus:ring-cyan/40"
              />
              {option}
            </label>
          );
        })}
      </div>
      {showOther ? (
        <input
          type="text"
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="Please specify…"
          aria-label={`${label} — other, please specify`}
          className={`${inputClass} mt-2.5`}
        />
      ) : null}
    </fieldset>
  );
}
