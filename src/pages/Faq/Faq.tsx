import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Accordion from '../../components/common/Accordion';
import type { AccordionItemData } from '../../components/common/Accordion';
import FaqSidebar from '../../components/common/FaqSidebar';

interface FaqCategory {
  id: string;
  icon: string;
  label: string;
  items: AccordionItemData[];
}

const categories: FaqCategory[] = [
  {
    id: 'conta-cadastro',
    icon: '✦',
    label: 'Conta & Cadastro',
    items: [
      {
        id: 'criar-conta',
        title: 'Como crio minha conta na MoovUp?',
        preview:
          'Basta acessar nosso site ou app, clicar em "Criar conta" e preencher seus dados básicos — nome, e-mail...',
        content: (
          <>
            Basta acessar nosso site ou app, clicar em "Criar conta" e preencher seus dados
            básicos — nome, e-mail e telefone. Após concluir o cadastro, sua conta será ativada
            automaticamente e você já poderá começar a utilizar todas as funcionalidades da
            plataforma, acompanhar seu saldo de pontos em tempo real e participar de campanhas
            exclusivas disponíveis para novos usuários.
          </>
        ),
      },
      {
        id: 'cadastro-gratuito',
        title: 'O cadastro é gratuito?',
        preview:
          'Sim! O cadastro e o uso das funcionalidades básicas do PontosApp são totalmente gratuitos...',
        content: (
          <>
            Sim! O cadastro e o uso das funcionalidades básicas do PontosApp são totalmente
            gratuitos. Você pode acumular pontos, acompanhar recompensas e utilizar os recursos
            principais sem nenhum custo adicional. Alguns serviços premium poderão ser
            disponibilizados futuramente, oferecendo vantagens extras e recursos avançados para
            usuários que desejarem uma experiência ainda mais completa dentro da plataforma.
          </>
        ),
      },
      {
        id: 'mais-de-uma-conta',
        title: 'Posso ter mais de uma conta?',
        preview:
          'Não. Cada usuário pode possuir apenas uma conta vinculada ao seu CPF, e-mail e número de telefone...',
        content: (
          <>
            Não. Cada usuário pode possuir apenas uma conta vinculada ao seu CPF, e-mail e número
            de telefone. Essa medida existe para garantir mais segurança, transparência e evitar
            fraudes no sistema de pontuação. Caso sejam identificadas contas duplicadas ou
            atividades suspeitas, o acesso poderá ser temporariamente bloqueado até que a situação
            seja analisada pela equipe de suporte.
          </>
        ),
      },
    ],
  },
  {
    id: 'pontos-recompensas',
    icon: '◈',
    label: 'Pontos & Recompensas',
    items: [
      {
        id: 'calculo-pontos',
        title: 'Como os pontos são calculados?',
        preview:
          'Os pontos são calculados com base nas interações realizadas dentro da plataforma...',
        content: (
          <>
            Os pontos são calculados com base nas interações realizadas dentro da plataforma.
            Curtidas, compartilhamentos, comentários, participação em campanhas e desafios
            especiais possuem valores específicos em pontuação. Algumas ações promocionais podem
            oferecer multiplicadores temporários, aumentando a quantidade de pontos recebidos. O
            usuário pode acompanhar todas as movimentações diretamente pelo painel da conta.
          </>
        ),
      },
      {
        id: 'pontos-expiram',
        title: 'Os pontos expiram?',
        preview:
          'Sim. Os pontos acumulados possuem validade e podem expirar após determinado período sem movimentação...',
        content: (
          <>
            Sim. Os pontos acumulados possuem validade e podem expirar após determinado período
            sem movimentação na conta. Para evitar a perda dos pontos, basta continuar utilizando
            a plataforma regularmente, realizando interações ou efetuando resgates dentro do prazo
            informado. O sistema também poderá enviar notificações avisando sobre pontos próximos
            da expiração.
          </>
        ),
      },
      {
        id: 'minimo-resgate',
        title: 'Qual o mínimo de pontos para resgatar?',
        preview:
          'O valor mínimo para resgate pode variar conforme a recompensa disponível no momento...',
        content: (
          <>
            O valor mínimo para resgate pode variar conforme a recompensa disponível no momento.
            Em geral, os usuários conseguem iniciar seus resgates a partir de uma quantidade básica
            de pontos acumulados na plataforma. Quanto maior a pontuação acumulada, maiores poderão
            ser os benefícios, descontos e vantagens oferecidos dentro das campanhas parceiras.
          </>
        ),
      },
    ],
  },
  {
    id: 'descontos-energia',
    icon: '⚡',
    label: 'Descontos de energia',
    items: [
      {
        id: 'como-funciona-desconto',
        title: 'Como funciona o desconto na conta de energia?',
        preview:
          'O usuário pode converter os pontos acumulados em créditos para obter descontos na conta de energia elétrica...',
        content: (
          <>
            O usuário pode converter os pontos acumulados em créditos para obter descontos na
            conta de energia elétrica. Para isso, basta informar corretamente os dados da
            instalação vinculada à concessionária parceira. Após a solicitação, o desconto é
            processado e aplicado diretamente em uma das próximas faturas, conforme os prazos e
            regras definidos pela operadora responsável.
          </>
        ),
      },
      {
        id: 'concessionarias-aceitas',
        title: 'Quais concessionárias são aceitas?',
        preview:
          'Atualmente, a plataforma trabalha com diversas concessionárias parceiras distribuídas em diferentes regiões do Brasil...',
        content: (
          <>
            Atualmente, a plataforma trabalha com diversas concessionárias parceiras distribuídas
            em diferentes regiões do Brasil. A lista de empresas participantes é atualizada
            constantemente para ampliar a cobertura do serviço e permitir que mais usuários possam
            utilizar seus pontos em descontos reais na conta de energia elétrica.
          </>
        ),
      },
    ],
  },
  {
    id: 'suporte',
    icon: '❋',
    label: 'Suporte',
    items: [
      {
        id: 'contato-suporte',
        title: 'Como entro em contato com o suporte?',
        preview:
          'Você pode entrar em contato com nossa equipe de suporte diretamente pelo chat disponível no aplicativo...',
        content: (
          <>
            Você pode entrar em contato com nossa equipe de suporte diretamente pelo chat
            disponível no aplicativo, através do{' '}
            <Link to="/contato" className="font-black">formulário da página de contato</Link> ou enviando um e-mail para
            nossa central de atendimento. Nossa equipe está preparada para auxiliar em dúvidas,
            problemas técnicos, recuperação de acesso e informações sobre campanhas, pontos e
            resgates disponíveis na plataforma.
          </>
        ),
      },
    ],
  },
];

export default function Faq() {
  const [query, setQuery] = useState('');

  const filteredCategories = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return categories;

    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.title.toLowerCase().includes(normalized) ||
            item.preview.toLowerCase().includes(normalized)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [query]);

  const totalQuestions = filteredCategories.reduce((total, category) => total + category.items.length, 0);
  const sidebarCategories = filteredCategories.map(({ id, label }) => ({ id, label }));

  return (
    <main className="mx-auto flex w-1/2 flex-col">
      <div className="mt-40 flex w-full items-end justify-between">
        <div className="flex max-w-[50%] flex-col items-start text-[4.5rem]">
          <h1 className="flex flex-col items-start text-left font-thin text-mist">
            Perguntas{' '}
            <span className="mt-1 block bg-gradiente-aurora bg-clip-text italic text-transparent">
              frequentes
            </span>
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <label className="relative block w-fit">
            <i aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-border-mid">🔍</i>
            <input
              type="search"
              className="w-auto rounded-[30px] border border-border-mid bg-dusk py-[0.9rem] pl-11 pr-32 font-sans text-mist outline-none [&::-webkit-search-cancel-button]:hidden focus:border-violet-glow-50 focus:bg-violet-glow-08 focus:shadow-[0_0_20px_var(--color-violet-glow-08),inset_0_0_20px_var(--color-violet-glow-03)]"
              placeholder="Buscar por palavra-chave..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <span className="font-sans text-[0.95rem] text-mist-dim">{totalQuestions} pergunta{totalQuestions === 1 ? '' : 's'} encontrada{totalQuestions === 1 ? '' : 's'}</span>
        </div>
      </div>

      <section className="mt-16 grid w-full grid-cols-[180px_1fr] gap-8">
        <FaqSidebar categories={sidebarCategories} />

        <section className="flex w-full flex-col gap-16">
          {filteredCategories.map((category) => (
            <div className="flex w-full scroll-mt-[120px] flex-col items-stretch gap-5" key={category.id} id={category.id}>
              <div className="flex items-end gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-aurora-glow bg-dusk text-[2rem] text-mist">{category.icon}</div>
                <div>
                  <h2 className="mt-10 w-[min(800px,100%)] self-start text-left text-[2.5rem] font-thin text-mist">{category.label}</h2>
                  <div className="font-sans text-[0.95rem] text-mist-dim">{category.items.length} perguntas</div>
                </div>
              </div>
              <Accordion items={category.items} />
            </div>
          ))}
        </section>
      </section>

      <div className="mt-40">
        <div className="box-border flex items-end justify-between rounded-[30px] border border-border bg-dusk p-12 text-mist">
          <div>
            <p className="mb-[10px] font-sans text-[1.3rem] font-medium text-aurora-soft">Ainda com dúvidas?</p>
            <h3 className="mb-[10px] w-[70%] bg-gradiente-mist bg-clip-text text-[3rem] font-light text-transparent">
              Fale direto com a <span className="font-light italic text-ember-soft">nossa equipe</span>
            </h3>
            <p className="font-sans text-[1.2rem] font-light text-dust">Nosso time de suporte responde em até 24 horas.</p>
          </div>
          <div className="flex flex-wrap justify-end p-8">
            <Link
              className="flex justify-items-center whitespace-nowrap rounded-[20px] bg-transparent text-center text-base font-bold font-sans border border-aurora-30 rounded-full px-[18px] py-[8px] text-[1.3rem] font-normal uppercase tracking-[0.06em] text-aurora-soft no-underline transition-all duration-200 hover:cursor-pointer hover:border-violet-glow-50 hover:bg-violet-glow-08 hover:shadow-[0_0_20px_var(--color-violet-glow-08),inset_0_0_20px_var(--color-violet-glow-03)]"
              to="/contato"
            >
              <span>Falar com o suporte</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}