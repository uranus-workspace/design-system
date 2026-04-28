import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from '@uranus-workspace/design-system';
import { Check, X } from 'lucide-react';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface OnboardingChecklistStep {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  /** Whether the step is finished. Completed steps render with a check icon. */
  completed: boolean;
  /** Optional CTA shown only when the step is not completed. */
  action?: ReactNode;
}

export interface OnboardingChecklistProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Card heading. Defaults to `"Get started"`. */
  title?: ReactNode;
  /** Description shown next to the heading. */
  description?: ReactNode;
  steps: OnboardingChecklistStep[];
  /** Called when the user dismisses the card. Hides the X button when omitted. */
  onDismiss?: () => void;
}

/**
 * Dismissible onboarding card showing a checklist of steps with a progress
 * bar. Used to drive activation in the first session.
 */
export const OnboardingChecklist = forwardRef<HTMLDivElement, OnboardingChecklistProps>(
  function OnboardingChecklist(
    { title = 'Get started', description, steps, onDismiss, className, ...props },
    ref,
  ) {
    const total = steps.length;
    const completed = steps.filter((step) => step.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
      <Card
        ref={ref}
        data-slot="onboarding-checklist"
        className={cn('relative', className)}
        {...props}
      >
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss onboarding"
            className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X aria-hidden className="size-4" />
          </button>
        ) : null}
        <CardHeader className="pb-2">
          <CardTitle>{title}</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
          <div className="flex items-center gap-3 pt-2">
            <Progress
              value={percent}
              aria-label={`${completed} of ${total} steps completed`}
              className="h-2 flex-1"
            />
            <span className="text-sm font-medium text-muted-foreground tabular-nums">
              {completed}/{total}
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <ol data-slot="onboarding-checklist-steps" className="flex flex-col">
            {steps.map((step) => (
              <li
                key={step.id}
                className="flex items-start gap-3 border-t py-3 first:border-t-0 first:pt-0"
                data-completed={step.completed}
              >
                <span
                  aria-hidden
                  className={cn(
                    'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border',
                    step.completed
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground/40 text-transparent',
                  )}
                >
                  <Check className="size-3" />
                </span>
                <span className="sr-only">{step.completed ? 'Completed: ' : 'Pending: '}</span>
                <div className="flex-1">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      step.completed ? 'text-muted-foreground line-through' : 'text-foreground',
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description ? (
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  ) : null}
                </div>
                {!step.completed && step.action ? (
                  <div className="shrink-0">{step.action}</div>
                ) : null}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    );
  },
);

/** Default action button used by consumers. Re-exported for convenience. */
export { Button as OnboardingChecklistAction };
