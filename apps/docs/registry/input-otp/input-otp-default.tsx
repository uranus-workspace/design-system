'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Label,
} from '@uranus-workspace/design-system';
import { useState } from 'react';

export default function InputOtpDefault() {
  const [value, setValue] = useState('');
  return (
    <div className="grid gap-3">
      <Label htmlFor="otp">Código de verificação</Label>
      <InputOTP id="otp" maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-muted-foreground text-sm">
        Enviamos um código de 6 dígitos para o seu email.
      </p>
    </div>
  );
}
