import { memo } from 'react';

import { MyFlows } from '@/components/flows/my-flows';

const MainPage = memo(() => {
  return (
    <div className="container flex flex-col gap-8">
      <h1 className="text-4xl font-semibold">Your flows</h1>
      <MyFlows />
    </div>
  );
});
MainPage.displayName = 'MainPage';

export default MainPage;
