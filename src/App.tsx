import { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { WagmiProvider } from './providers/wagmi-provider.tsx';
import { router } from './router';

import { Loader } from '@/components/loader';
import { Toaster } from '@/components/ui/sonner.tsx';
import { persistor, store } from '@/store';

export const App = () => {
  return (
    <WagmiProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <HelmetProvider>
            <Suspense fallback={<Loader />}>
              <RouterProvider router={router} />
            </Suspense>
            <Toaster />
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </WagmiProvider>
  );
};
