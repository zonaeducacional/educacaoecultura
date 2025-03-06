
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ArticleCard from '@/components/ArticleCard';
import FeaturedArticle from '@/components/FeaturedArticle';
import { articles } from '@/data/articles';

const Index = () => {
  // Get the featured article (first in the list)
  const featuredArticle = articles[0];
  
  // Get other articles excluding the featured one
  const otherArticles = articles.slice(1);

  // Categories for filtering
  const categories = ['Educação', 'Cultura', 'Opinião'];

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Featured Article */}
      <section className="pt-28 pb-12 container mx-auto px-4">
        <FeaturedArticle 
          id={featuredArticle.id}
          title={featuredArticle.title}
          excerpt={featuredArticle.excerpt}
          imageUrl={featuredArticle.imageUrl}
          category={featuredArticle.category}
          date={featuredArticle.date}
          author={featuredArticle.author}
        />
      </section>
      
      {/* Categories Section */}
      <section className="py-12 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-3">Explore por Categorias</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Navegue por nossos artigos categorizados para encontrar conteúdo relevante sobre educação e cultura.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link 
                key={category} 
                to={`/${encodeURIComponent(category.toLowerCase())}`}
                className="neumorph-sm flex flex-col items-center justify-center p-10 transition-all duration-300 hover:translate-y-[-5px]"
              >
                <h3 className="text-xl font-bold mb-2">{category}</h3>
                <p className="text-muted-foreground text-center">
                  {category === 'Educação' 
                    ? 'Reflexões sobre ensino, aprendizagem e políticas educacionais.' 
                    : category === 'Cultura' 
                      ? 'Análises sobre arte, literatura, música e manifestações culturais.' 
                      : 'Artigos que expressam perspectivas pessoais sobre temas contemporâneos.'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recent Articles Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Artigos Recentes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Confira nossas publicações mais recentes sobre educação, cultura e sociedade.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherArticles.map((article) => (
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
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Fique por dentro</h2>
            <p className="mb-6 text-white/90">
              Assine nossa newsletter e receba em primeira mão os novos artigos e conteúdos exclusivos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="px-4 py-3 rounded-lg text-foreground w-full sm:w-auto sm:min-w-[300px] focus:outline-none"
              />
              <button className="bg-white text-orange-500 font-medium px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors">
                Assinar
              </button>
            </div>
            
            <p className="mt-4 text-sm text-white/80">
              Prometemos não enviar spam e você pode cancelar a qualquer momento.
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">CulturaEduca</h3>
              <p className="text-muted-foreground">
                Reflexões e análises sobre educação e cultura para um mundo em transformação.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Categorias</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <Link to={`/${encodeURIComponent(category.toLowerCase())}`} className="text-muted-foreground hover:text-orange-500 transition-colors">
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/sobre" className="text-muted-foreground hover:text-orange-500 transition-colors">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link to="/contato" className="text-muted-foreground hover:text-orange-500 transition-colors">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link to="/termos" className="text-muted-foreground hover:text-orange-500 transition-colors">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link to="/privacidade" className="text-muted-foreground hover:text-orange-500 transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Contato</h3>
              <address className="not-italic text-muted-foreground">
                <p>contato@culturaeduca.com.br</p>
                <p>São Paulo, SP - Brasil</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} CulturaEduca. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
