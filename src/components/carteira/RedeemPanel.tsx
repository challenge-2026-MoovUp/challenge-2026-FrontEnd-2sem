import { Suspense, lazy, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode, faCreditCard, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { creditDeadlineHours, minRedeemPoints, redeemOptions } from '../../data/points'
import type { Redemption, RedemptionDelivery } from '../../types/wallet'
import { useWallet } from '../../hooks/useWallet'
import type { CardVariant } from './TransportCard'
import {
    eyebrowClass,
    focusRing,
    labelClass,
    lineFieldClass,
    primaryActionClass,
    sectionClass,
    sectionLeadClass,
    sectionTitleClass,
    softTransition,
} from '../common/uiStyles'

/* O gerador de QR entra em chunk próprio: só baixa quando alguém resgata. */
const QrTicket = lazy(() => import('./QrTicket'))

interface RedeemPanelProps {
    userId: string | null
    /** Cartão escolhido clicando no visual, logo acima. */
    card: CardVariant
    cardNumber: string
    onCardNumberChange: (value: string) => void
    onOpenModal: () => void
}

interface CardFormData {
    cardNumber: string
}

const cardNames: Record<CardVariant, string> = { top: 'cartão top', bilheteUnico: 'Bilhete Único' }

const deliveries = [
    { id: 'qrCode', icon: faQrcode, label: 'QR Code' },
    { id: 'recarga', icon: faCreditCard, label: 'Recarga' },
] as const

export default function RedeemPanel({ userId, card, cardNumber, onCardNumberChange, onOpenModal }: RedeemPanelProps) {
    const { points, redeem } = useWallet()
    const [optionId, setOptionId] = useState(redeemOptions[1].id)
    const [delivery, setDelivery] = useState<RedemptionDelivery>('qrCode')
    const [result, setResult] = useState<Redemption | null>(null)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CardFormData>({ values: { cardNumber } })

    const selected = redeemOptions.find((item) => item.id === optionId)
    const missing = selected ? selected.points - points : 0

    function reset() {
        setResult(null)
        setError(null)
    }

    function finish(data?: CardFormData) {
        if (!userId) {
            onOpenModal()
            return
        }
        const outcome = redeem(optionId, delivery, data?.cardNumber)
        if (!outcome.ok || !outcome.redemption) {
            setResult(null)
            setError(outcome.reason ?? 'Não foi possível concluir o resgate.')
            return
        }
        setError(null)
        setResult(outcome.redemption)
    }

    return (
        <section className={sectionClass}>
            <p className={eyebrowClass}>Converter pontos</p>
            <h2 className={sectionTitleClass}>Resgatar passagem</h2>
            <p className={sectionLeadClass}>
                A partir de {minRedeemPoints} pontos, no QR Code do app ou como recarga no {cardNames[card]}.
            </p>

            <div className="mt-8 flex flex-col gap-8 desktop:flex-row desktop:items-end">
                <label className="flex flex-1 flex-col gap-2">
                    <span className={labelClass}>Passagem</span>
                    <select
                        value={optionId}
                        onChange={(event) => {
                            setOptionId(event.target.value)
                            reset()
                        }}
                        className={lineFieldClass}
                    >
                        {redeemOptions.map((option) => (
                            <option key={option.id} value={option.id} className="bg-dusk">
                                {option.name} — {option.points.toLocaleString('pt-BR')} pts (≈ {option.reais})
                            </option>
                        ))}
                    </select>
                </label>

                <fieldset className="flex flex-col gap-2">
                    <legend className={labelClass}>Receber como</legend>
                    <div className="flex gap-1 rounded-full border border-border p-1">
                        {deliveries.map((item) => (
                            <label
                                key={item.id}
                                className={`flex cursor-pointer items-center gap-2 rounded-full px-5 py-[9px] font-sans text-[1.3rem] font-light ${softTransition} ${
                                    delivery === item.id ? 'bg-aurora-glow text-aurora-soft' : 'text-mist-dim hover:text-mist'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="redeem-delivery"
                                    value={item.id}
                                    checked={delivery === item.id}
                                    onChange={() => {
                                        setDelivery(item.id)
                                        reset()
                                    }}
                                    className={`sr-only ${focusRing}`}
                                />
                                <FontAwesomeIcon icon={item.icon} aria-hidden="true" /> {item.label}
                            </label>
                        ))}
                    </div>
                </fieldset>
            </div>

            {delivery === 'recarga' ? (
                <form onSubmit={handleSubmit(finish)} className="mt-8 flex flex-col gap-8 desktop:flex-row desktop:items-end">
                    <label className="flex flex-1 flex-col gap-2">
                        <span className={labelClass}>Número do {cardNames[card]}</span>
                        <input
                            inputMode="numeric"
                            placeholder="0000 0000 0000"
                            aria-invalid={Boolean(errors.cardNumber)}
                            className={`${lineFieldClass} ${errors.cardNumber ? '!border-ember' : ''}`}
                            {...register('cardNumber', {
                                required: 'Informe o número do cartão.',
                                pattern: { value: /^[\d\s]{8,20}$/, message: 'Use somente números (8 a 16 dígitos).' },
                                onChange: (event) => {
                                    onCardNumberChange(event.target.value)
                                    reset()
                                },
                            })}
                        />
                        {errors.cardNumber && (
                            <span className="font-sans text-[1.2rem] font-light text-ember">
                                {errors.cardNumber.message}
                            </span>
                        )}
                    </label>

                    <button type="submit" className={primaryActionClass}>
                        Recarregar <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </form>
            ) : (
                <button type="button" onClick={() => finish()} className={`${primaryActionClass} mt-8`}>
                    Gerar QR Code <FontAwesomeIcon icon={faArrowRight} />
                </button>
            )}

            {selected && missing > 0 && !error && (
                <p className="mt-6 font-sans text-[1.35rem] font-light text-mist-soft">
                    Faltam <span className="text-ember">{missing.toLocaleString('pt-BR')} pontos</span> para{' '}
                    {selected.name.toLowerCase()}.
                </p>
            )}

            {error && (
                <p role="alert" className="mt-6 font-sans text-[1.35rem] font-light text-ember">
                    {error}
                </p>
            )}

            {result && (
                <div className="mt-10">
                    {result.delivery === 'qrCode' ? (
                        <Suspense
                            fallback={
                                <p className="font-sans text-[1.35rem] font-light text-mist-soft">Gerando bilhete...</p>
                            }
                        >
                            <QrTicket redemption={result} />
                        </Suspense>
                    ) : (
                        <p role="status" className="font-sans text-[1.4rem] font-light text-mist">
                            <span className="text-sage">Recarga confirmada.</span>{' '}
                            {result.points.toLocaleString('pt-BR')} pontos no {cardNames[card]} •••{' '}
                            {result.cardNumber?.replace(/\s/g, '').slice(-4)} — o crédito aparece em até{' '}
                            {creditDeadlineHours} horas úteis.
                            <span className="block pt-1 font-mono text-[1.2rem] tracking-[0.14em] text-mist-soft">
                                {result.ticketCode}
                            </span>
                        </p>
                    )}
                </div>
            )}
        </section>
    )
}
