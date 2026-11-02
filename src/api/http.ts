const API_URL = import.meta.env.VITE_API_URL ?? ''

/** Erro no formato do contrato: { status, mensagem, timestamp }. */
export class ApiError extends Error {
    status: number
    mensagem: string

    constructor(status: number, mensagem: string) {
        super(mensagem)
        this.name = 'ApiError'
        this.status = status
        this.mensagem = mensagem
    }
}

export function mensagemDe(erro: unknown, padrao: string) {
    return erro instanceof ApiError ? erro.mensagem : padrao
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    let res: Response

    try {
        res = await fetch(`${API_URL}${path}`, {
            ...init,
            headers: init?.body ? { 'Content-Type': 'application/json' } : undefined,
        })
    } catch {
        throw new ApiError(0, 'Não foi possível conectar à API')
    }

    // fetch não rejeita em 404/422: o status tem que ser checado na mão.
    if (!res.ok) {
        const corpo = (await res.json().catch(() => null)) as { status?: number; mensagem?: string } | null
        throw new ApiError(corpo?.status ?? res.status, corpo?.mensagem ?? 'Falha na API')
    }

    if (res.status === 204) return undefined as T

    return (await res.json()) as T
}

export function get<T>(path: string) {
    return request<T>(path)
}

export function post<T>(path: string, body?: unknown) {
    return request<T>(path, { method: 'POST', body: JSON.stringify(body ?? {}) })
}

export function put<T>(path: string, body?: unknown) {
    return request<T>(path, { method: 'PUT', body: JSON.stringify(body ?? {}) })
}

export function patch<T>(path: string) {
    return request<T>(path, { method: 'PATCH' })
}

export function del(path: string) {
    return request<void>(path, { method: 'DELETE' })
}
