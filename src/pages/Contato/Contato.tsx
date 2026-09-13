import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { ContatoFormData } from '../../types/contato'

const cardClass = "group relative flex min-h-[100px] max-w-[400px] items-center gap-[18px] overflow-hidden rounded-[20px] border border-border-mid bg-dusk px-5 py-6 transition-[background-color,border-color,transform] duration-300 ease-in-out hover:translate-x-1 hover:border-aurora-30 hover:bg-dusk-mid-80 before:absolute before:inset-y-0 before:left-0 before:w-[2px] before:bg-gradiente-aurora before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] hover:before:opacity-100"
const errorTextClass = "font-sans text-[1.2rem] text-ember"
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function inputClass(hasError?: boolean) {
    return `w-full rounded-[10px] border ${hasError ? 'border-ember' : 'border-border-mid'} bg-void px-4 py-[13px] font-sans text-[1.5rem] font-light tracking-[0.01em] text-mist outline-none transition-all duration-500`
}

export default function Contato() {
    const [sent, setSent] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContatoFormData>()

    function onSubmit() {
        // Sprint 03 não consome API — só validamos e damos feedback em tela.
        reset()
        setSent(true)
        setTimeout(() => setSent(false), 4000)
    }

    return (
        <>
            <section className="relative mx-auto flex w-full min-h-[52vh] items-center justify-center overflow-hidden">
                <div className="mx-auto flex w-[78%] min-h-[360px] max-w-[1020px] items-center justify-between">
                    <div className="flex w-[58%] max-w-[560px] flex-col items-start text-left">
                        <p className="mb-[3.2rem] inline-flex items-center font-sans text-[1.1rem] font-bold not-italic uppercase tracking-[0.26em] text-ember-soft">Fale conosco</p>
                        <h1 className="m-0 text-[7.6rem] font-extralight leading-[0.95] text-mist">Estamos aqui <span className="block bg-gradiente-aurora bg-clip-text italic font-thin text-transparent">para ajudar</span></h1>
                        <p className="mt-[1.8rem] max-w-[500px] font-sans text-[1.4rem] font-light leading-[1.8] text-dust">Tem alguma dúvida, sugestão ou problema? Nossa equipe responde em até 24 horas.</p>
                    </div>
                    <div className="mb-[6.8rem] flex w-[174px] items-center gap-3 self-end rounded-[14px] border border-aurora-26 bg-dusk-72 px-[18px] py-4 text-mist">
                        <span className="h-2 w-2 flex-none rounded-full bg-sage opacity-75 shadow-[0_0_14px_var(--color-sage-45)]"></span>
                        <div>
                            <strong className="block font-sans text-[1.1rem] leading-[1.2]">Equipe online</strong>
                            <p className="mt-[6px] font-sans text-[1.1rem] leading-[1.4] text-mist-dim">Seg–Sex, 09h às 18h</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-[1120px] grid-cols-[minmax(0,390px)_minmax(0,600px)] items-start justify-center gap-[70px] px-[60px] pb-[100px]">
                <div className="max-w-[390px]">
                    <h2 className="mb-[30px] font-sans font-light text-mist-dim">CANAIS DE ATENDIMENTO</h2>
                    <div className="grid grid-cols-1 gap-[10px]">
                        <div className={cardClass}>
                            <div className="inline-flex min-h-11 min-w-11 flex-none items-center justify-center self-center rounded-[10px] border border-border bg-aurora-glow px-[10px] py-2 text-[2.3rem]">📧</div>
                            <div className="flex min-w-0 flex-col gap-[6px]">
                                <h3 className="font-sans text-[1.5rem] font-light text-mist">E-mail</h3>
                                <p className="font-sans font-normal text-dust">contato@pontosapp.com.br</p>
                            </div>
                        </div>
                        <div className={cardClass}>
                            <div className="inline-flex min-h-11 min-w-11 flex-none items-center justify-center self-center rounded-[10px] border border-border bg-aurora-glow px-[10px] py-2 text-[2.3rem]">📞</div>
                            <div className="flex min-w-0 flex-col gap-[6px]">
                                <h3 className="font-sans text-[1.5rem] font-light text-mist">WhatsApp</h3>
                                <p className="font-sans font-normal text-dust">+55 (11) 99999-0000</p>
                            </div>
                        </div>
                        <div className={cardClass}>
                            <div className="inline-flex min-h-11 min-w-11 flex-none items-center justify-center self-center rounded-[10px] border border-border bg-aurora-glow px-[10px] py-2 text-[2.3rem]">⏱️</div>
                            <div className="flex min-w-0 flex-col gap-[6px]">
                                <h3 className="font-sans text-[1.5rem] font-light text-mist">Horário de atendimento</h3>
                                <p className="font-sans font-normal text-dust">Seg–Sex, 09h às 18h</p>
                            </div>
                        </div>
                        <div className={cardClass}>
                            <div className="inline-flex min-h-11 min-w-11 flex-none items-center justify-center self-center rounded-[10px] border border-border bg-aurora-glow px-[10px] py-2 text-[2.3rem]">📍</div>
                            <div className="flex min-w-0 flex-col gap-[6px]">
                                <h3 className="font-sans text-[1.5rem] font-light text-mist">Endereço</h3>
                                <address className="font-sans font-normal not-italic text-dust">Av. Paulista, 1000 – São Paulo, SP</address>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="min-h-[620px] max-w-[600px] rounded-[20px] border border-border-mid bg-dusk transition-all duration-200">
                    <form className="m-0 flex w-full max-w-none flex-col gap-5 p-[30px]" autoComplete="off" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <h2 className="text-[4rem] font-light text-mist">Envie uma mensagem</h2>
                        <p className="my-5 font-sans text-[1.5rem] font-light text-dust">Preencha o formulário abaixo e nossa equipe responde em breve.</p>

                        <div className="flex gap-5">
                            <label className="flex flex-1 flex-col gap-[6px]">
                                <span className="font-sans text-base font-normal text-dust">NOME</span>
                                <input
                                    className={inputClass(!!errors.nome)}
                                    type="text"
                                    placeholder="Seu nome completo"
                                    {...register('nome', {
                                        required: 'Informe seu nome',
                                        minLength: { value: 3, message: 'O nome deve ter pelo menos 3 caracteres' },
                                    })}
                                />
                                {errors.nome && <p className={errorTextClass}>{errors.nome.message}</p>}
                            </label>
                            <label className="flex flex-1 flex-col gap-[6px]">
                                <span className="font-sans text-base font-normal text-dust">E-MAIL</span>
                                <input
                                    className={inputClass(!!errors.email)}
                                    type="email"
                                    placeholder="seu@email.com"
                                    {...register('email', {
                                        required: 'Informe seu e-mail',
                                        pattern: { value: EMAIL_PATTERN, message: 'Informe um e-mail válido' },
                                    })}
                                />
                                {errors.email && <p className={errorTextClass}>{errors.email.message}</p>}
                            </label>
                        </div>

                        <label className="flex flex-col gap-[6px]">
                            <span className="font-sans text-base font-normal text-dust">ASSUNTO</span>
                            <div className="relative w-full">
                                <select
                                    defaultValue=""
                                    className={`${inputClass(!!errors.assunto)} appearance-none pr-10 invalid:text-gray-olive`}
                                    required
                                    {...register('assunto', { required: 'Selecione um assunto' })}
                                >
                                    <option value="" disabled>Selecione um assunto</option>
                                    <option value="duvida">Dúvida</option>
                                    <option value="sugestao">Sugestão</option>
                                    <option value="problema">Problema técnico</option>
                                </select>
                                <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[1.8rem] leading-none text-mist-dim">⌄</span>
                            </div>
                            {errors.assunto && <p className={errorTextClass}>{errors.assunto.message}</p>}
                        </label>

                        <label className="flex flex-col gap-[6px]">
                            <span className="font-sans text-base font-normal text-dust">MENSAGEM</span>
                            <textarea
                                className={`${inputClass(!!errors.mensagem)} min-h-[140px] resize-none`}
                                placeholder="Descreva sua dúvida ou problema com detalhes..."
                                {...register('mensagem', {
                                    required: 'Escreva sua mensagem',
                                    minLength: { value: 10, message: 'A mensagem deve ter pelo menos 10 caracteres' },
                                })}
                            ></textarea>
                            {errors.mensagem && <p className={errorTextClass}>{errors.mensagem.message}</p>}
                        </label>

                        {sent && (
                            <p className="font-sans text-[1.2rem] text-sage">Mensagem enviada! Nossa equipe responde em breve.</p>
                        )}

                        <button
                            className="group flex min-h-14 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-aurora-soft-35 bg-gradiente-aurora font-sans text-[1.3rem] font-normal uppercase tracking-[0.06em] text-mist shadow-[0_14px_32px_var(--color-aurora-18)] transition-[transform,box-shadow,filter] duration-200 ease-in-out hover:-translate-y-[3px] hover:shadow-[0_18px_42px_var(--color-aurora-28)] hover:[filter:saturate(1.08)]"
                            type="submit"
                        >
                            <span>{sent ? 'Mensagem enviada ✓' : 'Enviar mensagem'}</span>
                            {!sent && <span className="inline-block transition-transform duration-200 group-hover:translate-x-[6px]">→</span>}
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}
