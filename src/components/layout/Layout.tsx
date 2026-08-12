import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Header from './Header.tsx'
import Footer from './Footer.tsx'
import LoginModal from './LoginModal.tsx'


function Layout(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userEmail, setUserEmail] = useState<string | null >(() => 
        localStorage.getItem('userEmail')
    )
    const [userId, setUserId] = useState<string | null> (() =>
        localStorage.getItem('userId')
    )

    function handleLogin(email: string, user: string) {
        setUserId(user)
        setUserEmail(email)
        localStorage.setItem('userEmail', email)
        localStorage.setItem('userId', user)
        setIsModalOpen(false)
    }

    return(
        <>
            <Header onOpenModal={() => setIsModalOpen(true)} userEmail={userEmail} userId={userId} />
            <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLogin={handleLogin}/>
            <main>
                <Outlet context={{ onOpenModal: () => setIsModalOpen(true), userEmail, userId }}/>
            </main>
            <Footer/>
        </>
    )
}

export default Layout;