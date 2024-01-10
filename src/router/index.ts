import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '../layouts/main-layout.tsx';
import { MainPage } from '../pages/main-page.tsx';
import { SecondPage } from '../pages/second-page.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: MainPage,
      },
      {
        path: '/second-page',
        Component: SecondPage,
      },
    ],
  },
]);
