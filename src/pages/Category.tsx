
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ArticleCard from '@/components/ArticleCard';
import { articles } from '@/data/articles';
import { ArrowLeft } from 'lucide-react';

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const decodedCategory = category ? decodeURIComponent(category) : '';
  const formattedCategory = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);
  
  // Filter articles by category
  const [filteredArticles, setFilteredArticles] = useState(
    articles.filter(article => 
      article.category.toLowerCase() === formattedCategory.toLowerCase()
    )
  );
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Update filtered articles when category changes
    setFilteredArticles(
      articles.filter(article => 
        article.category.toLowerCase() === formattedCategory.toLowerCase()
      )
    );
  }, [formattedCategory]);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Category Header */}
      <header className="pt-32 pb-12 container mx-auto px-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a página inicial
        </Link>
        
        <h1 className="text-4xl font-bold tracking-tight mb-3">{formattedCategory}</h1>
        <p className="text-muted-foreground max-w-2xl">
          {formattedCategory === 'Educação' 
            ? 'Reflexões sobre ensino, aprendizagem e políticas educacionais.' 
            : formattedCategory === 'Cultura' 
              ? 'Análises sobre arte, literatura, música e manifestações culturais.' 
              : 'Artigos que expressam perspectivas pessoais sobre temas contemporâneos.'}
        </p>
      </header>
      
      {/* Articles Grid */}
      <main className="container mx-auto px-4 pb-16">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
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
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Nenhum artigo encontrado</h2>
            <p className="text-muted-foreground mb-6">Não encontramos artigos para esta categoria.</p>
            <Link 
              to="/" 
              className="inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Link>
          </div>
        )}
      </main>
      
      {/* Footer - Simplified version */}
      <footer className="bg-secondary py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} CulturaEduca. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Category;
