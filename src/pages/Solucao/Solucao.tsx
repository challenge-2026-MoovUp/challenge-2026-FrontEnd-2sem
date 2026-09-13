import { useNavigate } from 'react-router-dom'
import MapaMoovUp from '../../assets/mapa-moovUp.jpg'
import Button from '../../components/common/Button'

const cardTitleClass = "bg-gradiente-mist bg-clip-text text-[2.4rem] font-extralight leading-[1.1] text-transparent"
const paragraphClass = "font-sans text-[1.45rem] font-light leading-[1.7] text-dust"

export default function Solucao() {
    const navigate = useNavigate()

    return (
        <section className="mx-auto mb-16 mt-[clamp(4rem,8vw,8rem)] grid w-full max-w-[1120px] gap-[28px] px-6 tablet:px-[3.2rem] desktop:mb-32" aria-labelledby="solution-title">
            <div className="grid grid-cols-1 gap-8 desktop:grid-cols-[minmax(0,1fr)_minmax(320px,0.78fr)] desktop:items-center desktop:gap-x-[4.4rem] desktop:gap-y-[2.8rem]">
                <div className="relative m-0 flex w-full flex-col items-start after:mt-[2.2rem] after:block after:h-[2px] after:w-[12rem] after:bg-gradiente-aurora after:content-[''] desktop:col-start-1 desktop:row-start-1">
                    <p className="mb-[2.2rem] inline-flex items-center font-sans text-[1.1rem] font-bold uppercase not-italic tracking-[0.32em] text-ember-soft">Mobilidade em tempo real</p>
                    <h2 id="solution-title" className="block max-w-[820px] bg-gradiente-aurora bg-clip-text text-[clamp(3rem,5vw,5.4rem)] font-thin italic leading-none text-transparent">Tecnologia para planejar, acompanhar e embarcar melhor</h2>
                </div>
                <div className="grid max-w-[900px] gap-[18px] desktop:col-start-1 desktop:row-start-2">
                    <p className={paragraphClass}>O sistema tem como objetivo monitorar linhas de trens e metrôs em tempo real, fornecendo informações como horários, atrasos, lotação, interrupções e rotas disponíveis para os usuários. Integrado ao projeto Moov-Up, a plataforma também permitirá a conversão de pontos acumulados em passagens de trem, tornando a experiência no transporte público mais prática, moderna e eficiente.</p>
                    <p className={paragraphClass}>Além disso, o sistema contará com uma interface intuitiva e acessível, facilitando o acompanhamento das viagens e o gerenciamento de benefícios pelos passageiros. A proposta do projeto é unir tecnologia e mobilidade urbana em uma única plataforma, oferecendo mais comodidade e organização para quem utiliza transporte público diariamente.</p>
                </div>
                <figure className="flex items-center justify-center self-stretch overflow-hidden rounded-[20px] border border-border-mid bg-[linear-gradient(145deg,var(--color-dusk-mid-88),var(--color-void-86)),var(--color-dusk)] shadow-[0_24px_70px_var(--color-black-26)] desktop:col-start-2 desktop:row-span-2 desktop:row-start-1">
                    <img src={MapaMoovUp} alt="Mapa de metrô da MoovUp" className="block h-auto max-h-full w-full object-contain" />
                </figure>
            </div>

            <section className="grid grid-cols-1 items-center gap-[14px] overflow-hidden rounded-[20px] border border-border bg-[linear-gradient(145deg,var(--color-dusk-mid-88),var(--color-void-86)),var(--color-dusk)] p-5 shadow-[0_24px_70px_var(--color-black-26)] tablet:p-[30px] desktop:grid-cols-[minmax(0,0.72fr)_minmax(320px,1fr)] desktop:gap-[26px]" aria-labelledby="solution-pitch-title">
                <div className="grid gap-[14px]">
                    <p className="font-sans text-[1.1rem] font-semibold uppercase tracking-[0.18em] text-aurora-soft">Pitch MoovUp</p>
                    <h3 id="solution-pitch-title" className={cardTitleClass}>Conheça a proposta em vídeo</h3>
                    <p className={paragraphClass}>Uma apresentação rápida da MoovUp, conectando tecnologia, mobilidade urbana e benefícios reais para quem usa transporte público.</p>
                </div>
                <div className="flex items-center justify-center">
                    <Button
                        variant="cta-primary"
                        className="!m-0"
                        onClick={() => navigate('/solucao/video/pitch-moovup')}
                    >
                        Assistir vídeo
                    </Button>
                </div>
            </section>

            <div className="grid gap-[14px] rounded-[20px] border border-border bg-dusk p-5 tablet:p-[30px]">
                <p className="font-sans text-[1.1rem] font-semibold uppercase tracking-[0.18em] text-aurora-soft">Atualizações importantes</p>
                <h3 className={cardTitleClass}>Mais controle durante toda a viagem</h3>
                <p className={paragraphClass}>Com a MoovUp, os usuários poderão planejar melhor seus trajetos, economizar tempo e acompanhar mudanças das linhas em tempo real, garantindo mais segurança, praticidade e eficiência durante seus deslocamentos.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3" aria-label="Principais recursos da solução">
                <article className="flex min-h-[160px] flex-col gap-[14px] rounded-xl border border-border bg-void p-5 tablet:min-h-[260px] tablet:p-7 transition-[background-color,border-color,transform] duration-300 ease-in-out hover:-translate-y-1 hover:border-border-mid hover:bg-aurora-glow">
                    <span className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-border font-sans text-[1.3rem] text-aurora-soft" aria-hidden="true">01</span>
                    <h3 className={cardTitleClass}>Monitoramento das linhas</h3>
                    <p className={paragraphClass}>Acompanhe horários, atrasos, interrupções e rotas disponíveis para decidir o melhor caminho antes de sair.</p>
                </article>
                <article className="flex min-h-[160px] flex-col gap-[14px] rounded-xl border border-border bg-void p-5 tablet:min-h-[260px] tablet:p-7 transition-[background-color,border-color,transform] duration-300 ease-in-out hover:-translate-y-1 hover:border-border-mid hover:bg-aurora-glow">
                    <span className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-border font-sans text-[1.3rem] text-aurora-soft" aria-hidden="true">02</span>
                    <h3 className={cardTitleClass}>Informações de lotação</h3>
                    <p className={paragraphClass}>Visualize dados de movimentação para escolher viagens mais confortáveis e organizar melhor a rotina.</p>
                </article>
                <article className="flex min-h-[160px] flex-col gap-[14px] rounded-xl border border-border bg-void p-5 tablet:min-h-[260px] tablet:p-7 transition-[background-color,border-color,transform] duration-300 ease-in-out hover:-translate-y-1 hover:border-border-mid hover:bg-aurora-glow">
                    <span className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-border font-sans text-[1.3rem] text-aurora-soft" aria-hidden="true">03</span>
                    <h3 className={cardTitleClass}>Pontos em passagens</h3>
                    <p className={paragraphClass}>Converta pontos acumulados na plataforma em passagens de trem, conectando benefícios digitais à mobilidade real.</p>
                </article>
            </div>
        </section>
    )
}