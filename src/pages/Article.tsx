
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ArticleCard from '@/components/ArticleCard';
import { articles } from '@/data/articles';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState(articles.find(a => a.id === id));
  const [relatedArticles, setRelatedArticles] = useState<typeof articles>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (article) {
      // Find related articles (same category, excluding current)
      const related = articles
        .filter(a => a.category === article.category && a.id !== article.id)
        .slice(0, 3);
      setRelatedArticles(related);
    }
  }, [id, article]);
  
  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Artigo não encontrado</h1>
          <p className="text-muted-foreground mb-6">O artigo que você está procurando não existe ou foi removido.</p>
          <Link 
            to="/" 
            className="inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Article Header */}
      <header className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10" />
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4">
            <Link 
              to="/" 
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Link>
            
            <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
              {article.category}
            </span>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </header>
      
      {/* Article Meta */}
      <div className="bg-secondary py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center text-muted-foreground gap-6">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{article.author}</span>
              {article.authorTitle && (
                <span className="text-sm ml-2 italic">({article.authorTitle})</span>
              )}
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{article.date}</span>
            </div>
            
            {article.tags && article.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="h-4 w-4 mr-1" />
                {article.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-xs bg-background px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Article Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </article>
          
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-xl font-bold mb-4">Sobre o autor</h3>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold text-orange-500">
                {article.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold">{article.author}</h4>
                {article.authorTitle && (
                  <p className="text-muted-foreground">{article.authorTitle}</p>
                )}
                <p className="mt-2">
                  Autor de artigos sobre {article.category.toLowerCase()} e temas relacionados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-secondary/50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Artigos Relacionados</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map(article => (
                <ArticleCard 
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  imageUrl={article.imageUrl}
                  category={article.category}
                  date={article.date}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Footer - Simplified version */}
      <footer className="bg-secondary py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} CulturaEduca. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Article;
