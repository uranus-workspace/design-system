import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { OtpVerificationForm } from './otp-verification-form.js';

describe('OtpVerificationForm', () => {
  beforeAll(() => {
    // jsdom does not implement `elementFromPoint`. The `input-otp` library
    // schedules a pwm-badge check via setTimeout that calls it; stub it so
    // fake-timer tests don't blow up when advancing timers.
    if (typeof document !== 'undefined' && !document.elementFromPoint) {
      document.elementFromPoint = () => null;
    }
  });

  it('renders heading and verify button disabled until full code', () => {
    render(<OtpVerificationForm onSubmit={vi.fn()} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Verificar' })).toBeDisabled();
  });

  it('submits when the user types the full code and clicks verify', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<OtpVerificationForm onSubmit={onSubmit} />);

    const input = screen.getByLabelText('Código de verificação');
    await user.click(input);
    await user.keyboard('123456');
    await user.click(screen.getByRole('button', { name: 'Verificar' }));
    expect(onSubmit).toHaveBeenCalledWith({ code: '123456' });
  });

  it('auto-submits when autoSubmit is enabled', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<OtpVerificationForm onSubmit={onSubmit} autoSubmit />);

    const input = screen.getByLabelText('Código de verificação');
    await user.click(input);
    await user.keyboard('123456');
    expect(onSubmit).toHaveBeenCalledWith({ code: '123456' });
  });

  describe('resend timer', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it('disables resend during cooldown', async () => {
      const onResend = vi.fn();
      render(<OtpVerificationForm onSubmit={vi.fn()} onResend={onResend} resendCooldown={3} />);
      const resend = screen.getByRole('button', { name: 'Reenviar' });
      await act(async () => {
        resend.click();
      });
      expect(onResend).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('button', { name: 'Reenviar em 3s' })).toBeDisabled();
      act(() => {
        vi.advanceTimersByTime(3000);
      });
      expect(screen.getByRole('button', { name: 'Reenviar' })).not.toBeDisabled();
    });
  });

  it('has no a11y violations', async () => {
    const { container } = render(<OtpVerificationForm onSubmit={vi.fn()} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
