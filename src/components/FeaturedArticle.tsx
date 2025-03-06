
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface FeaturedArticleProps {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  author: string;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({
  id,
  title,
  excerpt,
  imageUrl,
  category,
  date,
  author
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl neumorph shadow-neumorph-lg group">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 z-20 p-8 text-white">
        <div className="space-y-3 max-w-3xl animate-slide-up">
          <div className="flex items-center gap-3">
            <span className="bg-orange-500 px-3 py-1 rounded-full text-xs font-medium">
              {category}
            </span>
            <span className="text-sm opacity-80">{date}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">{title}</h2>
          <p className="text-lg opacity-90 line-clamp-3">{excerpt}</p>
          
          <div className="pt-3 flex items-center justify-between">
            <div className="text-sm">
              Por <span className="font-medium">{author}</span>
            </div>
            
            <Link 
              to={`/artigo/${id}`} 
              className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-5 py-2 rounded-full transition-all duration-300 hover:bg-white/20 group-hover:translate-x-1"
            >
              Leia Mais
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;
