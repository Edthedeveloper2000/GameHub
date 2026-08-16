import { useRef, useState } from "react";
import { Plus, UploadCloud, X } from "lucide-react";
import { GameOrigin, schoolYears, type Game } from "@/data/games";

export type GameFormValues = Omit<Game, "id">;

export function GameForm({
  initial,
  submitLabel = "Cadastrar jogo",
  onSubmit,
  onCancel,
}: {
  initial?: Game;
  submitLabel?: string;
  onSubmit: (values: GameFormValues) => void;
  onCancel?: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(initial?.name ?? "");
  const [year, setYear] = useState(String(initial?.year ?? new Date().getFullYear()));
  const [schoolYear, setSchoolYear] = useState(initial?.schoolYear ?? (schoolYears[0] as string));
  const [origin, setOrigin] = useState<GameOrigin>(
    initial?.origin ?? GameOrigin.PROJETO_INTEGRADOR
  );
  const [image, setImage] = useState(initial?.image ?? "");
  const [playUrl, setPlayUrl] = useState(initial?.playUrl ?? "");
  const [downloadUrl, setDownloadUrl] = useState(initial?.downloadUrl ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [authors, setAuthors] = useState<string[]>(
    Array.isArray(initial?.authors) ? initial.authors : []
  );
  const [authorInput, setAuthorInput] = useState("");

  function handleFile(file?: File | null) {
    if (!file) return;
    setImage(URL.createObjectURL(file));
  }

  function addAuthor(textToAdd?: string) {
    const raw = (textToAdd !== undefined ? textToAdd : authorInput).trim();
    if (!raw) return;
    const parts = raw.split(",").map((p) => p.trim()).filter(Boolean);
    setAuthors((prev) => {
      const next = [...prev];
      for (const part of parts) {
        if (!next.includes(part)) {
          next.push(part);
        }
      }
      return next;
    });
    setAuthorInput("");
  }

  function getEffectiveAuthors(): string[] {
    const list = [...authors];
    const pending = authorInput.trim();
    if (pending) {
      const parts = pending.split(",").map((p) => p.trim()).filter(Boolean);
      for (const part of parts) {
        if (!list.includes(part)) {
          list.push(part);
        }
      }
    }
    return list;
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        const finalAuthors = getEffectiveAuthors();
        onSubmit({
          name: name.trim(),
          year: Number(year) || new Date().getFullYear(),
          schoolYear: schoolYear || (schoolYears[0] as string),
          authors: finalAuthors,
          image: image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=768&q=80",
          playUrl: playUrl.trim(),
          ...(downloadUrl.trim() ? { downloadUrl: downloadUrl.trim() } : {}),
          description: description.trim(),
          origin,
        });
      }}
    >
      <label className="flex flex-col gap-2">
        <span className="text-[13px] font-medium text-muted-foreground">Nome do jogo</span>
        <input
          className="field"
          required
          placeholder="Ex.: Lua Cadente"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[13px] font-medium text-muted-foreground">Ano do jogo</span>
        <input
          className="field"
          type="number"
          min={2000}
          max={2100}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[13px] font-medium text-muted-foreground">Origem</span>
        <select
          className="field"
          value={origin}
          onChange={(e) => setOrigin(e.target.value as GameOrigin)}
        >
          <option value={GameOrigin.PROJETO_INTEGRADOR}>PROJETO INTEGRADOR</option>
          <option value={GameOrigin.GAMEHUB}>GAMEHUB</option>
          <option value={GameOrigin.GAMEJAM}>GAMEJAM</option>
          <option value={GameOrigin.POC}>POC</option>
          <option value={GameOrigin.OUTRO}>OUTRO</option>
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[13px] font-medium text-muted-foreground">
          Ano escolar alvo
        </span>
        <select
          className="field"
          value={schoolYear}
          onChange={(e) => setSchoolYear(e.target.value)}
        >
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
        {image && (
          <img
            src={image}
            alt="Pré-visualização da imagem do jogo"
            className="mt-1 h-40 w-full rounded-xl object-cover"
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[13px] font-medium text-muted-foreground">Autores</span>
        <div className="flex gap-2">
          <input
            className="field flex-1"
            placeholder="Digite o nome (ou nomes separados por vírgula)"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addAuthor();
              }
            }}
          />
          <button
            type="button"
            onClick={() => addAuthor()}
            className="btn-base btn-outline px-4 text-sm"
          >
            <Plus className="size-4" />
            Adicionar
          </button>
        </div>
        {authors.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
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
        <input
          className="field"
          type="url"
          placeholder="https://"
          required
          value={playUrl}
          onChange={(e) => setPlayUrl(e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[13px] font-medium text-muted-foreground">
          Link para download (ZIP) — opcional
        </span>
        <input
          className="field"
          type="url"
          placeholder="https://"
          value={downloadUrl}
          onChange={(e) => setDownloadUrl(e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[13px] font-medium text-muted-foreground">Descrição</span>
        <textarea
          className="field min-h-24 py-2"
          placeholder="Resumo do jogo"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <div className="mt-2 flex flex-wrap justify-end gap-3 border-t border-border pt-5">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-base btn-outline">
            Cancelar
          </button>
        )}
        <button type="submit" className="btn-base btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
