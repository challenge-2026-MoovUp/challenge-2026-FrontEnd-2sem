export interface Trip {
    id: string
    lineName: string
    stationName: string
    registeredAt: string
    points: number
}

export type RedemptionDelivery = 'qrCode' | 'recarga'

export interface Redemption {
    id: string
    optionId: string
    points: number
    delivery: RedemptionDelivery
    ticketCode: string
    payload: string
    cardNumber?: string
    expiresAt: string
}

export interface TicketOption {
    id: string
    label: string
    status: string
}
