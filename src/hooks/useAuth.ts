/* Login/cadastro contra a API. O contrato não tem token: o login devolve o
   usuário e o front guarda o id para usá-lo nas demais chamadas.

   Ligado no Layout: entrar() e cadastrar() alimentam o LoginModal, e o id
   guardado aqui é o mesmo que o WalletProvider recebe como userId. */

import { useCallback, useState } from 'react'
import { ApiError } from '../api/http'
import { buscarUsuario, criarUsuario, login as loginApi } from '../api/usuariosApi'
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

function salvarUsuario(usuario: UsuarioDTO | null) {
    try {
        if (usuario) localStorage.setItem(storageKey, JSON.stringify(usuario))
        else localStorage.removeItem(storageKey)
    } catch {
        // localStorage indisponível: a sessão vive só em memória.
    }
}

export function useAuth() {
    const [usuario, setUsuario] = useState<UsuarioDTO | null>(() => lerUsuarioSalvo())
    const [enviando, setEnviando] = useState(false)
    const [error, setError] = useState<string | null>(null)

    /* Toda operação segue o mesmo roteiro: liga enviando, chama, guarda o
       usuário ou traduz o ApiError em mensagem de tela. */
    const executar = useCallback(async (acao: () => Promise<UsuarioDTO>) => {
        setEnviando(true)
        setError(null)

        try {
            const resultado = await acao()
            setUsuario(resultado)
            salvarUsuario(resultado)
            return { ok: true, usuario: resultado }
        } catch (erro) {
            const reason = erro instanceof ApiError ? erro.mensagem : 'Falha na operação'
            setError(reason)
            return { ok: false, reason }
        } finally {
            setEnviando(false)
        }
    }, [])

    /** Erros: 400 (dados inválidos), 401 (login inválido). */
    const entrar = useCallback(
        (credenciais: Credenciais) => executar(() => loginApi(credenciais)),
        [executar],
    )

    /** Erros: 400, 422 (e-mail já existe). */
    const cadastrar = useCallback(
        (dados: NovoUsuario) => executar(() => criarUsuario(dados)),
        [executar],
    )

    /** Recarrega o usuário do servidor — use depois de publicar ou resgatar,
        porque é o saldoPontos de lá que vale. */
    const atualizarSaldo = useCallback(() => {
        if (!usuario) return Promise.resolve({ ok: false, reason: 'Sem usuário logado' })
        return executar(() => buscarUsuario(usuario.id))
    }, [executar, usuario])

    const sair = useCallback(() => {
        setUsuario(null)
        salvarUsuario(null)
    }, [])

    return { usuario, enviando, error, entrar, cadastrar, atualizarSaldo, sair }
}
