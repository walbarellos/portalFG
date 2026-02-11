import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock data for exams
const exams = [
  {
    id: 1,
    org: 'Polícia Federal',
    role: 'Agente e Escrivão',
    vacancies: '2.000 (Previstas)',
    salary: 'R$ 13.649,52',
    status: 'Autorizado',
    statusColor: 'bg-green-600',
    banca: 'A definir',
    link: '#'
  },
  {
    id: 2,
    org: 'PRF',
    role: 'Policial Rodoviário Federal',
    vacancies: '5.000 (Solicitadas)',
    salary: 'R$ 10.790,87',
    status: 'Solicitado',
    statusColor: 'bg-yellow-500',
    banca: 'Cebraspe (provável)',
    link: '#'
  },
  {
    id: 3,
    org: 'PC-SP',
    role: 'Investigador e Escrivão',
    vacancies: '3.500',
    salary: 'R$ 5.879,68',
    status: 'Edital Publicado',
    statusColor: 'bg-blue-600',
    banca: 'Vunesp',
    link: '#'
  },
  {
    id: 4,
    org: 'PM-RJ',
    role: 'Soldado',
    vacancies: '2.000',
    salary: 'R$ 5.233,88',
    status: 'Inscrições Abertas',
    statusColor: 'bg-green-600',
    banca: 'Ibade',
    link: '#'
  },
  {
    id: 5,
    org: 'PC-MG',
    role: 'Delegado, Escrivão e Investigador',
    vacancies: '255',
    salary: 'Até R$ 14.271,95',
    status: 'Banca Definida',
    statusColor: 'bg-orange-500',
    banca: 'FGV',
    link: '#'
  },
  {
    id: 6,
    org: 'Polícia Penal Federal',
    role: 'Policial Penal',
    vacancies: 'CR',
    salary: 'R$ 8.100,00',
    status: 'Previsto',
    statusColor: 'bg-gray-500',
    banca: 'A definir',
    link: '#'
  }
];

export default function ConcursosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
           <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground">
             Central de <span className="text-primary">Concursos</span>
           </h1>
           <p className="text-lg text-muted-foreground">
             O monitoramento completo dos principais editais da segurança pública.
             Atualizado em tempo real pela nossa equipe.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exams.map((exam) => (
            <Card key={exam.id} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-card overflow-hidden group">
              <div className={`h-2 w-full ${exam.statusColor}`} />
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${exam.statusColor}`}>
                    {exam.status}
                  </span>
                  <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded">
                    {exam.banca}
                  </span>
                </div>
                <CardTitle className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                  {exam.org}
                </CardTitle>
                <p className="text-sm font-medium text-muted-foreground">{exam.role}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm bg-muted/30 p-4 rounded-lg">
                  <div>
                    <span className="block text-muted-foreground/70 text-[10px] uppercase font-bold tracking-wider mb-1">Vagas</span>
                    <span className="font-bold text-foreground block truncate" title={String(exam.vacancies)}>{exam.vacancies}</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground/70 text-[10px] uppercase font-bold tracking-wider mb-1">Inicial</span>
                    <span className="font-bold text-foreground block truncate" title={exam.salary}>{exam.salary}</span>
                  </div>
                </div>
                <Button className="w-full font-bold uppercase tracking-wider" variant="secondary">
                  Ver Análise
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
