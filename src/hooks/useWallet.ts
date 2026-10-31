import { useContext } from 'react'
import { WalletContext } from '../context/walletContext'

export function useWallet() {
    const context = useContext(WalletContext)
    if (!context) throw new Error('useWallet precisa estar dentro de WalletProvider')
    return context
}
