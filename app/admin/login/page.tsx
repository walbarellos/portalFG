'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.href = '/admin'; // Hard reload to ensure middleware catches up immediately
      } else {
        setError('Senha incorreta. Tente novamente.');
      }
    } catch {
      setError('Erro ao conectar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-20">
      <Card className="w-full max-w-sm border-2 border-primary/10 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">FG</div>
          <CardTitle className="text-xl font-bold uppercase tracking-tight">Acesso Restrito</CardTitle>
          <p className="text-sm text-muted-foreground">Área exclusiva para editores do portal.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Senha de acesso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-center"
                required
              />
            </div>
            {error && <p className="text-destructive text-sm text-center font-medium bg-destructive/10 p-2 rounded">{error}</p>}
            <Button type="submit" className="w-full font-bold uppercase tracking-wider" disabled={loading}>
              {loading ? 'Verificando...' : 'Entrar no Sistema'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
