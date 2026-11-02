/* Regra de pontos da MoovUp — fonte única de verdade.
   Os valores seguem a página Sobre (SolutionInfo / SolutionPassType / SolutionOverview),
   que descreve a solução do challenge. Qualquer tela que cite pontos lê daqui. */

/* ---------- Ganho de pontos ---------- */

export const pointsPerAction = {
    viagem: 35,
    publicacao: 50,
} as const

/** Validade do QR Code gerado no resgate, em horas. */
export const ticketValidityHours = 48

/* ---------- Resgate ---------- */

/** Saldo mínimo para abrir um resgate. */
export const minRedeemPoints = 555

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
        id: 'metro',
        icon: '🚇',
        name: 'Metrô de São Paulo',
        description:
            'Linhas 1 a 5 do Metrô de São Paulo, sem restrição de horário ou estação. Cobertura de toda a rede metropolitana.',
        points: 555,
        reais: 'R$ 5,00',
        cards: ['bilheteUnico', 'top', 'qrCode'],
    },
    {
        id: 'cptm',
        icon: '🚆',
        name: 'Trem CPTM',
        description:
            'Linhas 7 a 13 da CPTM, cobrindo Grande São Paulo e municípios da região metropolitana como Mogi, Jundiaí e Francisco Morato.',
        points: 555,
        reais: 'R$ 5,00',
        cards: ['bilheteUnico', 'top'],
    },
]

/** Atalho usado nos textos que citam uma passagem de metrô. */
export const metroOption = redeemOptions.find((option) => option.id === 'metro') as RedeemOption

/* A Sobre só tarifa transporte. Para os outros benefícios usamos a mesma taxa do
   metrô e da CPTM — 500 pontos ≈ R$ 5,00 — ou seja, R$ 0,01 por ponto. */
export const pointValueInReais = 0.01

/** Converte pontos em reais no formato pt-BR (ex.: 10000 → "R$ 100,00"). */
export function pointsToBRL(points: number) {
    return (points * pointValueInReais).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
