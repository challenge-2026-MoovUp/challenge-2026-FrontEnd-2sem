import mapaMetro from '../assets/mapa-moovUp.jpg'

export default function Solucao() {
    return (
        <main className="page__solucao">
            <section className="solution__overview" aria-labelledby="solution-title">
                <div className="solution__hero">
                    <div className="hero__content">
                        <p className="section-tag">Mobilidade em tempo real</p>
                        <h2 id="solution-title" className="solution__title">Tecnologia para planejar, acompanhar e embarcar melhor</h2>
                    </div>
                    <div className="solution__text">
                        <p>O sistema tem como objetivo monitorar linhas de trens e metrôs em tempo real, fornecendo informações como horários, atrasos, lotação, interrupções e rotas disponíveis para os usuários. Integrado ao projeto Moov-Up, a plataforma também permitirá a conversão de pontos acumulados em passagens de trem, tornando a experiência no transporte público mais prática, moderna e eficiente.</p>
                        <p>Além disso, o sistema contará com uma interface intuitiva e acessível, facilitando o acompanhamento das viagens e o gerenciamento de benefícios pelos passageiros. A proposta do projeto é unir tecnologia e mobilidade urbana em uma única plataforma, oferecendo mais comodidade e organização para quem utiliza transporte público diariamente.</p>
                    </div>
                    <figure className="solution__visual">
                        <img src={mapaMetro} alt="Mapa de metrô da MoovUp" className="solution-img" />
                    </figure>
                </div>

                <section className="solution__pitch" aria-labelledby="solution-pitch-title">
                    <div className="solution__pitch-content">
                        <p className="solution__highlight-label">Pitch MoovUp</p>
                        <h3 id="solution-pitch-title" className="solution__highlight-title">Conheça a proposta em vídeo</h3>
                        <p className="solution__highlight-text">Uma apresentação rápida da MoovUp, conectando tecnologia, mobilidade urbana e benefícios reais para quem usa transporte público.</p>
                    </div>
                    <iframe className="solution__pitch-video" src="https://www.youtube.com/embed/S8ajD2LQ3Q0?si=Be8zprYWXTN0FlWQ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </section>

                <div className="solution__highlight">
                    <p className="solution__highlight-label">Atualizações importantes</p>
                    <h3 className="solution__highlight-title">Mais controle durante toda a viagem</h3>
                    <p className="solution__highlight-text">Com a MoovUp, os usuários poderão planejar melhor seus trajetos, economizar tempo e acompanhar mudanças das linhas em tempo real, garantindo mais segurança, praticidade e eficiência durante seus deslocamentos.</p>
                </div>

                <div className="solution__cards" aria-label="Principais recursos da solução">
                    <article className="solution__card">
                        <span className="solution__card-icon" aria-hidden="true">01</span>
                        <h3>Monitoramento das linhas</h3>
                        <p>Acompanhe horários, atrasos, interrupções e rotas disponíveis para decidir o melhor caminho antes de sair.</p>
                    </article>
                    <article className="solution__card">
                        <span className="solution__card-icon" aria-hidden="true">02</span>
                        <h3>Informações de lotação</h3>
                        <p>Visualize dados de movimentação para escolher viagens mais confortáveis e organizar melhor a rotina.</p>
                    </article>
                    <article className="solution__card">
                        <span className="solution__card-icon" aria-hidden="true">03</span>
                        <h3>Pontos em passagens</h3>
                        <p>Converta pontos acumulados na plataforma em passagens de trem, conectando benefícios digitais à mobilidade real.</p>
                    </article>
                </div>
            </section>
        </main>
    )
}