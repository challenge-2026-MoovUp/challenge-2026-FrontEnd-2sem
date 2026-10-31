import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Header from './Header.tsx'
import Footer from './Footer.tsx'
import LoginModal from './LoginModal.tsx'
import type { Credenciais } from '../../types/api'
import { WalletProvider } from '../../context/WalletProvider.tsx'


function Layout(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { usuario, entrar } = useAuth()

    const userEmail = usuario?.email ?? null
    const userId = usuario?.id ?? null
    const userName = usuario?.nome ?? null

    async function handleLogin(credenciais: Credenciais) {
        const resultado = await entrar(credenciais)
        if (resultado.ok) setIsModalOpen(false)
        return resultado
    }

    return(
        <>
            <Header onOpenModal={() => setIsModalOpen(true)} userEmail={userEmail} userId={userId} userName={userName} />
            <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLogin={handleLogin}/>
            <main>
                <WalletProvider userId={userId} >
                    <Outlet context={{ onOpenModal: () => setIsModalOpen(true), userEmail, userName, userId }}/>
                </WalletProvider>
            </main>
            <Footer/>
        </>
    )
}

export default Layout;