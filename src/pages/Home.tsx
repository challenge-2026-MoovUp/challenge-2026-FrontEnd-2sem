import { useOutletContext } from 'react-router-dom'
import Button from '../components/common/Button'

interface HomeContext {
    onOpenModal: () => void
    userEmail: string | null
}

export default function Home() {
    const { onOpenModal, userEmail } = useOutletContext<HomeContext>()
    
    return (
        <div className="page__home">
            <div className="ambient" aria-hidden="true">
                <span className="orb orb-1" />
                <span className="orb orb-2" />
            </div>

            <section className="main__hero">
                <div className="container__hero">
                    <div className="hero__content">
                        {userEmail ? (
                            <p className="section-tag">Bem vindo, {userEmail}</p>
                        ) : (
                            <p className="section-tag">Suas interações valem pontos</p>
                        )}
                        <h1 className="title">Interaja, ganhe <span>pontos</span> e resgate <span>benefícios</span> reais</h1>
                        <p className="subtitle">A plataforma que transforma cada curtida, post e comentário em pontos que viram descontos na sua conta de energia, cashback e muito mais.</p>
                        <div className="hero__actions">
                            {userEmail ? null : (
                                <Button variant="cta-primary" onClick={onOpenModal}>Criar Conta Grátis</Button>
                            )}
                            <Button variant="cta-outline">VER COMO FUNCIONA</Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="feat__section">
                <div className="feat__container">
                    <p className="section-tag">Recursos</p>
                    <h2 className="title">Tudo que voce precisa para <span>ganhar mais</span></h2>

                    <div className="feat__grid">
                        <div className="feature feature-large">
                            <p className="icon icon1">✦</p>
                            <h3 className="topic">Ganhe pontos</h3>
                            <p className="about">Cada post, curtida e comentário gera pontos. Quanto mais voce interage, mais pontos acumula.</p>
                        </div>
                        <div className="feature">
                            <p className="icon icon2">✦</p>
                            <h3 className="topic">Desconto na energia</h3>
                            <p className="about">Converta seus pontos em desconto real na conta de energia elétrica. Simples e direto.</p>
                        </div>
                        <div className="feature">
                            <p className="icon icon3">✦</p>
                            <h3 className="topic">Cashback e vouchers</h3>
                            <p className="about">Resgate pontos em parceiros selecionados, vouchers exclusivos e cashback direto na conta.</p>
                        </div>
                        <div className="feature">
                            <p className="icon icon4">✦</p>
                            <h3 className="topic">Transportes sustentáveis</h3>
                            <p className="about">Troque seus pontos acumulados em passagens de trem e metrô.</p>
                        </div>
                        <div className="feature">
                            <p className="icon icon5">✦</p>
                            <h3 className="topic">Desafios exclusivos</h3>
                            <p className="about">Participe de desafios semanais para ganhar pontos bônus e desbloquear recompensas especiais.</p>
                        </div>
                        <div className="feature feature-large2">
                            <p className="icon icon6">✦</p>
                            <h3 className="topic">Indicação de amigos</h3>
                            <p className="about">Indique amigos e ganhe bônus de pontos quando eles se cadastrarem e interagirem.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="steps__section" id="steps-goto">
                <div className="steps">
                    <p className="section-tag">Como Funciona</p>
                    <h2 className="title">Em <span>4 passos </span>simples</h2>
                    <div className="steps__grid">
                        <div className="step__card">
                            <p className="num num1">1</p>
                            <h3 className="steps__topic">Crie sua conta</h3>
                            <p className="steps__subtitle">Cadastre-se gratuitamente em menos de 2 minutos com o seu email e numero de telefone.</p>
                        </div>
                        <div className="step__card">
                            <p className="num num2">2</p>
                            <h3 className="steps__topic">Interaja na plataforma</h3>
                            <p className="steps__subtitle">Poste conteúdos, curta, comente e compartilhe. Cada ação gera pontos automaticamente.</p>
                        </div>
                        <div className="step__card">
                            <p className="num num3">3</p>
                            <h3 className="steps__topic">Acumule seus pontos</h3>
                            <p className="steps__subtitle">Acompanhe seu saldo crescer em tempo real na sua carteira digital dentro do app.</p>
                        </div>
                        <div className="step__card">
                            <p className="num num4">4</p>
                            <h3 className="steps__topic">Resgate benefícios</h3>
                            <p className="steps__subtitle">Troque seus pontos por descontos em energia, cashback ou vouchers de parceiros.</p>
                        </div>
                    </div>
                </div>
            </section>

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
                            <Button variant="cta-outline">SAIBA MAIS</Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
