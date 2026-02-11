import { getPosts } from '@/lib/db';
import AdminPostList from './AdminPostList';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboard() {
  const posts = await getPosts();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black uppercase tracking-tight text-foreground">Painel Administrativo</h1>
        <Link href="/admin/editor">
          <Button className="gap-2 font-bold uppercase tracking-wide">
            <Plus className="w-4 h-4" /> Nova Notícia
          </Button>
        </Link>
      </div>
      <AdminPostList initialPosts={posts} />
    </div>
  );
}
