interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    variant?: 'primary' | 'cta-primary' | 'cta-outline'
    className?: string
}

const baseClass = "flex justify-items-center whitespace-nowrap rounded-[20px] bg-transparent text-center text-base font-bold font-sans"

const variantClasses = {
    'primary': `${baseClass} border border-aurora-30 rounded-full px-[18px] py-[8px] text-[1.3rem] font-normal uppercase tracking-[0.06em] text-aurora-soft no-underline transition-all duration-200 hover:cursor-pointer hover:border-violet-glow-50 hover:bg-violet-glow-08 hover:shadow-[0_0_20px_var(--color-violet-glow-08),inset_0_0_20px_var(--color-violet-glow-03)]`,
    'cta-primary': `${baseClass} m-4 rounded-[50px] bg-gradiente-aurora px-8 py-4 text-[1.3rem] font-medium tracking-[0.08em] text-mist [transition:all_.5s_ease] hover:-translate-y-[2px] hover:cursor-pointer hover:shadow-[0_8px_36px_var(--color-aurora-35)]`,
    'cta-outline': `${baseClass} m-4 rounded-[50px] border-[1.5px] border-border-mid px-8 py-4 text-[1.3rem] font-medium tracking-[0.08em] text-mist [transition:all_.5s_ease] hover:border-mist-22 hover:text-mist`,
}

export default function Button({ children, onClick, variant = 'primary', className }: ButtonProps) {
    const variantClass = variantClasses[variant]
    const buttonClass = className ? `${variantClass} ${className}` : variantClass

    return (
        <button className={buttonClass} onClick={onClick}>
            {children}
        </button>
    )
}
