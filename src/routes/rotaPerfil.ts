export function rotaPerfil(handle: string) {
    return `/usuario/${encodeURIComponent(handle.slice(1))}`
}
