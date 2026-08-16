import { createFileRoute, notFound } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Download, ExternalLink, Maximize, Play } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GameGrid } from "@/components/GameCard";
import { games } from "@/data/games";

export const Route = createFileRoute("/jogo/$gameId")({
  loader: ({ params }) => {
    const game = games.find((g) => g.id === params.gameId);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Jogo não encontrado — GameHub UFV" }, { name: "robots", content: "noindex" }],
      };
    }
    const { game } = loaderData;
    const title = `${game.name} — GameHub UFV`;
    return {
      meta: [
        { title },
        { name: "description", content: game.description },
        { property: "og:title", content: title },
        { property: "og:description", content: game.description },
      ],
    };
  },
  component: GamePage,
});

function GamePage() {
  const { game } = Route.useLoaderData();
  const frameRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const others = games.filter((g) => g.id !== game.id).slice(0, 4);

  function startPlaying() {
    setPlaying(true);
    frameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container-page py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
          <div ref={frameRef} className="relative overflow-hidden rounded-xl bg-black">
            <div className="absolute right-3 top-3 z-10 flex gap-2">
              <button
                type="button"
                onClick={() => frameRef.current?.requestFullscreen?.()}
                className="btn-base btn-ghost h-9 bg-background/70 px-3 text-xs backdrop-blur"
              >
                <Maximize className="size-4" />
                Tela cheia
              </button>
              <a
                href={game.playUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-base btn-ghost h-9 bg-background/70 px-3 text-xs backdrop-blur"
              >
                <ExternalLink className="size-4" />
                Abrir em nova guia
              </a>
            </div>

            <div className="flex aspect-video w-full items-center justify-center">
              {playing ? (
                <iframe
                  src={game.playUrl}
                  title={`Área de jogo — ${game.name}`}
                  className="size-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={startPlaying}
                  className="flex flex-col items-center gap-3 text-muted-foreground"
                >
                  <span
                    className="flex size-16 items-center justify-center rounded-full"
                    style={{ background: "var(--gradient-neon)" }}
                  >
                    <Play className="size-7 text-background" />
                  </span>
                  <span className="text-[13px] font-medium">Clique para iniciar o jogo</span>
                </button>
              )}
            </div>
          </div>

          <aside className="card-surface flex flex-col gap-4 p-4">
            <img
              src={game.image}
              alt={`Capa do jogo ${game.name}`}
              width={768}
              height={512}
              className="h-44 w-full rounded-xl object-cover"
            />
            <h2>{game.name}</h2>
            <div className="flex flex-wrap gap-2">
              <span className="pill">Ano escolar: {game.schoolYear}</span>
              <span className="pill">Ano: {game.year}</span>
            </div>
            <p className="text-[13px] font-medium text-muted-foreground">
              {game.authors.join(", ")}
            </p>
            <p className="text-[15px] text-muted-foreground">{game.description}</p>

            <div className="mt-auto flex flex-col gap-3">
              
              {game.downloadUrl && (
                <a
                  href={game.downloadUrl}
                  className="btn-base btn-outline w-full"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download className="size-4" />
                  Baixar (ZIP)
                </a>
              )}
            </div>
          </aside>
        </div>

        <section className="pt-12">
          <h3 className="mb-6">Mais jogos do GameHub</h3>
          <GameGrid games={others} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
