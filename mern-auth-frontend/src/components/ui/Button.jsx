export default function Button({
  children,
  type = "submit",
  loading = false,
  className = "",
}) {
  return (
    <button
      type={type}
      disabled={loading}
      className={`
        w-full py-3 rounded-lg
        bg-blue-600 text-white font-medium
        hover:bg-blue-700 transition
        disabled:opacity-50
        ${className}
      `}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
