import { getPostBySlug } from '@/lib/db';
import PostEditor from './PostEditor';

export const revalidate = 0;

export default async function EditorPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  const post = slug ? await getPostBySlug(slug) : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-black uppercase tracking-tight text-foreground">
        {post ? 'Editar Notícia' : 'Nova Notícia'}
      </h1>
      <PostEditor initialPost={post} />
    </div>
  );
}
