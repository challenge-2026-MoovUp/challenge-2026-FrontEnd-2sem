import { useEffect, useRef, useState } from 'react';

interface FaqCategory {
  id: string;
  label: string;
}

interface FaqSidebarProps {
  categories: FaqCategory[];
}

export default function FaqSidebar({ categories }: FaqSidebarProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Observa as seções da página e ativa o link correspondente conforme o scroll
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    categories.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [categories]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <aside className="faq-sidebar">
      <nav className="faq-sidebar__nav" aria-label="Categorias da FAQ">
        {categories.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`faq-sidebar__link${activeId === id ? ' is-active' : ''}`}
            onClick={(e) => handleClick(e, id)}
          >
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}