'use client';

import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@uranus-workspace/design-system';

const slides = [
  { title: 'Design', description: 'Tokens, primitivas e padrões visuais.' },
  { title: 'Engenharia', description: 'Componentes tipados com Motion e Radix.' },
  { title: 'Acessibilidade', description: 'Testado com jest-axe e addon-a11y.' },
  { title: 'Documentação', description: 'Exemplos vivos direto do código-fonte.' },
];

export default function CarouselDefault() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.title}>
            <Card>
              <CardContent className="flex aspect-square flex-col items-center justify-center gap-2 p-6 text-center">
                <span className="text-lg font-medium">{slide.title}</span>
                <span className="text-sm text-muted-foreground">{slide.description}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
