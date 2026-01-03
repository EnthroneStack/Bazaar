import { useRef, useEffect, useState } from "react";
import { categories } from "@/assets/assets";

const CategoriesMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [repeatedCategories, setRepeatedCategories] = useState<string[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    const fullList = Array(10).fill(categories).flat();

    setRepeatedCategories(fullList);
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden relative max-w-6xl px-6 mx-auto select-none group"
    >
      <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

      <div
        ref={contentRef}
        className="flex animate-[marqueeScroll_30s_linear_infinite] group-hover:[animation-play-state:paused] gap-4"
      >
        {repeatedCategories.map((category, index) => (
          <button
            key={index}
            className="px-5 py-2 bg-slate-100 rounded-lg text-slate-500 text-xs sm:text-sm hover:bg-slate-600 hover:text-white active:scale-95 transition-all duration-300"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
    </div>
  );
};

export default CategoriesMarquee;
