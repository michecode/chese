import * as React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Navigation from './Navigation';
import Web3Provider from './Web3Provider';

interface LayoutProps {
  children?: JSX.Element | JSX.Element[];
  path: string;
}

const Layout: React.FC<LayoutProps> = ({ children, path }) => {
  return (
    <>
      <div className="xl:block hidden">
        <Navigation path={path} />
        <main>{children}</main>
      </div>
      <div className="xl:hidden flex flex-col mx-auto">
        <img />
        <div className="flex">
          <h1 className="text-8xl">Sorry :</h1>
          <h1 className="text-8xl animate-face">(</h1>
        </div>
        <p className="my-8 mx-4">
          I developed this as a desktop only experience so I could focus on
          learning the underlying tech. If you would like to see my responsive
          websites. Visit{' '}
        </p>
        <div className="flex flex-col items-center mx-auto">
          <a href="https://alto.earth" className="text-blue-900 underline">
            alto
          </a>
          <a
            href="https://lahvah.onrender.com"
            className="text-blue-900 underline"
          >
            lahvah
          </a>
          <a
            href="https://madisonfries.onrender.com"
            className="text-blue-900 underline"
          >
            or even my personal site
          </a>
        </div>
      </div>
    </>
  );
};

export default Layout;
