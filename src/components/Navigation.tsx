import * as React from 'react';
import { Link } from 'gatsby';

interface NavigationProps {
  path: string;
}

const Navigation: React.FC<NavigationProps> = ({ path }) => {
  console.log(path != '/' && path != '/404');

  if (path != '/' && path != '/404') {
    return (
      <header>
        <div className="flex justify-end text-black mx-12 mt-12">
          <Link
            to="/"
            className="text-6xl bg-gradient bg-clip-text text-transparent hover:text-black"
          >
            chese
          </Link>
          <span className="flex items-center text-2xl ml-auto">
            <Link to="/marketplace" className="mx-4 hover:text-white">
              Marketplace
            </Link>
            <Link to="/artists" className="mx-8 hover:text-white">
              Artists
            </Link>
            <button className="text-white bg-gradient hover:text-white hover:bg-black hover:bg-none rounded-2xl px-4 py-3 my-0">
              Connect Wallet
            </button>
          </span>
        </div>
      </header>
    );
  }

  console.log(path);

  return (
    <header>
      <div className="flex justify-end text-white mx-12 mt-12">
        <Link to="/" className="text-6xl hover:text-black">
          chese
        </Link>
        <span className="flex items-center text-2xl ml-auto">
          <Link to="/marketplace" className="mx-4 hover:text-black">
            Marketplace
          </Link>
          <Link to="/artists" className="mx-8 hover:text-black">
            Artists
          </Link>
          <button className="text-black hover:text-white bg-white hover:bg-black rounded-2xl px-4 py-3 my-0">
            Connect Wallet
          </button>
        </span>
      </div>
    </header>
  );
};

export default Navigation;
