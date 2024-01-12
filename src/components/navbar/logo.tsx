import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src="/duck-face.svg" width="50" height="50" alt="redduck logo" />
      <div className="text-2xl font-bold md:text-3xl lg:text-4xl">Flow POC</div>
    </Link>
  );
};
