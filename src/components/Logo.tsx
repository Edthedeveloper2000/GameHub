import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img
        src={logo}
        alt="Logo GameHub UFV"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="drop-shadow-[0_0_12px_oklch(0.845_0.144_175.5/0.45)]"
      />
      <span className="text-lg font-bold tracking-tight">
        Game<span className="text-gradient-neon">Hub</span> UFV
      </span>
    </Link>
  );
}
