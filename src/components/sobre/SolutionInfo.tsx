interface solutionInfoProps {
    isActive: boolean
}

export default function SolutionInfo({ isActive } : solutionInfoProps) {
    return(
        <div className={`container__main-3 sobre__container ${isActive ? 'active' : ''}`} id="container-3">
                    <div className="container__main-1-left">
                        <div className="main__head">
                            <p className="section-tag">Passo a passo</p>
                            <h2 className="main__title">Do primeiro post <span>ao embarque</span></h2>
                            <p className="main__subtitle">O caminho completo, desde criar sua conta até usar a passagem na catraca.</p>
                        </div>
                        <article className="journey__main">
                            <div className="journey__top">
                                <p className="num">1</p>
                                <p className="journey-icon">📝</p>
                            </div>
                            <div className="journey__content">
                                <h3 className="journey__content-title">Crie sua conta em 2 minutos</h3>
                                <h3 className="journey__content-subtitle">Cadastro gratuito com nome, e-mail e número de telefone. Nenhum cartão de crédito necessário. Ao finalizar, você já recebe 50 pontos de boas-vindas para começar.</h3>
                                <h3 className="section-tag">grátis para sempre</h3>
                            </div>
                        </article>
                        <article className="journey__main">
                            <div className="journey__top">
                                <p className="num">2</p>
                                <p className="journey-icon">💬</p>
                            </div>
                            <div className="journey__content">
                                <h3 className="journey__content-title">Interaja e acumule pontos</h3>
                                <h3 className="journey__content-subtitle">Cada curtida gera 15 pts, comentários valem 25 pts, posts originais até 80 pts e desafios semanais podem render até 200 pts de bônus. Tudo contabilizado automaticamente.</h3>
                                <h3 className="section-tag">+15 a +200 pts por ação</h3>
                            </div>
                        </article>
                        <article className="journey__main">
                            <div className="journey__top">
                                <p className="num">3</p>
                                <p className="journey-icon">🎫</p>
                            </div>
                            <div className="journey__content">
                                <h3 className="journey__content-title">Vincule seu cartão de transporte</h3>
                                <h3 className="journey__content-subtitle">Na seção "Carteira", adicione o número do seu Bilhete Único, BOM! ou ative o QR Code. O processo de vinculação é feito uma única vez e leva menos de 1 minuto.</h3>
                                <h3 className="section-tag">vinculação única</h3>
                            </div>
                        </article>
                        <article className="journey__main">
                            <div className="journey__top">
                                <p className="num">4</p>
                                <p className="journey-icon">⭐️</p>
                            </div>
                            <div className="journey__content">
                                <h3 className="journey__content-title">Selecione o resgate</h3>
                                <h3 className="journey__content-subtitle">Com 400 pts no saldo, acesse "Resgatar" → "Transporte", escolha o modal, a quantidade de viagens e confirme com sua senha. Tudo dentro do app, sem sair da plataforma.</h3>
                                <h3 className="section-tag">mínimo: 400 pts</h3>
                            </div>
                        </article>
                        <article className="journey__main">
                            <div className="journey__top">
                                <p className="num">5</p>
                                <p className="journey-icon">🚇</p>
                            </div>
                            <div className="journey__content">
                                <h3 className="journey__content-title">Embarque em até 24 horas</h3>
                                <p className="journey__content-subtitle">O crédito é processado automaticamente e aparece no seu cartão de transporte em até 24 horas úteis. Você recebe uma notificação assim que estiver disponível. Sem taxas, sem surpresas.</p>
                                <p className="section-tag">zero taxas de conversão</p>
                            </div>
                        </article>
                    </div>

                    <div className="container__main-1-right">
                        <details className="accordion">
                            <summary>
                                <div className="accordion__summary">
                                    <h3 className="accordion__title">Quanto tempo leva para o crédito aparecer no meu cartão?</h3>
                                </div>
                                <i aria-hidden="true">+</i>
                            </summary>
                            <div className="accordion__content">
                                O processamento é feito em até 24 horas úteis após a confirmação do resgate. Em dias úteis durante o horário comercial, costuma ser mais rápido — muitos usuários recebem o crédito em menos de 2 horas. Você recebe uma notificação assim que o crédito for aplicado.
                            </div>
                        </details>

                        
                        <details className="accordion">
                            <summary>
                                <div className="accordion__summary">
                                    <h3 className="accordion__title">Posso resgatar passagens para outra pessoa?</h3>
                                </div>
                                <i aria-hidden="true">+</i>
                            </summary>
                            <div className="accordion__content">
                                Sim! Você pode vincular até 3 cartões de transporte na sua conta — o seu e o de mais 2 pessoas. Basta adicionar os cartões na seção "Meus cartões" dentro da Carteira, e no momento do resgate, escolher para qual cartão o crédito será enviado.
                            </div>
                        </details>

                        <details className="accordion">
                            <summary>
                                <div className="accordion__summary">
                                    <h3 className="accordion__title">O que acontece com os pontos não utilizados?</h3>
                                </div>
                                <i aria-hidden="true">+</i>
                            </summary>
                            <div className="accordion__content">
                                Os pontos têm validade de 12 meses a partir da última movimentação da conta. Qualquer interação na plataforma ou resgate renova automaticamente o prazo. Antes do vencimento, você recebe notificações com 30 e 7 dias de antecedência.
                            </div>
                        </details>

                        <details className="accordion">
                            <summary>
                                <div className="accordion__summary">
                                    <h3 className="accordion__title">Existe taxa para converter pontos em passagens?</h3>
                                </div>
                                <i aria-hidden="true">+</i>
                            </summary>
                            <div className="accordion__content">
                                Não. A conversão de pontos em passagens é sempre gratuita e sem taxas escondidas. O valor exibido na calculadora é o que você efetivamente recebe — sem descontos percentuais ou cobranças adicionais de qualquer tipo.
                            </div>
                        </details>

                        <details className="accordion">
                            <summary>
                                <div className="accordion__summary">
                                    <h3 className="accordion__title">Funciona para cidades fora de São Paulo?</h3>
                                </div>
                                <i aria-hidden="true">+</i>
                            </summary>
                            <div className="accordion__content">
                                Atualmente a rede cobre toda a Grande São Paulo, incluindo municípios da RMSP atendidos pelo metrô, CPTM e EMTU. Estamos em processo de expansão para Rio de Janeiro, Belo Horizonte e Curitiba — fique atento às novidades no app.
                            </div>
                        </details>

                    </div>
                </div>
    )
}