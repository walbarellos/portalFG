import Link from 'next/link';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 mt-12 border-t border-accent/20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-black text-2xl mb-4 tracking-tighter">FALA GLAUBER <span className="text-accent">NEWS</span></h3>
          <p className="text-sm opacity-90 max-w-sm leading-relaxed">
            O primeiro podcast para concurseiro policial do Youtube, agora em portal de notícias.
            Informação com credibilidade, agilidade e disciplina.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-accent uppercase text-sm tracking-wider">Categorias</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link href="/concursos" className="hover:text-accent transition-colors">Concursos Abertos</Link></li>
            <li><Link href="#" className="hover:text-accent transition-colors">Operações Policiais</Link></li>
            <li><Link href="#" className="hover:text-accent transition-colors">Entrevistas</Link></li>
            <li><Link href="#" className="hover:text-accent transition-colors">Dicas de Estudo</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-accent uppercase text-sm tracking-wider">Siga-nos</h4>
          <div className="flex gap-4">
            <a href="https://youtube.com/@falaglauber" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              <Youtube className="h-6 w-6" />
            </a>
            <a href="https://instagram.com/falaglauber" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs opacity-60">
        <p>© {new Date().getFullYear()} Fala Glauber News. Todos os direitos reservados.</p>
        <p className="mt-2">Desenvolvido com tecnologia Next.js & Vercel.</p>
      </div>
    </footer>
  );
}
