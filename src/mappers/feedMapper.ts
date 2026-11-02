/* DTO da API → tipos de tela. Nenhum componente importa types/api.ts. */

import type { ComentarioDTO, ImpactoDTO, ImpactoHistoricoDTO, PostagemDTO, RankingDTO, UsuarioDTO } from '../types/api'
import type { FeedAuthor, FeedPost, FeedReply, SuggestedProfile } from '../types/feed'
import type { ImpactoItem, ImpactoResumo, PerfilUsuario } from '../types/perfil'

const avatarClasses = [
    'bg-gradiente-aurora text-void',
    'bg-sage-18 text-sage',
    'bg-ember-16 text-ember',
    'bg-gold-18 text-gold',
]

/** Índice estável pelo id, para o usuário ter sempre a mesma cor. */
function avatarClassDe(id: string) {
    let soma = 0
    for (const char of id) soma += char.charCodeAt(0)
    return avatarClasses[soma % avatarClasses.length]
}

function iniciais(nome: string) {
    const partes = nome.trim().split(/\s+/)
    const primeira = partes[0]?.[0] ?? '?'
    const ultima = partes.length > 1 ? partes[partes.length - 1][0] : ''
    return (primeira + ultima).toUpperCase()
}

export function handleDe(nome: string) {
    return `@${nome.trim().toLowerCase().replace(/\s+/g, '_')}`
}

function toFeedAuthor(id: string, nome: string): FeedAuthor {
    return {
        id,
        name: nome,
        handle: handleDe(nome),
        initials: iniciais(nome),
        avatarClass: avatarClassDe(id),
    }
}

export function toPerfilRanking(dto: RankingDTO): SuggestedProfile {
    return {
        ...toFeedAuthor(dto.id, dto.nome),
        bio: `${dto.posicao}º · ${dto.saldoPontos.toLocaleString('pt-BR')} pontos`,
    }
}

export function toPerfilUsuario(dto: UsuarioDTO): PerfilUsuario {
    return {
        ...toFeedAuthor(dto.id, dto.nome),
        email: dto.email,
        saldoPontos: dto.saldoPontos,
        membroDesde: new Date(dto.dataCadastro).toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric',
        }),
        ativo: dto.status === 'A',
    }
}

function emKg(gramas: number) {
    return `${(gramas / 1000).toLocaleString('pt-BR')} kg`
}

export function toImpactoResumo(dto: ImpactoDTO): ImpactoResumo {
    return {
        viagens: dto.totalViagens.toLocaleString('pt-BR'),
        km: `${dto.totalKm.toLocaleString('pt-BR')} km`,
        co2: emKg(dto.totalCo2Evitado),
    }
}

export function toImpactoItem(dto: ImpactoHistoricoDTO): ImpactoItem {
    return {
        id: dto.id,
        titulo: `${dto.modalidade} · ${new Date(dto.dataCalculo).toLocaleDateString('pt-BR')}`,
        detalhe: `${dto.kmPercorridos.toLocaleString('pt-BR')} km · ${emKg(dto.co2Evitado)} de CO₂ evitado`,
    }
}

export function tituloDe(content: string) {
    return content.split('\n')[0].slice(0, 50)
}

function tempoRelativo(dataIso: string, agora = new Date()) {
    const diff = agora.getTime() - new Date(dataIso).getTime()
    const minutos = Math.floor(diff / 60_000)

    if (minutos < 1) return 'agora'
    if (minutos < 60) return `há ${minutos} min`

    const horas = Math.floor(minutos / 60)
    if (horas < 24) return `há ${horas} h`

    const dias = Math.floor(horas / 24)
    return `há ${dias} d`
}

function toFeedReply(dto: ComentarioDTO): FeedReply {
    return {
        id: dto.id,
        author: toFeedAuthor(dto.idUsuario, dto.nomeUsuario),
        time: tempoRelativo(dto.dataComentario),
        content: dto.conteudo,
    }
}

export function toFeedPost(dto: PostagemDTO, comentarios: ComentarioDTO[] = []): FeedPost {
    return {
        id: dto.id,
        author: toFeedAuthor(dto.idUsuario, dto.nomeUsuario),
        time: tempoRelativo(dto.dataPostagem),
        content: dto.conteudo,
        likes: dto.curtidas,
        tags: [],
        replies: comentarios.map(toFeedReply),
    }
}
