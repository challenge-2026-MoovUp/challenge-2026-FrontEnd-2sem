interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    variant?: 'primary' | 'cta-primary' | 'cta-outline'
    className?: string
}

export default function Button({ children, onClick, variant = 'primary', className }: ButtonProps) {
    const variantClass = {
        'primary' : 'btn btn__primary',
        'cta-primary' : 'btn btn__cta btn__cta--primary',
        'cta-outline' : 'btn btn__cta btn__cta--outline',
    }[variant]
    const buttonClass = className ? `${variantClass} ${className}` : variantClass

    return (
        <button className={buttonClass} onClick={onClick}>
            {children}
        </button>
    )
}
