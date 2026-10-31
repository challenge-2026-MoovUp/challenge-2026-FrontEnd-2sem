import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faRetweet, faFeather, faTrain, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Avatar from './Avatar'
import { eyebrowClass, ghostActionClass } from '../common/uiStyles'
import { pointsPerAction, pointsToBRL } from '../../data/points'
import { useWallet } from '../../hooks/useWallet'

interface WalletRailProps {
    userId: string | null
    userName: string | null
}

const rows = [
    { key: 'curtida', icon: faHeart, label: 'Curtidas' },
    { key: 'resposta', icon: faComment, label: 'Respostas' },
    { key: 'repost', icon: faRetweet, label: 'Reposts' },
    { key: 'publicacao', icon: faFeather, label: 'Publicações' },
    { key: 'viagem', icon: faTrain, label: 'Viagens' },
] as const

export default function WalletRail({ userName }: WalletRailProps) {
    const { points, ledger } = useWallet()
    const earned = rows.reduce((total, row) => total + ledger[row.key] * pointsPerAction[row.key], 0)

    return (
        <div className="flex flex-col gap-10 font-sans">
            <div className="flex items-center gap-3">
                <Avatar initials={userName ? userName.slice(0, 2) : 'MU'} className="bg-dusk-mid text-aurora-soft" />
                <div className="min-w-0">
                    <p className="truncate text-[1.6rem] font-normal text-mist">{userName ?? 'Visitante'}</p>
                    <p className="font-sans text-[1.2rem] font-light text-mist-soft">
                        {userName ? 'Membro MoovUp' : 'Entre para pontuar'}
                    </p>
                </div>
            </div>

            <div>
                <p className={eyebrowClass}>Carteira</p>
                <p className="pt-2 text-[3.4rem] font-light leading-none tracking-[-0.02em] text-mist" aria-live="polite">
                    {points.toLocaleString('pt-BR')}
                </p>
                <p className="pt-1 text-[1.25rem] font-light text-sage">≈ {pointsToBRL(points)}</p>
                <Link to="/carteira" className={`${ghostActionClass} mt-5`}>
                    Registrar viagem <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                </Link>
            </div>

            <div>
                <p className={eyebrowClass}>Seus ganhos</p>
                <ul className="pt-3">
                    {rows.map((row) => (
                        <li key={row.key} className="flex items-center gap-3 border-b border-border py-3 last:border-0">
                            <FontAwesomeIcon
                                icon={row.icon}
                                className="w-[16px] shrink-0 text-[1.2rem] text-mist-soft"
                                aria-hidden="true"
                            />
                            <p className="flex-1 text-[1.3rem] font-light text-mist-dim">
                                {row.label}
                                <span className="block text-[1.1rem] text-mist-soft">
                                    +{pointsPerAction[row.key]} pts cada
                                </span>
                            </p>
                            <p className="text-[1.5rem] font-light text-mist">{ledger[row.key]}</p>
                        </li>
                    ))}
                </ul>
                <p className="flex items-baseline justify-between pt-4 text-[1.3rem] font-light text-mist-dim">
                    Total acumulado
                    <span className="text-[1.6rem] text-sage">+{earned.toLocaleString('pt-BR')}</span>
                </p>
            </div>
        </div>
    )
}
