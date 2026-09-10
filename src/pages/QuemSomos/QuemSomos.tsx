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
        <div className="page__info page__quemSomos">
            <div className="ambient" aria-hidden="true">
                <span className="orb orb-1" />
                <span className="orb orb-2" />
            </div>
            <section className="_hero">
                <div className="container__hero">
                    <div className="hero__content">
                        <p className="section-tag">Nossa História</p>
                        <h1 className="title">Somos movidos por ideias que <span>transformam</span> o digital em <span>impacto real.</span></h1>
                        <p className="subtitle">A MoovUp nasceu de uma paixão em comum: usar a tecnologia e a criatividade para gerar benefícios reais para pessoas e para o planeta.</p>
                        <p className="subtitle">Conheça os 4 criadores que estão por trás dessa jornada.</p>
                    </div>
                    <div className="hero__image">
                        <img src={HeroImage} alt="Imagem de fundo pro Hero" className="hero__bg" />
                        <img src={Logo} alt="Icone MoovUp" className="hero__logo" />
                        <h2 className="hero__title">MoovUp</h2>
                        <p className="hero__slogan">Transforme seu tempo em descontos e recompensas</p>
                    </div>
                </div>
            </section>
            <div className="info__details" id="creators-goto">
                <p className="section-tag">NOSSOS CRIADORES</p>
            </div>

            <div className="team__cards">
                {creators.map((creator) => (
                    <div
                        key={creator.id}
                        className={"stat__card stat__card--creators " + (creator.id === 'pedro' ? 'stat__card--pedro' : '')}
                        role="button"
                        tabIndex={0}
                        aria-haspopup="dialog"
                        onClick={(e) => handleCardClick(creator, e)}
                        onKeyDown={(e) => handleCardKeyDown(creator, e)}
                    >
                        <img
                            src={creator.photo}
                            alt={`Foto de ${creator.name}`}
                            className="team__icon team__icon--pedro"
                        />
                        <p className="description">{creator.rm}</p>
                        <div className="team__card-box">
                            <h3 className="team__card-label">{creator.name}</h3>
                            <p className="team__card-rm">{creator.class}</p>
                            <div className="team__card-about">
                                <p>{creator.bio[0].slice(0, 140)}...</p>
                            </div>
                            <div className="team__links">
                                <a href={creator.github} target="_blank" rel="noopener noreferrer">
                                    <img src={GitHubImg} alt="Github icon" className="team__link" />
                                </a>
                                <a href={creator.linkedin} target="_blank" rel="noopener noreferrer">
                                    <img src={LinkedInImg} alt="Linkedin icon" className="team__link" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <TeamPopup creator={activeCreator} onClose={() => setActiveCreator(null)}></TeamPopup>

            <section className="solution">
                <div className="container__solution">
                    <div className="solution__blocks">
                        <div className="solution__top">
                            <p className="section-tag">NOSSA MISSÃO</p>
                            <h2 className="title">Transformamos pontos em <span>mobilidade.</span></h2>
                            <p className="subtitle">A MoovUp permite que usuários convertam os pontos acumulados por interações sustentáveis em passagens de transporte público, incentivando escolhas conscientes e facilitando o acesso à mobilidade urbana.</p>
                        </div>

                        <div className="solution__bottom">
                            <div className="solution__step">
                                <span className="icon"><FontAwesomeIcon icon={faStar} /></span>
                                <h3 className="number">1</h3>
                                <h4 className="step__title">Interaja</h4>
                                <p className="step__subtitle">Participe de ações e campanhas sustentáveis na plataforma.</p>
                            </div>
                            <div className="solution__step">
                                <span className="icon"><FontAwesomeIcon icon={faPiggyBank} /></span>
                                <h3 className="number">2</h3>
                                <h4 className="step__title">Acumule pontos</h4>
                                <p className="step__subtitle">Ganhe pontos a cada interação válida realizada.</p>
                            </div>
                            <div className="solution__step">
                                <span className="icon"><FontAwesomeIcon icon={faBus} /></span>
                                <h3 className="number">3</h3>
                                <h4 className="step__title">Resgate passagens</h4>
                                <p className="step__subtitle">Converta seus pontos em passagens de transporte público.</p>
                            </div>
                        </div>
                        <Button variant="cta-primary" onClick={() => navigate('./Sobre.tsx')}>CONHEÇA NOSSA SOLUÇÃO</Button>
                    </div>
                    <div className="solution__blocks">
                        <p className="section-tag">COMO FUNCIONA</p>
                        <div className="solution__card">
                            <span className="icon"><FontAwesomeIcon icon={faCircleUser} /></span>
                            <div className="card__text">
                                <h3 className="text__title">Cadastro simples e seguro</h3>
                                <p className="text__subtitle">Crie sua conta na MoovUp em poucos passos e comece a participar.</p>
                            </div>
                        </div>
                        <div className="solution__card">
                            <span className="icon"><FontAwesomeIcon icon={faLeaf} /></span>
                            <div className="card__text">
                                <h3 className="text__title">Ações que geram impacto</h3>
                                <p className="text__subtitle">Realize interações sustentáveis, responda pesquisas, compartilhe conteúdos e mais.</p>
                            </div>
                        </div>
                        <div className="solution__card">
                            <span className="icon"><FontAwesomeIcon icon={faCoins} /></span>
                            <div className="card__text">
                                <h3 className="text__title">Pontos que têm valor</h3>
                                <p className="text__subtitle">Cada ação concluída gera pontos que se acumulam no seu saldo.</p>
                            </div>
                        </div>
                        <div className="solution__card">
                            <span className="icon"><FontAwesomeIcon icon={faTicket} /></span>
                            <div className="card__text">
                                <h3 className="text__title">Conversão para passagens</h3>
                                <p className="text__subtitle">Troque seus pontos por passagens de ônibus, metrô e trem de forma rápida e prática.</p>
                            </div>
                        </div>
                        <div className="solution__card">
                            <span className="icon"><FontAwesomeIcon icon={faCircleCheck} /></span>
                            <div className="card__text">
                                <h3 className="text__title">Mobilidade que transforma</h3>
                                <p className="text__subtitle">Mais do que se deslocar: é sobre criar um futuro mais acessível, sustentável e conectado.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="section__foot">
                <div className="container__foot">
                    <div className="title__foot">
                        <p className="section-tag">NOSSOS VALORES</p>
                        <h2 className="title">O que nos <span>move</span></h2>
                    </div>
                    <div className="foot__flex">
                        <div className="feature">
                            <p className="icon">🎯</p>
                            <h3 className="foot__topic">Transparência total</h3>
                            <p className="foot__subtitle">Cada ponto gerado é rastreável. Você sabe exatamente de onde vem cada recompensa e como foi calculada.</p>
                        </div>
                        <div className="feature">
                            <p className="icon">⚡️</p>
                            <h3 className="foot__topic">Impacto real</h3>
                            <p className="foot__subtitle">Recompensas que fazem diferença no orçamento, como desconto em conta de energia elétrica e transporte público.</p>
                        </div>
                        <div className="feature">
                            <p className="icon">✦</p>
                            <h3 className="foot__topic">Comunidade em primeiro lugar</h3>
                            <p className="foot__subtitle">Construímos para e com nossos usuários. Seu feedback molda cada nova funcionalidade lançada na plataforma.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}