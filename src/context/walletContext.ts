import { createContext } from 'react'
import type { Redemption, RedemptionDelivery, TicketOption, Trip } from '../types/wallet'

export interface WalletValue {
    points: number
    trips: Trip[]
    redemptions: Redemption[]
    tickets: TicketOption[]
    estoque: number
    loading: boolean
    error: string | null
    recarregar: () => Promise<void>
    registerTrip: (idTicket: string, linha: string, estacao: string) => Promise<{ ok: boolean; reason?: string }>
    redeem: (
        optionId: string,
        delivery: RedemptionDelivery,
        cardNumber?: string,
    ) => Promise<{ ok: boolean; reason?: string; redemption?: Redemption }>
}

export const WalletContext = createContext<WalletValue | null>(null)
