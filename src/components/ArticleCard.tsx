
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  excerpt,
  imageUrl,
  category,
  date,
  className
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
          }
        });
      }, 
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "neumorph overflow-hidden transition-all duration-300 hover:translate-y-[-5px] opacity-0",
        className
      )}
    >
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-4 left-4 z-20 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium">
          {category}
        </span>
      </div>
      
      <div className="p-6">
        <div className="text-sm text-muted-foreground mb-2">{date}</div>
        <h3 className="text-xl font-bold tracking-tight mb-2 line-clamp-2">{title}</h3>
        <p className="text-muted-foreground line-clamp-3 mb-4">{excerpt}</p>
        
        <Link 
          to={`/artigo/${id}`} 
          className="inline-flex items-center text-orange-500 font-medium hover:text-orange-600 transition-colors group"
        >
          Leia Mais
          <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
