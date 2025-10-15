import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pkg from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __APP_NAME__: JSON.stringify(pkg.name),
    __REACT_VERSION__: JSON.stringify(pkg.dependencies.react),
    __REACT_DOM_VERSION__: JSON.stringify(pkg.dependencies['react-dom']),
    __REACT_ROUTER_DOM_VERSION__: JSON.stringify(
      pkg.dependencies['react-router-dom']
    ),
  },
});
