import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Gamepad2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GameGrid } from "@/components/GameCard";
import { games, gameYears, schoolYears } from "@/data/games";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GameHub UFV — Jogos criados na UFV Florestal" },
      {
        name: "description",
        content:
          "Agregador público dos jogos desenvolvidos por estudantes da UFV Campus Florestal. Pesquise por nome, ano escolar, ano e autores.",
      },
      { property: "og:title", content: "GameHub UFV — Jogos criados na UFV Florestal" },
      {
        property: "og:description",
        content:
          "Descubra, jogue e baixe os jogos desenvolvidos na Universidade Federal de Viçosa - Campus Florestal.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [name, setName] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [year, setYear] = useState("");
  const [author, setAuthor] = useState("");

  const [filters, setFilters] = useState({ name: "", schoolYear: "", year: "", author: "" });

  const results = useMemo(
    () =>
      games.filter(
        (g) =>
          g.name.toLowerCase().includes(filters.name.trim().toLowerCase()) &&
          (!filters.schoolYear || g.schoolYear === filters.schoolYear) &&
          (!filters.year || String(g.year) === filters.year) &&
          (!filters.author ||
            g.authors.some((a) =>
              a.toLowerCase().includes(filters.author.trim().toLowerCase()),
            )),
      ),
    [filters],
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container-page">
        <section className="relative py-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/4 size-72 rounded-full opacity-25 blur-3xl"
            style={{ background: "var(--gradient-neon)" }}
          />
          <h1 className="relative max-w-2xl">
            Descubra os jogos criados na{" "}
            <span className="text-gradient-neon">UFV Florestal</span>
          </h1>
          <p className="relative mt-4 max-w-2xl text-base text-muted-foreground">
            Um catálogo aberto dos jogos desenvolvidos por estudantes e professores do
            Campus Florestal. Filtre por turma, ano ou autoria e jogue direto pelo
            navegador.
          </p>
        </section>

        <form
          className="card-surface flex flex-wrap items-center gap-3 p-4"
          onSubmit={(e) => {
            e.preventDefault();
            setFilters({ name, schoolYear, year, author });
          }}
        >
          <input
            className="field min-w-[200px] flex-1"
            placeholder="Buscar por nome do jogo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="field min-w-[160px] flex-1"
            value={schoolYear}
            onChange={(e) => setSchoolYear(e.target.value)}
            aria-label="Ano escolar alvo"
          >
            <option value="">Ano escolar alvo</option>
            {schoolYears.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            className="field min-w-[140px] flex-1"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            aria-label="Ano do jogo"
          >
            <option value="">Ano do jogo</option>
            {gameYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <input
            className="field min-w-[160px] flex-1"
            placeholder="Autores"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button type="submit" className="btn-base btn-primary">
            <Search className="size-4" />
            Filtrar
          </button>
        </form>

        <section className="py-12">
          {results.length > 0 ? (
            <GameGrid games={results} />
          ) : (
            <div className="card-surface flex flex-col items-center gap-4 px-6 py-16 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl border border-border bg-background">
                <Gamepad2 className="size-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Nenhum jogo encontrado com esses filtros.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
