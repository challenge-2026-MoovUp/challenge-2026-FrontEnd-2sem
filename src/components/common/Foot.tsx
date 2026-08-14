import Button from "./Button";
import { useNavigate, useOutletContext } from 'react-router-dom'

interface HomeContext {
    onOpenModal: () => void
    userEmail: string | null
}

interface FootProps {
    ctaTo?: string
    btnStr?: string
}

export default function Foot({ ctaTo, btnStr }: FootProps) {

    const { onOpenModal, userEmail } = useOutletContext<HomeContext>()
    const navigate = useNavigate()

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