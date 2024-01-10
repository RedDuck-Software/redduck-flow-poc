import { Link, Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';

export const MainLayout = () => {
  const { address } = useAccount();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <w3m-button size="sm" />
        <div>Connected Wallet: {address ?? 'none'}</div>
      </div>
      <div className="flex gap-2">
        <Link to="/">Main Page</Link>
        <Link to="/second-page">Second Page</Link>
      </div>
      <Outlet />
    </div>
  );
};
