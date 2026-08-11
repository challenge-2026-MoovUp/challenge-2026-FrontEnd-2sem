import { useEffect, useRef, useState } from 'react'
import LogoMoovup from '../../assets/moov-up-icon.png'
import Button from '../common/Button.tsx'

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
    onLogin: (email: string) => void
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [isOpen])

    function handleSubmit(){
        if (!email) return
        onLogin(email)
        setEmail('')
    }

    return (
        <dialog ref={dialogRef} className="modal" id="ModalEmBreve" aria-labelledby="modalEmBreveTitle">
            <div className="ambient modal__ambient">
                <span className="orb orb-1" />
                <span className="orb orb-2" />
            </div>

            <button className="modal__close" aria-label="Voltar" id="btnFecharModal" type="button" onClick={onClose}>
                {'‹ voltar'}
            </button>

            <form className="login__content" id="msg">
                <div className="login-head">
                    <img src={LogoMoovup} alt="logo moovUp" className="login-logo" />
                </div>

                <p className="login-subtitle">
                    Conecte-se e veja o seu engajamento valer benefícios
                </p>

                <div className="login-labels">
                    <label className="login__label">
                        <input
                            className="login__input login-email"
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label className="login__label">
                        <input className="login__input login-senha" id="senha"type="password" placeholder="senha"/>
                    </label>
                </div>

                <Button variant="primary" className="login__btn submit-btn" onClick={handleSubmit}>
                    <span>Conectar-se</span>
                </Button>
            </form>

            <p className="termos-de-servico">
                Ao continuar, você concorda com os nossos{' '}
                <a href="https://www.soulup.io/terms-and-privacy-soul.pdf" target="_blank" rel="noopener noreferrer">
                    Termos de Serviço
                </a>{' '}
                e reconhece que leu e compreendeu a nossa{' '}
                <a href="https://www.soulup.io/terms-and-privacy-soul.pdf" target="_blank" rel="noopener noreferrer">
                    Política de Privacidade.
                </a>
            </p>
        </dialog>
    )
}


