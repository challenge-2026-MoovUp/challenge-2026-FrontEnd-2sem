import { Link } from "react-router-dom"

interface SolutionOverviewProps {
    isActive: boolean
}

const sectionTagClass = "inline-flex w-fit items-center self-start rounded-[30px] border border-border bg-aurora-glow px-[10px] py-[3px] font-sans font-medium uppercase tracking-[0.15em] text-aurora-soft"
const journeyTitleClass = "bg-gradiente-mist bg-clip-text text-[2rem] font-light text-transparent"
const journeySubtitleClass = "font-sans text-[1.5rem] font-thin text-dust"
const gridCardClass = "w-full rounded-[20px] border border-border bg-dusk p-[25px]"
const btnBaseClass = "flex h-[50px] w-[300px] items-center justify-center whitespace-nowrap rounded-full border text-center font-sans text-[1.3rem] font-normal uppercase tracking-[0.06em] no-underline"

export default function SolutionOverview({ isActive }: SolutionOverviewProps) {
    return (
        <div className={isActive ? "flex justify-start gap-10" : "hidden"} id="container-1">
            <div className="flex min-w-0 flex-1 flex-col justify-start">
                <div className="mb-[60px] flex flex-col gap-5">
                    <p className={`${sectionTagClass} text-[1.3rem]`}>O DESAFIO</p>
                    <h2 className="max-w-[400px] bg-gradiente-mist bg-clip-text text-[4rem] font-light text-transparent">De interação digital <span className="bg-gradiente-aurora bg-clip-text italic text-transparent">a mobilidade real</span></h2>
                    <p className="font-sans text-[1.3rem] font-thin tracking-[0.1em] text-dust">Milhões de brasileiros gastam uma fatia significativa do salário em transporte público. A MoovUp propõe uma troca justa: seu tempo e engajamento online valem passagens de verdade.</p>
                </div>
                <article>
                    <div className="flex gap-5">
                        <p className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-dusk text-[2rem] font-extralight leading-none text-aurora-soft">1</p>
                        <p className="text-[3rem]">💬</p>
                    </div>
                    <div className="mb-10 ml-[18px] flex flex-col gap-[10px] border-l border-border pl-10">
                        <h3 className={journeyTitleClass}>Interaja na plataforma</h3>
                        <h3 className={journeySubtitleClass}>Cada curtida, post, comentário e compartilhamento gera pontos automaticamente. Desafios semanais oferecem bônus e multiplicadores que aceleram muito o acúmulo.</h3>
                        <h3 className={`${sectionTagClass} text-[1rem]`}>+15 a +200 pts por ação</h3>
                    </div>
                </article>
                <article>
                    <div className="flex gap-5">
                        <p className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-dusk text-[2rem] font-extralight leading-none text-aurora-soft">2</p>
                        <p className="text-[3rem]">⭐️</p>
                    </div>
                    <div className="mb-10 ml-[18px] flex flex-col gap-[10px] border-l border-border pl-10">
                        <h3 className={journeyTitleClass}>Acumule na carteira digital</h3>
                        <h3 className={journeySubtitleClass}>Seu saldo cresce em tempo real e fica disponível na carteira MoovUp. Os pontos têm validade de 12 meses a partir da última movimentação — sem perder o que você ganhou.</h3>
                        <h3 className={`${sectionTagClass} text-[1rem]`}>mínimo: 400 pts para resgatar</h3>
                    </div>
                </article>
                <article>
                    <div className="flex gap-5">
                        <p className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-dusk text-[2rem] font-extralight leading-none text-aurora-soft">3</p>
                        <p className="text-[3rem]">🎫</p>
                    </div>
                    <div className="mb-10 ml-[18px] flex flex-col gap-[10px] border-l border-border pl-10">
                        <h3 className={journeyTitleClass}>Resgate a passagem</h3>
                        <h3 className={journeySubtitleClass}>Seu saldo cresce em tempo real e fica disponível na carteira MoovUp. Os pontos têm validade de 12 meses a partir da última movimentação — sem perder o que você ganhou.</h3>
                        <h3 className={`${sectionTagClass} text-[1rem]`}>Bilhete Único · top · QR Code</h3>
                    </div>
                </article>
                <article>
                    <div className="flex gap-5">
                        <p className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-dusk text-[2rem] font-extralight leading-none text-aurora-soft">4</p>
                        <p className="text-[3rem]">🚇</p>
                    </div>
                    <div className="mb-10 ml-[18px] flex flex-col gap-[10px] border-l border-border pl-10">
                        <h3 className={journeyTitleClass}>Embarque em até 24 horas</h3>
                        <p className={journeySubtitleClass}>O crédito aparece na conta de transporte em até 24 horas úteis. Compatível com metrô, CPTM, ônibus municipais e linhas intermunicipais parceiras.</p>
                        <p className={`${sectionTagClass} text-[1rem]`}>zero taxas de conversão</p>
                    </div>
                </article>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-5">
                {/* Indicadores e argumentos de valor da solucao */}
                <div className="w-full">
                    <div className="grid w-full grid-cols-2 gap-3">
                        <div className={gridCardClass}>
                            <h3 className="text-[4rem] font-thin text-mist">850M</h3>
                            <p className="font-sans text-[1.2rem] text-dust">Pontos distribuídos até hoje</p>
                        </div>
                        <div className={gridCardClass}>
                            <h3 className="text-[4rem] font-thin text-mist">R$4.2M</h3>
                            <p className="font-sans text-[1.2rem] text-dust">Em passagens resgatadas</p>
                        </div>
                        <div className={gridCardClass}>
                            <h3 className="text-[4rem] font-thin text-mist">2M+</h3>
                            <p className="font-sans text-[1.2rem] text-dust">Usuários ativos na plataforma</p>
                        </div>
                        <div className={gridCardClass}>
                            <h3 className="text-[4rem] font-thin text-mist">98%</h3>
                            <p className="font-sans text-[1.2rem] text-dust">Satisfação dos usuários</p>
                        </div>
                    </div>
                </div>

                <div className={gridCardClass}>
                    <h3 className="mb-5 text-[2rem] font-light text-mist">Por que transporte público?</h3>
                    <p className="font-sans text-[1.5rem] font-light text-dust">Mobilidade urbana é uma das maiores despesas fixas de trabalhadores brasileiros — uma passagem simples já representa um impacto real no orçamento mensal. Ao transformar interações digitais em passagens reais, a MoovUp cria valor concreto, não apenas recompensas simbólicas.</p>
                    <br />
                    <br />
                    <p className="font-sans text-[1.5rem] font-light text-dust">Além disso, o transporte público é mais sustentável, reduz o trânsito e conecta pessoas às oportunidades. Recompensar quem usa transporte coletivo é também um ato de incentivo ao bem comum.</p>
                </div>

                {/* Cartoes com modais de transporte parceiros */}
                <div className="flex flex-col gap-[14px]">
                    <p className="font-sans text-[1.1rem] font-medium tracking-[0.28em] text-dust">MODAIS PARCEIROS</p>
                    <div className="grid grid-cols-2 gap-[10px]">
                        <div className="flex min-h-[68px] items-center gap-[14px] rounded-[14px] border border-border bg-dusk px-[18px] py-[14px] transition-[border-color,transform,background-color,box-shadow] duration-[650ms] ease-in-out hover:-translate-y-[3px] hover:border-aurora-soft hover:bg-dusk-mid hover:shadow-[0_18px_42px_var(--color-aurora-18)]">
                            <span className="text-[2rem] leading-none">🚇</span>
                            <div>
                                <h3 className="text-[1.7rem] font-light leading-[1.1] text-mist">Metrô</h3>
                                <p className="mt-1 font-sans text-[1.2rem] font-light text-dust">Linhas 1–5 · SP</p>
                            </div>
                        </div>
                        <div className="flex min-h-[68px] items-center gap-[14px] rounded-[14px] border border-border bg-dusk px-[18px] py-[14px] transition-[border-color,transform,background-color,box-shadow] duration-[650ms] ease-in-out hover:-translate-y-[3px] hover:border-aurora-soft hover:bg-dusk-mid hover:shadow-[0_18px_42px_var(--color-aurora-18)]">
                            <span className="text-[2rem] leading-none">🚆</span>
                            <div>
                                <h3 className="text-[1.7rem] font-light leading-[1.1] text-mist">CPTM</h3>
                                <p className="mt-1 font-sans text-[1.2rem] font-light text-dust">Linhas 7–13</p>
                            </div>
                        </div>
                        <div className="col-span-2 flex min-h-[68px] items-center gap-[14px] rounded-[14px] border border-border bg-dusk px-[18px] py-[14px] transition-[border-color,transform,background-color,box-shadow] duration-[650ms] ease-in-out hover:-translate-y-[3px] hover:border-aurora-soft hover:bg-dusk-mid hover:shadow-[0_18px_42px_var(--color-aurora-18)]">
                            <span className="text-[2rem] leading-none">🚌</span>
                            <div>
                                <h3 className="text-[1.7rem] font-light leading-[1.1] text-mist">Ônibus</h3>
                                <p className="mt-1 font-sans text-[1.2rem] font-light text-dust">SPTrans + municipais</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card de direcionamento para pitch e participantes */}
                <div className="flex h-[300px] flex-col justify-between rounded-[30px] border-2 border-border p-[30px] [transition:all_.5s] hover:scale-[1.01] hover:bg-dusk">
                    <h3 className="text-center text-[2.5rem] font-extralight text-mist">E nós da <span className="text-[2.8rem] italic font-medium">MoovUp</span>, gostaríamos de apresentar um breve vídeo, resumindo nossa <span className="text-[2.8rem] italic font-medium">solução</span></h3>
                    <div className="flex flex-col items-center gap-5">
                        <Link to="/solucao#solution-pitch-title" className={`${btnBaseClass} border-aurora-30 bg-transparent text-aurora-soft transition-all duration-200 hover:cursor-pointer hover:border-violet-glow-50 hover:bg-violet-glow-08 hover:shadow-[0_0_20px_var(--color-violet-glow-08),inset_0_0_20px_var(--color-violet-glow-03)]`}>ir para o vídeo</Link>
                        <Link to="/quem-somos#creators-goto" className={`${btnBaseClass} border-border-mid bg-gradiente-aurora text-mist [transition:border-color_.25s_ease,box-shadow_.25s_ease,filter_.25s_ease,transform_.25s_ease] hover:cursor-pointer hover:-translate-y-[3px] hover:border-border hover:bg-violet-glow-08 hover:shadow-[0_12px_28px_var(--color-aurora-glow),0_0_18px_var(--color-ember-16)] hover:[filter:saturate(1.12)_brightness(1.04)]`}>conheça os participantes</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
