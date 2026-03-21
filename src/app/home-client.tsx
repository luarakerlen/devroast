'use client';

import { useState } from 'react';
import { ActionsBar } from '@/components/home/actions-bar/actions-bar';
import { CodeInputArea } from '@/components/home/code-input-area/code-input-area';

export function HomeClient() {
  const [code, setCode] = useState('');
  const [roastMode, setRoastMode] = useState(true);

  return (
    <>
      <CodeInputArea code={code} onCodeChange={setCode} />
      <ActionsBar
        code={code}
        roastMode={roastMode}
        onRoastModeChange={setRoastMode}
      />
    </>
  );
}
