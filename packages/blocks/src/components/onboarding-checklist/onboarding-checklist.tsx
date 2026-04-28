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
import {
  Children,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type ReactNode,
  forwardRef,
  isValidElement,
} from 'react';
import { cn } from '../../lib/cn.js';

export interface OnboardingChecklistStep {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  completed: boolean;
  action?: ReactNode;
}

export interface OnboardingChecklistProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  /** Legacy checklist rows. Omit when composing with `OnboardingChecklist.Step`. */
  steps?: OnboardingChecklistStep[];
  onDismiss?: () => void;
}

function StepRow({
  completed,
  title,
  description,
  action,
}: Pick<OnboardingChecklistStep, 'completed' | 'title' | 'description' | 'action'>) {
  return (
    <>
      <span
        aria-hidden
        className={cn(
          'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border',
          completed
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-muted-foreground/40 text-transparent',
        )}
      >
        <Check className="size-3" />
      </span>
      <span className="sr-only">{completed ? 'Completed: ' : 'Pending: '}</span>
      <div className="flex-1">
        <p
          className={cn(
            'text-sm font-medium',
            completed ? 'text-muted-foreground line-through' : 'text-foreground',
          )}
        >
          {title}
        </p>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {!completed && action ? <div className="shrink-0">{action}</div> : null}
    </>
  );
}

export type OnboardingChecklistStepProps = OnboardingChecklistStep &
  Omit<LiHTMLAttributes<HTMLLIElement>, 'id' | 'title'>;

const OnboardingChecklistStepRow = forwardRef<HTMLLIElement, OnboardingChecklistStepProps>(
  function OnboardingChecklistStepRow(
    { id: _id, completed, title, description, action, className, ...props },
    ref,
  ) {
    return (
      <li
        ref={ref}
        data-slot="onboarding-checklist-step"
        className={cn(
          'flex items-start gap-3 border-t py-3 first:border-t-0 first:pt-0',
          className,
        )}
        data-completed={completed}
        {...props}
      >
        <StepRow completed={completed} title={title} description={description} action={action} />
      </li>
    );
  },
);

function countStepsFromChildren(children: ReactNode): { total: number; completed: number } {
  let total = 0;
  let completed = 0;
  Children.forEach(children, (node) => {
    if (isValidElement(node) && node.type === OnboardingChecklistStepRow) {
      total += 1;
      const stepProps = node.props as OnboardingChecklistStep;
      if (stepProps.completed) completed += 1;
    }
  });
  return { total, completed };
}

const OnboardingChecklistRoot = forwardRef<HTMLDivElement, OnboardingChecklistProps>(
  function OnboardingChecklist(
    { title = 'Get started', description, steps, onDismiss, children, className, ...props },
    ref,
  ) {
    const legacyLayout = steps !== undefined;
    const { total, completed } = legacyLayout
      ? { total: steps.length, completed: steps.filter((s) => s.completed).length }
      : countStepsFromChildren(children);
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
            {legacyLayout
              ? steps.map((step) => <OnboardingChecklistStepRow key={step.id} {...step} />)
              : children}
          </ol>
        </CardContent>
      </Card>
    );
  },
);

OnboardingChecklistRoot.displayName = 'OnboardingChecklist';
OnboardingChecklistStepRow.displayName = 'OnboardingChecklist.Step';

/**
 * Onboarding checklist card. Pass **`steps`** or compose **`OnboardingChecklist.Step`** rows.
 */
export const OnboardingChecklist = Object.assign(OnboardingChecklistRoot, {
  Step: OnboardingChecklistStepRow,
});

/** Default action button used by consumers. Re-exported for convenience. */
export { Button as OnboardingChecklistAction };
