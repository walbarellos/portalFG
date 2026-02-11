'use client';
import { Post } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPostList({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const router = useRouter();

  const handleDelete = async (slug: string) => {
    if (!confirm('Tem certeza que deseja excluir esta notícia?')) return;

    const res = await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
    if (res.ok) {
      setPosts(posts.filter(p => p.slug !== slug));
      router.refresh();
    } else {
      alert('Erro ao excluir.');
    }
  };

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs text-muted-foreground">Título</th>
              <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs text-muted-foreground hidden md:table-cell">Categoria</th>
              <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs text-muted-foreground hidden md:table-cell">Data</th>
              <th className="px-6 py-4 text-right font-bold uppercase tracking-wider text-xs text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-muted/5 transition-colors">
                <td className="px-6 py-4 font-medium max-w-[200px] md:max-w-md">
                    <div className="truncate font-bold text-foreground">{post.title}</div>
                    <div className="md:hidden text-xs text-muted-foreground mt-1 flex gap-2">
                       <span className="bg-secondary/10 text-secondary px-1.5 rounded uppercase font-bold text-[10px]">{post.category}</span>
                       <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                    <span className="bg-secondary/10 text-secondary px-2 py-1 rounded text-xs font-bold uppercase">{post.category}</span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell text-muted-foreground font-medium">{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <Link href={`/admin/editor?slug=${post.slug}`}>
                    <Button variant="ghost" size="icon" className="hover:text-primary">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(post.slug)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {posts.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            <p className="text-lg font-medium">Nenhuma notícia encontrada.</p>
            <p className="text-sm mt-2">Clique em &quot;Nova Notícia&quot; para começar a publicar.</p>
          </div>
        )}
      </div>
  )
}
