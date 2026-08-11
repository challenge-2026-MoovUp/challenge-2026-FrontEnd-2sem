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
    { path: '/faq', label: 'FAQ' },
    { path: '/contato', label: 'Contato' },
]
export default function Header({ onOpenModal, userEmail, userId }: HeaderProps) {
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
                {userId ? (
                    <Button variant="primary" onClick={onOpenModal}>
                        <span> <FontAwesomeIcon icon={faUser} /> {userId}</span>
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