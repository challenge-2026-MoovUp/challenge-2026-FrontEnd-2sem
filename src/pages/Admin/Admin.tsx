import { Suspense, lazy, useState } from 'react'
import {
    eyebrowClass,
    ghostActionClass,
    labelClass,
    lineFieldClass,
    primaryActionClass,
    sectionTitleClass,
} from '../../components/common/uiStyles'
import { useAdminTickets } from '../../hooks/useAdminTickets'
import { toRedemption } from '../../mappers/walletMapper'
import type { Modalidade, StatusTicket } from '../../types/api'

const QrTicket = lazy(() => import('../../components/carteira/QrTicket'))

export default function Admin() {
    const {
        tickets,
        estoque,
        detalhe,
        status,
        modalidade,
        loading,
        error,
        setStatus,
        setModalidade,
        abastecer,
        excluir,
        verDetalhe,
    } = useAdminTickets()
    const [novaModalidade, setNovaModalidade] = useState<Modalidade>('METRO')
    const [quantidade, setQuantidade] = useState(1)

    function handleAbastecer(event: React.FormEvent) {
        event.preventDefault()
        void abastecer({ modalidade: novaModalidade, quantidade })
    }

    function handleExcluir(id: string) {
        if (window.confirm('Excluir este ticket?')) void excluir(id)
    }

    return (
        <section className="mx-auto w-full max-w-[1000px] px-5 py-14 font-sans sm:px-8 md:px-10 md:py-20">
            <p className={eyebrowClass}>Administração</p>
            <h1 className="pt-3 text-[3.4rem] font-medium leading-[1.05] text-mist">Tickets</h1>

            {estoque && (
                <p className="pt-5 text-[1.4rem] font-light text-mist-soft">
                    Disponíveis: {estoque.disponiveis} · Reservados: {estoque.reservados} · Utilizados:{' '}
                    {estoque.utilizados} · Expirados: {estoque.expirados}
                </p>
            )}

            {error && <p className="pt-5 text-[1.4rem] font-light text-ember">{error}</p>}

            <h2 className={`${sectionTitleClass} mt-12`}>Abastecer estoque</h2>
            <form onSubmit={handleAbastecer} className="mt-6 flex flex-col gap-6 md:flex-row md:items-end">
                <label className="flex flex-1 flex-col gap-2">
                    <span className={labelClass}>Modalidade</span>
                    <select
                        value={novaModalidade}
                        onChange={(event) => setNovaModalidade(event.target.value as Modalidade)}
                        className={lineFieldClass}
                    >
                        <option value="METRO" className="bg-dusk">
                            Metrô
                        </option>
                        <option value="TREM" className="bg-dusk">
                            Trem
                        </option>
                    </select>
                </label>
                <label className="flex flex-1 flex-col gap-2">
                    <span className={labelClass}>Quantidade</span>
                    <input
                        type="number"
                        required
                        min={1}
                        max={50}
                        value={quantidade}
                        onChange={(event) => setQuantidade(Number(event.target.value))}
                        className={lineFieldClass}
                    />
                </label>
                <button type="submit" className={primaryActionClass}>
                    Criar
                </button>
            </form>

            <h2 className={`${sectionTitleClass} mt-12`}>Lista</h2>
            <div className="mt-6 flex flex-col gap-6 md:flex-row">
                <label className="flex flex-1 flex-col gap-2">
                    <span className={labelClass}>Status</span>
                    <select
                        value={status}
                        onChange={(event) => setStatus(event.target.value as StatusTicket | '')}
                        className={lineFieldClass}
                    >
                        <option value="" className="bg-dusk">
                            Todos
                        </option>
                        <option value="DISPONIVEL" className="bg-dusk">
                            Disponível
                        </option>
                        <option value="RESERVADO" className="bg-dusk">
                            Reservado
                        </option>
                        <option value="UTILIZADO" className="bg-dusk">
                            Utilizado
                        </option>
                        <option value="EXPIRADO" className="bg-dusk">
                            Expirado
                        </option>
                    </select>
                </label>
                <label className="flex flex-1 flex-col gap-2">
                    <span className={labelClass}>Modalidade</span>
                    <select
                        value={modalidade}
                        onChange={(event) => setModalidade(event.target.value as Modalidade | '')}
                        className={lineFieldClass}
                    >
                        <option value="" className="bg-dusk">
                            Todas
                        </option>
                        <option value="ONIBUS" className="bg-dusk">
                            Ônibus
                        </option>
                        <option value="METRO" className="bg-dusk">
                            Metrô
                        </option>
                        <option value="TREM" className="bg-dusk">
                            Trem
                        </option>
                    </select>
                </label>
            </div>

            {detalhe && (
                <p className="mt-8 border-y border-border py-4 text-[1.4rem] font-light text-mist">
                    {detalhe.id} · {detalhe.modalidade} · {detalhe.status} · {detalhe.custoEmPontos} pts · R${' '}
                    {detalhe.tarifaReais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} · expira{' '}
                    {detalhe.dataExpiracao ?? '-'} · {detalhe.qrCodeHash ?? 'sem QR Code'}
                </p>
            )}

            {detalhe?.qrCodeHash && (
                <div className="mt-6">
                    <Suspense fallback={<p className="text-[1.4rem] font-light text-mist-soft">Gerando QR Code...</p>}>
                        <QrTicket redemption={toRedemption(detalhe)} />
                    </Suspense>
                </div>
            )}

            {loading && <p className="py-8 text-[1.4rem] font-light text-mist-soft">Carregando tickets...</p>}

            {!loading && tickets.length === 0 && (
                <p className="py-8 text-[1.4rem] font-light text-mist-soft">Nenhum ticket encontrado.</p>
            )}

            <ul className="mt-4">
                {tickets.map((ticket) => (
                    <li key={ticket.id} className="flex flex-wrap items-center gap-4 border-b border-border py-4">
                        <p className="min-w-0 flex-1 text-[1.4rem] font-light text-mist">
                            {ticket.id} · {ticket.modalidade} · {ticket.status}
                        </p>
                        <button type="button" onClick={() => void verDetalhe(ticket.id)} className={ghostActionClass}>
                            Ver
                        </button>
                        {ticket.status === 'DISPONIVEL' && (
                            <button type="button" onClick={() => handleExcluir(ticket.id)} className={ghostActionClass}>
                                Excluir
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}
