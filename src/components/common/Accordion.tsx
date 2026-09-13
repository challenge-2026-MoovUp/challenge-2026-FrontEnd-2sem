import { useState } from 'react';

// Estrutura de dados de cada pergunta/card do accordion
export interface AccordionItemData {
  id: string;
  title: string;
  preview: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  /** Se true, permite vários cards abertos ao mesmo tempo (igual ao <details> original,
   *  onde cada item é independente). Por padrão só um fica aberto por vez. */
  allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  // Um único estado (Set de ids abertos) resolve tudo — não precisa de um
  // useState por card nem de manipular atributo `open` manualmente.
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function handleToggle(id: string, isOpen: boolean) {
    setOpenIds((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (isOpen) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <details
            key={item.id}
            className="w-[min(800px,100%)] max-w-[800px] overflow-hidden rounded-2xl border border-aurora-glow bg-dusk py-4 text-left text-mist [transition:all_.5s_ease] hover:border-violet-glow-50 hover:bg-violet-glow-08 hover:shadow-[0_0_20px_var(--color-violet-glow-08),inset_0_0_20px_var(--color-violet-glow-03)]"
            open={isOpen}
            onToggle={(e) => handleToggle(item.id, e.currentTarget.open)}
          >
            <summary className="flex list-none items-center justify-between px-5 py-[18px] text-[15px] font-thin [&::-webkit-details-marker]:hidden">
              <div>
                <h3 className="font-thin">{item.title}</h3>
                <p className={`text-[14px] font-thin leading-[1.6] text-gray-strong transition-[max-height,opacity,padding] duration-300 ease-in-out ${isOpen ? 'mt-0 max-h-0 overflow-hidden pt-0 opacity-0' : 'mt-5 max-h-20 overflow-hidden opacity-100'}`}>{item.preview}</p>
              </div>
              <i
                aria-hidden="true"
                className={`relative mt-0.5 flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border text-dust [text-indent:-999px] transition-[transform,border-color,background-color,color] duration-300 before:absolute before:left-1/2 before:top-1/2 before:h-[1.5px] before:w-[10px] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-current before:content-[''] after:absolute after:left-1/2 after:top-1/2 after:h-[10px] after:w-[1.5px] after:-translate-x-1/2 after:-translate-y-1/2 after:bg-current after:content-[''] ${
                  isOpen ? 'rotate-45 border-aurora-soft bg-aurora-glow text-aurora-soft' : 'border-border-mid'
                }`}
              >{isOpen ? 'Fechar' : 'Abrir'}</i>
            </summary>

            <div className="border-t border-border px-5 pb-5 text-[1.4rem] leading-[1.6] text-dust">{item.content}</div>
          </details>
        );
      })}
    </div>
  );
}