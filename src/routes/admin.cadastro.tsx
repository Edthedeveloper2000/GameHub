import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GameForm } from "@/components/GameForm";
import { useGames } from "@/components/GamesProvider";

export const Route = createFileRoute("/admin/cadastro")({
  head: () => ({
    meta: [
      { title: "Cadastrar novo jogo — GameHub UFV" },
      {
        name: "description",
        content:
          "Formulário restrito para professores cadastrarem novos jogos no catálogo público do GameHub UFV.",
      },
      { property: "og:title", content: "Cadastrar novo jogo — GameHub UFV" },
      {
        property: "og:description",
        content: "Área administrativa de cadastro de jogos do GameHub UFV.",
      },
    ],
  }),
  component: CadastroPage,
});

function CadastroPage() {
  const navigate = useNavigate();
  const { addGame } = useGames();
  const [toast, setToast] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar admin />

      <main className="container-page py-10">
        <header className="mx-auto max-w-[640px]">
          <h2>Cadastrar novo jogo</h2>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Os dados informados aqui aparecem imediatamente na página pública do GameHub
            UFV.
          </p>
        </header>

        <div className="card-surface mx-auto mt-8 max-w-[640px] p-8">
          <GameForm
            onCancel={() => navigate({ to: "/admin" })}
            onSubmit={(values) => {
              addGame(values);
              setToast(true);
              window.setTimeout(() => {
                setToast(false);
                navigate({ to: "/admin" });
              }, 1400);
            }}
          />
        </div>
      </main>

      {toast && (
        <div
          role="status"
          className="fixed right-6 top-[88px] z-50 flex items-center gap-3 rounded-xl border border-primary bg-card px-4 py-3 shadow-[var(--glow-primary)]"
        >
          <CheckCircle2 className="size-5 text-primary" />
          <span className="text-sm font-medium">Jogo cadastrado com sucesso</span>
        </div>
      )}

      <Footer />
    </div>
  );
}
