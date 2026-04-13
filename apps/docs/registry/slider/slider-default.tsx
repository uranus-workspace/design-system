'use client';

import { Label, Slider } from '@uranus-workspace/design-system';
import { useState } from 'react';

export default function SliderDefault() {
  const [value, setValue] = useState([60]);
  return (
    <div className="grid w-full max-w-sm gap-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="volume">Volume</Label>
        <span className="text-muted-foreground text-sm tabular-nums">{value[0]}%</span>
      </div>
      <Slider
        id="volume"
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        step={1}
        aria-label="Volume"
      />
    </div>
  );
}
