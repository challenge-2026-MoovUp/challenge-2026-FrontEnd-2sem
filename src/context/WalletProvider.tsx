import { useCallback, useEffect, useMemo, useState } from 'react'
import {
    emptyLedger,
    maxTripsPerDay,
    minRedeemPoints,
    pointsPerAction,
    redeemOptions,
    ticketValidityHours,
} from '../data/points'
import type { PointsAction } from '../data/points'
import type { Redemption, RedemptionDelivery, Trip } from '../types/wallet'
import { WalletContext } from './walletContext'
import type { StoredWallet, WalletValue } from './walletContext'

/** Saldo inicial de demonstração, creditado na primeira visita. */
const initialPoints = 8150


function storageKey(userId: string | null) {
    return `moovup:wallet:${userId ?? 'visitante'}`
}

function emptyWallet(): StoredWallet {
    return { points: initialPoints, ledger: { ...emptyLedger }, trips: [], redemptions: [] }
}

function readWallet(userId: string | null): StoredWallet {
    try {
        const raw = localStorage.getItem(storageKey(userId))
        if (!raw) return emptyWallet()
        const parsed = JSON.parse(raw) as Partial<StoredWallet>
        return {
            points: typeof parsed.points === 'number' ? parsed.points : initialPoints,
            ledger: { ...emptyLedger, ...parsed.ledger },
            trips: parsed.trips ?? [],
            redemptions: parsed.redemptions ?? [],
        }
    } catch {
        // localStorage indisponível ou conteúdo corrompido: começa limpo.
        return emptyWallet()
    }
}

function todayKey(date = new Date()) {
    return date.toISOString().slice(0, 10)
}

/** Código legível impresso no comprovante e codificado no QR. */
function buildTicketCode() {
    const random = Math.random().toString(36).toUpperCase().slice(2, 6)
    const stamp = Date.now().toString(36).toUpperCase().slice(-4)
    return `MOOV-${stamp}-${random}`
}

export function WalletProvider({ userId, children }: { userId: string | null; children: React.ReactNode }) {
    const [wallet, setWallet] = useState<StoredWallet>(() => readWallet(userId))

    // Cada usuário tem a sua carteira; trocar de conta recarrega o saldo dela.
    useEffect(() => {
        setWallet(readWallet(userId))
    }, [userId])

    useEffect(() => {
        try {
            localStorage.setItem(storageKey(userId), JSON.stringify(wallet))
        } catch {
            // Sem persistência (modo privado, cota cheia): a sessão continua funcionando.
        }
    }, [userId, wallet])

    const earn = useCallback((action: PointsAction, undo = false) => {
        const amount = pointsPerAction[action]
        setWallet((previous) => ({
            ...previous,
            points: Math.max(0, previous.points + (undo ? -amount : amount)),
            ledger: {
                ...previous.ledger,
                [action]: Math.max(0, previous.ledger[action] + (undo ? -1 : 1)),
            },
        }))
    }, [])

    const tripsToday = useMemo(
        () => wallet.trips.filter((trip) => trip.registeredAt.slice(0, 10) === todayKey()).length,
        [wallet.trips],
    )

    const registerTrip = useCallback(
        (lineId: string, station: string) => {
            if (tripsToday >= maxTripsPerDay) {
                return {
                    ok: false,
                    reason: `Você já registrou ${maxTripsPerDay} viagens hoje. O limite volta amanhã.`,
                }
            }

            const trip: Trip = {
                id: `trip-${Date.now()}`,
                lineId,
                station,
                registeredAt: new Date().toISOString(),
                points: pointsPerAction.viagem,
            }

            setWallet((previous) => ({
                ...previous,
                points: previous.points + trip.points,
                ledger: { ...previous.ledger, viagem: previous.ledger.viagem + 1 },
                trips: [trip, ...previous.trips],
            }))

            return { ok: true, trip }
        },
        [tripsToday],
    )

    const redeem = useCallback(
        (optionId: string, delivery: RedemptionDelivery, cardNumber?: string) => {
            const option = redeemOptions.find((item) => item.id === optionId)
            if (!option) return { ok: false, reason: 'Resgate indisponível.' }
            if (wallet.points < minRedeemPoints) {
                return { ok: false, reason: `O resgate começa em ${minRedeemPoints} pontos.` }
            }
            if (wallet.points < option.points) {
                return {
                    ok: false,
                    reason: `Faltam ${(option.points - wallet.points).toLocaleString('pt-BR')} pontos para este resgate.`,
                }
            }
            if (delivery === 'recarga' && !cardNumber) {
                return { ok: false, reason: 'Informe o número do cartão para a recarga.' }
            }

            const createdAt = new Date()
            const expiresAt = new Date(createdAt.getTime() + ticketValidityHours * 60 * 60 * 1000)
            const ticketCode = buildTicketCode()

            const redemption: Redemption = {
                id: `redeem-${createdAt.getTime()}`,
                optionId: option.id,
                points: option.points,
                delivery,
                ticketCode,
                payload: `MOOVUP|${ticketCode}|${option.id}|${option.points}|${expiresAt.toISOString()}`,
                cardNumber,
                createdAt: createdAt.toISOString(),
                expiresAt: expiresAt.toISOString(),
            }

            setWallet((previous) => ({
                ...previous,
                points: previous.points - option.points,
                redemptions: [redemption, ...previous.redemptions],
            }))

            return { ok: true, redemption }
        },
        [wallet.points],
    )

    const value = useMemo<WalletValue>(
        () => ({
            ...wallet,
            tripsToday,
            canRegisterTrip: tripsToday < maxTripsPerDay,
            earn,
            registerTrip,
            redeem,
        }),
        [wallet, tripsToday, earn, registerTrip, redeem],
    )

    return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}
