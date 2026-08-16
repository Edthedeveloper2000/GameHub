import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GameForm } from "@/components/GameForm";
import { useGames } from "@/components/GamesProvider";

export const Route = createFileRoute("/admin/editar/$gameId")({
  head: () => ({
    meta: [
      { title: "Editar jogo — GameHub UFV" },
      {
        name: "description",
        content: "Editar informações de um jogo cadastrado no GameHub UFV.",
      },
      { property: "og:title", content: "Editar jogo — GameHub UFV" },
    ],
  }),
  component: EditarJogoPage,
});

function EditarJogoPage() {
  const { gameId } = Route.useParams();
  const navigate = useNavigate();
  const { getGame, updateGame } = useGames();
  const game = getGame(gameId);
  const [toast, setToast] = useState(false);

  if (!game) {
    return (
      <div className="min-h-screen">
        <Navbar admin />
        <main className="container-page py-10 text-center">
          <div className="card-surface mx-auto max-w-[500px] p-8">
            <h2>Jogo não encontrado</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              O jogo que você está tentando editar não foi encontrado no sistema.
            </p>
            <div className="mt-6">
              <Link to="/admin" className="btn-base btn-primary">
                <ArrowLeft className="size-4" />
                Voltar para o painel
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar admin />

      <main className="container-page py-10">
        <header className="mx-auto max-w-[640px]">
          <Link
            to="/admin"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Voltar para o painel
          </Link>
          <h2>Editar: {game.name}</h2>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Altere as informações do jogo e salve para atualizar imediatamente no catálogo público.
          </p>
        </header>

        <div className="card-surface mx-auto mt-8 max-w-[640px] p-8">
          <GameForm
            initial={game}
            submitLabel="Salvar alterações"
            onCancel={() => navigate({ to: "/admin" })}
            onSubmit={(values) => {
              updateGame(gameId, values);
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
          <span className="text-sm font-medium">Jogo atualizado com sucesso</span>
        </div>
      )}

      <Footer />
    </div>
  );
}
