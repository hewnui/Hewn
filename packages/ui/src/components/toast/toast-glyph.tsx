import { toastIconClassName, type ToastTone } from "./toast.styles";

export function ToastGlyph({ tone }: { tone: ToastTone }) {
  const common = {
    viewBox: "0 0 16 16",
    fill: "none",
    "aria-hidden": true as const,
    className: toastIconClassName(),
  };

  if (tone === "success") {
    return (
      <svg {...common}>
        <path
          d="M3.5 8.2 6.2 11l6.3-7"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (tone === "danger") {
    return (
      <svg {...common}>
        <path
          d="M4.2 4.2 11.8 11.8M11.8 4.2 4.2 11.8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (tone === "warning") {
    return (
      <svg {...common}>
        <path
          d="M8 3.2 13.4 12.5H2.6L8 3.2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M8 7v2.4M8 11.2h.01"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (tone === "info") {
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8 7.2V11M8 5.2h.01"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="1.6" fill="currentColor" />
    </svg>
  );
}
