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
    conteudo: string
    curtidas: number
    dataComentario: string
}

export interface NovoComentario {
    idUsuario: string
    conteudo: string
}
