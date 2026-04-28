import { SignInForm } from '@uranus-workspace/blocks';

export default function SignInFormDefault() {
  return (
    <SignInForm
      title="Entrar"
      description="Use sua conta corporativa."
      onSubmit={() => {}}
      forgotPasswordHref="#"
      signUpHref="#"
    />
  );
}
