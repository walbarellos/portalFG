import { getPostBySlug, getPosts } from '@/lib/db';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

export const revalidate = 0;

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPosts();
  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <article className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="space-y-4 border-b border-border/40 pb-6">
              <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded text-xs uppercase tracking-wider inline-block">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary leading-tight tracking-tight">
                {post.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                {post.subtitle}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                 <div className="flex items-center gap-2">
                   <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-md">
                     {post.author ? post.author[0] : 'F'}
                   </div>
                   <div>
                     <span className="block font-bold text-foreground">{post.author || 'Fala Glauber'}</span>
                     <span className="text-xs opacity-70">Editor Chefe</span>
                   </div>
                 </div>
                 <span className="text-muted-foreground/30 text-xl font-light">|</span>
                 <span className="font-medium">{format(new Date(post.createdAt), "d 'de' MMMM, yyyy", { locale: ptBR })}</span>
              </div>
            </div>

            {/* Image */}
            <div className="aspect-video w-full overflow-hidden rounded-xl shadow-lg relative bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div
              className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-primary prose-a:text-accent prose-a:font-bold prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg leading-relaxed text-foreground/90 prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share/Tags placeholder */}
            <div className="pt-8 border-t border-border mt-12">
               <div className="flex gap-2">
                 <span className="text-sm font-bold text-muted-foreground uppercase mr-2">Compartilhe:</span>
                 {/* Icons would go here */}
               </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-card p-6 rounded-xl border shadow-sm sticky top-24">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 uppercase tracking-wide border-b pb-2">
                <span className="text-accent">⚡</span> Leia Também
              </h3>
              <div className="space-y-6">
                {relatedPosts.map((related) => (
                  <Link href={`/noticia/${related.slug}`} key={related.id} className="group block">
                    <div className="aspect-video w-full rounded-lg overflow-hidden mb-3 bg-muted relative">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src={related.image} alt={related.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                       <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">{related.category}</span>
                    </div>
                    <h4 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors">
                      {related.title}
                    </h4>
                    <span className="text-xs text-muted-foreground mt-1 block">{format(new Date(related.createdAt), "d MMM", { locale: ptBR })}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}
