import { lazy } from 'react';

export const routes = [
  // Main page
  { path: '/', element: lazy(() => import('./pages/Main')) },

  // Pokemon
  {
    path: '/pokemons/:id',
    element: lazy(() => import('./pages/Pokemons/Pokemon')),
  },

  // About
  {
    path: '/about',
    element: lazy(() => import('./pages/About')),
  },
];
