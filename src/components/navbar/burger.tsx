import { Menu } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { navbarItems } from '@/components/navbar/navbar-items/items.ts';
import { WalletSection } from '@/components/navbar/wallet-section.tsx';
import { Button } from '@/components/ui/button';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu/navigation-menu-trigger-style.ts';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet.tsx';
import { cn } from '@/lib/utils.ts';

interface BurgerItemProps extends Omit<(typeof navbarItems)[number], 'id'> {}

const BurgerItem = memo(({ text, href }: BurgerItemProps) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(navigationMenuTriggerStyle(), 'w-full text-lg', isActive && 'active')
      }
    >
      {text}
    </NavLink>
  );
});
BurgerItem.displayName = 'BurgerItem';

export const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="icon" className="inline-flex lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Navigation</SheetTitle>
        <SheetDescription>Go through our website here.</SheetDescription>
        <div className="my-6 flex w-full flex-col gap-2">
          {navbarItems.map(({ id, ...props }) => (
            <BurgerItem key={id} {...props} />
          ))}
        </div>
        <WalletSection className="flex justify-between" />
      </SheetContent>
    </Sheet>
  );
};
