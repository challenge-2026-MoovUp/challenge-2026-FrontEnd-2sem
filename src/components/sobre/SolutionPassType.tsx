import { Link } from 'react-router-dom'

interface solutionPassProps{
    isActive: boolean
}

export default function SolutionPassType( {isActive}: solutionPassProps ) {
    return(
        <div className={`container__main-2 sobre__container ${isActive ? 'active' : ''}`} id="container-2">
                    <div className="container__main-2-content">
                        <p className="section-tag">tipos de passagem</p>
                        <h2 className="main__title">Escolha o modal <span>ideal para você</span></h2>
                        <p className="main__subtitle">Da corrida rápida de ônibus ao passe semanal ilimitado — todos os tipos de resgate disponíveis, sem taxa de conversão.</p>
                    </div>
                    <div className="container__main-2-cards">

                        <div className="contact__card">
                            <p className="icon">🚌</p>
                            <div className="contact__card-text">
                                <h3 className="contact__card-title">Ônibus municipal</h3>
                                <p className="contact__card-subtitle">Qualquer linha SPTrans, CMTC e sistemas municipais parceiros em São Paulo e região metropolitana. Sem restrição de horário.</p>
                                <div className="section__tag-flex">
                                    <p className="section-tag">bilhete único</p>
                                    <p className="section-tag">qr code</p>
                                </div>
                            </div>
                            <div className="card__values">
                                <h3 className="top-num">400</h3>
                                <p className="num-subtitle">pontos</p>
                                <p className="num-value">≈ R$ 4,40</p>
                            </div>
                        </div>

                        <div className="contact__card">
                            <p className="icon">🚇</p>
                            <div className="contact__card-text">
                                <h3 className="contact__card-title">Metrô de São Paulo</h3>
                                <p className="contact__card-subtitle">Linhas 1 a 5 do Metrô de São Paulo, sem restrição de horário ou estação. Cobertura de toda a rede metropolitana.</p>
                                <div className="section__tag-flex">
                                    <p className="section-tag">bilhete único</p>
                                    <p className="section-tag">top</p>
                                    <p className="section-tag">qr code</p>
                                </div>
                            </div>
                            <div className="card__values">
                                <h3 className="top-num">500</h3>
                                <p className="num-subtitle">pontos</p>
                                <p className="num-value">≈ R$ 5,00</p>
                            </div>
                        </div>

                        <div className="contact__card">
                            <p className="icon">🚆</p>
                            <div className="contact__card-text">
                                <h3 className="contact__card-title">Trem CPTM</h3>
                                <p className="contact__card-subtitle">Linhas 7 a 13 da CPTM, cobrindo Grande São Paulo e municípios da região metropolitana como Mogi, Jundiaí e Francisco Morato.</p>
                                <div className="section__tag-flex">
                                    <p className="section-tag">bilhete único</p>
                                    <p className="section-tag">top</p>
                                </div>
                            </div>
                            <div className="card__values">
                                <h3 className="top-num">500</h3>
                                <p className="num-subtitle">pontos</p>
                                <p className="num-value">≈ R$ 5,00</p>
                            </div>
                        </div>

                        <div className="contact__card">
                            <p className="icon">🔄</p>
                            <div className="contact__card-text">
                                <h3 className="contact__card-title">Bilhete integrado</h3>
                                <p className="contact__card-subtitle">Integração tarifária entre ônibus + metrô + trem em uma única viagem, dentro da janela de 3 horas. Ideal para trajetos longos com baldeação.</p>
                                <div className="section__tag-flex">
                                    <p className="section-tag">bilhete único</p>
                                    <p className="section-tag">top</p>
                                </div>
                            </div>
                            <div className="card__values">
                                <h3 className="top-num">1200</h3>
                                <p className="num-subtitle">pontos</p>
                                <p className="num-value">≈ R$ 12,50</p>
                            </div>
                        </div>

                        <div className="contact__card">
                            <p className="icon">📅</p>
                            <div className="contact__card-text">
                                <h3 className="contact__card-title">Passe semanal ilimitado</h3>
                                <p className="contact__card-subtitle">7 dias consecutivos de viagens ilimitadas em todos os modais parceiros — metrô, trem e ônibus — sem restrição de quantidade de embarques.</p>
                                <div className="section__tag-flex">
                                    <p className="section-tag">bilhete único</p>
                                    <p className="section-tag">top</p>
                                    <p className="section-tag">qr code</p>
                                </div>
                            </div>
                            <div className="card__values">
                                <h3 className="top-num">6000</h3>
                                <p className="num-subtitle">pontos</p>
                                <p className="num-value">≈ R$ 55,00</p>
                            </div>
                        </div>


                        <div className="benefits__content">
                            <div className="benefits-label">
                                <h2 className="label">Onde seu crédito funciona</h2>
                            </div>
                            <div className="benefits-flex">
                                <div className="accordion">
                                    <p className="accord-icon">💳</p>
                                    <h3 className="accord-title">Bilhete Único</h3>
                                    <p className="accord-subtitle">O crédito é adicionado diretamente no seu Bilhete Único já cadastrado. Válido em toda a rede SPTrans e EMTU.</p>
                                </div>
                                <div className="accordion">
                                    <p className="accord-icon">💳</p>
                                    <h3 className="accord-title">Cartão top</h3>
                                    <p className="accord-subtitle">Compatível com o cartão top da ViaMobilidade, aceito nas linhas 5 e 17 do metrô e redes parceiras.</p>
                                </div>
                                <div className="accordion">
                                    <p className="accord-icon">📱</p>
                                    <h3 className="accord-title">QR Code</h3>
                                    <p className="accord-subtitle">Gere um QR Code diretamente no app MoovUp e use nas catracas compatíveis — sem precisar de cartão físico.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}