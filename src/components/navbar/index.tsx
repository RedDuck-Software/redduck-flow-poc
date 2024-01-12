import { memo } from 'react';

import { Burger } from '@/components/navbar/burger.tsx';
import { Logo } from '@/components/navbar/logo.tsx';
import { NavbarItems } from '@/components/navbar/navbar-items';
import { WalletSection } from '@/components/navbar/wallet-section.tsx';

export const Navbar = memo(() => {
  return (
    <header className="border-b-2 border-border py-2">
      <div className="container flex items-center justify-between">
        <Logo />
        <NavbarItems />
        <WalletSection />
        <Burger />
      </div>
    </header>
  );
});
Navbar.displayName = 'Navbar';
