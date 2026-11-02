'use client';

import { useState } from 'react';

const LATEST = '0.5.112';
const LATEST_AS_OF = '2026-11-02';

type Reading = { state: 'old' | 'current' | 'unknown'; text: string };

function read(input: string): Reading {
  const match = input.match(/9router@(\d+)\.(\d+)\.(\d+)/);
  if (!match) {
    return {
      state: 'unknown',
      text: 'No version number in that paste. The line you want looks like: 9router@0.5.112',
    };
  }

  const found = `${match[1]}.${match[2]}.${match[3]}`;
  const mine = [match[1], match[2], match[3]].map(Number);
  const latest = LATEST.split('.').map(Number);

  let older = false;
  for (let i = 0; i < 3; i += 1) {
    if (mine[i] < latest[i]) {
      older = true;
      break;
    }
    if (mine[i] > latest[i]) break;
  }

  return older
    ? {
        state: 'old',
        text: `You are on ${found}. The update did not land — start with check 2, an old process is still holding port 20128.`,
      }
    : {
        state: 'current',
        text: `The version is ${found}, which is current. This is not an update problem — go to check 5.`,
      };
}

export default function VersionCheck() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<Reading | null>(null);

  return (
    <div className="diagnostic">
      <div className="diagnostic-top">
        <span className="eyebrow">VERSION SELF-CHECK</span>
        <span className="step-pill">Paste one line</span>
      </div>

      <div className="diagnostic-field">
        <label htmlFor="npm-ls-output">
          Run <code>npm ls -g 9router</code> and paste the whole output here
        </label>
        <textarea
          id="npm-ls-output"
          rows={3}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setResult(event.target.value.trim() ? read(event.target.value) : null);
          }}
          placeholder={'C:\\Users\\you\\AppData\\Roaming\\npm\n└── 9router@0.5.108'}
          style={{ width: '100%', fontFamily: 'monospace', fontSize: 13 }}
        />
      </div>

      {result ? (
        <div className="diagnostic-result">
          <div className="result-label">
            <span className="result-dot" /> WHAT THIS MEANS
          </div>
          <p>{result.text}</p>
        </div>
      ) : null}

      <p className="fine-print">
        This is not inspecting your machine — it only reads the text you paste, in your browser. The
        current release was {LATEST} as of {LATEST_AS_OF}; confirm with{' '}
        <code>npm view 9router version</code>.
      </p>
    </div>
  );
}