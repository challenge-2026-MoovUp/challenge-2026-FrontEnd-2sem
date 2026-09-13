import { NavLink } from 'react-router-dom'
import Logo from '../../assets/moov-up-icon.png'
import Button from '../common/Button.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

interface HeaderProps {
    onOpenModal: () => void
    userEmail: string | null
    userId: string | null
}

const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/quem-somos', label: 'Quem Somos' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/solucao', label: 'Solução' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contato', label: 'Contato' },
]
export default function Header({ onOpenModal, userId }: HeaderProps) {
    return (
        <header className="relative sticky top-0 z-[1000] bg-void-78 backdrop-blur-[16px] after:content-[''] after:pointer-events-none after:absolute after:left-0 after:right-0 after:-bottom-[24px] after:h-[24px] after:bg-gradient-to-b after:from-void-28 after:to-transparent">
            <div className="flex items-center justify-between border-b border-dusk-light px-[40px] py-[14px] font-sans">
                <div className="flex w-40">
                    <img className="h-auto w-1/4" src={Logo} alt="Logo da MoovUp" />
                    <p className="self-center pl-[15px] font-serif text-2xl text-mist-dim">MoovUp</p>
                </div>
                <nav className="flex w-4/5 justify-center gap-[20px] text-[15px] font-light">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'relative inline-block font-sans font-bold text-aurora after:content-[\'\'] after:absolute after:left-1/2 after:-bottom-[6px] after:h-[2px] after:w-full after:origin-center after:bg-aurora after:animate-nav-active-load'
                                    : 'font-sans text-mist-dim'
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
                {userId ? (
                    <Button variant="primary" onClick={onOpenModal}>
                        <span className="font-sans"> <FontAwesomeIcon icon={faUser} /> {userId}</span>
                    </Button>
                ) : (
                    <Button variant="primary" onClick={onOpenModal}>
                        Começar grátis
                    </Button>
                )}
            </div>
        </header>
    )
}