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
  const [schoolYear, setSchoolYear] = useState("");
  const [year, setYear] = useState("");
  const [origin, setOrigin] = useState("");
  const [author, setAuthor] = useState("");
  const [search, setSearch] = useState("");

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    return games.filter((g) => {
      const matchesGlobal =
        !q ||
        g.name.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.authors.some((a) => a.toLowerCase().includes(q)) ||
        g.schoolYear.toLowerCase().includes(q) ||
        String(g.year).includes(q) ||
        String(g.origin).toLowerCase().includes(q);

      const matchesOrigin = !origin || g.origin === origin;
      const matchesSchoolYear = origin === "PROJETO INTEGRADOR" ? (!schoolYear || g.schoolYear === schoolYear) : true;
      const matchesYear = !year || String(g.year) === year;
      const matchesAuthor = !author || g.authors.some((a) => a.toLowerCase().includes(author.trim().toLowerCase()));
      return matchesGlobal && matchesOrigin && matchesSchoolYear && matchesYear && matchesAuthor;
    });
  }, [search, origin, schoolYear, year, author]);

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
            Descubra os jogos criados na <span className="text-gradient-neon">UFV Florestal</span>
          </h1>
          <p className="relative mt-4 max-w-2xl text-base text-muted-foreground">
            Um catálogo aberto dos jogos desenvolvidos por estudantes e professores do Campus
            Florestal. Filtre por turma, ano ou autoria e jogue direto pelo navegador.
          </p>
        </section>

        <div className="relative w-full mb-4">
          <Search className="size-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="field w-full pr-10"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Pesquisa global"
          />
        </div>

        <form className="card-surface flex flex-wrap items-center gap-3 p-4">
          <select
            className="field min-w-[160px] flex-1"
            value={origin}
            onChange={(e) => {
              const v = e.target.value;
              setOrigin(v);
              if (v !== "PROJETO INTEGRADOR") {
                setSchoolYear("");
              }
            }}
            aria-label="Origem do jogo"
          >
            <option value="">Origem</option>
            <option value="PROJETO INTEGRADOR">PROJETO INTEGRADOR</option>
            <option value="GAMEHUB">GAMEHUB</option>
            <option value="GAMEJAM">GAMEJAM</option>
            <option value="POC">POC</option>
            <option value="OUTRO">OUTRO</option>
          </select>

          {/* name-specific filter removed — global search replaces it */}

          {origin === "PROJETO INTEGRADOR" && (
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
          )}
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
        </form>

        <section className="py-12">
          {results.length > 0 ? (
            <GameGrid games={results} />
          ) : (
            <div className="card-surface flex flex-col items-center gap-4 px-6 py-16 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl border border-border bg-background">
                <Gamepad2 className="size-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Nenhum jogo encontrado com esses filtros.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
