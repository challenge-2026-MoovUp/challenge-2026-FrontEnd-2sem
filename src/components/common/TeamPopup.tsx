import { useEffect } from 'react'
import type { Creator } from '../../types/team'
import GitHubImg from '../../assets/github.png'
import LinkedInImg from '../../assets/linkedin.png'

interface TeamPopupProps {
    creator: Creator | null
    onClose: () => void
}

const popupLinkClass = "group relative inline-flex rounded-full transition-transform duration-[250ms] ease-in-out hover:-translate-y-[3px] hover:scale-[1.08] focus-visible:-translate-y-[3px] focus-visible:scale-[1.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora-soft focus-visible:outline-offset-8 before:content-[''] before:absolute before:-inset-[10px] before:rounded-full before:[filter:blur(2px)] before:opacity-0 before:scale-[0.72] before:bg-[radial-gradient(circle,var(--color-aurora-soft-28)_0%,var(--color-aurora-soft-10)_48%,var(--color-transparent)_74%)] before:transition-[opacity,transform] before:duration-[250ms] before:ease-in-out hover:before:opacity-100 hover:before:scale-100 focus-visible:before:opacity-100 focus-visible:before:scale-100"

const popupLinkImgClass = "relative z-[1] w-[80px] rounded-full p-[6px] [filter:saturate(0.8)] transition-[filter] duration-[250ms] ease-in-out group-hover:[filter:saturate(1.18)_drop-shadow(0_0_12px_var(--color-aurora-soft-24))] group-focus-visible:[filter:saturate(1.18)_drop-shadow(0_0_12px_var(--color-aurora-soft-24))]"

const popupBioTextClass = "font-sans"

export default function TeamPopup({ creator, onClose }: TeamPopupProps) {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') onClose()
        }

        document.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    if (!creator) return null

    return (
        <div className="fixed inset-0 z-20 flex flex-col items-center justify-center pb-6 pt-[96px]">
            <div
                className="fixed inset-0 backdrop-blur-[18px]"
                style={{ background: "radial-gradient(circle at 50% 42%, var(--color-indigo-glow-13), var(--color-transparent) 38%), var(--color-void-86)" }}
                onClick={onClose}
            />

            <div
                className="relative z-[1] m-[20px] flex h-[calc(100vh-120px)] w-[min(92vw,560px)] max-w-[640px] flex-col items-center gap-4 overflow-y-auto rounded-[30px] border border-mist-12 px-10 py-10 text-center shadow-[0_28px_90px_var(--color-black-42),0_0_70px_var(--color-aurora-13)] animate-[popupCardEnter_.45s_cubic-bezier(0.22,1,0.36,1)_both]"
                style={{ background: "linear-gradient(145deg, var(--color-dusk-mid-88), var(--color-dusk-72)), var(--color-dusk-74)" }}
                data-creator-popup={creator.id}
            >
                <button className="absolute right-[28px] top-[24px] border-none bg-transparent text-[40px] leading-none text-mist" onClick={onClose}>&times;</button>
                <img src={creator.photo} alt={`Foto de ${creator.name}`} className="mt-[4px] h-[260px] w-[260px] max-w-none rounded-[16px] border-2 border-border object-cover p-[8px]" />
                <p className="-mt-[4px] font-sans text-[1.3rem] font-extralight text-aurora">{creator.rm}</p>

                <div className="flex flex-1 flex-col items-center justify-center gap-4">
                    <h3 className="text-[2.6rem] font-light leading-[1.1] text-aurora-soft">{creator.name}</h3>

                    <div className="flex max-w-[480px] flex-col gap-[10px] text-left text-[1.35rem] font-light leading-[1.4] text-mist">
                        <p className={popupBioTextClass}>{creator.bio[0]}</p>
                        {creator.bioList && (
                            <ul>
                                {creator.bioList.map((item) => (
                                    <li key={item} className={`${popupBioTextClass} mb-[6px] list-none text-left`}>{item}</li>
                                ))}
                            </ul>
                        )}
                        {creator.bio.slice(1).map((paragraph) => (
                            <p key={paragraph} className={popupBioTextClass}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-[10px]">
                        <a href={creator.github} target="_blank" rel="noopener noreferrer" className={popupLinkClass}>
                            <img src={GitHubImg} alt="Github icon" className={popupLinkImgClass} />
                        </a>
                        <a href={creator.linkedin} target="_blank" rel="noopener noreferrer" className={popupLinkClass}>
                            <img src={LinkedInImg} alt="Linkedin icon" className={popupLinkImgClass} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
