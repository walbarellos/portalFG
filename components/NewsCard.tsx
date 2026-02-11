import Link from 'next/link';
import { Post } from '@/lib/db';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';

interface NewsCardProps {
  post: Post;
}

export default function NewsCard({ post }: NewsCardProps) {
  return (
    <Link href={`/noticia/${post.slug}`} className="group h-full block">
      <Card className="h-full overflow-hidden border-0 bg-transparent shadow-none hover:bg-muted/10 transition-colors rounded-lg">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <span className="bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">
              {post.category}
            </span>
          </div>
        </div>
        <CardContent className="p-2 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium uppercase tracking-wide">
            <span>{format(new Date(post.createdAt), "d MMM, yyyy", { locale: ptBR })}</span>
          </div>
          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2 text-foreground">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {post.subtitle}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
