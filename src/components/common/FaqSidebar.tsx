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
    <aside className="sticky top-[90px] self-start">
      <nav className="flex flex-col gap-[10px]" aria-label="Categorias da FAQ">
        {categories.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`flex items-center gap-2 rounded-[10px] p-4 font-sans text-[1.4rem] text-dust [transition:all_.5s_ease]${
              activeId === id
                ? ' bg-aurora-glow text-aurora-soft before:inline-flex before:items-center before:text-[1.5rem] before:font-black before:leading-none before:content-["•"]'
                : ' hover:text-aurora'
            }`}
            onClick={(e) => handleClick(e, id)}
          >
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}