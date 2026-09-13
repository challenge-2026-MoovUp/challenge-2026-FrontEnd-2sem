import { useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { videos } from '../../data/videos'

const cardTitleClass = "bg-gradiente-mist bg-clip-text text-[2.4rem] font-extralight leading-[1.1] text-transparent"
const paragraphClass = "font-sans text-[1.45rem] font-light leading-[1.7] text-dust"

export default function Video() {
    const { videoId } = useParams<{ videoId: string }>()
    const navigate = useNavigate()
    const video = videos.find((v) => v.id === videoId)

    useEffect(() => {
        if (!video) navigate('/solucao', { replace: true })
    }, [video, navigate])

    if (!video) return null

    return (
        <div className="flex min-h-[calc(100dvh-194px)] flex-col items-center justify-center gap-6 overflow-hidden bg-void px-6 py-6 tablet:min-h-[calc(100dvh-150px)] desktop:min-h-[calc(100dvh-140px)]">
            <div className="flex w-full max-w-[900px] flex-col items-center gap-4">
                <Link
                    to="/solucao"
                    className="inline-flex items-center gap-2 self-start font-sans text-[1.3rem] text-aurora-soft transition-colors duration-200 hover:text-aurora"
                >
                    ‹ Voltar
                </Link>

                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className={cardTitleClass}>{video.title}</h1>
                    <p className={paragraphClass}>{video.description}</p>
                </div>

                <div className="aspect-video w-full max-h-[min(70vh,640px)] overflow-hidden rounded-2xl border border-border-mid bg-void shadow-[0_18px_42px_var(--color-black-28)]">
                    <iframe
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/${video.youtubeId}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    )
}
