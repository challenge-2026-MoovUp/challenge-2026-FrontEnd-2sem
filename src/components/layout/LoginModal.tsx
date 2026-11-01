import { useEffect, useRef, useState } from 'react'
import type { Credenciais, NovoUsuario } from '../../types/api'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import LogoMoovup from '../../assets/moov-up-icon.png'
import Button from '../common/Button.tsx'
import type { LoginFormData } from '../../types/login'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* O modal é uma tela só com dois modos: entrar e criar conta. O que muda é o
   texto, o campo "nome" (só no cadastro) e qual função é chamada no submit. */
type Modo = 'login' | 'cadastro'

const textos = {
    login: {
        titulo: 'Bem-vindo de volta',
        subtitulo: 'Conecte-se e veja o seu engajamento valer benefícios',
        botao: 'Conectar-se',
        enviando: 'Entrando...',
        trocar: 'Não tem conta? Criar conta',
        erro: 'Não foi possível entrar',
    },
    cadastro: {
        titulo: 'Crie sua conta',
        subtitulo: 'Comece a acumular pontos pelas suas viagens',
        botao: 'Criar conta',
        enviando: 'Criando...',
        trocar: 'Já tem conta? Entrar',
        erro: 'Não foi possível criar a conta',
    },
}

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
    onLogin: (credenciais: Credenciais) => Promise<{ ok: boolean; reason?: string}>
    onCadastrar: (dados: NovoUsuario) => Promise<{ ok: boolean; reason?: string}>
}

export default function LoginModal({ isOpen, onClose, onLogin, onCadastrar }: LoginModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [modo, setModo] = useState<Modo>('login')
    const [enviando, setEnviando] = useState(false)
    const [erroApi, setErroApi] = useState<string | null>(null)

    const texto = textos[modo]

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormData>()

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
            reset()
            setErroApi(null)
            setModo('login')
        }
    }, [isOpen, reset])

    function trocarModo() {
        setModo(modo === 'login' ? 'cadastro' : 'login')
        reset()
        setErroApi(null)
    }

    async function onSubmit(data: LoginFormData){
        setEnviando(true)
        setErroApi(null)

        const resultado = modo === 'login'
            ? await onLogin({ email: data.email, senha: data.senha })
            : await onCadastrar({ nome: data.nome, email: data.email, senha: data.senha })

        setEnviando(false)
        if (resultado.ok) reset()
            else setErroApi(resultado.reason ?? texto.erro)
    }

    const fieldErrorClass = "border-ember focus:border-ember focus:ring-ember/30"
    const fieldOkClass = "border-border-mid focus:border-aurora-soft focus:ring-aurora/25"

    function inputClass(hasError?: boolean) {
        return `h-12 w-full rounded-xl border bg-void/60 pl-11 pr-4 text-[1.45rem] font-light tracking-[0.01em] text-mist outline-none transition-all duration-200 [color-scheme:dark] placeholder:text-gray-olive selection:bg-aurora-42 selection:text-mist hover:border-mist-22 focus:bg-violet-glow-03 focus:ring-2 focus:ring-offset-0 ${hasError ? fieldErrorClass : fieldOkClass}`
    }

    const labelClass = "font-sans text-[1.2rem] font-medium uppercase tracking-[0.06em] text-mist-dim"
    const iconClass = "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1.3rem] text-mist-dim"
    const errorTextClass = "flex items-center gap-[6px] font-sans text-[1.15rem] text-ember"

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            onCancel={onClose}
            className="m-0 h-screen max-h-full w-screen max-w-full overflow-auto border-0 bg-transparent p-0 font-sans text-mist [transition:.35s] backdrop:bg-night-68 backdrop:backdrop-blur-[6px]"
            id="ModalLogin"
            aria-labelledby="modalLoginTitle"
        >
            <div className="relative flex min-h-full w-full items-center justify-center p-6 tablet:p-12">
                {/* Glow ambiente, mesma linguagem visual do CTA "Comece hoje" */}
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <span className="absolute left-[8%] top-[10%] h-[420px] w-[420px] rounded-full opacity-45 blur-[110px] [background:radial-gradient(circle,var(--color-aurora)_0%,transparent_70%)]" />
                    <span className="absolute bottom-[8%] right-[6%] h-[520px] w-[520px] rounded-full opacity-35 blur-[110px] [background:radial-gradient(circle,var(--color-ember-soft)_0%,transparent_80%)]" />
                </div>

                <div className="relative z-[1] w-full max-w-[440px] overflow-hidden rounded-[28px] border border-border bg-dusk-74 p-8 shadow-[0_24px_60px_var(--color-void-42)] backdrop-blur-[18px] tablet:p-11">
                    <button
                        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-mist-dim outline-none transition-colors duration-200 hover:bg-mist-08 hover:text-mist focus-visible:ring-2 focus-visible:ring-aurora-soft/50"
                        aria-label="Fechar"
                        id="btnFecharModal"
                        type="button"
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faXmark} className="text-[1.6rem]" />
                    </button>

                    <div className="flex flex-col items-center gap-4 text-center">
                        <img src={LogoMoovup} alt="logo moovUp" className="w-[72px]" />
                        <div className="flex flex-col gap-1">
                            <h2 id="modalLoginTitle" className="font-serif text-[2.2rem] font-medium text-mist">
                                {texto.titulo}
                            </h2>
                            <p className="text-[1.4rem] font-extralight text-mist-dim">
                                {texto.subtitulo}
                            </p>
                        </div>
                    </div>

                    <form
                        className="mt-9 flex w-full flex-col gap-5"
                        id="msg"
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        {modo === 'cadastro' && (
                            <div className="flex flex-col gap-[6px]">
                                <label htmlFor="loginNome" className={labelClass}>
                                    Nome
                                </label>
                                <div className="relative">
                                    <FontAwesomeIcon icon={faUser} className={iconClass} />
                                    <input
                                        id="loginNome"
                                        className={inputClass(!!errors.nome)}
                                        type="text"
                                        placeholder="Como quer ser chamado"
                                        aria-invalid={!!errors.nome}
                                        aria-describedby={errors.nome ? 'loginNome-error' : undefined}
                                        {...register('nome', {
                                            required: 'Informe seu nome',
                                        })}
                                    />
                                </div>
                                {errors.nome && (
                                    <p id="loginNome-error" role="alert" className={errorTextClass}>
                                        {errors.nome.message}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="flex flex-col gap-[6px]">
                            <label htmlFor="loginEmail" className={labelClass}>
                                E-mail
                            </label>
                            <div className="relative">
                                <FontAwesomeIcon icon={faEnvelope} className={iconClass} />
                                <input
                                    id="loginEmail"
                                    className={inputClass(!!errors.email)}
                                    type="email"
                                    placeholder="seu@email.com"
                                    autoComplete="new-password"
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? 'loginEmail-error' : undefined}
                                    {...register('email', {
                                        required: 'Informe seu e-mail',
                                        pattern: {
                                            value: EMAIL_PATTERN,
                                            message: 'Informe um e-mail válido',
                                        },
                                    })}
                                />
                            </div>
                            {errors.email && (
                                <p id="loginEmail-error" role="alert" className={errorTextClass}>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-[6px]">
                            <label htmlFor="loginSenha" className={labelClass}>
                                Senha
                            </label>
                            <div className="relative">
                                <FontAwesomeIcon icon={faLock} className={iconClass} />
                                <input
                                    id="loginSenha"
                                    className={inputClass(!!errors.senha)}
                                    type="password"
                                    placeholder="••••••••"
                                    autoComplete="off"
                                    aria-invalid={!!errors.senha}
                                    aria-describedby={errors.senha ? 'loginSenha-error' : undefined}
                                    {...register('senha', {
                                        required: 'Informe sua senha',
                                        minLength: modo === 'cadastro'
                                            ? { value: 6, message: 'A senha precisa de ao menos 6 caracteres' }
                                            : undefined,
                                    })}
                                />
                            </div>
                            {errors.senha && (
                                <p id="loginSenha-error" role="alert" className={errorTextClass}>
                                    {errors.senha.message}
                                </p>
                            )}
                        </div>

                        {erroApi && (
                            <p role="alert" className={errorTextClass}>
                                {erroApi}
                            </p>
                        )}

                        <Button
                            type="submit"
                            disabled={enviando}
                            variant="primary"
                            className="mt-2 !m-0 !flex h-14 w-full items-center justify-center rounded-2xl !border-none bg-gradiente-aurora !text-mist hover:!shadow-[0_8px_32px_var(--color-aurora-35)] disabled:cursor-wait disabled:opacity-60">
                                <span>{enviando ? texto.enviando : texto.botao}</span>
                        </Button>

                        <button
                            type="button"
                            onClick={trocarModo}
                            className="font-sans text-[1.25rem] text-aurora-soft underline-offset-2 transition-opacity duration-200 hover:underline"
                        >
                            {texto.trocar}
                        </button>
                    </form>

                    <p className="relative z-[1] mx-auto mt-7 w-full text-center font-sans text-[1.1rem] leading-[1.6] text-dust">
                        Ao continuar, você concorda com os nossos{' '}
                        <a href="https://www.soulup.io/terms-and-privacy-soul.pdf" target="_blank" rel="noopener noreferrer" className="font-sans text-aurora-soft underline-offset-2 hover:underline">
                            Termos de Serviço
                        </a>{' '}
                        e reconhece que leu e compreendeu a nossa{' '}
                        <a href="https://www.soulup.io/terms-and-privacy-soul.pdf" target="_blank" rel="noopener noreferrer" className="font-sans text-aurora-soft underline-offset-2 hover:underline">
                            Política de Privacidade.
                        </a>
                    </p>
                </div>
            </div>
        </dialog>
    )
}
