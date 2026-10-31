/* Linguagem visual compartilhada pelo Feed e pela Carteira: sem caixas, hierarquia
   por tipografia e hairlines como separador. Tokens em global.css. */

export const focusRing =
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora-soft focus-visible:outline'

/** Transição curta (200ms), desligada em prefers-reduced-motion. */
export const softTransition = 'transition-colors duration-200 motion-reduce:transition-none'

/** Seção separada da anterior por um fio, nunca por uma caixa. */
export const sectionClass = 'border-t border-border pt-10'

export const eyebrowClass = 'font-sans text-[1.2rem] font-medium uppercase tracking-[0.14em] text-aurora-soft'
export const sectionTitleClass = 'pt-2 text-[2.4rem] font-medium text-mist'
export const sectionLeadClass = 'max-w-[52ch] pt-1 font-sans text-[1.4rem] font-light text-mist-soft'
export const labelClass = 'font-sans text-[1.15rem] font-medium uppercase tracking-[0.1em] text-mist-soft'

/** Campo sem caixa: só a linha de baixo, que acende no foco. */
export const lineFieldClass =
    'w-full appearance-none border-0 border-b border-border-mid bg-transparent px-1 py-[10px] font-sans text-[1.5rem] font-light text-mist transition-colors duration-200 hover:border-aurora-30 focus-visible:border-aurora focus-visible:outline-none motion-reduce:transition-none'

/** Ação principal: pastilha clara sólida, o único elemento de alto contraste da tela. */
export const primaryActionClass =
    'inline-flex items-center gap-2 rounded-full bg-mist px-6 py-[12px] font-sans text-[1.3rem] font-medium uppercase tracking-[0.08em] text-void transition duration-200 hover:cursor-pointer hover:bg-aurora-soft disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora-soft'

/** Ação secundária: contorno fino. */
export const ghostActionClass =
    'inline-flex items-center gap-2 rounded-full border border-border-mid px-4 py-[7px] font-sans text-[1.25rem] font-light text-mist-dim transition-colors duration-200 hover:cursor-pointer hover:border-aurora-30 hover:text-mist motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora-soft'
