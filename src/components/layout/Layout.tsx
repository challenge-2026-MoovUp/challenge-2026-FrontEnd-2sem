import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Header from './Header.tsx'
import LoginModal from './LoginModal.tsx'


function Layout(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userEmail, setUserEmail] = useState<string | null >(() => 
        localStorage.getItem('userEmail')
    )

    function handleLogin(email: string) {
        setUserEmail(email)
        localStorage.setItem('userEmail', email)
        setIsModalOpen(false)
    }

    return(
        <>
            <Header onOpenModal={() => setIsModalOpen(true)} userEmail={userEmail} />
            <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLogin={handleLogin}/>
            <main>
                <Outlet context={{ onOpenModal: () => setIsModalOpen(true), userEmail }}/>
            </main>
        </>
    )
}

export default Layout;