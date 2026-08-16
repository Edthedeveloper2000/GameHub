# GameHub UFV Portal

Prompt para Figma Make — GameHub UFV

Crie o protótipo de uma aplicação web chamada GameHub UFV, um agregador público de jogos desenvolvidos na Universidade Federal de Viçosa - Campus Florestal. A identidade visual é dark/tech-gaming: fundo escuro quase preto, com destaques em ciano-neon e roxo-neon, remetendo ao logo (peça de xadrez estilizada com circuitos). Use tipografia sans-serif moderna e geométrica (Poppins ou Inter), com pesos Bold para títulos e Regular/Medium para corpo de texto.

Sistema de design (usar em todas as páginas)

Cores

Fundo primário: #0D0F14 (quase preto)

Fundo secundário / cards: #161A22

Borda/divisores: #262B36

Texto primário: #F5F7FA

Texto secundário: #9AA3B2

Acento primário (ciano-neon): #2EE6C4

Acento secundário (roxo-neon): #A855F7

Gradiente de destaque: linear de #2EE6C4 para #A855F7, usado em botões primários e ícones do logo

Erro/alerta: #F26D6D

Tipografia

Fonte: Poppins (ou Inter como fallback)

H1: 32px / Bold / letter-spacing -0.5px

H2: 24px / Bold

H3: 18px / SemiBold

Corpo: 15px / Regular

Legenda/metadata: 13px / Medium / cor texto secundário

Espaçamento e grid

Container central máximo: 1200px, padding lateral 24px (desktop) / 16px (mobile)

Grid de 12 colunas, gutter 24px

Espaçamento vertical entre seções: 48px

Cards com padding interno 16px, border-radius 12px, sombra sutil 0 4px 20px rgba(0,0,0,0.4)

Componentes base

Botão primário: fundo em gradiente ciano→roxo, texto branco, altura 44px, border-radius 8px

Botão secundário (outline): borda 1px #2EE6C4, texto ciano, fundo transparente

Input/select: fundo #161A22, borda #262B36, altura 44px, border-radius 8px, texto placeholder em cor secundária

Navbar fixa no topo: fundo #0D0F14 com blur leve, logo à esquerda, à direita link discreto "Área do Admin"

Página 1 — Página Principal (pública)

Objetivo: ponto de entrada onde qualquer visitante pesquisa e navega pelos jogos.

Navbar (altura 72px): logo GameHub UFV (ícone da peça de xadrez com circuito, em ciano/roxo) à esquerda; à direita, link "Área do Admin" em texto secundário.

Hero/topo da página (padding vertical 40px): H1 "Descubra os jogos criados na UFV Florestal", subtítulo em texto secundário (16px) explicando o propósito do agregador.

Barra de filtros logo abaixo do hero, em card #161A22 com padding 16px, layout em linha (wrap no mobile):

Campo de texto: "Buscar por nome do jogo"

Select: "Ano escolar alvo"

Select: "Ano do jogo"

Campo de texto/select: "Autores"

Botão primário "Filtrar" ao final da linha

Grid de resultados: grid responsivo (4 colunas desktop / 2 tablet / 1 mobile), gap 24px. Cada card de jogo:

Thumbnail/imagem do jogo (topo do card, altura 160px, cantos superiores arredondados)

Nome do jogo (H3)

Badges pequenas: "Ano escolar: X" e "Ano: 20XX" (pill shape, fundo #262B36, texto 12px)

Autores (texto secundário, 13px)

Botão secundário "Ver mais" que leva à Página do Jogo

Estado vazio: se filtro não retornar nada, exibir ilustração simples + texto "Nenhum jogo encontrado com esses filtros".

Footer simples: logo pequeno + "GameHub UFV — Campus Florestal" em texto secundário, fundo #0D0F14.

Página 2 — Login do Admin

Objetivo: acesso restrito para professores cadastrarem jogos.

Layout centralizado verticalmente e horizontalmente, fundo #0D0F14 com um leve glow radial ciano/roxo atrás do card de login.

Card de login (largura 400px, fundo #161A22, padding 32px, border-radius 16px):

Logo GameHub UFV centralizado no topo

H2 "Área do Administrador"

Input "E-mail institucional"

Input "Senha" (tipo password, com ícone de olho para exibir/ocultar)

Botão primário "Entrar" (largura total)

Link discreto abaixo: "Voltar para o site" (leva de volta à Página Principal)

Página 3 — Cadastro de Jogos (Admin)

Objetivo: formulário restrito para professores cadastrarem novos jogos.

Navbar do admin: mesma estrutura da navbar pública, mas com um badge "Modo Admin" em ciano ao lado do logo, e à direita um botão "Sair".

Cabeçalho da página: H2 "Cadastrar novo jogo", subtítulo curto explicando que os dados aparecerão na página pública.

Formulário em card centralizado (largura máx. 640px, padding 32px), campos empilhados verticalmente com espaçamento de 20px entre eles:

Input texto: "Nome do jogo"

Input texto/número: "Ano do jogo"

Select: "Ano escolar alvo"

Upload de imagem: área tracejada (dashed border #262B36) com ícone de upload e texto "Arraste uma imagem ou clique para selecionar"; preview da imagem após upload

Input texto: "Autores" (permitir múltiplos, exibidos como chips/tags)

Input texto (URL): "Link para acessar o jogo"

Input texto (URL, opcional): "Link para download (ZIP)"

Ações do formulário: botão secundário "Cancelar" + botão primário "Cadastrar jogo", alinhados à direita, no rodapé do card.

Feedback: toast de sucesso no canto superior direito ("Jogo cadastrado com sucesso") em fundo #161A22 com borda ciano.

Página 4 — Página do Jogo

Objetivo: exibir detalhes do jogo, permitir jogar embutido e navegar para outros jogos.

Navbar pública (igual à Página Principal).

Seção de detalhes do jogo (layout em duas colunas no desktop, empilhado no mobile):

Coluna esquerda (60%): área de gameplay — um frame/iframe simulado com fundo #000000, cantos arredondados 12px, com um botão flutuante no canto superior direito "Tela cheia" (ícone de expandir) e outro botão "Abrir em nova guia" (ícone de link externo) que usa o link do jogo.

Coluna direita (40%): card com dados do jogo:

Imagem/thumbnail do jogo (topo, border-radius 12px)

Nome do jogo (H2)

Badges: "Ano escolar: X", "Ano: 20XX"

Autores (texto secundário)

Botão primário "Jogar" (rola até a área de gameplay ou ativa o iframe)

Botão secundário "Baixar (ZIP)" (exibido somente se houver link de download)

Seção "Outros jogos" abaixo da área de gameplay: H3 "Mais jogos do GameHub", seguida de um grid de cards idêntico ao da Página Principal (mesmos componentes de card de jogo), sem a barra de filtros.

Footer igual ao da Página Principal.

Observações finais para o agente

Priorize um visual "tech/gaming acadêmico": cantos arredondados, glows sutis em ciano/roxo, sem exageros (nada de excesso de efeitos ou animações pesadas).

Mantenha consistência total de componentes (cards, botões, inputs) entre as páginas.

Todas as páginas devem ser responsivas, com breakpoints em 1200px (desktop), 768px (tablet) e 480px (mobile).

A Página de Login e a Página de Cadastro pertencem ao fluxo restrito de admin; as demais são públicas.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/91b6ad3d-f545-47b3-b791-5ad4000b6614).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
