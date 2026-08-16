import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { CheckCircle2, UploadCloud, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { schoolYears } from "@/data/games";

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
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [authors, setAuthors] = useState<string[]>([]);
  const [authorInput, setAuthorInput] = useState("");
  const [toast, setToast] = useState(false);

  function handleFile(file?: File | null) {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }

  function addAuthor() {
    const value = authorInput.trim();
    if (!value || authors.includes(value)) return;
    setAuthors((prev) => [...prev, value]);
    setAuthorInput("");
  }

  return (
    <div className="min-h-screen">
      <Navbar admin />

      <main className="container-page py-10">
        <header className="mx-auto max-w-[640px]">
          <h2>Cadastrar novo jogo</h2>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Os dados informados aqui aparecem imediatamente na página pública do
            GameHub UFV.
          </p>
        </header>

        <form
          className="card-surface mx-auto mt-8 flex max-w-[640px] flex-col gap-5 p-8"
          onSubmit={(e) => {
            e.preventDefault();
            setToast(true);
            window.setTimeout(() => setToast(false), 3200);
          }}
        >
          <label className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-muted-foreground">
              Nome do jogo
            </span>
            <input className="field" required placeholder="Ex.: Lua Cadente" />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-muted-foreground">
              Ano do jogo
            </span>
            <input className="field" type="number" min={2000} max={2100} placeholder="2026" />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-muted-foreground">
              Ano escolar alvo
            </span>
            <select className="field" defaultValue="">
              <option value="">Selecione o ano escolar</option>
              {schoolYears.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-muted-foreground">
              Imagem do jogo
            </span>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFile(e.dataTransfer.files?.[0]);
              }}
              className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-background/60 px-6 py-10 text-center transition-colors hover:border-primary/60"
            >
              <UploadCloud className="size-7 text-primary" />
              <span className="text-[13px] font-medium text-muted-foreground">
                Arraste uma imagem ou clique para selecionar
              </span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            {preview && (
              <img
                src={preview}
                alt="Pré-visualização da imagem do jogo"
                className="mt-1 h-40 w-full rounded-xl object-cover"
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-muted-foreground">Autores</span>
            <input
              className="field"
              placeholder="Digite um nome e pressione Enter"
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addAuthor();
                }
              }}
            />
            {authors.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {authors.map((a) => (
                  <span key={a} className="pill gap-1.5">
                    {a}
                    <button
                      type="button"
                      aria-label={`Remover ${a}`}
                      onClick={() => setAuthors((prev) => prev.filter((x) => x !== a))}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-muted-foreground">
              Link para acessar o jogo
            </span>
            <input className="field" type="url" placeholder="https://" required />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-muted-foreground">
              Link para download (ZIP) — opcional
            </span>
            <input className="field" type="url" placeholder="https://" />
          </label>

          <div className="mt-2 flex flex-wrap justify-end gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="btn-base btn-outline"
            >
              Cancelar
            </button>
            <button type="submit" className="btn-base btn-primary">
              Cadastrar jogo
            </button>
          </div>
        </form>
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
