import Link from 'next/link';
import { Post } from '@/lib/db';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface HeroProps {
  post: Post;
}

export default function Hero({ post }: HeroProps) {
  return (
    <Link href={`/noticia/${post.slug}`} className="group relative block w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post.image}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-4/5 lg:w-3/4">
        <span className="inline-block bg-accent text-accent-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4 rounded-sm shadow-sm">
          {post.category}
        </span>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight group-hover:text-accent transition-colors drop-shadow-lg">
          {post.title}
        </h1>
        <p className="text-white/90 text-sm md:text-lg line-clamp-2 md:line-clamp-3 mb-4 font-medium drop-shadow-md">
          {post.subtitle}
        </p>
        <div className="flex items-center gap-3 text-white/70 text-xs md:text-sm font-semibold uppercase tracking-wide">
           <span>{post.author}</span>
           <span>•</span>
           <span>{format(new Date(post.createdAt), "d 'de' MMMM, yyyy", { locale: ptBR })}</span>
        </div>
      </div>
    </Link>
  )
}
