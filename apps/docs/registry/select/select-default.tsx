'use client';

import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@uranus-workspace/design-system';

export default function SelectDefault() {
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="timezone">Fuso horário</Label>
      <Select>
        <SelectTrigger id="timezone">
          <SelectValue placeholder="Selecione um fuso" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Américas</SelectLabel>
            <SelectItem value="sao_paulo">São Paulo (GMT-3)</SelectItem>
            <SelectItem value="new_york">Nova York (GMT-5)</SelectItem>
            <SelectItem value="los_angeles">Los Angeles (GMT-8)</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Europa</SelectLabel>
            <SelectItem value="lisbon">Lisboa (GMT+0)</SelectItem>
            <SelectItem value="berlin">Berlim (GMT+1)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
