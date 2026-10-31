/* Regra de pontos da MoovUp — fonte única de verdade.
   Os valores seguem a página Sobre (SolutionInfo / SolutionPassType / SolutionOverview),
   que descreve a solução do challenge. Qualquer tela que cite pontos lê daqui. */

/* ---------- Ganho de pontos ---------- */

export const pointsPerAction = {
    curtida: 15,
    resposta: 25,
    /* Viagem registrada na carteira (metrô ou CPTM). Dez viagens pagam uma
       passagem de metrô, então o incentivo soma sem se pagar sozinho. */
    viagem: 50,
    /* A Sobre não define preço para compartilhamento; mantemos entre resposta e
       publicação, na mesma escala de múltiplos de 5. */
    repost: 40,
    publicacao: 80,
} as const

export type PointsAction = keyof typeof pointsPerAction

export type PointsLedger = Record<PointsAction, number>

export const emptyLedger: PointsLedger = {
    curtida: 0,
    resposta: 0,
    viagem: 0,
    repost: 0,
    publicacao: 0,
}

export const actionLabels: Record<PointsAction, string> = {
    curtida: 'curtida',
    resposta: 'resposta',
    viagem: 'viagem registrada',
    repost: 'repost',
    publicacao: 'publicação',
}

/** Viagens que podem ser registradas por dia (ida e volta). */
export const maxTripsPerDay = 2

/** Validade do QR Code gerado no resgate, em horas. */
export const ticketValidityHours = 24

/** Pontos creditados no cadastro. */
export const welcomeBonus = 50

/** Teto do bônus dos desafios semanais. */
export const maxChallengeBonus = 200

/* ---------- Resgate ---------- */

/** Saldo mínimo para abrir um resgate. */
export const minRedeemPoints = 400

/** Validade dos pontos, em meses, contada da última movimentação. */
export const pointsValidityMonths = 12

/** Prazo de crédito no cartão de transporte, em horas úteis. */
export const creditDeadlineHours = 24

/** Cartões e formas de embarque aceitos no resgate. */
export const redeemCards = {
    bilheteUnico: 'bilhete único',
    top: 'top',
    qrCode: 'qr code',
} as const

export type RedeemCard = keyof typeof redeemCards

export interface RedeemOption {
    id: string
    icon: string
    name: string
    description: string
    points: number
    /** Equivalente em reais, como exibido na Sobre. */
    reais: string
    cards: RedeemCard[]
}

export const redeemOptions: RedeemOption[] = [
    {
        id: 'onibus',
        icon: '🚌',
        name: 'Ônibus municipal',
        description:
            'Qualquer linha SPTrans, CMTC e sistemas municipais parceiros em São Paulo e região metropolitana. Sem restrição de horário.',
        points: 400,
        reais: 'R$ 4,40',
        cards: ['bilheteUnico', 'qrCode'],
    },
    {
        id: 'metro',
        icon: '🚇',
        name: 'Metrô de São Paulo',
        description:
            'Linhas 1 a 5 do Metrô de São Paulo, sem restrição de horário ou estação. Cobertura de toda a rede metropolitana.',
        points: 500,
        reais: 'R$ 5,00',
        cards: ['bilheteUnico', 'top', 'qrCode'],
    },
    {
        id: 'cptm',
        icon: '🚆',
        name: 'Trem CPTM',
        description:
            'Linhas 7 a 13 da CPTM, cobrindo Grande São Paulo e municípios da região metropolitana como Mogi, Jundiaí e Francisco Morato.',
        points: 500,
        reais: 'R$ 5,00',
        cards: ['bilheteUnico', 'top'],
    },
    {
        id: 'integrado',
        icon: '🔄',
        name: 'Bilhete integrado',
        description:
            'Integração tarifária entre ônibus + metrô + trem em uma única viagem, dentro da janela de 3 horas. Ideal para trajetos longos com baldeação.',
        points: 1200,
        reais: 'R$ 12,50',
        cards: ['bilheteUnico', 'top'],
    },
    {
        id: 'semanal',
        icon: '📅',
        name: 'Passe semanal ilimitado',
        description:
            '7 dias consecutivos de viagens ilimitadas em todos os modais parceiros — metrô, trem e ônibus — sem restrição de quantidade de embarques.',
        points: 6000,
        reais: 'R$ 55,00',
        cards: ['bilheteUnico', 'top', 'qrCode'],
    },
]

/** Atalho usado nos textos que citam uma passagem de metrô. */
export const metroOption = redeemOptions.find((option) => option.id === 'metro') as RedeemOption

/** Atalho usado nos textos que citam o passe semanal. */
export const weeklyPassOption = redeemOptions.find((option) => option.id === 'semanal') as RedeemOption

/* A Sobre só tarifa transporte. Para os outros benefícios usamos a mesma taxa do
   metrô e da CPTM — 500 pontos ≈ R$ 5,00 — ou seja, R$ 0,01 por ponto. */
export const pointValueInReais = 0.01

/** Converte pontos em reais no formato pt-BR (ex.: 10000 → "R$ 100,00"). */
export function pointsToBRL(points: number) {
    return (points * pointValueInReais).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
