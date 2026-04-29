'use client';
import { NotificationList } from '@uranus-workspace/blocks';
import {
  Avatar,
  AvatarFallback,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@uranus-workspace/design-system';
import { Bell } from 'lucide-react';

export default function NotificationListDefault() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Bell aria-hidden className="size-4" />
          <span>Notificações</span>
          <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium leading-none text-primary-foreground">
            2
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <NotificationList>
          <NotificationList.Header title="Notificações" unreadCount={2} onMarkAllRead={() => {}} />
          <NotificationList.List>
            <NotificationList.Item
              title="Novo comentário em Apollo"
              description="Bruno Lima: ficou ótimo, aprovado!"
              timestamp="há 2 minutos"
              unread
              onSelect={() => {}}
            />
            <NotificationList.Item
              title="Build concluído"
              description="main passou em 2m31s"
              timestamp="há 1 hora"
              onSelect={() => {}}
            />
            <NotificationList.Item
              title="Você foi mencionado em PR #142"
              description="@gustavo — review pendente"
              timestamp="há 3 horas"
              unread
              onSelect={() => {}}
            />
          </NotificationList.List>
          <div className="border-t px-3 py-2">
            <Button variant="ghost" size="sm" className="w-full justify-center gap-2">
              <Avatar className="size-5">
                <AvatarFallback className="text-[10px]">UT</AvatarFallback>
              </Avatar>
              <span>Ver todas as notificações</span>
            </Button>
          </div>
        </NotificationList>
      </PopoverContent>
    </Popover>
  );
}
