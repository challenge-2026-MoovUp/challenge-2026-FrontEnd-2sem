/* Espelho do contrato da API MoovUp (27/10) — nomes e campos exatamente como o
   servidor manda. Nenhum tipo daqui deve chegar a um componente: os mappers em
   src/mappers traduzem para os tipos de tela (types/feed.ts, types/wallet.ts). */

/* ---------- Enums ---------- */

export type Modalidade = 'ONIBUS' | 'METRO' | 'TREM'
export type TipoPostagem = 'TEXTO' | 'IMAGEM' | 'VIDEO'
export type StatusTicket = 'DISPONIVEL' | 'RESERVADO' | 'UTILIZADO' | 'EXPIRADO'
/** A = ativo, I = inativo. */
export type StatusUsuario = 'A' | 'I'

/* ---------- Usuários ---------- */

export interface UsuarioDTO {
    id: string
    nome: string
    email: string
    saldoPontos: number
    status: StatusUsuario
    /** Só data: "2026-10-27". */
    dataCadastro: string
}

export interface NovoUsuario {
    nome: string
    email: string
    senha: string
}

export interface Credenciais {
    email: string
    senha: string
}

/** PUT /usuarios/{id} não altera senha. */
export interface AtualizacaoUsuario {
    nome: string
    email: string
}

export interface RankingItemDTO {
    posicao: number
    id: string
    nome: string
    saldoPontos: number
}

/* ---------- Postagens ---------- */

export interface PostagemDTO {
    id: string
    idUsuario: string
    titulo: string
    conteudo: string
    imagem: string | null
    video: string | null
    tipoPostagem: TipoPostagem
    curtidas: number
    /** Data e hora: "2026-10-27T14:30:00". */
    dataPostagem: string
    pontosGerados: number
}

export interface NovaPostagem {
    idUsuario: string
    titulo: string
    conteudo: string
    imagem?: string | null
    video?: string | null
    tipoPostagem: TipoPostagem
}

/* ---------- Comentários ---------- */

export interface ComentarioDTO {
    id: string
    idPostagem: string
    idUsuario: string
    conteudo: string
    curtidas: number
    dataComentario: string
}

export interface NovoComentario {
    idUsuario: string
    conteudo: string
}

/* ---------- Tickets ---------- */

export interface TicketDTO {
    id: string
    modalidade: Modalidade
    status: StatusTicket
    tarifaReais: number
    custoEmPontos: number
    dataExpiracao: string
    /** Conteúdo que vai dentro do QR Code gerado na carteira. */
    qrCodeHash: string
}

export interface FiltroTickets {
    status?: StatusTicket
    modalidade?: Modalidade
}

/** POST /tickets (admin): cria N tickets DISPONIVEL. */
export interface NovoLoteTickets {
    modalidade: Modalidade
    quantidade: number
}

/* TODO(contrato): os nomes dos contadores de GET /tickets/estoque vieram
   truncados na mensagem — "disponiveis", "reservados", "utilizados" e um
   quarto campo. Confirmar com o time do back antes de usar na tela. */
export interface EstoqueTicketsDTO {
    disponiveis: number
    reservados: number
    utilizados: number
}

/* ---------- Impacto ambiental ---------- */

export interface ImpactoDTO {
    idUsuario: string
    totalViagens: number
    totalKm: number
    totalCo2Evitado: number
}

export interface ImpactoHistoricoItemDTO {
    id: string
    idTicket: string
    modalidade: Modalidade
    co2Evitado: number
    kmPercorridos: number
    dataCalculo: string
}
