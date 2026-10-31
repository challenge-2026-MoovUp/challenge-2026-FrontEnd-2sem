import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { suggestedProfiles, trendTopics } from '../../data/feed'
import Avatar from './Avatar'
import { eyebrowClass, focusRing, ghostActionClass, lineFieldClass, softTransition } from '../common/uiStyles'

interface FeedSidebarProps {
    query: string
    onQueryChange: (value: string) => void
    activeTag: string | null
    onTagClick: (tag: string) => void
    following: string[]
    onToggleFollow: (id: string) => void
}

export default function FeedSidebar({
    query,
    onQueryChange,
    activeTag,
    onTagClick,
    following,
    onToggleFollow,
}: FeedSidebarProps) {
    return (
        <div className="flex flex-col gap-10 font-sans">
            <search>
                <label className="relative block">
                    <span className="sr-only">Buscar no feed</span>
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[1.3rem] text-mist-soft"
                    />
                    <input
                        value={query}
                        onChange={(event) => onQueryChange(event.target.value)}
                        placeholder="Buscar publicações"
                        className={`${lineFieldClass} pl-7 pr-8 placeholder:text-mist-soft`}
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => onQueryChange('')}
                            className={`absolute right-0 top-1/2 flex h-[24px] w-[24px] -translate-y-1/2 items-center justify-center rounded-full text-mist-dim hover:cursor-pointer hover:text-mist ${softTransition} ${focusRing}`}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                            <span className="sr-only">Limpar busca</span>
                        </button>
                    )}
                </label>
            </search>

            <section>
                <h2 className={eyebrowClass}>Em alta na MoovUp</h2>
                <ul className="pt-3">
                    {trendTopics.map((topic) => (
                        <li key={topic.tag} className="border-b border-border last:border-0">
                            <button
                                type="button"
                                onClick={() => onTagClick(topic.tag)}
                                aria-pressed={activeTag === topic.tag}
                                className={`w-full py-3 text-left hover:cursor-pointer ${softTransition} ${focusRing}`}
                            >
                                <span
                                    className={`block text-[1.35rem] ${activeTag === topic.tag ? 'font-normal text-aurora-soft' : 'font-light text-mist'}`}
                                >
                                    {topic.tag}
                                </span>
                                <span className="block text-[1.1rem] font-light text-mist-soft">{topic.posts}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className={eyebrowClass}>Quem seguir</h2>
                <ul className="pt-3">
                    {suggestedProfiles.map((profile) => {
                        const isFollowing = following.includes(profile.id)

                        return (
                            <li
                                key={profile.id}
                                className="flex items-center gap-3 border-b border-border py-3 last:border-0"
                            >
                                <Avatar initials={profile.initials} className={profile.avatarClass} size="sm" />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-[1.35rem] font-light text-mist">{profile.name}</p>
                                    <p className="truncate text-[1.1rem] font-light text-mist-soft">{profile.bio}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onToggleFollow(profile.id)}
                                    aria-pressed={isFollowing}
                                    className={`${ghostActionClass} shrink-0 ${isFollowing ? '!border-aurora-42 !text-aurora-soft' : ''}`}
                                >
                                    {isFollowing ? 'Seguindo' : 'Seguir'}
                                    <span className="sr-only"> {profile.name}</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </section>

            <p className="text-[1.1rem] font-light text-mist-soft">
                MoovUp © 2026 ·{' '}
                <Link to="/faq" className={`text-mist-dim hover:text-aurora-soft ${softTransition} ${focusRing}`}>
                    Central de ajuda
                </Link>{' '}
                ·{' '}
                <Link to="/contato" className={`text-mist-dim hover:text-aurora-soft ${softTransition} ${focusRing}`}>
                    Contato
                </Link>
            </p>
        </div>
    )
}
