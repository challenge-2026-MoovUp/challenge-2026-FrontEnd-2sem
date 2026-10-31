import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { redeemOptions, ticketValidityHours } from '../../data/points'
import type { Redemption } from '../../types/wallet'

interface QrTicketProps {
    redemption: Redemption
}

/** Bilhete claro com QR Code real: o payload do resgate é codificado pela lib qrcode. */
export default function QrTicket({ redemption }: QrTicketProps) {
    const [image, setImage] = useState<string | null>(null)
    const option = redeemOptions.find((item) => item.id === redemption.optionId)

    useEffect(() => {
        let active = true
        QRCode.toDataURL(redemption.payload, {
            margin: 0,
            width: 320,
            errorCorrectionLevel: 'M',
            color: { dark: '#1A1626', light: '#EDE8DF' },
        })
            .then((url) => {
                if (active) setImage(url)
            })
            .catch(() => {
                if (active) setImage(null)
            })
        return () => {
            active = false
        }
    }, [redemption.payload])

    const expires = new Date(redemption.expiresAt).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })

    return (
        <figure className="m-0 flex w-full max-w-[520px] items-center gap-7 rounded-[22px] bg-mist p-7 font-sans text-dusk shadow-[0_18px_44px_var(--color-black-42)]">
            {image ? (
                <img
                    src={image}
                    width={136}
                    height={136}
                    alt={`QR Code do bilhete ${redemption.ticketCode}`}
                    className="h-[136px] w-[136px] shrink-0"
                />
            ) : (
                <span className="flex h-[136px] w-[136px] shrink-0 items-center justify-center rounded-[10px] border border-dashed border-gray-strong text-center text-[1.2rem] font-light">
                    QR indisponível — use o código
                </span>
            )}

            <figcaption className="min-w-0">
                <span className="block text-[1.1rem] font-medium uppercase tracking-[0.12em] text-gray-strong">
                    Bilhete MoovUp
                </span>
                <span className="block pt-1 text-[2rem] font-semibold leading-tight">{option?.name}</span>
                <span className="block pt-3 font-mono text-[1.5rem] tracking-[0.16em]">{redemption.ticketCode}</span>
                <span className="block pt-3 text-[1.2rem] font-light leading-[1.5] text-gray-strong">
                    Válido por {ticketValidityHours} h · expira {expires}
                    <span className="block">Aproxime da catraca compatível.</span>
                </span>
            </figcaption>
        </figure>
    )
}
