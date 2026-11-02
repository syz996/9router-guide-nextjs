'use client';

import { useState } from 'react';

type CheckKey = 'version' | 'process' | 'reinstall' | 'permission' | 'client' | 'uninstall';

type Check = {
  label: string;
  title: string;
  steps: string[];
  note: string;
};

const CHECKS: Record<CheckKey, Check> = {
  version: {
    label: 'Version check',
    title: 'You are probably looking at an old binary',
    steps: [
      'npm ls -g 9router',
      'npm view 9router version',
    ],
    note: 'An older number means the update never landed - go to check 2. If it already shows 0.5.112, this is not an update problem - jump to check 5.',
  },
  process: {
    label: 'Old process',
    title: 'The old process is still holding the port',
    steps: [
      'tasklist /FI "IMAGENAME eq node.exe"',
      'taskkill /PID <pid> /F',
      '9router --version',
    ],
    note: 'On Windows a running node process keeps the old files locked, so the update lands but is never loaded.',
  },
  reinstall: {
    label: 'Clean reinstall',
    title: 'Reinstall the global package from scratch',
    steps: [
      'npm uninstall -g 9router',
      'npm cache verify',
      'npm install -g 9router@latest',
      '9router --version',
    ],
    note: 'Run the commands one at a time and read the output of each before moving on.',
  },
  permission: {
    label: 'Permission',
    title: 'npm cannot write to its global prefix',
    steps: [
      'npm config get prefix',
      'C:\\Program Files\\nodejs means you need an elevated shell, or move the prefix.',
      'Open a new shell before trying 9router again.',
    ],
    note: 'An EACCES or EPERM message during install is this check, not a broken update.',
  },
  client: {
    label: 'Client config',
    title: 'The gateway or the client config, not the update',
    steps: [
      'curl http://localhost:3000/v1/models -H "Authorization: Bearer <key>"',
      'A 200 with a model list means the client is pointing somewhere else.',
      'Re-check the base URL and the API key field in Cursor or Claude Code.',
    ],
    note: 'An npm update does not edit your client config, so assume a changed default first.',
  },
  uninstall: {
    label: 'Leftovers',
    title: 'Leftover config keeps the old behaviour',
    steps: [
      'Close every editor and terminal that was talking to 9router.',
      'Move the old config folder aside instead of deleting it.',
      'Reinstall, paste the key again, retest one model.',
    ],
    note: 'A stale config file survives reinstall and can keep an old port or old key in play.',
  },
};

const ORDER: CheckKey[] = ['version', 'process', 'reinstall', 'permission', 'client', 'uninstall'];

export default function SymptomTriage() {
  const [active, setActive] = useState<CheckKey>('version');
  const [copied, setCopied] = useState<string | null>(null);

  const check = CHECKS[active];

  const copy = (text: string) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(text);
        window.setTimeout(() => setCopied(null), 1600);
      })
      .catch(() => setCopied(null));
  };

  return (
    <div
      style={{
        border: '1px solid #e6e6e6',
        borderRadius: 12,
        padding: '20px 20px 16px',
        marginBottom: 28,
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
        {ORDER.map((key, index) => {
          const on = key === active;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              style={{
                font: 'inherit',
                fontSize: 13,
                fontWeight: 600,
                padding: '7px 12px',
                borderRadius: 999,
                cursor: 'pointer',
                border: on ? '1px solid #111' : '1px solid #ddd',
                background: on ? '#111' : '#fff',
                color: on ? '#fff' : '#444',
              }}
            >
              {index + 1}. {CHECKS[key].label}
            </button>
          );
        })}
      </div>

      <h3 style={{ fontFamily: 'Manrope', fontSize: 20, margin: '0 0 12px' }}>{check.title}</h3>

      <ol style={{ margin: '0 0 14px', paddingLeft: 20, lineHeight: 1.7, fontSize: 15 }}>
        {check.steps.map((step) => (
          <li key={step} style={{ marginBottom: 8 }}>
            <code
              style={{
                fontSize: 13.5,
                background: '#f5f5f5',
                padding: '3px 6px',
                borderRadius: 5,
              }}
            >
              {step}
            </code>
            <button
              type="button"
              onClick={() => copy(step)}
              style={{
                font: 'inherit',
                fontSize: 12,
                marginLeft: 8,
                padding: '2px 8px',
                borderRadius: 999,
                cursor: 'pointer',
                border: '1px solid #ddd',
                background: '#fff',
                color: '#666',
              }}
            >
              {copied === step ? 'Copied' : 'Copy'}
            </button>
          </li>
        ))}
      </ol>

      <p className="muted" style={{ margin: 0, fontSize: 14 }}>
        {check.note}
      </p>
    </div>
  );
}
