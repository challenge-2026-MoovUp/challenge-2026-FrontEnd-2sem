import { useState } from "react"
import { solutionTabs } from "../../data/solutionTabs"
import SolutionOverview from "../../components/sobre/SolutionOverview"
import SolutionPassType from "../../components/sobre/SolutionPassType"
import SolutionInfo from "../../components/sobre/SolutionInfo"
import Foot from "../../components/common/Foot"

export default function Sobre() {

    const [activeTab, setActiveTab] = useState<string>(solutionTabs[0].id)

    return (
        <div className="page__sobre">
            <div className="ambient" aria-hidden="true">
                <span className="orb orb-1" />
                <span className="orb orb-2" />
            </div>
            <section className="hero">
                <div className="container__hero">
                    <div className="container__hero-top">
                        <p className="section-tag">NOSSA SOLUÇÃO</p>
                        <h1 className="title">Pontos que viram <span>passagens</span></h1>
                    </div>
                    <div className="container__hero-bottom">
                        <p className="subtitle">Transformamos cada curtida, post e comentário em pontos que se convertem diretamente em passagens de metrô, trem e ônibus. Mobilidade urbana acessível a partir das suas interações digitais.</p>
                        <div className="hero__about">
                            <h2 className="about__num">400+</h2>
                            <p className="about__description">PTS P/ EMBARCAR</p>
                        </div>
                        <div className="hero__about">
                            <h2 className="about__num">3</h2>
                            <p className="about__description">MODAIS PARCEIROS</p>
                        </div>
                        <div className="hero__about">
                            <h2 className="about__num">24H</h2>
                            <p className="about__description">PARA CREDITAR</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section__nav">
                <div className="solution__nav">
                    <nav className="flex__nav">
                        {solutionTabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`nav sobre__nav-button ${activeTab === tab.id ? 'nav-active' : ''}`}
                                aria-controls={tab.id}
                                aria-selected={activeTab === tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id)
                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </section>

            <section className="section__main">
                <div className="container__main">
                    <SolutionOverview isActive={activeTab === 'container-1'} />
                    <SolutionPassType isActive={activeTab === 'container-2'} />
                    <SolutionInfo isActive={activeTab === 'container-3'} />
                </div>
            </section>

            <Foot ctaTo="/contato" btnStr="IR PARA CONTATO" />
        </div>
    )
}