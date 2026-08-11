import { NavLink } from 'react-router-dom'
import Logo from '../../assets/moov-up-icon.png'
import Button from '../common/Button.tsx'

interface HeaderProps {
    onOpenModal: () => void
    userEmail: string | null
}

const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/quem-somos', label: 'Quem Somos' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contato', label: 'Contato' },
]
export default function Header({ onOpenModal, userEmail }: HeaderProps) {
    return (
        <header className="header">
            <div className="header__content">
                <div className="logo">
                    <img className="ico" src={Logo} alt="Logo da MoovUp" />
                    <p className="name">MoovUp</p>
                </div>
                <nav className="nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/'}
                            className={({ isActive }) => isActive ? 'nav__active' : ''}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
                {userEmail ? (
                    <Button variant="primary" onClick={onOpenModal}>
                        <span>{userEmail}</span>
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