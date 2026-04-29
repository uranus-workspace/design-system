'use client';
import { ActivityFeed } from '@uranus-workspace/blocks';
import { CheckCircle2, GitPullRequest, Plus } from 'lucide-react';

export default function ActivityFeedDefault() {
  return (
    <ActivityFeed className="w-full max-w-md">
      <ActivityFeed.Item
        actor={{ name: 'Alice Costa' }}
        action="criou"
        target="Projeto Apollo"
        timestamp="há 2 minutos"
        icon={<Plus className="size-2.5" />}
      />
      <ActivityFeed.Item
        actor={{ name: 'Bruno Lima' }}
        action="aprovou"
        target="PR #142"
        timestamp="há 1 hora"
        icon={<CheckCircle2 className="size-2.5" />}
      />
      <ActivityFeed.Item
        actor={{ name: 'Camila Souza' }}
        action="abriu"
        target="PR #141"
        timestamp="há 3 horas"
        icon={<GitPullRequest className="size-2.5" />}
      />
      <ActivityFeed.Item
        actor={{ name: 'Sistema', initials: 'SY' }}
        action="completou o deploy de"
        target="main"
        timestamp="há 6 horas"
      />
    </ActivityFeed>
  );
}
