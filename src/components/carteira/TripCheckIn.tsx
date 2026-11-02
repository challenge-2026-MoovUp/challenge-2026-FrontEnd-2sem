import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { mensagemDe } from '../../api/http'
import { listarEstacoes, listarLinhas } from '../../api/viagensApi'
import { pointsPerAction } from '../../data/points'
import type { EstacaoDTO, LinhaDTO } from '../../types/api'
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
    const { registerTrip, tickets } = useWallet()
    const [linhas, setLinhas] = useState<LinhaDTO[]>([])
    const [estacoes, setEstacoes] = useState<EstacaoDTO[]>([])
    const [linha, setLinha] = useState('')
    const [estacao, setEstacao] = useState('')
    const [ticket, setTicket] = useState('')
    const [enviando, setEnviando] = useState(false)
    const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null)

    const ticketEscolhido = tickets.some((item) => item.id === ticket) ? ticket : (tickets[0]?.id ?? '')

    useEffect(() => {
        async function carregarLinhas() {
            try {
                const resposta = await listarLinhas()
                setLinhas(resposta)
                setLinha(resposta[0]?.codigo ?? '')
            } catch (erro) {
                setFeedback({ ok: false, text: mensagemDe(erro, 'Falha ao carregar as linhas.') })
            }
        }

        void carregarLinhas()
    }, [])

    useEffect(() => {
        if (!linha) return

        async function carregarEstacoes() {
            try {
                const resposta = await listarEstacoes(linha)
                setEstacoes(resposta)
                setEstacao(resposta[0]?.codigo ?? '')
            } catch (erro) {
                setFeedback({ ok: false, text: mensagemDe(erro, 'Falha ao carregar as estações.') })
            }
        }

        void carregarEstacoes()
    }, [linha])

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (!userId) {
            onOpenModal()
            return
        }

        setEnviando(true)
        const result = await registerTrip(ticketEscolhido, linha, estacao)
        setEnviando(false)
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
                Cada passagem resgatada vale uma viagem registrada e {pointsPerAction.viagem} pontos.
            </p>

            <form onSubmit={(event) => void handleSubmit(event)} className="mt-8 flex flex-col gap-8 desktop:flex-row desktop:items-end">
                <label className="flex flex-1 flex-col gap-2">
                    <span className={labelClass}>Passagem</span>
                    <select value={ticketEscolhido} onChange={(event) => setTicket(event.target.value)} className={lineFieldClass}>
                        {tickets.length === 0 && (
                            <option value="" className="bg-dusk">
                                Nenhuma passagem disponível
                            </option>
                        )}
                        {tickets.map((item) => (
                            <option key={item.id} value={item.id} className="bg-dusk">
                                {item.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex flex-1 flex-col gap-2">
                    <span className={labelClass}>Linha</span>
                    <select value={linha} onChange={(event) => setLinha(event.target.value)} className={lineFieldClass}>
                        {linhas.map((item) => (
                            <option key={item.codigo} value={item.codigo} className="bg-dusk">
                                {item.nome}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex flex-1 flex-col gap-2">
                    <span className={labelClass}>Estação de embarque</span>
                    <select value={estacao} onChange={(event) => setEstacao(event.target.value)} className={lineFieldClass}>
                        {estacoes.map((item) => (
                            <option key={item.codigo} value={item.codigo} className="bg-dusk">
                                {item.nome}
                            </option>
                        ))}
                    </select>
                </label>

                <button
                    type="submit"
                    disabled={enviando || (Boolean(userId) && !ticketEscolhido)}
                    className={primaryActionClass}
                >
                    Registrar <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </form>

            {feedback && (
                <output
                    className={`mt-6 block font-sans text-[1.35rem] font-light ${feedback.ok ? 'text-sage' : 'text-ember'}`}
                >
                    {feedback.text}
                </output>
            )}
        </section>
    )
}
