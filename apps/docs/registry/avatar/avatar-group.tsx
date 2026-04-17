import { Avatar, AvatarFallback, AvatarImage } from '@uranus-workspace/design-system';

export default function AvatarGroup() {
  return (
    <div className="flex -space-x-2">
      <Avatar className="ring-2 ring-white dark:ring-zinc-950">
        <AvatarImage src="https://avatars.githubusercontent.com/u/1?v=4" alt="Ana" />
        <AvatarFallback>AN</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-white dark:ring-zinc-950">
        <AvatarImage src="https://avatars.githubusercontent.com/u/2?v=4" alt="Bruno" />
        <AvatarFallback>BR</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-white dark:ring-zinc-950">
        <AvatarImage src="https://avatars.githubusercontent.com/u/3?v=4" alt="Camila" />
        <AvatarFallback>CM</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-white dark:ring-zinc-950">
        <AvatarFallback>+4</AvatarFallback>
      </Avatar>
    </div>
  );
}
