import { Tabs, TabsContent, TabsList, TabsTrigger } from '@uranus-workspace/design-system';

export default function TabsDefault() {
  return (
    <Tabs defaultValue="visao-geral" className="w-[420px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="visao-geral">Visão geral</TabsTrigger>
        <TabsTrigger value="atividade">Atividade</TabsTrigger>
        <TabsTrigger value="equipe">Equipe</TabsTrigger>
      </TabsList>
      <TabsContent value="visao-geral" className="rounded-md border p-4 text-sm">
        Resumo do projeto, marcos-chave e saúde geral do sprint atual.
      </TabsContent>
      <TabsContent value="atividade" className="rounded-md border p-4 text-sm">
        Histórico de commits, deploys e menções recentes.
      </TabsContent>
      <TabsContent value="equipe" className="rounded-md border p-4 text-sm">
        Membros da equipe, papéis e disponibilidade.
      </TabsContent>
    </Tabs>
  );
}
