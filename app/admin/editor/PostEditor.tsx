'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const CATEGORIES = [
  "Polícia", "Concursos", "Operações", "Segurança Pública", "Entrevistas", "Análises", "Opinião"
];

export default function PostEditor({ initialPost }: { initialPost: Post | null | undefined }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: initialPost?.title || '',
    subtitle: initialPost?.subtitle || '',
    category: initialPost?.category || CATEGORIES[0],
    image: initialPost?.image || '',
    content: initialPost?.content || '',
    author: initialPost?.author || 'Fala Glauber',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = initialPost
        ? `/api/posts/${initialPost.slug}`
        : '/api/posts';

      const method = initialPost ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        alert('Erro ao salvar. Verifique os dados e tente novamente.');
      }
    } catch {
      alert('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
     <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-xl border shadow-sm">

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="space-y-2">
           <Label htmlFor="title">Título da Manchete</Label>
           <Input
             id="title"
             name="title"
             value={formData.title}
             onChange={handleChange}
             placeholder="Ex: Novo Concurso PF Autorizado"
             required
             className="font-bold"
           />
         </div>

         <div className="space-y-2">
           <Label htmlFor="category">Categoria</Label>
           <select
             id="category"
             name="category"
             value={formData.category}
             onChange={handleChange}
             className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
           >
             {CATEGORIES.map(cat => (
               <option key={cat} value={cat}>{cat}</option>
             ))}
           </select>
         </div>
       </div>

       <div className="space-y-2">
         <Label htmlFor="subtitle">Subtítulo (Resumo)</Label>
         <Textarea
           id="subtitle"
           name="subtitle"
           value={formData.subtitle}
           onChange={handleChange}
           placeholder="Um breve resumo que aparece abaixo do título..."
           rows={2}
           required
         />
       </div>

       <div className="space-y-2">
         <Label htmlFor="image">URL da Imagem de Capa</Label>
         <Input
           id="image"
           name="image"
           value={formData.image}
           onChange={handleChange}
           placeholder="https://..."
           required
         />
         {formData.image && (
           <div className="mt-2 aspect-video w-40 rounded-md overflow-hidden bg-muted border">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
           </div>
         )}
       </div>

       <div className="space-y-2">
         <Label htmlFor="content">Conteúdo da Notícia (HTML)</Label>
         <div className="text-xs text-muted-foreground mb-1">Dica: Use tags HTML como &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt; para formatar.</div>
         <Textarea
           id="content"
           name="content"
           value={formData.content}
           onChange={handleChange}
           placeholder="<p>Escreva o conteúdo aqui...</p>"
           rows={15}
           className="font-mono text-sm"
           required
         />
       </div>

       <div className="space-y-2">
          <Label htmlFor="author">Autor</Label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
       </div>

       <div className="pt-4 border-t flex items-center justify-end gap-4">
         <Button type="button" variant="outline" onClick={() => router.back()}>
           Cancelar
         </Button>
         <Button type="submit" disabled={loading} className="min-w-[120px] font-bold uppercase tracking-wider">
           {loading ? 'Salvando...' : 'Publicar'}
         </Button>
       </div>

     </form>
  )
}
