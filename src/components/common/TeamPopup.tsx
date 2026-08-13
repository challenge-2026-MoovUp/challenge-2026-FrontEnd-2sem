import { useEffect } from 'react'
import type { Creator } from '../../types/team'
import GitHubImg from '../../assets/github.png'
import LinkedInImg from '../../assets/linkedin.png'

interface TeamPopupProps {
    creator: Creator | null
    onClose: () => void
}

export default function TeamPopup({ creator, onClose }: TeamPopupProps) {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') onClose()
        }

        document.removeEventListener('keydown', handleKeyDown)}, [onClose])

        if (!creator) return null

        return (
            <div className="popup active">
                <div className="popup__overlay" onClick={onClose} />

                <div className="popup__card active" data-creator-popup={creator.id}>
                    <button className="popup__close" onClick={onClose}>&times;</button>
                    <img src={creator.photo} alt={`Foto de ${creator.name}`} className="team__icon team__icon--pedro" />
                    <p className="description">{creator.rm}</p>

                    <div className="popup__team__card-box">
                        <h3 className="popup__team__card-label">{creator.name}</h3>
                        <p className="popup__team__card-rm">{creator.rm}</p>

                        <div className="popup__team__card-text">
                            <p>{creator.bio[0]}</p>
                            {creator.bioList && (
                                <ul>
                                    {creator.bioList.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            )}
                            {creator.bio.slice(1).map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="popup__team__links">
                            <a href={creator.github} target="_blank" rel="noopener noreferrer">
                                <img src={GitHubImg} alt="Github icon" className="team__link" />
                            </a>
                            <a href={creator.linkedin} target="_blank" rel="noopener noreferrer">
                                <img src={LinkedInImg} alt="Linkedin icon" className="team__link" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
}