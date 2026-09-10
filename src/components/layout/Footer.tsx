import Logo from '../../assets/moov-up-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons'

const socialLinkClass = "inline-flex items-center text-5xl text-aurora after:mx-3 after:inline-flex after:items-center after:text-[2.2rem] after:leading-none after:content-['•']"

export default function Footer(){
    return (
        <footer>
            <div className="relative grid w-full grid-cols-[1fr_auto_1fr] items-center gap-0 border-t border-dusk-light bg-void-78 p-8 font-sans text-2xl font-normal text-mist-dim backdrop-blur-[16px] before:content-[''] before:pointer-events-none before:absolute before:left-0 before:right-0 before:-top-6 before:h-6 before:bg-gradient-to-t before:from-void-28 before:to-transparent">
                <div className="flex w-40 justify-self-start">
                    <img src={Logo} className="h-auto w-1/4" />
                    <p className="self-center pl-[15px] font-serif text-2xl text-mist-dim">MoovUp</p>
                </div>
                <div className="flex items-center justify-center justify-self-center">
                    <a href="https://x.com/soulupoficial?s=20" target="_blank" className={socialLinkClass}>
                        <FontAwesomeIcon icon={faXTwitter} className="fa-brands"/>
                    </a>
                    <a href="https://www.instagram.com/soulupoficial/" target="_blank" className={socialLinkClass}>
                        <FontAwesomeIcon icon={faInstagram} className="fa-brands"/>
                    </a>
                    <a href="https://www.linkedin.com/company/soulupoficial/posts/?feedView=all" target="_blank" className="inline-flex items-center text-5xl text-aurora">
                        <FontAwesomeIcon icon={faLinkedin} className="fa-brands"/>
                    </a>
                </div>
                <div className="justify-self-end text-right font-medium text-mist-dim">
                    <p className="font-sans">&copy; {new Date().getFullYear()} MoovUp. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}