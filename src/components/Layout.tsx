import * as React from 'react';
import { PageProps } from 'gatsby';
import Navigation from './Navigation';

interface LayoutProps {
  children?: any;
  path: string;
}

const Layout: React.FC<LayoutProps> = ({ children, path }) => (
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

export default Layout;
