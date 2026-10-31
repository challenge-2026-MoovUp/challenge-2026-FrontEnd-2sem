# Integração com a API MoovUp — guia de implementação

Referência para ligar o front (hoje 100% mock + localStorage) na API Java.
Contrato recebido em 27/10. Base local: `http://localhost:8080`.

Este documento é o mapa: **você escreve o código**, aqui está a ordem, o desenho
das camadas e as decisões que precisam ser tomadas antes de digitar.

---

## 1. O desenho em uma frase

```
componente  →  hook  →  api/*.ts  →  api/http.ts  →  fetch
   (UI)      (estado)   (endpoint)   (erro/baseURL)
                 ↑
            mappers/*.ts   (DTO da API → tipo da UI)
```

Quatro camadas, cada uma com um trabalho só:

| Camada | Arquivo | Responsabilidade | O que NUNCA faz |
|---|---|---|---|
| `http.ts` | 1 arquivo | baseURL, JSON, headers, transformar erro HTTP em `ApiError` | conhecer "usuário" ou "postagem" |
| `api/*.ts` | 1 por recurso | uma função por endpoint do contrato, tipada com DTO | formatar texto para a tela |
| `mappers/*.ts` | 1 por domínio | traduzir DTO ↔ tipos de `src/types` | chamar `fetch` |
| `hooks/*.ts` | 1 por tela/recurso | `loading`, `error`, `data`, recarregar | montar URL |

**Por que separar assim:** quando a URL do deploy chegar no sábado, você muda
uma linha (`.env`). Quando o backend renomear um campo, você muda o mapper e
nenhum componente quebra. E `Feed.tsx` continua recebendo `FeedPost`, o tipo que
ele já entende hoje.

---

## 2. Estrutura de arquivos a criar

```
src/
  api/
    http.ts            ← base: request(), ApiError
    usuariosApi.ts     ← /usuarios, login, ranking, pontos, impacto
    postagensApi.ts    ← /postagens
    comentariosApi.ts  ← /postagens/{id}/comentarios, /comentarios/{id}
    ticketsApi.ts      ← /tickets, /tickets/estoque
    resgatesApi.ts     ← /usuarios/{id}/resgates
  types/
    api.ts             ← DTOs: espelho EXATO do contrato (camelCase, em pt)
  mappers/
    feedMapper.ts      ← PostagemDTO → FeedPost
    walletMapper.ts    ← TicketDTO/UsuarioDTO → Trip, Redemption, saldo
  hooks/
    useFeed.ts
    useAuth.ts
    useCarteira.ts
```

`src/api/feedApi.ts` (o arquivo que você já começou) vira `postagensApi.ts` —
nomeie pelo recurso do contrato, não pela tela, porque a mesma API serve mais de
uma tela.

### DTO vs tipo de UI — a ideia central

`src/types/feed.ts` descreve o que a **tela** precisa (`initials`,
`avatarClass`, `handle`). `src/types/api.ts` descreve o que o **servidor**
manda (`idUsuario`, `tipoPostagem`, `pontosGerados`). São dois mundos, e o
mapper é a fronteira. Se você usar o DTO direto nos componentes, qualquer
mudança no backend espalha por toda a UI.

---

## 3. Passo a passo (nessa ordem)

### Passo 0 — ambiente

```bash
# .env
VITE_API_URL=http://localhost:8080
```

Duas pendências aqui:

1. **`.env` não está no `.gitignore`.** Hoje ele só tem uma URL de localhost,
   mas o hábito é ruim: adicione `.env` ao `.gitignore` e crie um
   `.env.example` com `VITE_API_URL=http://localhost:8080` versionado, para o
   resto do grupo saber o que preencher.
2. No Vite, variável só chega no browser se começar com `VITE_`. Ela é lida em
   build time e fica **visível no bundle** — nunca coloque senha/token ali.

### Passo 1 — `api/http.ts` (comece aqui, é a base de tudo)

O que esse arquivo precisa resolver:

- montar `${API_URL}${path}`;
- `headers: { 'Content-Type': 'application/json' }` no POST/PUT/PATCH;
- `fetch` **não rejeita em 404/422** — ele resolve com `res.ok === false`. Você
  tem que checar `res.ok` na mão e lançar o erro;
- o contrato padroniza o erro: `{ status, mensagem, timestamp }`. Transforme
  isso numa classe `ApiError` com `status` e `mensagem`, para a UI poder
  escolher a frase pelo código (422 = "saldo insuficiente", 401 = "login
  inválido");
- `204 No Content` (DELETE) não tem corpo: `res.json()` quebra. Trate `204`
  antes de parsear.

Esqueleto para você preencher:

```ts
const API_URL = import.meta.env.VITE_API_URL ?? ''

export class ApiError extends Error {
    constructor(public status: number, public mensagem: string) { /* ... */ }
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
    // 1. fetch(`${API_URL}${path}`, { ...init, headers })
    // 2. if (res.status === 204) return undefined as T
    // 3. if (!res.ok) → parse do corpo de erro → throw new ApiError(...)
    // 4. return res.json() as Promise<T>
}
```

Com `request<T>` pronto, cada endpoint do contrato é uma linha.

### Passo 2 — `types/api.ts`

Copie o contrato campo por campo. Enums como union type, que é mais honesto que
`string`:

```ts
export type Modalidade = 'ONIBUS' | 'METRO' | 'TREM'
export type TipoPostagem = 'TEXTO' | 'IMAGEM' | 'VIDEO'
export type StatusTicket = 'DISPONIVEL' | 'RESERVADO' | 'UTILIZADO' | 'EXPIRADO'

export interface UsuarioDTO {
    id: string
    nome: string
    email: string
    saldoPontos: number
    status: 'A' | 'I'
    dataCadastro: string
}
```

Datas chegam como **string** (`"2026-10-27T14:30:00"`, sem timezone). Deixe
`string` no DTO e converta para `Date` só onde for formatar.

### Passo 3 — um recurso de ponta a ponta (sugiro usuários/login)

Faça **um** fluxo completo antes de escrever os outros arquivos: `usuariosApi.ts`
→ `useAuth` → `LoginModal.tsx`. É aí que você descobre o que falta no `http.ts`.
Escrever os seis arquivos de API de uma vez e só depois testar é a receita para
depurar seis erros juntos.

### Passo 4 — feed

`postagensApi.ts` + `comentariosApi.ts` + `feedMapper.ts` + `useFeed` →
`Feed.tsx` / `Composer.tsx`.

### Passo 5 — carteira

`ticketsApi.ts` + `resgatesApi.ts` → trocar a fonte do `WalletProvider`
(hoje `localStorage`) pelo servidor. Esse é o passo mais invasivo: veja §5.

---

## 4. Mapeamento API → seus tipos atuais

### Postagem → `FeedPost`

| `FeedPost` | De onde vem |
|---|---|
| `id`, `content` | `id`, `conteudo` |
| `likes` | `curtidas` |
| `time` | derivar de `dataPostagem` ("há 2 h") |
| `author` | **não vem na postagem** — só `idUsuario` |
| `author.initials`, `avatarClass`, `handle` | derivar de `nome` (iniciais) e `id` (cor) |
| `tags`, `reposts`, `stat` | **não existem no contrato** |
| `replies` | `GET /postagens/{id}/comentarios` (chamada separada) |

Três decisões suas:

1. **Autor:** o contrato não devolve o nome junto da postagem. Opções: chamar
   `GET /usuarios` uma vez, montar um `Map<id, UsuarioDTO>` e resolver o autor
   no mapper (simples, uma chamada extra); ou pedir ao backend para incluir
   `nomeUsuario` na resposta de postagem (melhor, se der tempo). **Pedir hoje,**
   porque sábado é tarde.
2. **`tags` / `reposts` / `stat`:** não existem na API. Ou saem da UI, ou
   continuam como enfeite local (`tags: []`). Não invente endpoint.
3. **Curtir:** o contrato tem o campo `curtidas` mas **nenhum endpoint para
   curtir** (não há `POST /postagens/{id}/curtidas`). Hoje o botão de curtir dá
   15 pontos localmente. Pergunte ao pessoal do back — isso é um furo do
   contrato, não seu.

### Pontos — divergência de regra

| Ação | `src/data/points.ts` | API |
|---|---|---|
| publicação TEXTO | 80 | 50 |
| publicação IMAGEM | 80 | 100 |
| publicação VIDEO | 80 | 150 |
| curtida / resposta / repost | 15 / 25 / 40 | sem regra no contrato |

Quem manda em saldo é o servidor (`saldoPontos`, `pontosGerados`). Depois da
integração, `points.ts` deixa de ser "fonte única de verdade" e passa a ser só
texto de marketing da página Sobre. Alinhe os números com o back ou a tela vai
mostrar um saldo que não bate com o que o usuário viu somar.

### Carteira → `Trip` / `Redemption`

`TicketDTO` (`id`, `modalidade`, `status`, `tarifaReais`, `custoEmPontos`,
`dataExpiracao`, `qrCodeHash`) cobre o seu `Redemption`:
`ticketCode` ← `id`, `payload` ← `qrCodeHash`, `expiresAt` ← `dataExpiracao`.
O `qrcode` que você já instalou continua gerando a imagem a partir do
`qrCodeHash`.

`Trip` (linha + estação + pontos) **não tem equivalente na API**: o contrato
tem `GET /usuarios/{id}/impacto/historico` com `modalidade`, `co2Evitado`,
`kmPercorridos` — mas nada de linha/estação, e nenhum endpoint para registrar
viagem. `transport.ts` (linhas e estações) é dado só do front.

---

## 5. O ponto delicado: `WalletProvider`

Hoje ele é **síncrono**: `earn()`, `registerTrip()`, `redeem()` devolvem
resultado na hora, porque mexem num objeto em memória + `localStorage`.

Com API, toda operação vira assíncrona e pode falhar. O contrato da camada muda:

```ts
// hoje
redeem: (optionId, delivery, cardNumber?) => { ok: boolean; reason?: string }

// com API
redeem: (optionId, delivery, cardNumber?) => Promise<{ ok: boolean; reason?: string }>
```

Todo componente que chama `redeem()` precisa de `await` + estado de "enviando".
Duas estratégias:

- **Servidor manda (recomendado):** chama a API, e no sucesso recarrega
  `GET /usuarios/{id}` para pegar `saldoPontos`. Saldo sempre correto, com um
  instante de espera na tela.
- **Otimista:** atualiza na hora e desfaz se der erro. Mais fluido, mais código,
  mais chance de a tela mentir. Não vale a pena no prazo do challenge.

Mantenha `localStorage` como fallback enquanto o backend não estiver de pé — é o
que te deixa continuar demonstrando o projeto se a API cair na apresentação.

---

## 6. Furos do contrato — perguntar ao time do back

O texto que você colou chegou truncado em alguns pontos (`GET /usuarios/{id}/pontos`,
`POST /usuarios/{id}/resgates`, `GET /tickets/estoque`, `GET /usuarios/{id}/impacto`
aparecem cortados no meio). Confirme antes de codar:

1. `GET /usuarios/{id}/pontos` — formato exato da resposta.
2. `POST /usuarios/{id}/resgates` — **qual é o body?** (`idTicket`? `modalidade`?)
   e o que retorna. É o endpoint central da carteira e é o mais ilegível no texto.
3. `GET /tickets/estoque` — nomes dos quatro contadores.
4. `GET /usuarios/{id}/impacto` — confirmar `{ idUsuario, totalViagens, totalKm, totalCo2Evitado }`.
5. **Curtir postagem** — existe endpoint? (§4)
6. **Autor na postagem** — dá para incluir `nomeUsuario` na resposta? (§4)
7. **CORS** — o Spring precisa liberar `http://localhost:5173` (porta do Vite),
   senão o browser bloqueia toda chamada e você vai achar que o seu código está
   errado. É o erro nº 1 de integração nesse tipo de projeto.
8. **Registrar viagem** — não há endpoint; a carteira depende disso ou fica local?

---

## 7. Checklist

- [ ] `.env` com `VITE_API_URL`, `.env` no `.gitignore`, `.env.example` criado
- [ ] CORS liberado no backend para a porta do Vite
- [ ] `api/http.ts` com `request<T>` + `ApiError` (204 e `!res.ok` tratados)
- [ ] `types/api.ts` com os DTOs e enums do contrato
- [ ] `usuariosApi.ts` + `useAuth` + `LoginModal` ligados (fluxo piloto)
- [ ] `postagensApi.ts` + `comentariosApi.ts` + `feedMapper` + `useFeed`
- [ ] `ticketsApi.ts` + `resgatesApi.ts`
- [ ] `WalletProvider` assíncrono, com fallback local
- [ ] Respostas das 8 perguntas do §6
