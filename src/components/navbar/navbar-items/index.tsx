import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { navbarItems } from '@/components/navbar/navbar-items/items.ts';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu/navigation-menu-trigger-style.ts';
import { cn } from '@/lib/utils.ts';

interface NavbarItemProps extends Omit<(typeof navbarItems)[number], 'id'> {}

const NavbarItem = memo(({ text, href }: NavbarItemProps) => {
  const location = useLocation();

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        className={cn(navigationMenuTriggerStyle(), 'text-lg')}
        active={location.pathname === href}
        asChild
      >
        <Link to={href}>{text}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
});
NavbarItem.displayName = 'NavbarItem';

export const NavbarItems = memo(() => {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {navbarItems.map(({ id, ...props }) => (
          <NavbarItem key={id} {...props} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
});
NavbarItems.displayName = 'NavbarItems';
