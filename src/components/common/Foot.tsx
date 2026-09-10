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
        <section className="foot">
            <div className="container__foot">
                <div className="start__card">
                    <p className="section-tag">Comece hoje</p>
                    <h2 className="title">Pronto para começar a <span>ganhar?</span></h2>
                    <p className="subtitle">Mais de 2 milhões de pessoas já transformam interações em benefícios reais.</p>
                    <div className="hero__actions">
                        {userEmail ? (
                            null
                        ) : (
                            <Button variant="cta-primary" onClick={onOpenModal}>Criar Conta Grátis</Button>
                        )}
                        <Button variant="cta-outline" onClick={ctaTo ? () => navigate(ctaTo) : undefined}>{btnStr}</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}