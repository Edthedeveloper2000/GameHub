import { Pencil, Trash2 } from "lucide-react";
import type { Game } from "@/data/games";

export function AdminGameList({
  games,
  onEdit,
  onDelete,
}: {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (game: Game) => void;
}) {
  if (games.length === 0) {
    return (
      <div className="card-surface px-6 py-14 text-center text-muted-foreground">
        Nenhum jogo cadastrado ainda.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {games.map((game) => (
        <article
          key={game.id}
          className="card-surface flex flex-wrap items-center gap-4 p-3 sm:flex-nowrap"
        >
          <img
            src={game.image}
            alt={`Capa do jogo ${game.name}`}
            loading="lazy"
            className="h-16 w-24 shrink-0 rounded-lg object-cover"
          />
          <div className="min-w-[160px] flex-1">
            <h3 className="text-base leading-snug">{game.name}</h3>
            <p className="mt-1 text-[13px] font-medium text-muted-foreground">
              {game.schoolYear} · {game.year} · {Array.isArray(game.authors) ? (game.authors.join(", ") || "Sem autores") : (game.authors || "Sem autores")}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onEdit(game)}
              className="btn-base btn-outline h-10 px-3 text-sm"
            >
              <Pencil className="size-4" />
              Editar
            </button>
            <button
              type="button"
              onClick={() => onDelete(game)}
              className="btn-base btn-ghost h-10 px-3 text-sm text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="size-4" />
              Excluir
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
