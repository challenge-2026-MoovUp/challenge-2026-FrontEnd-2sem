import { useEffect, useRef, useState } from 'react'
import LogoMoovup from '../../assets/moov-up-icon.png'
import Button from '../common/Button.tsx'

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
    onLogin: (user: string , email: string) => void
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [user, setUser] = useState('')
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
        onLogin(email, user)
        setUser('')
        setEmail('')
    }

    const inputClass = "h-12 w-[400px] appearance-none rounded-[10px] border border-border-mid bg-void px-4 py-[13px] text-[1.5rem] font-light tracking-[0.01em] text-mist outline-none [caret-color:var(--color-aurora-soft)] [color-scheme:dark] [transition:all_.5s_ease] placeholder:text-gray-olive selection:bg-aurora-42 selection:text-mist hover:border-mist-22 hover:bg-dusk-mid-80 focus:border-violet-glow-50 focus:bg-violet-glow-08 focus:shadow-[0_0_20px_var(--color-violet-glow-08),inset_0_0_20px_var(--color-violet-glow-03)]"

    return (
        <dialog
            ref={dialogRef}
            className="m-0 h-screen max-h-full w-screen max-w-full overflow-auto border-0 bg-[rgba(4,8,20,0.88)] p-12 font-sans text-mist [transition:.35s] backdrop:backdrop-blur-[6px] backdrop:bg-night-68"
            id="ModalEmBreve"
            aria-labelledby="modalEmBreveTitle"
        >
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
                <span className="absolute left-[8%] top-[10%] h-[420px] w-[420px] rounded-full opacity-45 blur-[110px] [background:radial-gradient(circle,var(--color-aurora)_0%,transparent_70%)]" />
                <span className="absolute bottom-[8%] right-[6%] h-[520px] w-[520px] rounded-full opacity-35 blur-[110px] [background:radial-gradient(circle,var(--color-ember-soft)_0%,transparent_80%)]" />
            </div>

            <button
                className="absolute left-[10px] top-[10px] h-11 min-w-[110px] cursor-pointer rounded-full border-none bg-transparent px-[18px] font-sans text-[1.5rem] font-medium normal-case leading-[44px] tracking-[0.06em] text-mist"
                aria-label="Voltar"
                id="btnFecharModal"
                type="button"
                onClick={onClose}
            >
                {'‹ voltar'}
            </button>

            <form className="relative z-[1] mx-auto my-16 flex w-[400px] flex-col items-center justify-center gap-5 border-b border-border-mid pb-[34px] font-sans" id="msg" autoComplete='off'>
                <div className="flex items-center justify-center gap-5">
                    <img src={LogoMoovup} alt="logo moovUp" className="w-[100px]" />
                </div>

                <p className="text-[1.5rem] font-extralight">
                    Conecte-se e veja o seu engajamento valer benefícios
                </p>

                <div className="mt-[30px] flex flex-col gap-5">
                    <label className="flex flex-col gap-[10px]">
                        <input
                            className={inputClass}
                            id="user"
                            type="text"
                            placeholder="usuario"
                            value={user}
                            onChange={(u) => setUser(u.target.value)}
                        />
                    </label>

                    <label className="flex flex-col gap-[10px]">
                        <input
                            className={inputClass}
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete='new-password'
                        />
                    </label>

                    <label className="flex flex-col gap-[10px]">
                        <input className={inputClass} id="senha" type="password" placeholder="senha" autoComplete='off'/>
                    </label>
                </div>

                <Button variant="primary" className="!flex h-14 w-[400px] items-center justify-center rounded-2xl bg-dusk" onClick={handleSubmit}>
                    <span>Conectar-se</span>
                </Button>
            </form>

            <p className="relative z-[1] mx-auto w-[400px] text-center font-sans text-[1.2rem] text-dust">
                Ao continuar, você concorda com os nossos{' '}
                <a href="https://www.soulup.io/terms-and-privacy-soul.pdf" target="_blank" rel="noopener noreferrer" className="font-sans text-aurora">
                    Termos de Serviço
                </a>{' '}
                e reconhece que leu e compreendeu a nossa{' '}
                <a href="https://www.soulup.io/terms-and-privacy-soul.pdf" target="_blank" rel="noopener noreferrer" className="font-sans text-aurora">
                    Política de Privacidade.
                </a>
            </p>
        </dialog>
    )
}


