import { FaInbox } from "react-icons/fa";

export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center py-12 text-gray-500">

      <FaInbox size={40} className="mb-3" />

      <p>{message}</p>

    </div>
  );
}
