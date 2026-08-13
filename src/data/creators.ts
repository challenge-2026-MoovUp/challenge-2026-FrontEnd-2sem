import type { Creator } from '../types/team'
import FotoPedro from '../assets/foto-pedro.jpeg'
import FotoJuan from '../assets/foto-juan.jpeg'
import FotoLucas from '../assets/foto-lucas.jpeg'
import FotoMatheus from '../assets/foto-matheus.jpeg'

export const creators: Creator[] = [
    {
        id: 'pedro',
        name: 'Pedro Amaro Pires',
        rm: 'RM570636',
        class: '1TDSPJ',
        photo: FotoPedro,
        github: 'https://github.com/pedroamarop',
        linkedin: 'https://www.linkedin.com/in/pedro-amaro-pires',
        bio: [
            '💻 Sou um desenvolvedor em formação com interesse em criar soluções práticas e funcionais. Tenho experiência com projetos acadêmicos e pessoais, trabalhando principalmente com:',
            'Gosto de entender como as coisas funcionam por trás e estou sempre buscando evoluir minhas habilidades técnicas.',
        ],
        bioList: [
            'Desenvolvimento web (HTML, CSS, JS, Typescript, React)',
            'Lógica de programação e orientação a objetos (Java)',
            'Ferramentas de edição e criação de conteúdo',
            'Automação e testes com diferentes softwares',
        ],
    },
    {
        id: 'juan',
        name: 'Juan Souza Marques',
        rm: 'RM573469',
        class: '1TDSPJ',
        photo: FotoJuan,
        github: 'https://github.com/juansouzamarques',
        linkedin: 'https://www.linkedin.com/in/juan-marques-297b293b4/',
        bio: [
            'Estudante de Análise e Desenvolvimento de Sistemas, atualmente focado em expandir conhecimentos em desenvolvimento de software e tecnologia. Dedicado ao aprendizado contínuo em Java, Python e AWS Cloud, com interesse em desenvolvimento backend, automação, soluções escaláveis e melhores práticas de programação. Apaixonado por tecnologia, resolução de problemas e crescimento profissional na área de TI.',
        ],
    },
    {
        id: 'lucas',
        name: 'Lucas Leite Carlos',
        rm: 'RM571985',
        class: '1TDSPJ',
        photo: FotoLucas,
        github: 'https://github.com/Leite-1309',
        linkedin: 'https://www.linkedin.com/in/lucas-leite-carlos-5b72973a9/',
        bio: [
            'Sou estudante de Análise e Desenvolvimento de Sistemas na FIAP, com interesse em tecnologia, programação e resolução de problemas. Atualmente estou desenvolvendo meus conhecimentos em lógica de programação, desenvolvimento de sistemas e fundamentos de tecnologia, sempre buscando evoluir tanto tecnicamente quanto profissionalmente. Tenho facilidade para aprender, gosto de desafios e estou aberto(a) a oportunidades de estágio e projetos que me permitam aplicar na prática o que venho estudando.',
        ],
    },
    {
        id: 'matheus',
        name: 'Matheus Matsushita de Souza',
        rm: 'RM570017',
        class: '1TDSPJ',
        photo: FotoMatheus,
        github: 'https://github.com/Matsushita1907',
        linkedin: 'https://www.linkedin.com/in/matheus-matsushita-de-souza-543269346/',
        bio: [
            'Estou em busca de uma nova oportunidade profissional onde eu possa aplicar meus conhecimentos, crescer junto com a equipe e contribuir com resultados reais. Faço ADS na instituição de ensino FIAP. Sou uma pessoa educada, racional e me dou muito bem trabalhando em equipe. Estou aberto a vagas presenciais / híbridas / remotas. Caso saiba de alguma oportunidade ou possa me indicar, estarei à disposição! Pode entrar em contato comigo por aqui no LinkedIn ou pelo e-mail: theus.matsu@gmail.com',
        ],
    },
]