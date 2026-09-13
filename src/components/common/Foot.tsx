import Button from "./Button";
import { useNavigate, useOutletContext } from 'react-router-dom'

interface HomeContext {
    onOpenModal: () => void
    userEmail: string | null
}

interface FootProps {
    ctaTo?: string
    btnStr?: string
    /** Reproduz o antigo destaque `.page__home .btn__cta` (fonte maior, mais margem, hover mais forte). */
    large?: boolean
}

export default function Foot({ ctaTo, btnStr, large }: FootProps) {

    const { onOpenModal, userEmail } = useOutletContext<HomeContext>()
    const navigate = useNavigate()

    const largeClass = large ? "!my-[50px] !w-fit !text-[1.6rem] !font-extralight hover:!-translate-y-[3px]" : undefined
    const largeOutlineClass = large ? `${largeClass} hover:!border-mist-30 hover:!bg-border` : undefined

    return (
        <section>
            <div className={large ? undefined : "mx-auto mb-40 mt-32 w-full max-w-[1120px]"}>
                <div
                    className={`relative mx-auto flex w-[120rem] flex-col items-center overflow-hidden rounded-[30px] border-2 border-border bg-dusk text-center before:pointer-events-none before:absolute before:rounded-full before:bg-violet-deep before:opacity-45 before:blur-[90px] before:content-[''] ${
                        large
                            ? 'my-60 p-24 transition-[border-color,box-shadow,transform] duration-300 ease-in-out hover:-translate-y-1 hover:border-aurora-42 hover:shadow-[0_24px_60px_var(--color-void-42)] before:-left-[90px] before:-top-[90px] before:h-[260px] before:w-[260px]'
                            : 'm-0 px-16 py-[4.8rem] before:-left-20 before:-top-20 before:h-[220px] before:w-[220px]'
                    }`}
                >
                    {large ? (
                        <p className="relative z-[1] my-[30px] inline-block rounded-[30px] border border-border bg-ember-soft-18 px-5 py-[5px] font-sans text-[1.5rem] italic text-aurora before:mr-2 before:inline-block before:h-[5px] before:w-[5px] before:animate-[breathe_4s_ease-in-out_infinite] before:rounded-full before:bg-aurora before:align-middle before:content-['']">
                            Comece hoje
                        </p>
                    ) : (
                        <p className="relative z-[1] mb-[1.8rem] inline-flex items-center font-sans text-[1.6rem] font-normal not-italic text-aurora-soft">
                            Comece hoje
                        </p>
                    )}

                    {large ? (
                        <h2 className="relative z-[1] mb-12 w-full text-[6rem] font-extralight text-mist">
                            Pronto para começar a <span className="bg-gradiente-aurora bg-clip-text italic font-thin text-transparent">ganhar?</span>
                        </h2>
                    ) : (
                        <h2 className="relative z-[1] w-full max-w-[760px] bg-gradiente-mist bg-clip-text text-[clamp(3.6rem,5vw,5.6rem)] font-light leading-none text-transparent">
                            Pronto para começar a <span className="bg-gradiente-aurora bg-clip-text italic text-transparent">ganhar?</span>
                        </h2>
                    )}

                    {large ? (
                        <p className="relative z-[1] my-5 w-4/5 font-sans text-[2rem] font-thin text-mist-dim">Mais de 2 milhões de pessoas já transformam interações em benefícios reais.</p>
                    ) : (
                        <p className="relative z-[1] mt-8 w-full max-w-[620px] font-sans text-[1.55rem] font-extralight leading-[1.7] text-dust">Mais de 2 milhões de pessoas já transformam interações em benefícios reais.</p>
                    )}

                    <div className={`relative z-[1] flex justify-center ${large ? 'items-center gap-4' : 'flex-wrap gap-[1.2rem] pt-12'}`}>
                        {userEmail ? (
                            null
                        ) : (
                            <Button variant="cta-primary" className={largeClass} onClick={onOpenModal}>Criar Conta Grátis</Button>
                        )}
                        <Button variant="cta-outline" className={largeOutlineClass} onClick={ctaTo ? () => navigate(ctaTo) : undefined}>{btnStr}</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}