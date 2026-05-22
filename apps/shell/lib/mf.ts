'use client';

import { init, loadRemote } from '@module-federation/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import * as mfeShared from '@mfe/shared';
import * as mfeUi from '@mfe/ui';
import * as zustand from 'zustand';

let ready = false;

export function initMf() {
  if (ready || typeof window === 'undefined') return;

  init({
    name: 'shell',
    remotes: [
      { name: 'authApp', entry: 'http://localhost:3001/remoteEntry.js' },
      { name: 'productApp', entry: 'http://localhost:3002/remoteEntry.js' },
      { name: 'cartApp', entry: 'http://localhost:3003/remoteEntry.js' },
      { name: 'orderApp', entry: 'http://localhost:3004/remoteEntry.js' },
    ],
    shared: {
      react: {
        version: '18.3.1',
        scope: 'default',
        lib: () => React,
        shareConfig: { singleton: true, requiredVersion: '^18.3.1' },
      },
      'react-dom': {
        version: '18.3.1',
        scope: 'default',
        lib: () => ReactDOM,
        shareConfig: { singleton: true, requiredVersion: '^18.3.1' },
      },
      '@mfe/shared': {
        version: '0.0.1',
        scope: 'default',
        lib: () => mfeShared,
        shareConfig: { singleton: true, requiredVersion: '^0.0.1' },
      },
      '@mfe/ui': {
        version: '0.0.1',
        scope: 'default',
        lib: () => mfeUi,
        shareConfig: { singleton: true, requiredVersion: '^0.0.1' },
      },
      zustand: {
        version: '5.0.0',
        scope: 'default',
        lib: () => zustand,
        shareConfig: { singleton: true, requiredVersion: '^5.0.0' },
      },
    },
  });
  ready = true;
}

export async function loadMf(scope: string, mod: string) {
  initMf();
  const m: any = await loadRemote(`${scope}/${mod}`);
  return m.default;
}
