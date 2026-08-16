import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Plus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdminGameList } from "@/components/AdminGameList";
import { useGames } from "@/components/GamesProvider";
import type { Game } from "@/data/games";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Painel do Admin — GameHub UFV" },
      {
        name: "description",
        content:
          "Painel restrito para adicionar, atualizar e excluir jogos do catálogo do GameHub UFV.",
      },
      { property: "og:title", content: "Painel do Admin — GameHub UFV" },
      {
        property: "og:description",
        content: "Gerencie os jogos publicados no GameHub UFV.",
      },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const { games, removeGame } = useGames();
  const [confirming, setConfirming] = useState<Game | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 3200);
  }

  return (
    <div className="min-h-screen">
      <Navbar admin />

      <main className="container-page py-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2>Gerenciar jogos</h2>
            <p className="mt-2 text-[15px] text-muted-foreground">
              {games.length} jogo(s) publicados. Adicione, atualize ou remova itens do
              catálogo público.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/" className="btn-base btn-outline">
              Ver site
            </Link>
            <Link to="/admin/cadastro" className="btn-base btn-primary">
              <Plus className="size-4" />
              Adicionar jogo
            </Link>
          </div>
        </header>

        <section className="mt-8">
          <AdminGameList
            games={games}
            onEdit={(game) => {
              navigate({ to: "/admin/editar/$gameId", params: { gameId: game.id } });
            }}
            onDelete={(game) => setConfirming(game)}
          />
        </section>
      </main>

      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">
          <div className="card-surface w-full max-w-[400px] p-6">
            <h3 className="text-lg">Excluir jogo</h3>
            <p className="mt-2 text-[15px] text-muted-foreground">
              Tem certeza que deseja excluir “{confirming.name}”? Essa ação não pode ser
              desfeita.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirming(null)}
                className="btn-base btn-outline"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  removeGame(confirming.id);
                  if (editing?.id === confirming.id) setEditing(null);
                  setConfirming(null);
                  notify("Jogo excluído");
                }}
                className="btn-base bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="fixed right-6 top-[88px] z-50 flex items-center gap-3 rounded-xl border border-primary bg-card px-4 py-3 shadow-[var(--glow-primary)]"
        >
          <CheckCircle2 className="size-5 text-primary" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      <Footer />
    </div>
  );
}
