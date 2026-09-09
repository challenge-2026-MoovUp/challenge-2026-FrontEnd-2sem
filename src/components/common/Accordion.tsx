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
    <div className="accordion-list">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <details
            key={item.id}
            className="accordion"
            open={isOpen}
            onToggle={(e) => handleToggle(item.id, e.currentTarget.open)}
          >
            <summary>
              <div>
                <h3 className="accordion__title">{item.title}</h3>
                <p className="accordion__subtitle">{item.preview}</p>
              </div>
              <i aria-hidden="true">{isOpen ? 'Fechar' : 'Abrir'}</i>
            </summary>

            <div className="accordion__content">{item.content}</div>
          </details>
        );
      })}
    </div>
  );
}