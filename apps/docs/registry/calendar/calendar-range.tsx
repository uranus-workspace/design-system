'use client';

import { Calendar } from '@uranus-workspace/design-system';
import { useState } from 'react';

export default function CalendarRange() {
  const today = new Date();
  const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined } | undefined>(
    {
      from: today,
      to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
    },
  );

  return (
    <div className="overflow-x-auto">
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        className="rounded-md border"
      />
    </div>
  );
}
