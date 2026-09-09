export default function Contato() {
    return (
        <div className="page__contato">
            <section className="contact__hero">
                <div className="container__hero">
                    <div className="hero__content">
                        <p className="section-tag">Fale conosco</p>
                        <h1 className="title">Estamos aqui <span>para ajudar</span></h1>
                        <p className="subtitle">Tem alguma dúvida, sugestão ou problema? Nossa equipe responde em até 24 horas.</p>
                    </div>
                    <div className="contact__status">
                        <span className="contact__status-dot"></span>
                        <div>
                            <strong>Equipe online</strong>
                            <p>Seg–Sex, 09h às 18h</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact__content">
                <div className="contact__info">
                    <h2 className="contact__title">CANAIS DE ATENDIMENTO</h2>
                    <div className="contact__info-cards">
                        <div className="contact__card">
                            <div className="icon contact__card-icon">📧</div>
                            <div className="contact__card-text">
                                <h3 className="contact__card-label">E-mail</h3>
                                <p className="contact__card-value">contato@pontosapp.com.br</p>
                            </div>
                        </div>
                        <div className="contact__card">
                            <div className="icon contact__card-icon">📞</div>
                            <div className="contact__card-text">
                                <h3 className="contact__card-label">WhatsApp</h3>
                                <p className="contact__card-value">+55 (11) 99999-0000</p>
                            </div>
                        </div>
                        <div className="contact__card">
                            <div className="icon contact__card-icon">⏱️</div>
                            <div className="contact__card-text">
                                <h3 className="contact__card-label">Horário de atendimento</h3>
                                <p className="contact__card-value">Seg–Sex, 09h às 18h</p>
                            </div>
                        </div>
                        <div className="contact__card">
                            <div className="icon contact__card-icon">📍</div>
                            <div className="contact__card-text">
                                <h3 className="contact__card-label">Endereço</h3>
                                <address className="contact__card-value">Av. Paulista, 1000 – São Paulo, SP</address>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form__item">
                    <form className="contact__form" autoComplete="off">
                        <h2 className="contact__form-title">Envie uma mensagem</h2>
                        <p className="contact__form-subtitle">Preencha o formulário abaixo e nossa equipe responde em breve.</p>

                        <div className="contact__form-row">
                            <label className="contact__label">
                                <span>NOME</span>
                                <input className="contact__input" type="text" name="nome" placeholder="Seu nome completo" />
                            </label>
                            <label className="contact__label">
                                <span>E-MAIL</span>
                                <input className="contact__input" type="email" name="email" placeholder="seu@email.com" />
                            </label>
                        </div>

                        <div className="contact__select" id="assunto-select">
                            <button type="button" className="contact__select-trigger" aria-haspopup="listbox">
                                Selecione um assunto
                            </button>
                            <div className="contact__options" role="listbox">
                                <button type="button" role="option">Dúvida</button>
                                <button type="button" role="option">Sugestão</button>
                                <button type="button" role="option">Problema técnico</button>
                            </div>
                        </div>

                        <label className="contact__label">
                            <span>MENSAGEM</span>
                            <textarea className="contact__textarea" id="text" placeholder="Descreva sua dúvida ou problema com detalhes..."></textarea>
                        </label>

                        <button className="btn btn__primary contact__btn" id="submit-btn" type="submit">
                            <span>Enviar mensagem</span>
                            <span className="contact__btn-arrow">→</span>
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}
