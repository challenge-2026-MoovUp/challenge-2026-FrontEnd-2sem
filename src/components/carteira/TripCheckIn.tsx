import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { transportLines } from '../../data/transport'
import { maxTripsPerDay, pointsPerAction } from '../../data/points'
import { useWallet } from '../../hooks/useWallet'
import {
    eyebrowClass,
    labelClass,
    lineFieldClass,
    primaryActionClass,
    sectionClass,
    sectionLeadClass,
    sectionTitleClass,
} from '../common/uiStyles'

interface TripCheckInProps {
    userId: string | null
    onOpenModal: () => void
}

export default function TripCheckIn({ userId, onOpenModal }: TripCheckInProps) {
    const { registerTrip, tripsToday, canRegisterTrip } = useWallet()
    const [lineId, setLineId] = useState(transportLines[0].id)
    const [station, setStation] = useState(transportLines[0].stations[0])
    const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null)

    const line = transportLines.find((item) => item.id === lineId) ?? transportLines[0]

    function handleLineChange(nextId: string) {
        const nextLine = transportLines.find((item) => item.id === nextId) ?? transportLines[0]
        setLineId(nextId)
        setStation(nextLine.stations[0])
        setFeedback(null)
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (!userId) {
            onOpenModal()
            return
        }
        const result = registerTrip(lineId, station)
        setFeedback(
            result.ok
                ? { ok: true, text: `Viagem registrada. +${pointsPerAction.viagem} pontos na carteira.` }
                : { ok: false, text: result.reason ?? 'Não foi possível registrar a viagem.' },
        )
    }

    return (
        <section className={sectionClass}>
            <p className={eyebrowClass}>Ganhar pontos</p>
            <h2 className={sectionTitleClass}>Registrar viagem</h2>
            <p className={sectionLeadClass}>
                Metrô e CPTM valem {pointsPerAction.viagem} pontos por embarque, até {maxTripsPerDay} por dia.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-8 desktop:flex-row desktop:items-end">
                <label className="flex flex-1 flex-col gap-2">
                    <span className={labelClass}>Linha</span>
                    <select value={lineId} onChange={(event) => handleLineChange(event.target.value)} className={lineFieldClass}>
                        {transportLines.map((item) => (
                            <option key={item.id} value={item.id} className="bg-dusk">
                                {item.operator} · {item.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex flex-1 flex-col gap-2">
                    <span className={labelClass}>Estação de embarque</span>
                    <select value={station} onChange={(event) => setStation(event.target.value)} className={lineFieldClass}>
                        {line.stations.map((item) => (
                            <option key={item} value={item} className="bg-dusk">
                                {item}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="flex flex-col gap-2">
                    <button type="submit" disabled={Boolean(userId) && !canRegisterTrip} className={primaryActionClass}>
                        Registrar <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                    <p className="font-sans text-[1.2rem] font-light text-mist-soft" aria-live="polite">
                        {tripsToday} de {maxTripsPerDay} hoje
                    </p>
                </div>
            </form>

            {feedback && (
                <p
                    role="status"
                    className={`mt-6 font-sans text-[1.35rem] font-light ${feedback.ok ? 'text-sage' : 'text-ember'}`}
                >
                    {feedback.text}
                </p>
            )}
        </section>
    )
}
