import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { games as seedGames, type Game } from "@/data/games";

const STORAGE_KEY = "gamehub-ufv:games";

type GamesContextValue = {
  games: Game[];
  addGame: (game: Omit<Game, "id"> & { id?: string }) => Game;
  updateGame: (id: string, patch: Partial<Omit<Game, "id">>) => void;
  removeGame: (id: string) => void;
  getGame: (id: string) => Game | undefined;
  resetGames: () => void;
};

const GamesContext = createContext<GamesContextValue | null>(null);

function slugify(value: string) {
  return (
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || `jogo-${Date.now()}`
  );
}

export function GamesProvider({ children }: { children: ReactNode }) {
  const [games, setGames] = useState<Game[]>(seedGames);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setGames(JSON.parse(raw) as Game[]);
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  const persist = useCallback((next: Game[]) => {
    setGames(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo<GamesContextValue>(
    () => ({
      games,
      getGame: (id) => games.find((g) => g.id === id),
      addGame: (game) => {
        const base = game.id?.trim() || slugify(game.name);
        let id = base;
        let n = 2;
        while (games.some((g) => g.id === id)) id = `${base}-${n++}`;
        const created = { ...game, id } as Game;
        persist([created, ...games]);
        return created;
      },
      updateGame: (id, patch) =>
        persist(games.map((g) => (g.id === id ? { ...g, ...patch } : g))),
      removeGame: (id) => persist(games.filter((g) => g.id !== id)),
      resetGames: () => persist(seedGames),
    }),
    [games, persist],
  );

  return <GamesContext.Provider value={value}>{children}</GamesContext.Provider>;
}

export function useGames() {
  const ctx = useContext(GamesContext);
  if (!ctx) throw new Error("useGames deve ser usado dentro de <GamesProvider>");
  return ctx;
}
