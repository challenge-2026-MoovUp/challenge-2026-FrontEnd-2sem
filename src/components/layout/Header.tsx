import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/moov-up-icon.png'
import Button from '../common/Button.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

interface HeaderProps {
    onOpenModal: () => void
    userEmail: string | null
    userId: string | null
}

const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/quem-somos', label: 'Quem Somos' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/solucao', label:'Solução'},
    { path: '/faq', label: 'FAQ' },
    { path: '/contato', label: 'Contato' },
]
export default function Header({ onOpenModal, userId }: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false)

    function handleNavClick() {
        setMenuOpen(false)
    }

    return (
        <header className="relative sticky top-0 z-[1000] bg-void-78 backdrop-blur-[16px] after:content-[''] after:pointer-events-none after:absolute after:left-0 after:right-0 after:-bottom-[24px] after:h-[24px] after:bg-gradient-to-b after:from-void-28 after:to-transparent">
            <div className="flex items-center justify-between border-b border-dusk-light px-4 py-[14px] font-sans tablet:px-[40px]">
                <div className="flex w-32 tablet:w-40">
                    <img className="h-auto w-1/4" src={Logo} alt="Logo da MoovUp" />
                    <p className="self-center pl-[15px] font-serif text-2xl text-mist-dim">MoovUp</p>
                </div>
                <nav className="hidden gap-[20px] text-[15px] font-light tablet:flex tablet:w-4/5 tablet:justify-center">
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
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-dusk-light text-mist-dim tablet:hidden"
                        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
                    </button>
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
            </div>

            {menuOpen && (
                <nav className="flex flex-col gap-1 border-b border-dusk-light bg-void-78 px-4 py-4 font-sans text-[15px] font-light backdrop-blur-[16px] tablet:hidden">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/'}
                            onClick={handleNavClick}
                            className={({ isActive }) =>
                                isActive
                                    ? 'rounded-lg px-3 py-3 font-sans font-bold text-aurora'
                                    : 'rounded-lg px-3 py-3 font-sans text-mist-dim'
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            )}
        </header>
    )
}