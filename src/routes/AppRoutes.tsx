import { Routes, Route } from "react-router-dom";
import Layout from '../components/layout/Layout.tsx';
import Home from '../pages/Home/Home.tsx';
import Sobre from '../pages/Sobre/Sobre.tsx';
// import Solucao from '../pages/Solucao/Solucao.tsx';
import QuemSomos from '../pages/QuemSomos/QuemSomos.tsx';
// import Faq from '../pages/Faq/Faq.tsx';
// import Contato from '../pages/Contato/Contato.tsx';

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="quem-somos" element={<QuemSomos />}/>
                <Route path="sobre" element={<Sobre />} />
                {/* <Route path="solucao" element={<Solucao />} /> */}
                {/* <Route path="faq" element={<Faq />} /> */}
                {/* <Route path="contato" element={<Contato />} /> */}
            </Route>
        </Routes>
    )
}
