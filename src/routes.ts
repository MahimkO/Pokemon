import { lazy } from 'react';

export const routes = [
  // Главная
  { element: lazy(() => import('./pages/Main')), path: '/' },

  // Покемоны
  {
    element: lazy(() => import('./pages/Pokemons')),
    path: '/pokemons',
    breadcrumb: 'Покемоны',
  },
  {
    element: lazy(() => import('./pages/Pokemons/Pokemon')),
    path: '/pokemons/:id',
    breadcrumb: 'Покемон',
  },

  // О проекте
  {
    element: lazy(() => import('./pages/About')),
    path: '/about',
    breadcrumb: 'О проекте',
  },

  // Технологии
  {
    element: lazy(() => import('./pages/Technologies')),
    path: '/technologies',
    breadcrumb: 'Технологии',
  },
];
