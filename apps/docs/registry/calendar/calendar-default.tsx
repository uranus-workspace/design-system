'use client';

import { Calendar } from '@uranus-workspace/design-system';
import { useState } from 'react';

export default function CalendarDefault() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
  );
}
