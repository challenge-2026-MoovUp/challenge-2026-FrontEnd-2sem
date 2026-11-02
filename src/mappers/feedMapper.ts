/* Tradução PostagemDTO/ComentarioDTO → FeedPost/FeedReply.
   Toda diferença entre o que a API manda e o que a tela precisa mora aqui:
   nenhum componente do feed deve importar types/api.ts. */

import type { ComentarioDTO, PostagemDTO, UsuarioDTO } from '../types/api'
import type { FeedAuthor, FeedPost, FeedReply } from '../types/feed'
import type { PerfilUsuario } from '../types/perfil'

/* As mesmas classes de avatar usadas em data/feed.ts. */
const avatarClasses = [
    'bg-gradiente-aurora text-void',
    'bg-sage-18 text-sage',
    'bg-ember-16 text-ember',
    'bg-gold-18 text-gold',
]

/** Índice estável a partir do id, para o mesmo usuário ter sempre a mesma cor. */
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

/** Autor exibido quando o usuário não está no mapa (conta removida, cache frio). */
function autorDesconhecido(idUsuario: string): FeedAuthor {
    return {
        id: idUsuario,
        name: 'Usuário MoovUp',
        handle: '@moovup',
        initials: 'MU',
        avatarClass: avatarClassDe(idUsuario),
    }
}

export function toFeedAuthor(usuario: UsuarioDTO): FeedAuthor {
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
        /* dataCadastro vem só com a data ("2026-10-27"); viram "outubro de 2026". */
        membroDesde: new Date(dto.dataCadastro).toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric',
        }),
        /* O contrato usa 'A' para ativo e 'I' para inativo. */
        ativo: dto.status === 'A',
    }
}

/** "há 2 h", "há 3 d" — formato curto já usado nos mocks do feed. */
export function tempoRelativo(dataIso: string, agora = new Date()) {
    const diff = agora.getTime() - new Date(dataIso).getTime()
    const minutos = Math.floor(diff / 60_000)

    if (minutos < 1) return 'agora'
    if (minutos < 60) return `há ${minutos} min`

    const horas = Math.floor(minutos / 60)
    if (horas < 24) return `há ${horas} h`

    const dias = Math.floor(horas / 24)
    return `há ${dias} d`
}

/* O contrato devolve só idUsuario na postagem, sem o nome do autor. Até o back
   incluir "nomeUsuario" na resposta, a tela carrega GET /usuarios uma vez e
   passa este mapa aqui. Se incluírem, o parâmetro autores sai e a função passa
   a ler o nome direto do DTO. */
export type MapaAutores = Map<string, UsuarioDTO>

export function toFeedReply(dto: ComentarioDTO, autores: MapaAutores): FeedReply {
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
        /* tags, reposts e stat não existem no contrato — são enfeites só dos
           mocks. Ficam vazios até virarem campo da API ou saírem da UI. */
        tags: [],
        reposts: 0,
        replies: comentarios.map((comentario) => toFeedReply(comentario, autores)),
    }
}

export function mapaDeAutores(usuarios: UsuarioDTO[]): MapaAutores {
    return new Map(usuarios.map((usuario) => [usuario.id, usuario]))
}
