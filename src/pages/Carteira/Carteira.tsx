import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import RedeemPanel from '../../components/carteira/RedeemPanel'
import TransportCard from '../../components/carteira/TransportCard'
import type { CardVariant } from '../../components/carteira/TransportCard'
import TripCheckIn from '../../components/carteira/TripCheckIn'
import WalletTimeline from '../../components/carteira/WalletTimeline'
import { eyebrowClass } from '../../components/common/uiStyles'
import { useWallet } from '../../hooks/useWallet'
import { pointsToBRL } from '../../data/points'

interface CarteiraContext {
    onOpenModal: () => void
    userEmail: string | null
    userId: string | null
}

export default function Carteira() {
    const { onOpenModal, userId } = useOutletContext<CarteiraContext>()
    const { points } = useWallet()
    const [card, setCard] = useState<CardVariant>('bilheteUnico')
    const [cardNumber, setCardNumber] = useState('')

    const balance = pointsToBRL(points)
    const lastDigits = cardNumber.replace(/\D/g, '').slice(-4)

    return (
        <section className="mx-auto w-full max-w-[1180px] px-5 py-14 font-sans tablet:px-10 tablet:py-20">
            <header className="flex flex-col gap-10 desktop:flex-row desktop:items-end desktop:justify-between">
                <div>
                    <p className={eyebrowClass}>Carteira · Transporte</p>
                    <h1 className="pt-3 text-[3.4rem] font-medium leading-[1.05] tracking-[-0.02em] text-mist tablet:text-[4.6rem]">
                        Seus cartões de transporte
                    </h1>
                    <p className="max-w-[46ch] pt-4 text-[1.5rem] font-light leading-[1.6] text-mist-soft">
                        Registre viagens de metrô e CPTM para acumular pontos e converta o saldo em QR Code ou recarga.
                    </p>
                </div>

                <p className="shrink-0 desktop:text-right">
                    <span className="block text-[1.15rem] font-medium uppercase tracking-[0.12em] text-mist-soft">
                        Saldo em pontos
                    </span>
                    <span
                        className="block text-[4.4rem] font-light leading-none tracking-[-0.02em] text-mist"
                        aria-live="polite"
                    >
                        {points.toLocaleString('pt-BR')}
                    </span>
                    <span className="block pt-1 text-[1.3rem] font-light text-sage">≈ {balance}</span>
                </p>
            </header>

            <div className="mt-16 grid grid-cols-1 gap-10 tablet:grid-cols-2 tablet:gap-12">
                <TransportCard
                    variant="bilheteUnico"
                    balance={balance}
                    lastDigits={card === 'bilheteUnico' ? lastDigits : ''}
                    selected={card === 'bilheteUnico'}
                    onSelect={setCard}
                />
                <TransportCard
                    variant="top"
                    balance={balance}
                    lastDigits={card === 'top' ? lastDigits : ''}
                    selected={card === 'top'}
                    onSelect={setCard}
                />
            </div>

            <div className="mt-20 flex flex-col gap-16">
                <TripCheckIn userId={userId} onOpenModal={onOpenModal} />
                <RedeemPanel
                    userId={userId}
                    card={card}
                    cardNumber={cardNumber}
                    onCardNumberChange={setCardNumber}
                    onOpenModal={onOpenModal}
                />
                <WalletTimeline />
            </div>
        </section>
    )
}
