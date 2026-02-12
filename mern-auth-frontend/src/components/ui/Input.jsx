export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="
          px-4 py-2 rounded-md
          border border-gray-300
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
        "
      />
    </div>
  );
}
