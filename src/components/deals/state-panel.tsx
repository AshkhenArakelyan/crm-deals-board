import type { ReactNode } from "react";

interface StatePanelProps {
  title: string;
  description?: string;
  /** Use "alert" for errors and "status" for loading. */
  role?: "alert" | "status";
  icon?: ReactNode;
  children?: ReactNode;
}

/** A bordered message block used for loading, error, and empty states. */
export function StatePanel({ title, description, role, icon, children }: StatePanelProps) {
  return (
    <div
      role={role}
      className="flex flex-col items-center rounded-xl border border-gray-200 bg-white px-6 py-16 text-center"
    >
      {icon}
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      {description && (
        <p className="mt-1.5 max-w-md text-sm text-gray-600">{description}</p>
      )}
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}

export function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="mb-4 size-6 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600"
    />
  );
}
