import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loader from './components/Loader';
import { routes } from './routes';

import './App.scss';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;
