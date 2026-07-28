import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist', 'android', 'node_modules'] },
  {
    // .ts files (counter.ts, main.ts) are type-checked separately by `tsc`
    // as part of `npm run build`; no typescript-eslint parser is set up here.
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      // Only the two long-standing, universally-adopted hooks rules —
      // this plugin's newer "recommended" set also pulls in experimental
      // React Compiler-oriented rules (purity, immutability, set-state-in-effect)
      // that would demand large speculative refactors rather than genuine cleanup.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
];
