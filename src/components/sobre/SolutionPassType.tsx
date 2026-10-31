import { redeemCards, redeemOptions } from '../../data/points'

interface solutionPassProps{
    isActive: boolean
}

const sectionTagClass = "inline-flex w-fit items-center self-start rounded-[30px] border border-border bg-aurora-glow px-[10px] py-[3px] font-sans font-medium uppercase tracking-[0.15em] text-aurora-soft"
const cardClass = "group relative grid w-full max-w-[1120px] min-h-[124px] grid-cols-[40px_minmax(0,1fr)_72px] items-center gap-x-3 overflow-hidden rounded-[20px] border border-border-mid bg-dusk px-3 py-5 transition-[background-color,border-color,transform] duration-300 ease-in-out hover:translate-x-1 hover:border-aurora-30 hover:bg-dusk-mid-80 before:absolute before:inset-y-0 before:left-0 before:w-[2px] before:bg-gradiente-aurora before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] hover:before:opacity-100 tablet:grid-cols-[56px_minmax(0,1fr)_96px] tablet:gap-x-[22px] tablet:px-6"
const iconClass = "inline-flex min-h-[36px] min-w-[36px] items-center justify-center self-center rounded-[10px] border border-border bg-aurora-glow text-[1.8rem] tablet:min-h-[50px] tablet:min-w-[50px] tablet:text-[2.8rem]"

export default function SolutionPassType( {isActive}: solutionPassProps ) {
    return(
        <div className={isActive ? "block" : "hidden"} id="container-2">
            <div className="flex w-full flex-col gap-5 tablet:w-1/2 tablet:gap-[30px]">
                <p className={`${sectionTagClass} text-[1.3rem]`}>tipos de passagem</p>
                <h2 className="max-w-[400px] bg-gradiente-mist bg-clip-text text-[2.4rem] font-light text-transparent tablet:text-[3.2rem] desktop:text-[4rem]">Escolha o modal <span className="bg-gradiente-aurora bg-clip-text italic text-transparent">ideal para você</span></h2>
                <p className="font-sans text-[1.3rem] font-thin tracking-[0.1em] text-dust">Da corrida rápida de ônibus ao passe semanal ilimitado — todos os tipos de resgate disponíveis, sem taxa de conversão.</p>
            </div>
            <div className="my-[30px] flex flex-col gap-4">

                {redeemOptions.map((option) => (
                    <div className={cardClass} key={option.id}>
                        <p className={iconClass}>{option.icon}</p>
                        <div className="flex min-w-0 flex-col gap-[10px]">
                            <h3 className="text-[1.5rem] tablet:text-[1.9rem] font-thin text-mist">{option.name}</h3>
                            <p className="font-sans text-[1.25rem] font-extralight leading-[1.45] text-dust">{option.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {option.cards.map((card) => (
                                    <p className={`${sectionTagClass} text-[.9rem]`} key={card}>{redeemCards[card]}</p>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 text-center">
                            <h3 className="text-[2rem] tablet:text-[3.2rem] font-extralight leading-none text-mist">{option.points}</h3>
                            <p className="font-sans text-base uppercase tracking-[0.15em] text-dust">pontos</p>
                            <p className="font-sans text-[1.15rem] text-sage">≈ {option.reais}</p>
                        </div>
                    </div>
                ))}

                <div className="mt-10 tablet:mt-16">
                    <div className="mb-8">
                        <h2 className="text-[2rem] font-extralight text-mist tablet:text-[2.8rem]">Onde seu crédito funciona</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3">
                        <div className="flex min-h-[190px] w-full flex-col gap-3 rounded-[18px] border border-border-mid bg-dusk p-[22px] text-left text-mist [transition:all_.5s_ease] hover:-translate-y-[3px] hover:border-aurora-30 hover:bg-dusk-mid-80">
                            <p className="inline-flex h-[46px] w-[46px] items-center text-[2.4rem]">💳</p>
                            <h3 className="text-[2rem] font-extralight text-mist">Bilhete Único</h3>
                            <p className="font-sans text-[1.25rem] font-extralight leading-[1.5] text-dust">O crédito é adicionado diretamente no seu Bilhete Único já cadastrado. Válido em toda a rede SPTrans e EMTU.</p>
                        </div>
                        <div className="flex min-h-[190px] w-full flex-col gap-3 rounded-[18px] border border-border-mid bg-dusk p-[22px] text-left text-mist [transition:all_.5s_ease] hover:-translate-y-[3px] hover:border-aurora-30 hover:bg-dusk-mid-80">
                            <p className="inline-flex h-[46px] w-[46px] items-center text-[2.4rem]">💳</p>
                            <h3 className="text-[2rem] font-extralight text-mist">Cartão top</h3>
                            <p className="font-sans text-[1.25rem] font-extralight leading-[1.5] text-dust">Compatível com o cartão top da ViaMobilidade, aceito nas linhas 5 e 17 do metrô e redes parceiras.</p>
                        </div>
                        <div className="flex min-h-[190px] w-full flex-col gap-3 rounded-[18px] border border-border-mid bg-dusk p-[22px] text-left text-mist [transition:all_.5s_ease] hover:-translate-y-[3px] hover:border-aurora-30 hover:bg-dusk-mid-80">
                            <p className="inline-flex h-[46px] w-[46px] items-center text-[2.4rem]">📱</p>
                            <h3 className="text-[2rem] font-extralight text-mist">QR Code</h3>
                            <p className="font-sans text-[1.25rem] font-extralight leading-[1.5] text-dust">Gere um QR Code diretamente no app MoovUp e use nas catracas compatíveis — sem precisar de cartão físico.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
