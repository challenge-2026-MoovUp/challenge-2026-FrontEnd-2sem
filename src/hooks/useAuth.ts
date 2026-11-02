import { useCallback, useState } from 'react'
import { mensagemDe } from '../api/http'
import { criarUsuario, login as loginApi } from '../api/usuariosApi'
import type { Credenciais, NovoUsuario, UsuarioDTO } from '../types/api'

const storageKey = 'moovup:usuario'

function lerUsuarioSalvo(): UsuarioDTO | null {
    try {
        const raw = localStorage.getItem(storageKey)
        return raw ? (JSON.parse(raw) as UsuarioDTO) : null
    } catch {
        return null
    }
}

function salvarUsuario(usuario: UsuarioDTO) {
    try {
        localStorage.setItem(storageKey, JSON.stringify(usuario))
    } catch {
        // Sem localStorage a sessão vive só em memória.
    }
}

export function useAuth() {
    const [usuario, setUsuario] = useState<UsuarioDTO | null>(() => lerUsuarioSalvo())

    const executar = useCallback(async (acao: () => Promise<UsuarioDTO>) => {
        try {
            const resultado = await acao()
            setUsuario(resultado)
            salvarUsuario(resultado)
            return { ok: true }
        } catch (erro) {
            return { ok: false, reason: mensagemDe(erro, 'Falha na operação') }
        }
    }, [])

    const entrar = useCallback(
        (credenciais: Credenciais) => executar(() => loginApi(credenciais)),
        [executar],
    )

    const cadastrar = useCallback(
        (dados: NovoUsuario) => executar(() => criarUsuario(dados)),
        [executar],
    )

    return { usuario, entrar, cadastrar }
}
