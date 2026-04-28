import { SettingsLayout } from '@uranus-workspace/blocks';
import { User } from 'lucide-react';

export default function SettingsLayoutDefault() {
  return (
    <SettingsLayout
      groups={[
        {
          label: 'Conta',
          items: [
            {
              id: '1',
              label: 'Perfil',
              href: '#',
              icon: <User className="size-4" aria-hidden />,
              active: true,
            },
            { id: '2', label: 'Segurança', href: '#' },
          ],
        },
      ]}
    >
      <p className="text-sm text-fd-muted-foreground">Conteúdo da seção ativa.</p>
    </SettingsLayout>
  );
}
