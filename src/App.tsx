import { RouterProvider } from 'react-router-dom';

import { WagmiProvider } from './providers/wagmi-provider.tsx';
import { router } from './router';

export const App = () => {
  return (
    <WagmiProvider>
      <RouterProvider router={router} />
    </WagmiProvider>
  );
};
