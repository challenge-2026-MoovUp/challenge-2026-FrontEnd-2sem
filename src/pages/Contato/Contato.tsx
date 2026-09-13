const cardClass = "group relative flex min-h-[100px] max-w-[400px] items-center gap-[18px] overflow-hidden rounded-[20px] border border-border-mid bg-dusk px-5 py-6 transition-[background-color,border-color,transform] duration-300 ease-in-out hover:translate-x-1 hover:border-aurora-30 hover:bg-dusk-mid-80 before:absolute before:inset-y-0 before:left-0 before:w-[2px] before:bg-gradiente-aurora before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] hover:before:opacity-100"
const inputClass = "w-full rounded-[10px] border border-border-mid bg-void px-4 py-[13px] font-sans text-[1.5rem] font-light tracking-[0.01em] text-mist outline-none transition-all duration-500"

export default function Contato() {
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
                    <form className="m-0 flex w-full max-w-none flex-col gap-5 p-[30px]" autoComplete="off">
                        <h2 className="text-[4rem] font-light text-mist">Envie uma mensagem</h2>
                        <p className="my-5 font-sans text-[1.5rem] font-light text-dust">Preencha o formulário abaixo e nossa equipe responde em breve.</p>

                        <div className="flex gap-5">
                            <label className="flex flex-1 flex-col gap-[6px]">
                                <span className="font-sans text-base font-normal text-dust">NOME</span>
                                <input className={inputClass} type="text" name="nome" placeholder="Seu nome completo" />
                            </label>
                            <label className="flex flex-1 flex-col gap-[6px]">
                                <span className="font-sans text-base font-normal text-dust">E-MAIL</span>
                                <input className={inputClass} type="email" name="email" placeholder="seu@email.com" />
                            </label>
                        </div>

                        <div className="relative w-full">
                            <button type="button" className="flex w-full items-center justify-between rounded-[10px] border border-border-mid bg-void px-4 py-[13px] text-left font-sans text-[1.5rem] font-light tracking-[0.01em] text-gray-olive outline-none transition-all duration-500" aria-haspopup="listbox">
                                Selecione um assunto
                                <span aria-hidden="true" className="text-[1.8rem] leading-none text-mist-dim">⌄</span>
                            </button>
                            <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 hidden overflow-hidden rounded-[10px] border border-border-mid bg-void" role="listbox">
                                <button type="button" role="option" className="block w-full bg-transparent px-4 py-3 text-left font-sans text-[1.5rem] text-mist hover:bg-mist-08">Dúvida</button>
                                <button type="button" role="option" className="block w-full bg-transparent px-4 py-3 text-left font-sans text-[1.5rem] text-mist hover:bg-mist-08">Sugestão</button>
                                <button type="button" role="option" className="block w-full bg-transparent px-4 py-3 text-left font-sans text-[1.5rem] text-mist hover:bg-mist-08">Problema técnico</button>
                            </div>
                        </div>

                        <label className="flex flex-col gap-[6px]">
                            <span className="font-sans text-base font-normal text-dust">MENSAGEM</span>
                            <textarea className={`${inputClass} min-h-[140px] resize-none`} placeholder="Descreva sua dúvida ou problema com detalhes..."></textarea>
                        </label>

                        <button
                            className="group flex min-h-14 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-aurora-soft-35 bg-gradiente-aurora font-sans text-[1.3rem] font-normal uppercase tracking-[0.06em] text-mist shadow-[0_14px_32px_var(--color-aurora-18)] transition-[transform,box-shadow,filter] duration-200 ease-in-out hover:-translate-y-[3px] hover:shadow-[0_18px_42px_var(--color-aurora-28)] hover:[filter:saturate(1.08)]"
                            type="submit"
                        >
                            <span>Enviar mensagem</span>
                            <span className="inline-block transition-transform duration-200 group-hover:translate-x-[6px]">→</span>
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}
