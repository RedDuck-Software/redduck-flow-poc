import { Loader2 } from 'lucide-react';

export const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="h-16 w-16 animate-spin" />
    </div>
  );
};
