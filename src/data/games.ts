import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";
import game3 from "@/assets/game-3.jpg";
import game4 from "@/assets/game-4.jpg";
import pingo from "@/assets/pingo.png";

export type Game = {
  id: string;
  name: string;
  year: number;
  schoolYear: string;
  authors: string[];
  image: string;
  playUrl: string;
  downloadUrl?: string;
  description: string;
  origin: GameOrigin;
};

export enum GameOrigin {
  PROJETO_INTEGRADOR = "PROJETO INTEGRADOR",
  GAMEHUB = "GAMEHUB",
  GAMEJAM = "GAMEJAM",
  POC = "POC",
  OUTRO = "OUTRO",
}

export const games: Game[] = [
  {
    id: "pingo-aventura",
    name: "Pingo: uma Aventura na rede",
    year: 2025,
    schoolYear: "2º ano",
    authors: ["Edmarcos", "Vinícius", "Ana Luiza", "César Grandis", "Rafaella Pinheiro"],
    image: pingo,
    playUrl: "http://tomcat.nupessc.caf.ufv.br/pingo/",
    downloadUrl: undefined,
    description: "Aventura educativa sobre redes e segurança direcionada a alunos do 2º ano.",
    origin: GameOrigin.PROJETO_INTEGRADOR,
  },
  {
    id: "lua-cadente",
    name: "Lua Cadente",
    year: 2025,
    schoolYear: "9º ano",
    authors: ["Ana Beatriz Lima", "Rafael Souza"],
    image: game1,
    playUrl: "https://example.com/lua-cadente",
    downloadUrl: "https://example.com/lua-cadente.zip",
    description:
      "Plataforma 2D noturno onde o jogador reconstrói constelações resolvendo desafios de física.",
    origin: GameOrigin.GAMEHUB,
  },
  {
    id: "circuito-matematico",
    name: "Circuito Matemático",
    year: 2024,
    schoolYear: "6º ano",
    authors: ["Marina Castro", "João Pedro Alves", "Lucas Ferraz"],
    image: game2,
    playUrl: "https://example.com/circuito-matematico",
    description:
      "Puzzle de operações e frações em que cada acerto energiza um novo trecho do circuito.",
    origin: GameOrigin.GAMEHUB,
  },
  {
    id: "nebulosa-alfa",
    name: "Nebulosa Alfa",
    year: 2025,
    schoolYear: "1º ano EM",
    authors: ["Gabriel Nunes", "Isabela Rocha"],
    image: game3,
    playUrl: "https://example.com/nebulosa-alfa",
    downloadUrl: "https://example.com/nebulosa-alfa.zip",
    description: "Shooter espacial arcade com perguntas de astronomia entre as ondas de inimigos.",
    origin: GameOrigin.GAMEHUB,
  },
  {
    id: "adventure-quizz",
    name: "Adventure Quizz",
    year: 2023,
    schoolYear: "7º ano",
    authors: ["Helena Prado", "Thiago Martins"],
    image: game4,
    playUrl: "https://example.com/adventure-quizz",
    description: "Aventura de perguntas sobre biologia e meio ambiente com trilhas ramificadas.",
    origin: GameOrigin.GAMEHUB,
  },
  {
    id: "bit-fazenda",
    name: "Bit Fazenda",
    year: 2024,
    schoolYear: "4º ano",
    authors: ["Camila Duarte"],
    image: game2,
    playUrl: "https://example.com/bit-fazenda",
    downloadUrl: "https://example.com/bit-fazenda.zip",
    description:
      "Simulador leve de fazenda que ensina noções de contagem, medidas e sustentabilidade.",
    origin: GameOrigin.GAMEHUB,
  },
  {
    id: "logica-neon",
    name: "Lógica Neon",
    year: 2022,
    schoolYear: "2º ano EM",
    authors: ["Pedro Henrique Dias", "Sofia Ramos"],
    image: game1,
    playUrl: "https://example.com/logica-neon",
    description: "Desafios de lógica proposicional em um labirinto de portas logicas iluminadas.",
    origin: GameOrigin.GAMEHUB,
  },
  {
    id: "eco-runner",
    name: "Eco Runner",
    year: 2025,
    schoolYear: "5º ano",
    authors: ["Vitória Andrade", "Bruno Teixeira"],
    image: game4,
    playUrl: "https://example.com/eco-runner",
    description:
      "Endless runner em que coletar resíduos corretos aumenta o multiplicador de pontos.",
    origin: GameOrigin.GAMEHUB,
  },
  {
    id: "orbita-quimica",
    name: "Órbita Química",
    year: 2023,
    schoolYear: "3º ano EM",
    authors: ["Daniel Moreira"],
    image: game3,
    playUrl: "https://example.com/orbita-quimica",
    downloadUrl: "https://example.com/orbita-quimica.zip",
    description:
      "Monte moléculas contra o tempo enquanto orbita entre estações do laboratório espacial.",
    origin: GameOrigin.GAMEHUB,
  },
];

export const schoolYears = ["1º ano", "2º ano", "3º ano", "4º ano", "5º ano"];

export const gameYears = [2022, 2023, 2024, 2025, 2026];
