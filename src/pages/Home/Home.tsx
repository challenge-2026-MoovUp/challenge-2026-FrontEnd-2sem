import { useOutletContext } from 'react-router-dom'
import Button from '../../components/common/Button'
import Foot from '../../components/common/Foot'

interface HomeContext {
    onOpenModal: () => void
    userEmail: string | null
    userId: string | null
}

const sectionTagClass = "my-[30px] inline-block rounded-[30px] border border-border bg-ember-soft-18 px-[20px] py-[5px] font-sans text-[1.5rem] italic text-ember before:mr-2 before:inline-block before:h-[5px] before:w-[5px] before:rounded-full before:bg-ember before:align-middle before:content-[''] before:animate-[breathe_4s_ease-in-out_infinite]"

// Reproduz o antigo destaque `.page__home .btn__cta` (fonte maior, mais margem, hover mais forte).
const heroCtaClass = "!my-[50px] !w-fit !text-[1.6rem] !font-extralight hover:!-translate-y-[3px]"
const heroCtaOutlineClass = `${heroCtaClass} hover:!border-mist-30 hover:!bg-border`

const features = [
    { icon: '✦', topic: 'Ganhe pontos', about: 'Cada post, curtida e comentário gera pontos. Quanto mais voce interage, mais pontos acumula.', large: true },
    { icon: '✦', topic: 'Desconto na energia', about: 'Converta seus pontos em desconto real na conta de energia elétrica. Simples e direto.', large: false },
    { icon: '✦', topic: 'Cashback e vouchers', about: 'Resgate pontos em parceiros selecionados, vouchers exclusivos e cashback direto na conta.', large: false },
    { icon: '✦', topic: 'Transportes sustentáveis', about: 'Troque seus pontos acumulados em passagens de trem e metrô.', large: false },
    { icon: '✦', topic: 'Desafios exclusivos', about: 'Participe de desafios semanais para ganhar pontos bônus e desbloquear recompensas especiais.', large: false },
    { icon: '✦', topic: 'Indicação de amigos', about: 'Indique amigos e ganhe bônus de pontos quando eles se cadastrarem e interagirem.', large: false },
]

const steps = [
    { num: '1', numClass: 'bg-teal-muted-22 text-white', topic: 'Crie sua conta', subtitle: 'Cadastre-se gratuitamente em menos de 2 minutos com o seu email e numero de telefone.' },
    { num: '2', numClass: 'bg-aurora-glow text-aurora-soft', topic: 'Interaja na plataforma', subtitle: 'Poste conteúdos, curta, comente e compartilhe. Cada ação gera pontos automaticamente.' },
    { num: '3', numClass: 'bg-sage-18 text-sage', topic: 'Acumule seus pontos', subtitle: 'Acompanhe seu saldo crescer em tempo real na sua carteira digital dentro do app.' },
    { num: '4', numClass: 'bg-gold-18 text-gold', topic: 'Resgate benefícios', subtitle: 'Troque seus pontos por descontos em energia, cashback ou vouchers de parceiros.' },
]

export default function Home() {
    const { onOpenModal, userEmail, userId } = useOutletContext<HomeContext>()

    return (
        <div className="page__home">
            <div className="ambient" aria-hidden="true">
                <span className="orb orb-1" />
                <span className="orb orb-2" />
            </div>

            <section>
                <div className="mx-auto my-40 flex h-[600px] flex-row items-center justify-center">
                    <div className="flex w-4/5 flex-col items-center text-center">
                        {userEmail ? (
                            <p className={sectionTagClass}>Bem vindo, {userId}</p>
                        ) : (
                            <p className={sectionTagClass}>Suas interações valem pontos</p>
                        )}
                        <h1 className="mb-12 w-full text-[7rem] font-extralight text-mist">
                            Interaja, ganhe <span className="bg-gradiente-aurora bg-clip-text font-thin italic text-transparent">pontos</span> e resgate <span className="bg-gradiente-aurora bg-clip-text font-thin italic text-transparent">benefícios</span> reais
                        </h1>
                        <p className="font-sans text-[2rem] font-thin text-mist-dim">A plataforma que transforma cada curtida, post e comentário em pontos que viram descontos na sua conta de energia, cashback e muito mais.</p>
                        <div className="flex items-center justify-center gap-4">
                            {userEmail ? null : (
                                <Button variant="cta-primary" className={heroCtaClass} onClick={onOpenModal}>Criar Conta Grátis</Button>
                            )}
                            <Button variant="cta-outline" className={heroCtaOutlineClass} onClick={() => document.getElementById('steps-goto')?.scrollIntoView({ behavior: 'smooth' })}>VER COMO FUNCIONA</Button>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="m-32">
                    <p className={sectionTagClass}>Recursos</p>
                    <h2 className="mb-12 w-[60%] text-[6rem] font-extralight text-mist">Tudo que voce precisa para <span className="bg-gradiente-aurora bg-clip-text font-thin italic text-transparent">ganhar mais</span></h2>

                    <div className="grid grid-cols-3 items-stretch justify-center gap-12">
                        {features.map((feature, index) => (
                            <div
                                key={feature.topic}
                                className={`group rounded-[10px] border border-border bg-void p-12 font-bold text-mist transition-[background-color,border-color,box-shadow,transform] duration-300 ease-in-out hover:border-aurora-42 hover:bg-aurora-glow hover:shadow-[0_18px_38px_var(--color-void-34)] hover:-translate-y-[6px] ${feature.large ? 'col-span-2' : ''} ${index < 2 ? 'min-h-[250px]' : 'min-h-[150px]'}`}
                            >
                                <p className="mb-[10px] inline-block rounded-[10px] border border-border bg-aurora-glow px-[8px] py-[4px] text-[1.8rem] transition-transform duration-300 ease-in-out group-hover:rotate-[8deg] group-hover:scale-[1.08]">{feature.icon}</p>
                                <h3 className="text-[2.5rem] font-extralight text-mist">{feature.topic}</h3>
                                <p className="pt-[10px] font-sans text-[1.3rem] font-thin text-mist-dim">{feature.about}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div id="steps-goto"></div>
            <section className="mx-[calc(50%_-_50vw)] mt-20 border-t border-border bg-void-45 py-12 backdrop-blur-[16px]">
                <div className="mx-auto w-[70%]">
                    <p className={`${sectionTagClass} !text-[1.7rem]`}>Como Funciona</p>
                    <h2 className="mb-12 w-full text-[7rem] font-extralight text-mist">Em <span className="bg-gradiente-aurora bg-clip-text font-thin italic text-transparent">4 passos </span>simples</h2>
                    <div className="grid grid-cols-4">
                        {steps.map((step, index) => (
                            <div
                                key={step.num}
                                className={`flex h-auto flex-col border-l border-border px-[24px] py-[40px] text-left font-bold text-mist [transition:all_.5s_ease] hover:-translate-y-[4px] hover:bg-dusk-mid hover:shadow-[0_18px_40px_var(--color-aurora-14)] ${index === 0 ? 'border-l-0 rounded-l-[30px]' : ''} ${index === steps.length - 1 ? 'rounded-r-[30px]' : ''}`}
                            >
                                <p className={`inline-flex h-[32px] w-[32px] self-start items-center justify-center rounded-full border border-current font-sans text-[1.7rem] font-light leading-none ${step.numClass}`}>{step.num}</p>
                                <h3 className="pt-[10px] text-[2rem] font-thin text-mist">{step.topic}</h3>
                                <p className="font-sans text-[15px] font-normal text-gray-muted">{step.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Foot ctaTo="/Sobre" btnStr='SAIBA MAIS' large />
        </div>
    )
}
