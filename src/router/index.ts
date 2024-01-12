import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { NavigateToIndex } from '@/router/NavigateToIndex.tsx';

const MainLayout = lazy(() => import('@/layouts/main-layout.tsx'));
const MainPage = lazy(() => import('@/pages/main-page.tsx'));
const Marketplace = lazy(() => import('@/pages/marketplace.tsx'));
const EditFlow = lazy(() => import('@/pages/edit-flow.tsx'));
const MarketplaceView = lazy(() => import('@/pages/marketplace-view.tsx'));

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
        path: '/marketplace',
        Component: Marketplace,
      },
      {
        path: '/flows/:id',
        Component: EditFlow,
      },
      {
        path: '/marketplace/:id',
        Component: MarketplaceView,
      },
    ],
  },
  {
    path: '*',
    Component: NavigateToIndex,
  },
]);
