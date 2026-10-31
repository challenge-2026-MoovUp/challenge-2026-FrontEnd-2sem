import { createContext } from 'react'
import type { PointsAction, PointsLedger } from '../data/points'
import type { Redemption, RedemptionDelivery, Trip } from '../types/wallet'

export interface StoredWallet {
    points: number
    ledger: PointsLedger
    trips: Trip[]
    redemptions: Redemption[]
}

export interface WalletValue extends StoredWallet {
    /** Viagens já registradas hoje (limite em maxTripsPerDay). */
    tripsToday: number
    canRegisterTrip: boolean
    earn: (action: PointsAction, undo?: boolean) => void
    registerTrip: (lineId: string, station: string) => { ok: boolean; reason?: string; trip?: Trip }
    redeem: (
        optionId: string,
        delivery: RedemptionDelivery,
        cardNumber?: string,
    ) => { ok: boolean; reason?: string; redemption?: Redemption }
}

export const WalletContext = createContext<WalletValue | null>(null)
