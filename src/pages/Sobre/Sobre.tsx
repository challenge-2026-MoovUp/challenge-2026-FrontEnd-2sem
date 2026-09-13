import { useState } from "react"
import { solutionTabs } from "../../data/solutionTabs"
import SolutionOverview from "../../components/sobre/SolutionOverview"
import SolutionPassType from "../../components/sobre/SolutionPassType"
import SolutionInfo from "../../components/sobre/SolutionInfo"
import Foot from "../../components/common/Foot"

export default function Sobre() {

    const [activeTab, setActiveTab] = useState<string>(solutionTabs[0].id)

    return (
        <>
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
                <span className="absolute -left-[180px] top-[120px] h-[620px] w-[520px] animate-[orbFloat_24s_ease-in-out_infinite_alternate] rounded-full opacity-[.34] blur-[110px] [background:radial-gradient(circle,var(--color-aurora)_0%,transparent_72%)]" />
                <span className="absolute -right-[160px] bottom-[10%] h-[220px] w-[540px] animate-[orbFloat_24s_ease-in-out_infinite_alternate] rounded-full opacity-[.34] blur-[110px] [background:radial-gradient(circle,var(--color-ember)_0%,transparent_76%)]" />
            </div>
            <section className="pt-32 px-[2.4rem]">
                <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-12 text-mist">
                    <div className="border-b-2 border-border pb-16">
                        <p className="inline-flex items-center font-sans text-[1.6rem] font-normal not-italic text-ember before:mr-2 before:inline-block before:h-[6px] before:w-[6px] before:animate-[breathe_3s_ease-in-out_infinite] before:rounded-full before:bg-ember before:align-middle before:content-['']">NOSSA SOLUÇÃO</p>
                        <h1 className="w-full max-w-[780px] bg-gradiente-mist bg-clip-text text-[clamp(5rem,8vw,9rem)] font-light leading-[0.95] text-transparent">Pontos que viram <span className="bg-gradiente-aurora bg-clip-text italic text-transparent">passagens</span></h1>
                    </div>
                    <div className="grid grid-cols-[minmax(320px,2fr)_repeat(3,minmax(120px,1fr))] items-center gap-8 pb-[30px]">
                        <p className="w-full max-w-[520px] font-sans text-[1.5rem] leading-[1.7] text-dust">Transformamos cada curtida, post e comentário em pontos que se convertem diretamente em passagens de metrô, trem e ônibus. Mobilidade urbana acessível a partir das suas interações digitais.</p>
                        <div className="flex flex-col items-center text-center">
                            <h2 className="bg-gradiente-mist bg-clip-text text-[4rem] font-extralight text-transparent">400+</h2>
                            <p className="font-sans text-dust">PTS P/ EMBARCAR</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <h2 className="bg-gradiente-mist bg-clip-text text-[4rem] font-extralight text-transparent">3</h2>
                            <p className="font-sans text-dust">MODAIS PARCEIROS</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <h2 className="bg-gradiente-mist bg-clip-text text-[4rem] font-extralight text-transparent">24H</h2>
                            <p className="font-sans text-dust">PARA CREDITAR</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-32 pt-8 px-[2.4rem]">
                <div className="relative mx-auto w-full max-w-[1120px] border-b-2 border-border pb-5">
                    <nav className="flex w-fit flex-wrap gap-8">
                        {solutionTabs.map((tab) => {
                            const isActive = activeTab === tab.id
                            return (
                                <button
                                    key={tab.id}
                                    className={`relative inline-flex border-none bg-transparent font-sans text-[1.2rem] font-normal transition-all duration-200 hover:cursor-pointer ${
                                        isActive
                                            ? "text-aurora-soft after:absolute after:-bottom-[22px] after:left-0 after:h-[2px] after:w-full after:origin-left after:animate-[navBorderGrow_.25s_ease_forwards] after:bg-aurora-soft after:content-['']"
                                            : 'text-mist hover:text-dust'
                                    }`}
                                    aria-controls={tab.id}
                                    aria-selected={isActive}
                                    onClick={() => {
                                        setActiveTab(tab.id)
                                        window.scrollTo({ top: 0, behavior: 'smooth' })
                                    }}
                                >
                                    {tab.label}
                                </button>
                            )
                        })}
                    </nav>
                </div>
            </section>

            <section className="pb-32 pt-8 px-[2.4rem]">
                <div className="mx-auto w-full max-w-[1120px]">
                    <SolutionOverview isActive={activeTab === 'container-1'} />
                    <SolutionPassType isActive={activeTab === 'container-2'} />
                    <SolutionInfo isActive={activeTab === 'container-3'} />
                </div>
            </section>

            <Foot ctaTo="/contato" btnStr="IR PARA CONTATO" />
        </>
    )
}