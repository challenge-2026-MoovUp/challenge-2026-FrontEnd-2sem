/* Campos exatamente como a API manda. Os mappers traduzem para os tipos de tela. */

export type TipoPostagem = 'TEXTO' | 'IMAGEM' | 'VIDEO'

export interface UsuarioDTO {
    id: string
    nome: string
    email: string
    saldoPontos: number
    /** A = ativo, I = inativo. */
    status: 'A' | 'I'
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

export interface RankingDTO {
    posicao: number
    id: string
    nome: string
    saldoPontos: number
}

export interface PostagemDTO {
    id: string
    idUsuario: string
    nomeUsuario: string
    titulo: string
    conteudo: string
    imagem: string | null
    video: string | null
    tipoPostagem: TipoPostagem
    curtidas: number
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

export interface PostagemAlteracao {
    titulo: string
    conteudo: string
}

export interface NovaCurtida {
    idUsuario: string
}

export interface CurtidaDTO {
    idPostagem: string
    curtidas: number
}

export interface ComentarioDTO {
    id: string
    idPostagem: string
    idUsuario: string
    nomeUsuario: string
    conteudo: string
    curtidas: number
    dataComentario: string
}

export interface NovoComentario {
    idUsuario: string
    conteudo: string
}

export type Modalidade = 'ONIBUS' | 'METRO' | 'TREM'
export type StatusTicket = 'DISPONIVEL' | 'RESERVADO' | 'UTILIZADO' | 'EXPIRADO'
export type FormaRecebimento = 'QR_CODE' | 'RECARGA'

export interface PontosDTO {
    idUsuario: string
    saldoPontos: number
}

export interface TicketDTO {
    id: string
    modalidade: Modalidade
    status: StatusTicket
    tarifaReais: number
    custoEmPontos: number
    formaRecebimento: FormaRecebimento | null
    dataExpiracao: string
    qrCodeHash: string
}

export interface NovoResgate {
    modalidade: Modalidade
    formaRecebimento: FormaRecebimento
}

export interface ResgateDTO {
    ticket: TicketDTO
    saldoRestante: number
}

export interface EstoqueDTO {
    disponiveis: number
    reservados: number
    utilizados: number
    expirados: number
}

export interface LinhaDTO {
    codigo: string
    nome: string
    modalidade: Modalidade
}

export interface EstacaoDTO {
    codigo: string
    nome: string
}

export interface NovaViagem {
    idTicket: string
    linha: string
    estacaoEmbarque: string
}

export interface ViagemDTO {
    id: string
    idUsuario: string
    idTicket: string
    modalidade: Modalidade
    linha: string
    estacaoEmbarque: string
    dataViagem: string
    pontosGerados: number
    co2Evitado: number
}

export interface UsuarioAlteracao {
    nome: string
    email: string
}

export interface ImpactoDTO {
    idUsuario: string
    totalViagens: number
    totalKm: number
    totalCo2Evitado: number
}

export interface ImpactoHistoricoDTO {
    id: string
    idTicket: string
    modalidade: Modalidade
    co2Evitado: number
    kmPercorridos: number
    dataCalculo: string
}

export interface SeguidoDTO {
    id: string
    nome: string
}

export interface NovoLoteTickets {
    modalidade: Modalidade
    quantidade: number
}
