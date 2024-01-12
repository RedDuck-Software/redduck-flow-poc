import { renderIcon } from '@download/blockies';
import { memo, useEffect, useRef, useState } from 'react';
import { type Address } from 'viem';

import { Skeleton } from '@/components/ui/skeleton.tsx';
import { validateAddress } from '@/lib/validate-address.ts';

interface BlockiesProps {
  address?: Address;
}

export const Blockies = memo(({ address }: BlockiesProps) => {
  const [dataUrl, setDataUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isValidAddress = validateAddress(address);

  useEffect(() => {
    if (canvasRef && isValidAddress) {
      const canvas = canvasRef.current;
      renderIcon({ seed: address.toLowerCase() }, canvas);
      if (canvas) {
        const updatedDataUrl = canvas.toDataURL();
        if (updatedDataUrl !== dataUrl) {
          setDataUrl(updatedDataUrl);
        }
      }
    }
  }, [dataUrl, isValidAddress, address]);

  return isValidAddress ? (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {dataUrl ? (
        <img
          src={dataUrl}
          alt={address}
          width={40}
          height={40}
          className="rounded-full border border-border"
        />
      ) : null}
    </>
  ) : (
    <Skeleton className="h-[40px] w-[40px] rounded-full border border-border" />
  );
});
Blockies.displayName = 'Blockies';
