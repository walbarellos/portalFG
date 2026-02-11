'use client';

import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-white font-black p-1 rounded text-lg group-hover:bg-primary/90 transition-colors">FG</div>
          <span className="font-bold text-xl tracking-tight text-foreground">
            FALA GLAUBER <span className="text-yellow-600 dark:text-yellow-400">NEWS</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Hub
          </Link>
          <Link href="/concursos" className="text-sm font-medium hover:text-primary transition-colors">
            Concursos
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Polícia
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Operações
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/admin">
            <Button variant="outline" size="sm">Área Restrita</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 space-y-4 bg-background">
          <Link href="/" className="block text-sm font-medium py-2" onClick={() => setIsMenuOpen(false)}>
            Hub
          </Link>
          <Link href="/concursos" className="block text-sm font-medium py-2" onClick={() => setIsMenuOpen(false)}>
            Concursos
          </Link>
          <Link href="#" className="block text-sm font-medium py-2" onClick={() => setIsMenuOpen(false)}>
            Polícia
          </Link>
          <div className="pt-2 border-t">
            <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full">Área Restrita</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
