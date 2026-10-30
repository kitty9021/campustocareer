import Link from "next/link";
import Image from "next/image";

export default function Logo({
  href = "/",
  light = false,
  size =90,
  showText = true,
}: {
  href?: string;
  light?: boolean;
  size?: number;
  showText?: boolean;
}) {
  return (
    <Link href={href} className="inline-flex items-center gap-2">
      <Image
        src="/logo32.jpg"
        alt="CampusToCareer logo"
        width={size}
        height={size}
        className="rounded-full bg-white"
      />
      {showText && (
        <span
          className={`font-bold tracking-tight ${
            light ? "text-white" : "text-gray-900"
          }`}
          style={{ fontSize: size * 0.5 }}
        >
          Campus
          <span className={light ? "text-blue-200" : "text-blue-500"}>To</span>
          Career
        </span>
      )}
    </Link>
  );
}