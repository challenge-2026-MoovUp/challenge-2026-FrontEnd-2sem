export interface Trip {
    id: string
    lineId: string
    station: string
    /** ISO date-time do registro, usado para o limite diário. */
    registeredAt: string
    points: number
}

export type RedemptionDelivery = 'qrCode' | 'recarga'

export interface Redemption {
    id: string
    /** Id da opção em redeemOptions (metro, cptm, semanal...). */
    optionId: string
    points: number
    delivery: RedemptionDelivery
    /** Código do bilhete, impresso no QR e no comprovante. */
    ticketCode: string
    /** Conteúdo codificado no QR Code (apenas para delivery 'qrCode'). */
    payload: string
    /** Número do cartão informado (apenas para delivery 'recarga'). */
    cardNumber?: string
    createdAt: string
    expiresAt: string
}
