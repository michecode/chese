import './src/styles/global.css';

import React from 'react';
import App from './src/components/App';

export const wrapRootElement = ({ element }) => {
  return <App>{element}</App>;
};
