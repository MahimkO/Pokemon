import { lazy } from 'react';

export const routes = [
  // Main page
  { element: lazy(() => import('./pages/Main')), path: '/' },

  // Pokemon
  {
    element: lazy(() => import('./pages/Pokemons')),
    path: '/pokemons',
  },
  {
    element: lazy(() => import('./pages/Pokemons/Pokemon')),
    path: '/pokemons/:id',
  },

  // About
  {
    element: lazy(() => import('./pages/About')),
    path: '/about',
  },
];
