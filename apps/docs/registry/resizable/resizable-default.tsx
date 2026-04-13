'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@uranus-workspace/design-system';

export default function ResizableDefault() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="h-[220px] w-[520px] rounded-lg border">
      <ResizablePanel defaultSize={35} minSize={20}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm font-medium">Projetos</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm font-medium">Editor</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
