'use client';

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@uranus-workspace/design-system';
import { Info } from 'lucide-react';

export default function TooltipDefault() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Mais informações">
            <Info />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Publicado a 3 horas atrás por Gustavo</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
