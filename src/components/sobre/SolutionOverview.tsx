import { Link } from "react-router-dom"

interface SolutionOverviewProps {
    isActive: boolean
}

export default function SolutionOverview({ isActive }: SolutionOverviewProps) {
    return (
        <div className={`container__main-1 sobre__container ${isActive ? 'active' : ''}`} id="container-1">
            <div className="container__main-1-left">
                <div className="main__head">
                    <p className="section-tag">O DESAFIO</p>
                    <h2 className="main__title">De interação digital <span>a mobilidade real</span></h2>
                    <p className="main__subtitle">Milhões de brasileiros gastam uma fatia significativa do salário em transporte público. A MoovUp propõe uma troca justa: seu tempo e engajamento online valem passagens de verdade.</p>
                </div>
                <article className="journey__main">
                    <div className="journey__top">
                        <p className="num">1</p>
                        <p className="journey-icon">💬</p>
                    </div>
                    <div className="journey__content">
                        <h3 className="journey__content-title">Interaja na plataforma</h3>
                        <h3 className="journey__content-subtitle">Cada curtida, post, comentário e compartilhamento gera pontos automaticamente. Desafios semanais oferecem bônus e multiplicadores que aceleram muito o acúmulo.</h3>
                        <h3 className="section-tag">+15 a +200 pts por ação</h3>
                    </div>
                </article>
                <article className="journey__main">
                    <div className="journey__top">
                        <p className="num">2</p>
                        <p className="journey-icon">⭐️</p>
                    </div>
                    <div className="journey__content">
                        <h3 className="journey__content-title">Acumule na carteira digital</h3>
                        <h3 className="journey__content-subtitle">Seu saldo cresce em tempo real e fica disponível na carteira MoovUp. Os pontos têm validade de 12 meses a partir da última movimentação — sem perder o que você ganhou.</h3>
                        <h3 className="section-tag">mínimo: 400 pts para resgatar</h3>
                    </div>
                </article>
                <article className="journey__main">
                    <div className="journey__top">
                        <p className="num">3</p>
                        <p className="journey-icon">🎫</p>
                    </div>
                    <div className="journey__content">
                        <h3 className="journey__content-title">Resgate a passagem</h3>
                        <h3 className="journey__content-subtitle">Seu saldo cresce em tempo real e fica disponível na carteira MoovUp. Os pontos têm validade de 12 meses a partir da última movimentação — sem perder o que você ganhou.</h3>
                        <h3 className="section-tag">Bilhete Único · top · QR Code</h3>
                    </div>
                </article>
                <article className="journey__main">
                    <div className="journey__top">
                        <p className="num">4</p>
                        <p className="journey-icon">🚇</p>
                    </div>
                    <div className="journey__content">
                        <h3 className="journey__content-title">Embarque em até 24 horas</h3>
                        <p className="journey__content-subtitle">O crédito aparece na conta de transporte em até 24 horas úteis. Compatível com metrô, CPTM, ônibus municipais e linhas intermunicipais parceiras.</p>
                        <p className="section-tag">zero taxas de conversão</p>
                    </div>
                </article>
            </div>
            <div className="container__main-1-right">
                {/* Indicadores e argumentos de valor da solucao */}
                <div className="container-grid-4">
                    <div className="grid-4">
                        <div className="grid-card">
                            <h3 className="grid-card-num">850M</h3>
                            <p className="grid-card-about">Pontos distribuídos até hoje</p>
                        </div>
                        <div className="grid-card">
                            <h3 className="grid-card-num">R$4.2M</h3>
                            <p className="grid-card-about">Em passagens resgatadas</p>
                        </div>
                        <div className="grid-card">
                            <h3 className="grid-card-num">2M+</h3>
                            <p className="grid-card-about">Usuários ativos na plataforma</p>
                        </div>
                        <div className="grid-card">
                            <h3 className="grid-card-num">98%</h3>
                            <p className="grid-card-about">Satisfação dos usuários</p>
                        </div>
                    </div>
                </div>

                <div className="card-block-large">
                    <h3 className="block-title">Por que transporte público?</h3>
                    <p className="block-subtitle">Mobilidade urbana é uma das maiores despesas fixas de trabalhadores brasileiros — uma passagem simples já representa um impacto real no orçamento mensal. Ao transformar interações digitais em passagens reais, a MoovUp cria valor concreto, não apenas recompensas simbólicas.</p>
                    <br />
                    <br />
                    <p className="block-subtitle">Além disso, o transporte público é mais sustentável, reduz o trânsito e conecta pessoas às oportunidades. Recompensar quem usa transporte coletivo é também um ato de incentivo ao bem comum.</p>
                </div>

                {/* Cartoes com modais de transporte parceiros */}
                <div className="partner-modals">
                    <p className="partner-modals__label">MODAIS PARCEIROS</p>
                    <div className="partner-modals__grid">
                        <div className="partner-modals__card">
                            <span className="partner-modals__icon">🚇</span>
                            <div>
                                <h3 className="partner-modals__title">Metrô</h3>
                                <p className="partner-modals__subtitle">Linhas 1–5 · SP</p>
                            </div>
                        </div>
                        <div className="partner-modals__card">
                            <span className="partner-modals__icon">🚆</span>
                            <div>
                                <h3 className="partner-modals__title">CPTM</h3>
                                <p className="partner-modals__subtitle">Linhas 7–13</p>
                            </div>
                        </div>
                        <div className="partner-modals__card partner-modals__card--wide">
                            <span className="partner-modals__icon">🚌</span>
                            <div>
                                <h3 className="partner-modals__title">Ônibus</h3>
                                <p className="partner-modals__subtitle">SPTrans + municipais</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card de direcionamento para pitch e participantes */}
                <div className="video__direction-card">
                    <h3 className="video__card-title">E nós da <span>MoovUp</span>, gostaríamos de apresentar um breve vídeo, resumindo nossa <span>solução</span></h3>
                    <div className="video__direction-buttons">
                        <Link to="/solucao#solution-pitch" className="btn btn__primary card__btn">ir para o vídeo</Link>
                        <Link to="/quem-somos#creators-goto" className="btn btn__primary card__btn2">conheça os participantes</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
