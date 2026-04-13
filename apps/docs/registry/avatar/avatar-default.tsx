import { Avatar, AvatarFallback, AvatarImage } from '@uranus-workspace/design-system';

export default function AvatarDefault() {
  return (
    <Avatar>
      <AvatarImage src="https://avatars.githubusercontent.com/u/1?v=4" alt="Octocat" />
      <AvatarFallback>GB</AvatarFallback>
    </Avatar>
  );
}
