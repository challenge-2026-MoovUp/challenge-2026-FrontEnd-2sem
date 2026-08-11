import { Routes, Route } from "react-router-dom";
import Layout from './components/layout/Layout.tsx';
import Home from './pages/Home.tsx';
// import Sobre from './pages/Sobre.tsx';
// import Solucao from './pages/Solucao.tsx';
// import QuemSomos from './pages/QuemSomos.tsx';
// import Faq from './pages/Faq.tsx';
// import Contato from './pages/Contato.tsx';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} /> 
                {/* <Route path="quem-somos" element={<QuemSomos />} />
                <Route path="sobre" element={<Sobre />} />
                <Route path="solucao" element={<Solucao />} />
                <Route path="faq" element={<Faq />} />
                <Route path="contato" element={<Contato />} /> */}
            </Route>
        </Routes>
    )
}
export default App