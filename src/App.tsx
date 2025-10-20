import { createElement, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppLayout } from './components/Layouts/AppLayout';
import Loader from './components/Loader';
import { routes } from './routes';

import './App.scss';

function App() {
  return (
    <AppLayout>
      <Suspense fallback={<Loader />}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={createElement(route.element)} />
          ))}
        </Routes>
      </Suspense>
    </AppLayout>
  );
}

export default App;
