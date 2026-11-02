import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Avatar from './Avatar'
import { eyebrowClass, focusRing, ghostActionClass, softTransition } from '../common/uiStyles'
import { pointsToBRL } from '../../data/points'
import { useWallet } from '../../hooks/useWallet'
import { handleDe } from '../../mappers/feedMapper'
import { rotaPerfil } from '../../routes/rotaPerfil'

interface WalletRailProps {
    userName: string | null
    onOpenModal: () => void
}

export default function WalletRail({ userName, onOpenModal }: WalletRailProps) {
    const { points } = useWallet()

    const identidade = (
        <>
            <Avatar initials={userName ? userName.slice(0, 2) : 'MU'} className="bg-dusk-mid text-aurora-soft" />
            <span className="min-w-0">
                <span className={`block truncate text-[1.6rem] font-normal text-mist group-hover/conta:underline ${softTransition}`}>
                    {userName ?? 'Visitante'}
                </span>
                <span className="block font-sans text-[1.2rem] font-light text-mist-soft">
                    {userName ? 'Membro MoovUp' : 'Entre para pontuar'}
                </span>
            </span>
        </>
    )

    return (
        <div className="flex flex-col gap-10 font-sans">
            {/* Logado, o cartao leva ao proprio perfil; deslogado, abre o login. */}
            {userName ? (
                <Link to={rotaPerfil(handleDe(userName))} className={`group/conta flex items-center gap-3 ${focusRing}`}>
                    {identidade}
                </Link>
            ) : (
                <button
                    type="button"
                    onClick={onOpenModal}
                    className={`group/conta flex items-center gap-3 text-left hover:cursor-pointer ${focusRing}`}
                >
                    {identidade}
                </button>
            )}

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
        </div>
    )
}
