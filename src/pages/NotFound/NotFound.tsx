import { Link, useLocation } from 'react-router-dom'

export default function NotFound() {
    const { pathname } = useLocation()

    return (
        <section className="mx-auto flex min-h-[60vh] max-w-[600px] flex-col items-center justify-center gap-4 px-6 text-center">
            <h1 className="text-[6rem] font-light text-mist tablet:text-[9rem]">404</h1>
            <p className="font-sans text-[1.5rem] text-mist-dim">
                A página <span className="text-aurora-soft">{pathname}</span> não existe.
            </p>
            <Link to="/" className="font-sans text-[1.4rem] text-aurora-soft underline underline-offset-4 hover:text-aurora">
                Voltar ao início
            </Link>
        </section>
    )
}
