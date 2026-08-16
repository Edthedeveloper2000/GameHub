import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Área do Administrador — GameHub UFV" },
      {
        name: "description",
        content:
          "Acesso restrito para professores do Campus Florestal cadastrarem jogos no GameHub UFV.",
      },
      { property: "og:title", content: "Área do Administrador — GameHub UFV" },
      {
        property: "og:description",
        content: "Login restrito de professores do GameHub UFV.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute size-[420px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "var(--gradient-neon)" }}
      />

      <div className="card-surface relative w-full max-w-[400px] rounded-2xl p-8">
        <div className="flex justify-center">
          <Logo size={40} />
        </div>

        <h2 className="mt-6 text-center">Área do Administrador</h2>

        <form
          className="mt-6 flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/admin/cadastro" });
          }}
        >
          <label className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-muted-foreground">
              E-mail institucional
            </span>
            <input
              type="email"
              required
              className="field"
              placeholder="professor@ufv.br"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-muted-foreground">Senha</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="field pr-11"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-primary"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </label>

          <button type="submit" className="btn-base btn-primary w-full">
            Entrar
          </button>
        </form>

        <div className="mt-5 text-center">
          <Link
            to="/"
            className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Voltar para o site
          </Link>
        </div>
      </div>
    </main>
  );
}
