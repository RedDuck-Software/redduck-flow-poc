import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { DefaultMeta } from '@/components/meta';
import { Navbar } from '@/components/navbar';

const MainLayout = () => {
  useEffect(() => {
    const node = document.querySelector(
      '.react-flow__panel.react-flow__attribution',
    );

    if (node) {
      node.remove();
    }
  }, []);

  return (
    <>
      <DefaultMeta />
      <main className="flex h-full flex-col gap-8 pb-8">
        <Navbar />
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
