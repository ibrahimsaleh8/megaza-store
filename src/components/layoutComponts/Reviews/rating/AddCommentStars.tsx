import { FaStar } from "react-icons/fa";

export default function AddCommentStars({ rate }: { rate: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: rate }).map((_el, i) => (
        <FaStar key={i} className="text-yellow-500" />
      ))}
      <p className="font-bold">{rate}.0</p>
    </div>
  );
}
