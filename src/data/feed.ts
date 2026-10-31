/* Conteúdo estático da barra lateral do feed.

   As publicações saíram daqui: o feed agora vem da API via hooks/useFeed.
   O que sobrou são os dois blocos que o contrato não cobre — não existe rota de
   assuntos em alta nem de perfis sugeridos. Quando houver, estes somem também. */

import type { FeedAuthor, SuggestedProfile, TrendTopic } from '../types/feed'

const avatarAurora = 'bg-gradiente-aurora text-void'
const avatarEmber = 'bg-ember-16 text-ember'
const avatarGold = 'bg-gold-18 text-gold'

const moovup: FeedAuthor = {
    id: 'moovup',
    name: 'MoovUp',
    handle: '@moovup',
    initials: 'MU',
    avatarClass: avatarAurora,
    verified: true,
}

const redeVerde: FeedAuthor = {
    id: 'camila',
    name: 'Rede Verde Mercado',
    handle: '@redeverde',
    initials: 'RV',
    avatarClass: avatarGold,
    verified: true,
}

const beatriz: FeedAuthor = {
    id: 'beatriz',
    name: 'Beatriz Nunes',
    handle: '@bia_nunes',
    initials: 'BN',
    avatarClass: avatarEmber,
}

export const trendTopics: TrendTopic[] = [
    { tag: '#DescontoNaEnergia', posts: '2,4 mil publicações' },
    { tag: '#TransporteSustentável', posts: '1,8 mil publicações' },
    { tag: '#DesafioSemanal', posts: '960 publicações' },
    { tag: '#Cashback', posts: '745 publicações' },
]

export const suggestedProfiles: SuggestedProfile[] = [
    { ...moovup, bio: 'Página oficial · novidades da carteira' },
    { ...redeVerde, bio: 'Parceiro · cashback no caixa' },
    { ...beatriz, bio: 'Top 10 do ranking semanal' },
]
