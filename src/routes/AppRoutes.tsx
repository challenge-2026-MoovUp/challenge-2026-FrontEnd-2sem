import { Routes, Route, useParams } from "react-router-dom";
import Layout from '../components/layout/Layout.tsx';
import Home from '../pages/Home/Home.tsx';
import Sobre from '../pages/Sobre/Sobre.tsx';
import Solucao from '../pages/Solucao/Solucao.tsx';
import QuemSomos from '../pages/QuemSomos/QuemSomos.tsx';
import Faq from '../pages/Faq/Faq.tsx';
import Contato from '../pages/Contato/Contato.tsx';
import Video from '../pages/Video/Video.tsx';
import Feed from '../pages/Feed/Feed.tsx'
import Carteira from '../pages/Carteira/Carteira.tsx'
import NotFound from '../pages/NotFound/NotFound.tsx'
import Usuario from '../pages/Usuario/Usuario.tsx'
import { useUsuario } from '../hooks/useUsuario.ts'

function UsuarioRoute() {
    const { id } = useParams()
    const { perfil, posts, loading, error, recarregar } = useUsuario(id)
    return <Usuario perfil={perfil} posts={posts} loading={loading} error={error} onRecarregar={recarregar} />
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="feed" element={<Feed />} />
                <Route path="carteira" element={<Carteira />} />
                <Route path="quem-somos" element={<QuemSomos />}/>
                <Route path="sobre" element={<Sobre />} />
                <Route path="solucao" element={<Solucao />} />
                <Route path="solucao/video/:videoId" element={<Video />} />
                <Route path="faq" element={<Faq />} />
                <Route path="contato" element={<Contato />} />
                <Route path="usuario/:id" element={<UsuarioRoute />}/>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}
