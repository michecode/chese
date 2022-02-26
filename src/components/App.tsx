import * as React from 'react';
import Web3Provider from './Web3Provider';

interface AppProps {
  children?: JSX.Element | JSX.Element[];
}

const App: React.FC<AppProps> = ({ children }) => {
  return <Web3Provider>{children}</Web3Provider>;
};

export default App;
