'use client';
import { AnnouncementBanner } from '@uranus-workspace/blocks';
import { Button } from '@uranus-workspace/design-system';

export default function AnnouncementBannerDefault() {
  return (
    <AnnouncementBanner
      intent="info"
      title="Manutenção programada"
      description="Domingo, 02h–04h UTC."
      action={<Button size="sm">Detalhes</Button>}
    />
  );
}
