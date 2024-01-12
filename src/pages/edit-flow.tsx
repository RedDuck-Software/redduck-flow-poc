import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';

import { Sandbox } from '@/components/edit-flow/sandbox.tsx';
import { Sidebar } from '@/components/edit-flow/sidebar.tsx';
import { NavigateToIndex } from '@/router/NavigateToIndex.tsx';
import { useAppSelector } from '@/store/hooks.ts';
import { selectFlowById } from '@/store/selectors/flows.ts';

import 'reactflow/dist/style.css';

const EditFlow = memo(() => {
  const { id } = useParams<{ id: string }>();
  const flow = useAppSelector(selectFlowById(id));

  if (!flow) {
    return <NavigateToIndex />;
  }

  return (
    <div className="container flex h-full flex-col gap-8">
      <h1 className="text-4xl font-semibold">{flow.title}</h1>
      <div className="flex h-full min-h-[1000px] w-full flex-col gap-4 lg:grid lg:grid-cols-4">
        <ReactFlowProvider>
          <Sidebar />
          <Sandbox id={flow.id} />
        </ReactFlowProvider>
      </div>
    </div>
  );
});
EditFlow.displayName = 'EditFlow';

export default EditFlow;
