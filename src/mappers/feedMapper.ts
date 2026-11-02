/* DTO da API → tipos de tela. Nenhum componente importa types/api.ts. */

import type { ComentarioDTO, PostagemDTO, UsuarioDTO } from '../types/api'
import type { FeedAuthor, FeedPost, FeedReply } from '../types/feed'
import type { PerfilUsuario } from '../types/perfil'

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

function handleDe(nome: string) {
    return `@${nome.trim().toLowerCase().replace(/\s+/g, '_')}`
}

function autorDesconhecido(idUsuario: string): FeedAuthor {
    return {
        id: idUsuario,
        name: 'Usuário MoovUp',
        handle: '@moovup',
        initials: 'MU',
        avatarClass: avatarClassDe(idUsuario),
    }
}

function toFeedAuthor(usuario: UsuarioDTO): FeedAuthor {
    return {
        id: usuario.id,
        name: usuario.nome,
        handle: handleDe(usuario.nome),
        initials: iniciais(usuario.nome),
        avatarClass: avatarClassDe(usuario.id),
    }
}

export function toPerfilUsuario(dto: UsuarioDTO): PerfilUsuario {
    return {
        ...toFeedAuthor(dto),
        email: dto.email,
        saldoPontos: dto.saldoPontos,
        membroDesde: new Date(dto.dataCadastro).toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric',
        }),
        ativo: dto.status === 'A',
    }
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

/* A postagem só traz idUsuario, então a tela carrega GET /usuarios e passa
   este mapa para resolver o autor. */
type MapaAutores = Map<string, UsuarioDTO>

function toFeedReply(dto: ComentarioDTO, autores: MapaAutores): FeedReply {
    const usuario = autores.get(dto.idUsuario)

    return {
        id: dto.id,
        author: usuario ? toFeedAuthor(usuario) : autorDesconhecido(dto.idUsuario),
        time: tempoRelativo(dto.dataComentario),
        content: dto.conteudo,
    }
}

export function toFeedPost(
    dto: PostagemDTO,
    autores: MapaAutores,
    comentarios: ComentarioDTO[] = [],
): FeedPost {
    const usuario = autores.get(dto.idUsuario)

    return {
        id: dto.id,
        author: usuario ? toFeedAuthor(usuario) : autorDesconhecido(dto.idUsuario),
        time: tempoRelativo(dto.dataPostagem),
        content: dto.conteudo,
        likes: dto.curtidas,
        // tags e reposts não existem na API: ficam vazios.
        tags: [],
        reposts: 0,
        replies: comentarios.map((comentario) => toFeedReply(comentario, autores)),
    }
}

export function mapaDeAutores(usuarios: UsuarioDTO[]): MapaAutores {
    return new Map(usuarios.map((usuario) => [usuario.id, usuario]))
}
