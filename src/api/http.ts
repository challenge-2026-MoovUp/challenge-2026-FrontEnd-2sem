/* Base de todas as chamadas à API MoovUp.
   Único arquivo que conhece a URL do servidor e o formato de erro do contrato;
   os api/*.ts acima dele só descrevem endpoints. */

const API_URL = import.meta.env.VITE_API_URL ?? ''

/** Erro no formato padronizado pelo contrato: { status, mensagem, timestamp }. */
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

/** Corpo de erro devolvido pela API. */
interface ErroDTO {
    status: number
    mensagem: string
    timestamp: string
}

async function lerErro(res: Response): Promise<ApiError> {
    try {
        const corpo = (await res.json()) as Partial<ErroDTO>
        return new ApiError(corpo.status ?? res.status, corpo.mensagem ?? res.statusText)
    } catch {
        // Erro sem corpo JSON (502, timeout, HTML de proxy): usa o status cru.
        return new ApiError(res.status, res.statusText || 'Falha na comunicação com o servidor')
    }
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
    let res: Response

    try {
        res = await fetch(`${API_URL}${path}`, {
            ...init,
            headers: {
                ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
                ...init?.headers,
            },
        })
    } catch {
        // Servidor fora do ar, DNS, CORS bloqueado: fetch rejeita sem status.
        throw new ApiError(0, 'Não foi possível conectar à API')
    }

    // fetch NÃO rejeita em 404/422 — o status precisa ser checado na mão.
    if (!res.ok) throw await lerErro(res)

    // 204 No Content (DELETE) não tem corpo: res.json() quebraria.
    if (res.status === 204) return undefined as T

    return (await res.json()) as T
}

/* ---------- Atalhos por verbo ---------- */

export function get<T>(path: string) {
    return request<T>(path)
}

export function post<T>(path: string, body?: unknown) {
    return request<T>(path, { method: 'POST', body: JSON.stringify(body ?? {}) })
}

export function put<T>(path: string, body?: unknown) {
    return request<T>(path, { method: 'PUT', body: JSON.stringify(body ?? {}) })
}

export function patch<T>(path: string, body?: unknown) {
    return request<T>(path, { method: 'PATCH', body: JSON.stringify(body ?? {}) })
}

export function del(path: string) {
    return request<void>(path, { method: 'DELETE' })
}
