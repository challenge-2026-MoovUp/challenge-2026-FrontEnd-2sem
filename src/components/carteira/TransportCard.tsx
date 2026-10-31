import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export type CardVariant = 'top' | 'bilheteUnico'

/* Cores próprias dos cartões, como no artefato de referência: são a "livery" de
   cada cartão real, não cores do tema — por isso ficam aqui, e não em global.css.
   O resto da página (seleção, legendas, saldo) segue os tokens da MoovUp. */
const livery = {
    top: {
        blocks: '#4A4A4E',
        windows: '#8E8E93',
        accent: '#1FA7AD',
        text: '#FFFFFF',
    },
    bilheteUnico: {
        pink: '#E0489A',
        purple: '#7B3FC4',
        blue: '#2F5FE0',
        inner: '#EEF2FB',
        text: '#13205C',
    },
}

interface TransportCardProps {
    variant: CardVariant
    /** Saldo convertido em reais, já formatado. */
    balance: string
    /** Últimos dígitos do cartão informado; vazio mostra 0000. */
    lastDigits: string
    selected: boolean
    onSelect: (variant: CardVariant) => void
}

const meta: Record<CardVariant, { title: string; modals: string; chips: string[] }> = {
    top: { title: 'Cartão top', modals: 'Metrô · CPTM · EMTU', chips: [] },
    bilheteUnico: {
        title: 'Bilhete Único',
        modals: 'Ônibus municipais · Metrô · CPTM',
        chips: ['Ônibus', 'Metrô', 'Integração'],
    },
}

/** Janelas acesas dos prédios do cartão escuro. */
function Windows() {
    const groups = [
        { x: 310, step: 18, yStart: 14, width: 8, height: 6 },
        { x: 455, step: 20, yStart: 20, width: 10, height: 5 },
    ]

    return (
        <g fill={livery.top.windows} opacity="0.35">
            {groups.flatMap((group) =>
                [0, 1, 2].flatMap((row) =>
                    [0, 1, 2].map((index) => (
                        <rect
                            key={`${group.x}-${row}-${index}`}
                            x={group.x + index * group.step}
                            y={group.yStart + row * 20}
                            width={group.width}
                            height={group.height}
                        />
                    )),
                ),
            )}
        </g>
    )
}

function ContactlessIcon({ color }: { color: string }) {
    return (
        <svg
            role="img"
            aria-label="Pagamento por aproximação"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            className="opacity-85"
        >
            <path d="M8.5 8.5a5 5 0 0 1 0 7" />
            <path d="M12 6a8.5 8.5 0 0 1 0 12" />
            <path d="M15.5 3.5a12 12 0 0 1 0 17" />
        </svg>
    )
}

export default function TransportCard({ variant, balance, lastDigits, selected, onSelect }: TransportCardProps) {
    const info = meta[variant]
    const isDark = variant === 'top'

    return (
        <label className="group flex cursor-pointer flex-col gap-4">
            <input
                type="radio"
                name="transport-card"
                value={variant}
                checked={selected}
                onChange={() => onSelect(variant)}
                className="peer sr-only"
            />

            <span
                className={`relative block aspect-[520/328] w-full overflow-hidden rounded-[22px] [container-type:inline-size] transition duration-[250ms] ease-out group-hover:-translate-y-[3px] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-aurora-soft ${
                    isDark
                        ? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_40px_rgba(0,0,0,0.22)]'
                        : 'shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_18px_40px_rgba(30,50,120,0.18)]'
                } ${selected ? 'ring-2 ring-aurora ring-offset-4 ring-offset-void' : ''}`}
                style={{
                    background: isDark
                        ? 'linear-gradient(155deg, #3A3A3C 0%, #1C1C1E 55%, #0E0E10 100%)'
                        : 'linear-gradient(160deg, #F4F7FD 0%, #E3EAF8 100%)',
                    color: isDark ? livery.top.text : livery.bilheteUnico.text,
                }}
            >
                <svg
                    aria-hidden="true"
                    viewBox="0 0 520 328"
                    preserveAspectRatio="xMidYMid slice"
                    className="absolute inset-0 h-full w-full"
                >
                    {isDark ? (
                        <>
                            <g fill={livery.top.blocks} opacity="0.55">
                                <rect x="300" y="0" width="70" height="200" />
                                <rect x="380" y="20" width="55" height="180" />
                                <rect x="445" y="0" width="80" height="170" />
                                <rect x="230" y="40" width="60" height="170" />
                            </g>
                            <Windows />
                            <g fill="#FFFFFF">
                                <circle cx="262" cy="86" r="3" opacity="0.9" />
                                <circle cx="262" cy="86" r="12" opacity="0.12" />
                                <circle cx="418" cy="120" r="2.5" opacity="0.9" />
                                <circle cx="418" cy="120" r="10" opacity="0.12" />
                            </g>
                            <g stroke="#FFFFFF" strokeLinecap="round" fill="none">
                                <path d="M-20 300 C 120 240, 280 200, 560 120" strokeWidth="3" opacity="0.22" />
                                <path d="M-20 290 C 130 228, 290 186, 560 104" strokeWidth="1.5" opacity="0.3" />
                                <path d="M-20 280 C 140 216, 300 172, 560 88" strokeWidth="2" opacity="0.18" />
                                <path d="M-20 270 C 150 204, 310 158, 560 72" strokeWidth="1" opacity="0.35" />
                                <path d="M-20 258 C 160 192, 320 146, 560 58" strokeWidth="2.5" opacity="0.14" />
                                <path d="M-20 246 C 170 180, 330 132, 560 44" strokeWidth="1" opacity="0.25" />
                                <path d="M-20 234 C 180 168, 340 120, 560 30" strokeWidth="1.5" opacity="0.12" />
                                <path d="M-20 222 C 190 156, 350 108, 560 16" strokeWidth="1" opacity="0.2" />
                            </g>
                            <path d="M0 210 C 200 206, 400 168, 520 70 L 520 328 L 0 328 Z" fill={livery.top.accent} />
                            {/* Véu escuro no rodapé: o verde-água puro deixava o saldo branco em 2,9:1. */}
                            <path
                                d="M0 210 C 200 206, 400 168, 520 70 L 520 328 L 0 328 Z"
                                fill="url(#topScrim)"
                                opacity="0.55"
                            />
                            <defs>
                                <linearGradient id="topScrim" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0" stopColor="#0E0E10" stopOpacity="0" />
                                    <stop offset="1" stopColor="#0E0E10" stopOpacity="1" />
                                </linearGradient>
                            </defs>
                        </>
                    ) : (
                        <>
                            <defs>
                                <linearGradient id="buGrad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0" stopColor={livery.bilheteUnico.pink} />
                                    <stop offset="0.45" stopColor={livery.bilheteUnico.purple} />
                                    <stop offset="1" stopColor={livery.bilheteUnico.blue} />
                                </linearGradient>
                                <linearGradient id="buGrad2" x1="1" y1="0" x2="0" y2="1">
                                    <stop offset="0" stopColor={livery.bilheteUnico.pink} />
                                    <stop offset="0.45" stopColor={livery.bilheteUnico.purple} />
                                    <stop offset="1" stopColor={livery.bilheteUnico.blue} />
                                </linearGradient>
                            </defs>
                            <circle cx="470" cy="300" r="150" fill="url(#buGrad)" />
                            <circle cx="470" cy="300" r="88" fill={livery.bilheteUnico.inner} />
                            <circle cx="330" cy="360" r="70" fill="url(#buGrad2)" opacity="0.85" />
                            <circle cx="500" cy="40" r="46" fill="url(#buGrad2)" opacity="0.55" />
                        </>
                    )}
                </svg>

                <span className="absolute inset-0 flex flex-col justify-between p-[6%]">
                    <span className="flex items-start justify-between">
                        {isDark ? (
                            <span className="text-[clamp(2.8rem,12cqw,5.6rem)] font-black leading-none tracking-[0.02em]">
                                TOP
                            </span>
                        ) : (
                            <span className="leading-[1.05]">
                                <span className="block text-[clamp(1.4rem,4cqw,2rem)] font-normal opacity-90">
                                    Bilhete
                                </span>
                                <span className="block text-[clamp(2.2rem,7.5cqw,4rem)] font-extrabold tracking-[-0.02em]">
                                    Único
                                </span>
                            </span>
                        )}
                        <ContactlessIcon color={isDark ? livery.top.text : livery.bilheteUnico.text} />
                    </span>

                    {info.chips.length > 0 && (
                        <span className="flex flex-wrap gap-2">
                            {info.chips.map((chip) => (
                                <span
                                    key={chip}
                                    className="rounded-full px-3 py-1 text-[clamp(1rem,2.3cqw,1.2rem)] font-semibold"
                                    style={{ backgroundColor: 'rgba(19,32,92,0.08)' }}
                                >
                                    {chip}
                                </span>
                            ))}
                        </span>
                    )}

                    <span className="flex items-end justify-between">
                        <span>
                            <span className="block text-[clamp(0.95rem,2.3cqw,1.2rem)] font-semibold uppercase tracking-[0.1em] opacity-85">
                                Saldo
                            </span>
                            <span className="block text-[clamp(1.8rem,5cqw,2.6rem)] font-bold tracking-[-0.01em]">
                                {balance}
                            </span>
                        </span>
                        <span className="text-[clamp(1.2rem,3cqw,1.6rem)] font-semibold tracking-[0.12em]">
                            •••• {lastDigits || '0000'}
                        </span>
                    </span>
                </span>

                {selected && (
                    <span className="absolute right-4 top-4 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-aurora text-[1.1rem] text-void">
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                )}
            </span>

            <span className="flex flex-wrap items-baseline justify-between gap-x-4 px-1">
                <span className={`font-sans text-[1.6rem] ${selected ? 'text-mist' : 'text-mist-dim'}`}>
                    {info.title}
                </span>
                <span className="font-sans text-[1.2rem] font-light text-mist-soft">{info.modals}</span>
            </span>
        </label>
    )
}
