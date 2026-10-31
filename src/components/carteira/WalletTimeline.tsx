import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrain, faQrcode, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { redeemOptions } from '../../data/points'
import { findLine } from '../../data/transport'
import { useWallet } from '../../hooks/useWallet'
import { eyebrowClass, sectionClass, sectionTitleClass } from '../common/uiStyles'

interface TimelineEntry {
    id: string
    at: string
    icon: IconDefinition
    title: string
    detail: string
    amount: number
}

const dateFormat: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
}

/** Viagens e resgates numa única linha do tempo, do mais recente ao mais antigo. */
export default function WalletTimeline() {
    const { trips, redemptions } = useWallet()

    const entries: TimelineEntry[] = [
        ...trips.map((trip) => {
            const line = findLine(trip.lineId)
            return {
                id: trip.id,
                at: trip.registeredAt,
                icon: faTrain,
                title: line ? `${line.operator} · ${line.name}` : 'Viagem registrada',
                detail: trip.station,
                amount: trip.points,
            }
        }),
        ...redemptions.map((redemption) => ({
            id: redemption.id,
            at: redemption.createdAt,
            icon: redemption.delivery === 'qrCode' ? faQrcode : faCreditCard,
            title: redeemOptions.find((item) => item.id === redemption.optionId)?.name ?? 'Resgate',
            detail: `${redemption.delivery === 'qrCode' ? 'QR Code' : 'Recarga de cartão'} · ${redemption.ticketCode}`,
            amount: -redemption.points,
        })),
    ].sort((a, b) => b.at.localeCompare(a.at))

    return (
        <section className={sectionClass}>
            <p className={eyebrowClass}>Extrato</p>
            <h2 className={sectionTitleClass}>Movimentações</h2>

            {entries.length === 0 ? (
                <p className="mt-6 font-sans text-[1.4rem] font-light text-mist-soft">
                    Nada por aqui ainda. Registre uma viagem para começar.
                </p>
            ) : (
                <ul className="mt-6">
                    {entries.slice(0, 12).map((entry) => (
                        <li
                            key={entry.id}
                            className="flex items-center gap-5 border-b border-border py-5 last:border-0 font-sans"
                        >
                            <FontAwesomeIcon
                                icon={entry.icon}
                                className="w-[18px] shrink-0 text-[1.4rem] text-mist-soft"
                                aria-hidden="true"
                            />
                            <p className="min-w-0 flex-1">
                                <span className="block truncate text-[1.5rem] font-light text-mist">{entry.title}</span>
                                <span className="block truncate text-[1.2rem] font-light text-mist-soft">
                                    {entry.detail}
                                </span>
                            </p>
                            <p className="shrink-0 text-right">
                                <span className={`block text-[1.6rem] ${entry.amount > 0 ? 'text-sage' : 'text-ember'}`}>
                                    {entry.amount > 0 ? '+' : '−'}
                                    {Math.abs(entry.amount).toLocaleString('pt-BR')}
                                </span>
                                <span className="block text-[1.1rem] font-light text-mist-soft">
                                    {new Date(entry.at).toLocaleString('pt-BR', dateFormat)}
                                </span>
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
