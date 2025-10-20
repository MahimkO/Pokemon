import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import pkg from './package.json';

// https://vite.dev/config/
export default defineConfig({
  define: {
    __APP_NAME__: JSON.stringify(pkg.name),
    __APP_VERSION__: JSON.stringify(pkg.version),
    __REACT_DOM_VERSION__: JSON.stringify(pkg.dependencies['react-dom']),
    __REACT_ROUTER_DOM_VERSION__: JSON.stringify(pkg.dependencies['react-router-dom']),
    __REACT_VERSION__: JSON.stringify(pkg.dependencies.react),
    __TANSTACK_REACT_QUERY_VERSION__: JSON.stringify(pkg.dependencies['@tanstack/react-query']),
    __ANTD_VERSION__: JSON.stringify(pkg.dependencies.antd),
    __ESLINT_VERSION__: JSON.stringify(pkg.devDependencies.eslint),
    __TYPESCRIPT_VERSION__: JSON.stringify(pkg.devDependencies.typescript),
  },
  plugins: [react()],
});
