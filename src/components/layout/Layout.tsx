import { Outlet } from 'react-router-dom'
import Header from './Header.tsx'
import { useState } from 'react'


function Layout(){
    
    const [isModalOpen, setIsModalOpen] = useState(false)

    return(
        <>
            <Header onOpenModal={() => setIsModalOpen(true)} />
            <Outlet />
        </>
    )
}

export default Layout;