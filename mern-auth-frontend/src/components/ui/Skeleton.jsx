export default function Skeleton({ height = "h-6" }) {
  return (
    <div
      className={`w-full ${height} bg-gray-200 animate-pulse rounded`}
    />
  );
}
