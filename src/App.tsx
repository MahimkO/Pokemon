import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AppLayout } from './components/Layouts/AppLayout';
import Loader from './components/Loader';
import { routes } from './routes';

import './App.scss';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <AppLayout>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </AppLayout>
    </Suspense>
  );
}

export default App;
