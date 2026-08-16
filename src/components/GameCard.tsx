import { Link } from "@tanstack/react-router";
import type { Game } from "@/data/games";

export function GameCard({ game }: { game: Game }) {
  return (
    <article className="card-surface group flex flex-col overflow-hidden transition-colors hover:border-primary/50">
      <img
        src={game.image}
        alt={`Capa do jogo ${game.name}`}
        loading="lazy"
        width={768}
        height={512}
        className="h-40 w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="leading-snug">{game.name}</h3>
        <div className="flex flex-wrap gap-2">
          <span className="pill">Ano escolar: {game.schoolYear}</span>
          <span className="pill">Ano: {game.year}</span>
        </div>
        <p className="text-[13px] font-medium text-muted-foreground">
          {Array.isArray(game.authors) ? game.authors.join(", ") : (game.authors || "")}
        </p>
        <Link
          to="/jogo/$gameId"
          params={{ gameId: game.id }}
          className="btn-base btn-outline mt-auto w-full"
        >
          Ver mais
        </Link>
      </div>
    </article>
  );
}

export function GameGrid({ games }: { games: Game[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {games.map((game) => (
        <GameCard key={game.id + game.name} game={game} />
      ))}
    </div>
  );
}
