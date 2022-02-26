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
      <div className="2xl:block hidden">
        <Navigation path={path} />
        <main>{children}</main>
      </div>
      <div className="2xl:hidden">
        This is a desktop only experience. If you want to see my responsive
        websites. Visit{' '}
        <a href="https://alto.earth" className="text-blue-900">
          alto
        </a>
        ,{' '}
        <a href="https://lahvah.onrender.com" className="text-blue-900">
          lahvah
        </a>
        , or even my{' '}
        <a href="https://madisonfries.onrender.com" className="text-blue-900">
          personal site
        </a>
      </div>
    </>
  );
};

export default Layout;
