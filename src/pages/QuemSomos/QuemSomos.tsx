import HeroImage from '../../assets/hero-image.png'
import { useNavigate } from 'react-router-dom'
import { creators } from '../../data/creators'
import GitHubImg from '../../assets/github.png'
import LinkedInImg from '../../assets/linkedin.png'
import type { Creator } from '../../types/team'
import Logo from '../../assets/moov-up-icon.png'
import { useState } from 'react'
import Button from '../../components/common/Button'
import TeamPopup from '../../components/common/TeamPopup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faPiggyBank, faBus, faCircleUser, faLeaf, faCoins, faTicket, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const sectionTagClass = "inline-flex items-center rounded-[30px] font-sans text-[1.6rem] font-light italic text-aurora-soft before:mr-2 before:inline-block before:h-[6px] before:w-[6px] before:rounded-full before:bg-aurora before:align-middle before:content-[''] before:animate-[breathe_3s_ease-in-out_infinite]"

const solutionSteps = [
    { icon: faStar, number: '1', title: 'Interaja', subtitle: 'Participe de ações e campanhas sustentáveis na plataforma.' },
    { icon: faPiggyBank, number: '2', title: 'Acumule pontos', subtitle: 'Ganhe pontos a cada interação válida realizada.' },
    { icon: faBus, number: '3', title: 'Resgate passagens', subtitle: 'Converta seus pontos em passagens de transporte público.' },
]

const solutionCards = [
    { icon: faCircleUser, title: 'Cadastro simples e seguro', subtitle: 'Crie sua conta na MoovUp em poucos passos e comece a participar.' },
    { icon: faLeaf, title: 'Ações que geram impacto', subtitle: 'Realize interações sustentáveis, responda pesquisas, compartilhe conteúdos e mais.' },
    { icon: faCoins, title: 'Pontos que têm valor', subtitle: 'Cada ação concluída gera pontos que se acumulam no seu saldo.' },
    { icon: faTicket, title: 'Conversão para passagens', subtitle: 'Troque seus pontos por passagens de ônibus, metrô e trem de forma rápida e prática.' },
    { icon: faCircleCheck, title: 'Mobilidade que transforma', subtitle: 'Mais do que se deslocar: é sobre criar um futuro mais acessível, sustentável e conectado.' },
]

const values = [
    { icon: '🎯', topic: 'Transparência total', subtitle: 'Cada ponto gerado é rastreável. Você sabe exatamente de onde vem cada recompensa e como foi calculada.' },
    { icon: '⚡️', topic: 'Impacto real', subtitle: 'Recompensas que fazem diferença no orçamento, como desconto em conta de energia elétrica e transporte público.' },
    { icon: '✦', topic: 'Comunidade em primeiro lugar', subtitle: 'Construímos para e com nossos usuários. Seu feedback molda cada nova funcionalidade lançada na plataforma.' },
]

export default function QuemSomos() {
    const [activeCreator, setActiveCreator] = useState<Creator | null>(null)

    function handleCardClick(creator: Creator, event: React.MouseEvent) {
        if ((event.target as HTMLElement).closest('a')) return
        setActiveCreator(creator)
    }

    function handleCardKeyDown(creator: Creator, event: React.KeyboardEvent) {
        if ((event.target as HTMLElement).closest('a')) return
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setActiveCreator(creator)
        }
    }

    const navigate = useNavigate()

    return (
        <>
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
                <span className="absolute -right-[180px] top-[120px] h-[620px] w-[520px] animate-[orbFloat_24s_ease-in-out_infinite_alternate] rounded-full opacity-[.38] blur-[110px] [background:radial-gradient(circle,var(--color-sage)_0%,transparent_72%)]" />
                <span className="absolute -left-[140px] bottom-[26%] h-[180px] w-[520px] animate-[orbFloat_24s_ease-in-out_infinite_alternate] rounded-full opacity-[.38] blur-[110px] [background:radial-gradient(circle,var(--color-ember-soft)_0%,transparent_78%)]" />
            </div>
            <section>
                <div className="my-4 flex min-h-0 flex-col items-center justify-between gap-10 mx-6 px-4 py-8 tablet:mx-16 tablet:flex-row tablet:gap-0 tablet:px-6 tablet:py-4 desktop:min-h-screen">
                    <div className="flex w-full max-w-[900px] flex-col items-center px-4 text-center">
                        <p className={sectionTagClass}>Nossa História</p>
                        <h1 className="mb-[8px] w-full text-[2.6rem] font-light leading-[1.08] text-mist tablet:w-4/5 tablet:text-[4rem] desktop:text-[6rem]">Somos movidos por ideias que <span className="bg-gradiente-aurora bg-clip-text italic text-transparent">transformam</span> o digital em <span className="bg-gradiente-aurora bg-clip-text italic text-transparent">impacto real.</span></h1>
                        <p className="mt-[6px] max-w-[720px] font-sans text-[1.3rem] font-light text-mist-dim tablet:text-[1.5rem]">A MoovUp nasceu de uma paixão em comum: usar a tecnologia e a criatividade para gerar benefícios reais para pessoas e para o planeta.</p>
                        <p className="mt-[6px] max-w-[720px] font-sans text-[1.3rem] font-light text-mist-dim tablet:text-[1.5rem]">Conheça os 4 criadores que estão por trás dessa jornada.</p>
                    </div>
                    <div className="relative z-[1] flex w-full flex-col items-center justify-center overflow-visible rounded-[30px] border border-border-mid px-6 py-10 text-center shadow-[0_24px_70px_var(--color-black-22)] tablet:flex-[0_0_min(520px,42vw)] tablet:px-16 tablet:py-24">
                        <img src={HeroImage} alt="Imagem de fundo pro Hero" className="absolute inset-0 z-0 h-full w-full rounded-[30px] object-cover opacity-95" />
                        <img src={Logo} alt="Icone MoovUp" className="relative z-[1] w-full max-w-[180px]" />
                        <h2 className="relative z-[1] mt-6 text-[3.7rem] font-light leading-none text-mist">MoovUp</h2>
                        <p className="relative z-[1] mt-4 max-w-[260px] font-sans text-[1.5rem] font-light leading-[1.4] text-mist-dim">Transforme seu tempo em descontos e recompensas</p>
                    </div>
                </div>
            </section>
            <div className="mx-6 mb-10 mt-16 scroll-mt-[120px] tablet:mx-20 tablet:mb-20 tablet:mt-24 desktop:mx-60 desktop:mt-40" id="creators-goto">
                <p className={sectionTagClass}>NOSSOS CRIADORES</p>
            </div>

            <div className="mx-auto mb-16 grid w-full max-w-[1100px] grid-cols-1 gap-0 overflow-hidden rounded-[30px] border border-border bg-dusk tablet:mb-24 tablet:grid-cols-2 desktop:mb-40 desktop:grid-cols-4">
                {creators.map((creator, index) => (
                    <div
                        key={creator.id}
                        className={`box-border flex min-h-[420px] w-full flex-col items-center justify-start border-border px-6 py-10 hover:cursor-pointer hover:border-l-transparent tablet:px-8 tablet:py-16 border-l-0 ${index % 2 === 0 ? 'tablet:border-l-0' : 'tablet:border-l'} ${index % 4 === 0 ? 'desktop:border-l-0' : 'desktop:border-l'}`}
                        role="button"
                        tabIndex={0}
                        aria-haspopup="dialog"
                        onClick={(e) => handleCardClick(creator, e)}
                        onKeyDown={(e) => handleCardKeyDown(creator, e)}
                    >
                        <img
                            src={creator.photo}
                            alt={`Foto de ${creator.name}`}
                            className="h-[200px] w-[200px] rounded-2xl border-2 border-border object-cover p-[8px]"
                        />
                        <p className="font-sans text-[1.3rem] font-extralight text-aurora">{creator.rm}</p>
                        <div className="flex w-full flex-1 flex-col items-center pt-[40px]">
                            <h3 className="min-h-[4.8rem] px-[4px] pb-[4px] pt-[8px] text-[2rem] font-thin leading-[1.2] text-mist">{creator.name}</h3>
                            <p className="min-h-[2.9rem] py-[4px] font-sans text-[1.5rem] font-normal text-aurora">{creator.class}</p>
                            <div className="flex flex-1 flex-col gap-[10px] pb-[20px] text-left text-[1.3rem] font-light leading-[1.35] text-mist-dim">
                                <p className="font-sans">{creator.bio[0].slice(0, 140)}...</p>
                            </div>
                            <div className="mt-auto flex items-center justify-center gap-[10px]">
                                <a href={creator.github} target="_blank" rel="noopener noreferrer" className="group rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aurora-soft">
                                    <img src={GitHubImg} alt="Github icon" className="w-[80px] rounded-full p-[6px] [filter:saturate(0.8)] transition-[background-color,filter,transform] duration-[250ms] ease-in-out group-hover:-translate-y-[3px] group-hover:scale-[1.06] group-hover:bg-aurora-glow group-hover:[filter:saturate(1.15)] group-focus-visible:-translate-y-[3px] group-focus-visible:scale-[1.06] group-focus-visible:bg-aurora-glow group-focus-visible:[filter:saturate(1.15)]" />
                                </a>
                                <a href={creator.linkedin} target="_blank" rel="noopener noreferrer" className="group rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aurora-soft">
                                    <img src={LinkedInImg} alt="Linkedin icon" className="w-[80px] rounded-full p-[6px] [filter:saturate(0.8)] transition-[background-color,filter,transform] duration-[250ms] ease-in-out group-hover:-translate-y-[3px] group-hover:scale-[1.06] group-hover:bg-aurora-glow group-hover:[filter:saturate(1.15)] group-focus-visible:-translate-y-[3px] group-focus-visible:scale-[1.06] group-focus-visible:bg-aurora-glow group-focus-visible:[filter:saturate(1.15)]" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <TeamPopup creator={activeCreator} onClose={() => setActiveCreator(null)}></TeamPopup>

            <section className="mb-16 tablet:mb-24 desktop:mb-32">
                <div className="mx-auto flex w-full max-w-[1200px] flex-col items-stretch justify-center gap-[28px] px-6 tablet:flex-row tablet:px-12">
                    <div className="flex w-full min-w-0 max-w-full flex-1 flex-col gap-[16px] rounded-[40px] bg-dusk p-6 tablet:max-w-[560px] tablet:p-[30px]">
                        <div className="pb-[28px]">
                            <p className={sectionTagClass}>NOSSA MISSÃO</p>
                            <h2 className="mb-[1.2rem] w-full text-[2rem] font-light leading-[1.08] text-mist tablet:w-4/5 tablet:text-[2.6rem] desktop:text-[3.1rem]">Transformamos pontos em <span className="bg-gradiente-aurora bg-clip-text italic text-transparent">mobilidade.</span></h2>
                            <p className="max-w-[720px] font-sans text-[1.2rem] font-extralight text-mist-dim tablet:text-[1.35rem]">A MoovUp permite que usuários convertam os pontos acumulados por interações sustentáveis em passagens de transporte público, incentivando escolhas conscientes e facilitando o acesso à mobilidade urbana.</p>
                        </div>

                        <div className="flex flex-col items-start justify-between gap-[14px] border-t border-border pt-[24px] tablet:flex-row">
                            {solutionSteps.map((step) => (
                                <div key={step.number} className="flex w-full min-w-0 flex-1 flex-col items-center text-center">
                                    <span className="mb-4 inline-flex h-[64px] w-[64px] items-center justify-center rounded-full border border-aurora-glow bg-aurora-glow text-[2.2rem] text-aurora-soft">
                                        <FontAwesomeIcon icon={step.icon} />
                                    </span>
                                    <h3 className="mb-[0.8rem] font-sans text-[3rem] font-normal leading-none text-mist">{step.number}</h3>
                                    <h4 className="mb-[0.8rem] min-h-[3.75rem] text-[1.7rem] leading-[1.1] text-aurora">{step.title}</h4>
                                    <p className="text-[1.6rem] font-thin leading-[1.35] text-mist-dim">{step.subtitle}</p>
                                </div>
                            ))}
                        </div>
                        <Button
                            variant="cta-primary"
                            className="mt-14 self-start after:ml-3 after:content-['→']"
                            onClick={() => navigate('/sobre')}
                        >CONHEÇA NOSSA SOLUÇÃO</Button>
                    </div>
                    <div className="flex w-full min-w-0 max-w-full flex-1 flex-col gap-[16px] rounded-[40px] bg-dusk p-6 tablet:max-w-[560px] tablet:p-[30px]">
                        <p className={sectionTagClass}>COMO FUNCIONA</p>
                        <div className="flex flex-1 flex-col justify-between gap-[16px]">
                            {solutionCards.map((card) => (
                                <div key={card.title} className="flex flex-1 items-center justify-start gap-[18px] rounded-3xl bg-dusk-mid p-5">
                                    <span className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-aurora-glow bg-dusk-mid text-[2.2rem] text-aurora">
                                        <FontAwesomeIcon icon={card.icon} />
                                    </span>
                                    <div>
                                        <h3 className="text-[1.75rem] font-extralight leading-[1.15] text-mist">{card.title}</h3>
                                        <p className="text-[1.2rem] leading-[1.35] text-mist-dim">{card.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            <section>
                <div className="mx-auto my-20 w-full max-w-[1200px] px-6 tablet:my-32 tablet:px-16 desktop:my-56">
                    <div className="mb-16 pt-[30px]">
                        <p className={`${sectionTagClass} border-2 border-aurora-glow bg-[var(--color-roxo-mais-opaco)] px-[20px] py-[5px]`}>NOSSOS VALORES</p>
                        <h2 className="mb-[8px] w-full text-[2.6rem] font-light leading-[1.08] text-mist tablet:w-4/5 tablet:text-[4rem] desktop:text-[6rem]">O que nos <span className="bg-gradiente-aurora bg-clip-text italic text-transparent">move</span></h2>
                    </div>
                    <div className="grid grid-cols-1 justify-center gap-[20px] tablet:grid-cols-3">
                        {values.map((value) => (
                            <div key={value.topic} className="w-full min-w-0 rounded-[10px] border border-border bg-void p-6 font-bold text-mist transition-[background-color,border-color,box-shadow,transform] duration-500 ease-in-out hover:bg-aurora-glow tablet:p-12">
                                <p className="mb-4 inline-block rounded-[16px] border border-border bg-aurora-glow px-5 py-4 text-[56px] leading-none">{value.icon}</p>
                                <h3 className="pb-[30px] font-serif text-[2.3rem] font-thin">{value.topic}</h3>
                                <p className="font-sans text-[1.5rem] font-extralight text-mist-dim">{value.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
