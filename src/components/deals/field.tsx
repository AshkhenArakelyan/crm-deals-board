import type { ReactNode } from "react";

export const controlClass =
  "h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors hover:border-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/25";

export const focusRingClass =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

interface FieldProps {
  id: string;
  label: string;
  children: ReactNode;
}

/** A labelled form control. The control must use the same `id`. */
export function Field({ id, label, children }: FieldProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-gray-600">
        {label}
      </label>
      {children}
    </div>
  );
}
