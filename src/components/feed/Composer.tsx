import { useState } from 'react'
import Avatar from './Avatar'
import { focusRing, primaryActionClass } from '../common/uiStyles'

interface ComposerProps {
    userId: string | null
    userName: string | null
    pointsPerPost: number
    onPublish: (content: string) => void
    onOpenModal: () => void
}

const maxLength = 280

export default function Composer({ userId, userName, pointsPerPost, onPublish, onOpenModal }: ComposerProps) {
    const [content, setContent] = useState('')

    const remaining = maxLength - content.length
    const filled = Math.min(100, (content.length / maxLength) * 100)
    const canPublish = content.trim().length > 0 && remaining >= 0

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (!userId) {
            onOpenModal()
            return
        }
        if (!canPublish) return
        onPublish(content.trim())
        setContent('')
    }

    return (
        <form onSubmit={handleSubmit} className="border-b border-border py-8">
            <div className="flex gap-4">
                <Avatar initials={userName ? userName.slice(0, 2) : 'MU'} className="bg-dusk-mid text-aurora-soft" />
                <label className="flex-1">
                    <span className="sr-only">Escreva uma publicação</span>
                    <textarea
                        value={content}
                        onChange={(event) => setContent(event.target.value.slice(0, maxLength + 20))}
                        rows={2}
                        placeholder={userId ? 'O que está movendo você hoje?' : 'Entre na sua conta para publicar e pontuar'}
                        className={`w-full resize-none border-0 bg-transparent pt-1 font-sans text-[1.7rem] font-light text-mist placeholder:text-mist-soft focus-visible:outline-none ${focusRing}`}
                    />
                </label>
            </div>

            <div className="mt-4 flex items-center justify-end gap-5 pl-[60px]">
                <p className="mr-auto font-sans text-[1.2rem] font-light text-mist-soft">
                    Publicar vale <span className="text-aurora-soft">+{pointsPerPost} pontos</span>
                </p>

                {content.length > 0 && (
                    <p
                        className={`font-sans text-[1.2rem] font-light ${remaining < 0 ? 'text-ember' : 'text-mist-soft'}`}
                        aria-live="polite"
                    >
                        {remaining}
                        <span className="sr-only"> caracteres restantes</span>
                    </p>
                )}

                <span
                    className="h-[20px] w-[20px] rounded-full"
                    aria-hidden="true"
                    style={{
                        background: `conic-gradient(${remaining < 0 ? 'var(--color-ember)' : 'var(--color-aurora)'} ${filled}%, var(--color-mist-08) 0)`,
                        mask: 'radial-gradient(circle, transparent 55%, black 57%)',
                        WebkitMask: 'radial-gradient(circle, transparent 55%, black 57%)',
                    }}
                />

                <button type="submit" disabled={Boolean(userId) && !canPublish} className={primaryActionClass}>
                    Publicar
                </button>
            </div>
        </form>
    )
}
