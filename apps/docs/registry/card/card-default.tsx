import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@uranus-workspace/design-system';

export default function CardDefault() {
  return (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Projeto Apollo</CardTitle>
        <CardDescription>Lançamento previsto para a próxima quinta-feira.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Dois sprints restam até o go-live. Acompanhe a timeline no quadro de missão.
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" size="sm">
          Cancelar
        </Button>
        <Button size="sm">Publicar</Button>
      </CardFooter>
    </Card>
  );
}
