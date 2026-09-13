interface solutionInfoProps {
    isActive: boolean
}

const sectionTagClass = "inline-flex w-fit items-center self-start rounded-[30px] border border-border bg-aurora-glow px-[10px] py-[3px] font-sans text-[1.3rem] font-medium uppercase tracking-[0.15em] text-aurora-soft"
const journeyTitleClass = "bg-gradiente-mist bg-clip-text text-[2rem] font-light text-transparent"
const journeySubtitleClass = "font-sans text-[1.5rem] font-thin text-dust"
const markerClass = "relative flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-border-mid text-dust [text-indent:-999px] transition-[transform,border-color,background-color,color] duration-300 before:absolute before:left-1/2 before:top-1/2 before:h-[1.5px] before:w-[10px] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-current before:content-[''] after:absolute after:left-1/2 after:top-1/2 after:h-[10px] after:w-[1.5px] after:-translate-x-1/2 after:-translate-y-1/2 after:bg-current after:content-[''] group-open:rotate-45 group-open:border-aurora-soft group-open:bg-aurora-glow group-open:text-aurora-soft"

export default function SolutionInfo({ isActive } : solutionInfoProps) {
    return(
        <div className={isActive ? "flex justify-start gap-5" : "hidden"} id="container-3">
            <div className="flex min-w-0 flex-1 flex-col justify-start">
                <div className="mb-[60px] flex flex-col gap-5">
                    <p className={`${sectionTagClass} text-[1.3rem]`}>Passo a passo</p>
                    <h2 className="max-w-[400px] bg-gradiente-mist bg-clip-text text-[4rem] font-light text-transparent">Do primeiro post <span className="bg-gradiente-aurora bg-clip-text italic text-transparent">ao embarque</span></h2>
                    <p className="font-sans text-[1.3rem] font-thin tracking-[0.1em] text-dust">O caminho completo, desde criar sua conta até usar a passagem na catraca.</p>
                </div>
                <article>
                    <div className="flex gap-5">
                        <p className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-dusk text-[2rem] font-extralight leading-none text-aurora-soft">1</p>
                        <p className="text-[3rem]">📝</p>
                    </div>
                    <div className="mb-10 ml-[18px] flex flex-col gap-[10px] border-l border-border pl-10">
                        <h3 className={journeyTitleClass}>Crie sua conta em 2 minutos</h3>
                        <h3 className={journeySubtitleClass}>Cadastro gratuito com nome, e-mail e número de telefone. Nenhum cartão de crédito necessário. Ao finalizar, você já recebe 50 pontos de boas-vindas para começar.</h3>
                        <h3 className={`${sectionTagClass} text-[1rem]`}>grátis para sempre</h3>
                    </div>
                </article>
                <article>
                    <div className="flex gap-5">
                        <p className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-dusk text-[2rem] font-extralight leading-none text-aurora-soft">2</p>
                        <p className="text-[3rem]">💬</p>
                    </div>
                    <div className="mb-10 ml-[18px] flex flex-col gap-[10px] border-l border-border pl-10">
                        <h3 className={journeyTitleClass}>Interaja e acumule pontos</h3>
                        <h3 className={journeySubtitleClass}>Cada curtida gera 15 pts, comentários valem 25 pts, posts originais até 80 pts e desafios semanais podem render até 200 pts de bônus. Tudo contabilizado automaticamente.</h3>
                        <h3 className={`${sectionTagClass} text-[1rem]`}>+15 a +200 pts por ação</h3>
                    </div>
                </article>
                <article>
                    <div className="flex gap-5">
                        <p className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-dusk text-[2rem] font-extralight leading-none text-aurora-soft">3</p>
                        <p className="text-[3rem]">🎫</p>
                    </div>
                    <div className="mb-10 ml-[18px] flex flex-col gap-[10px] border-l border-border pl-10">
                        <h3 className={journeyTitleClass}>Vincule seu cartão de transporte</h3>
                        <h3 className={journeySubtitleClass}>Na seção "Carteira", adicione o número do seu Bilhete Único, BOM! ou ative o QR Code. O processo de vinculação é feito uma única vez e leva menos de 1 minuto.</h3>
                        <h3 className={`${sectionTagClass} text-[1rem]`}>vinculação única</h3>
                    </div>
                </article>
                <article>
                    <div className="flex gap-5">
                        <p className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-dusk text-[2rem] font-extralight leading-none text-aurora-soft">4</p>
                        <p className="text-[3rem]">⭐️</p>
                    </div>
                    <div className="mb-10 ml-[18px] flex flex-col gap-[10px] border-l border-border pl-10">
                        <h3 className={journeyTitleClass}>Selecione o resgate</h3>
                        <h3 className={journeySubtitleClass}>Com 400 pts no saldo, acesse "Resgatar" → "Transporte", escolha o modal, a quantidade de viagens e confirme com sua senha. Tudo dentro do app, sem sair da plataforma.</h3>
                        <h3 className={`${sectionTagClass} text-[1rem]`}>mínimo: 400 pts</h3>
                    </div>
                </article>
                <article>
                    <div className="flex gap-5">
                        <p className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-dusk text-[2rem] font-extralight leading-none text-aurora-soft">5</p>
                        <p className="text-[3rem]">🚇</p>
                    </div>
                    <div className="mb-10 ml-[18px] flex flex-col gap-[10px] border-l border-border pl-10">
                        <h3 className={journeyTitleClass}>Embarque em até 24 horas</h3>
                        <p className={journeySubtitleClass}>O crédito é processado automaticamente e aparece no seu cartão de transporte em até 24 horas úteis. Você recebe uma notificação assim que estiver disponível. Sem taxas, sem surpresas.</p>
                        <p className={`${sectionTagClass} text-[1rem]`}>zero taxas de conversão</p>
                    </div>
                </article>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-5">
                <details className="group rounded-[18px] border border-border-mid bg-dusk text-left text-mist [transition:all_.5s_ease] hover:-translate-y-[3px] hover:border-aurora-30 hover:bg-dusk-mid-80">
                    <summary className="flex cursor-pointer list-none items-center justify-between p-8 [&::-webkit-details-marker]:hidden">
                        <div>
                            <h3 className="font-thin">Quanto tempo leva para o crédito aparecer no meu cartão?</h3>
                        </div>
                        <i aria-hidden="true" className={markerClass}>+</i>
                    </summary>
                    <div className="border-t border-border px-4 py-[14px] text-[1.3rem] leading-[1.45] text-dust">
                        O processamento é feito em até 24 horas úteis após a confirmação do resgate. Em dias úteis durante o horário comercial, costuma ser mais rápido — muitos usuários recebem o crédito em menos de 2 horas. Você recebe uma notificação assim que o crédito for aplicado.
                    </div>
                </details>

                <details className="group rounded-[18px] border border-border-mid bg-dusk text-left text-mist [transition:all_.5s_ease] hover:-translate-y-[3px] hover:border-aurora-30 hover:bg-dusk-mid-80">
                    <summary className="flex cursor-pointer list-none items-center justify-between p-8 [&::-webkit-details-marker]:hidden">
                        <div>
                            <h3 className="font-thin">Posso resgatar passagens para outra pessoa?</h3>
                        </div>
                        <i aria-hidden="true" className={markerClass}>+</i>
                    </summary>
                    <div className="border-t border-border px-4 py-[14px] text-[1.3rem] leading-[1.45] text-dust">
                        Sim! Você pode vincular até 3 cartões de transporte na sua conta — o seu e o de mais 2 pessoas. Basta adicionar os cartões na seção "Meus cartões" dentro da Carteira, e no momento do resgate, escolher para qual cartão o crédito será enviado.
                    </div>
                </details>

                <details className="group rounded-[18px] border border-border-mid bg-dusk text-left text-mist [transition:all_.5s_ease] hover:-translate-y-[3px] hover:border-aurora-30 hover:bg-dusk-mid-80">
                    <summary className="flex cursor-pointer list-none items-center justify-between p-8 [&::-webkit-details-marker]:hidden">
                        <div>
                            <h3 className="font-thin">O que acontece com os pontos não utilizados?</h3>
                        </div>
                        <i aria-hidden="true" className={markerClass}>+</i>
                    </summary>
                    <div className="border-t border-border px-4 py-[14px] text-[1.3rem] leading-[1.45] text-dust">
                        Os pontos têm validade de 12 meses a partir da última movimentação da conta. Qualquer interação na plataforma ou resgate renova automaticamente o prazo. Antes do vencimento, você recebe notificações com 30 e 7 dias de antecedência.
                    </div>
                </details>

                <details className="group rounded-[18px] border border-border-mid bg-dusk text-left text-mist [transition:all_.5s_ease] hover:-translate-y-[3px] hover:border-aurora-30 hover:bg-dusk-mid-80">
                    <summary className="flex cursor-pointer list-none items-center justify-between p-8 [&::-webkit-details-marker]:hidden">
                        <div>
                            <h3 className="font-thin">Existe taxa para converter pontos em passagens?</h3>
                        </div>
                        <i aria-hidden="true" className={markerClass}>+</i>
                    </summary>
                    <div className="border-t border-border px-4 py-[14px] text-[1.3rem] leading-[1.45] text-dust">
                        Não. A conversão de pontos em passagens é sempre gratuita e sem taxas escondidas. O valor exibido na calculadora é o que você efetivamente recebe — sem descontos percentuais ou cobranças adicionais de qualquer tipo.
                    </div>
                </details>

                <details className="group rounded-[18px] border border-border-mid bg-dusk text-left text-mist [transition:all_.5s_ease] hover:-translate-y-[3px] hover:border-aurora-30 hover:bg-dusk-mid-80">
                    <summary className="flex cursor-pointer list-none items-center justify-between p-8 [&::-webkit-details-marker]:hidden">
                        <div>
                            <h3 className="font-thin">Funciona para cidades fora de São Paulo?</h3>
                        </div>
                        <i aria-hidden="true" className={markerClass}>+</i>
                    </summary>
                    <div className="border-t border-border px-4 py-[14px] text-[1.3rem] leading-[1.45] text-dust">
                        Atualmente a rede cobre toda a Grande São Paulo, incluindo municípios da RMSP atendidos pelo metrô, CPTM e EMTU. Estamos em processo de expansão para Rio de Janeiro, Belo Horizonte e Curitiba — fique atento às novidades no app.
                    </div>
                </details>
            </div>
        </div>
    )
}
