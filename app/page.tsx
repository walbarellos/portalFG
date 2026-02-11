import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NewsCard from '@/components/NewsCard';
import { getPosts } from '@/lib/db';
import Link from 'next/link';

export const revalidate = 0; // Ensure fresh data on every request for this demo

export default async function Home() {
  const posts = await getPosts();
  const latestPost = posts[0];
  const hotNews = posts.slice(1, 4);
  const otherNews = posts.slice(4);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        {latestPost ? (
          <section>
            <Hero post={latestPost} />
          </section>
        ) : (
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-muted-foreground">Nenhuma notícia publicada ainda.</h1>
          </div>
        )}

        {/* Hot News Section */}
        {hotNews.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6 border-b pb-2 border-border/50">
              <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-accent rounded-sm"></span>
                Notícias Quentes
              </h2>
              {/* Link to all news can be added later */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hotNews.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Latest News / Feed */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2 border-b pb-4">
               Últimas Notícias
            </h2>
            <div className="space-y-6">
              {otherNews.length > 0 ? (
                otherNews.map((post) => (
                   <Link href={`/noticia/${post.slug}`} key={post.id} className="flex gap-4 group items-start hover:bg-muted/10 p-2 rounded-lg transition-colors">
                      <div className="w-32 h-24 md:w-48 md:h-32 shrink-0 overflow-hidden rounded-lg relative bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.image} alt={post.title} className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-500" />
                      </div>
                      <div className="flex-1 py-1">
                        <span className="text-xs font-bold text-accent uppercase tracking-wide mb-1 block">{post.category}</span>
                        <h3 className="font-bold text-lg md:text-xl leading-tight group-hover:text-primary transition-colors mb-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 hidden md:block leading-relaxed">
                          {post.subtitle}
                        </p>
                      </div>
                   </Link>
                ))
              ) : (
                <p className="text-muted-foreground italic">Nenhuma outra notícia no momento.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Top 5 Widget */}
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 uppercase tracking-wide border-b pb-2">
                <span className="text-accent">★</span> Mais Lidas
              </h3>
              <ul className="space-y-4">
                {posts.slice(0, 5).map((post, i) => (
                  <li key={post.id} className="border-b border-border/40 last:border-0 pb-3 last:pb-0">
                    <Link href={`/noticia/${post.slug}`} className="group flex items-start gap-3 hover:text-primary transition-colors">
                      <span className="text-3xl font-black text-muted-foreground/15 group-hover:text-accent/50 transition-colors -mt-1 w-6 text-center">{i + 1}</span>
                      <span className="font-semibold text-sm line-clamp-2 leading-snug">{post.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter/CTA Widget */}
            <div className="bg-primary text-primary-foreground p-8 rounded-xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              <h3 className="font-bold text-xl mb-2 relative z-10">Foco na Missão!</h3>
              <p className="text-sm opacity-90 mb-6 relative z-10 leading-relaxed">
                Receba conteúdos exclusivos de preparação e notícias em primeira mão.
              </p>
              <a
                href="https://youtube.com/@falaglauber"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full bg-accent text-accent-foreground font-bold px-6 py-3 rounded-lg hover:bg-white hover:text-primary transition-all shadow-lg hover:shadow-xl relative z-10 transform hover:-translate-y-0.5"
              >
                Inscrever-se no Canal
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
