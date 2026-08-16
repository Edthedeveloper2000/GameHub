import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Logo } from "./Logo";

export function Navbar({ admin = false }: { admin?: boolean }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 h-[72px] border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container-page flex h-full items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo />
          {admin && (
            <span className="hidden rounded-full border border-primary/60 px-2.5 py-1 text-xs font-semibold text-primary sm:inline-flex">
              Modo Admin
            </span>
          )}
        </div>

        {admin ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="btn-base btn-ghost h-10 px-4 text-sm"
            >
              <LogOut className="size-4" />
              Sair
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Área do Admin
          </Link>
        )}
      </div>
    </header>
  );
}
