import Logo from '../../assets/moov-up-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons'

export default function Footer(){
    return (
        <footer>
            <div className="footer">
                <div className="logo">
                    <img src= {Logo} className="ico"/>
                    <p className="name">MoovUp</p>
                </div>
                <div className="item">
                    <a href="https://x.com/soulupoficial?s=20" target="_blank">
                        <FontAwesomeIcon icon={faXTwitter} className="fa-brands"/>
                    </a>
                    <a href="https://www.instagram.com/soulupoficial/" target="_blank">
                        <FontAwesomeIcon icon={faInstagram} className="fa-brands"/>
                    </a>
                    <a href="https://www.linkedin.com/company/soulupoficial/posts/?feedView=all" target="_blank">
                        <FontAwesomeIcon icon={faLinkedin} className="fa-brands"/>
                    </a>
                </div>
                <div className="marca">
                    <p>&copy; {new Date().getFullYear()} MoovUp. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}