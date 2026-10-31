interface AvatarProps {
    initials: string
    className: string
    size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
    sm: 'h-[34px] w-[34px] text-[1.2rem]',
    md: 'h-[44px] w-[44px] text-[1.5rem]',
    lg: 'h-[56px] w-[56px] text-[1.9rem]',
}

export default function Avatar({ initials, className, size = 'md' }: AvatarProps) {
    return (
        <span
            aria-hidden="true"
            className={`flex shrink-0 items-center justify-center rounded-full border border-border-mid font-sans font-medium uppercase tracking-[0.04em] ${sizeClasses[size]} ${className}`}
        >
            {initials}
        </span>
    )
}
