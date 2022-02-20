import * as React from 'react';
import { PageProps } from 'gatsby';
import Layout from '../components/Layout';
import Gradient from '../images/iridescent-gradient.png';

const Error404Page: React.FC<PageProps> = (props: PageProps) => (
  <Layout path={props.path}>
    <img
      src={Gradient}
      className="absolute top-0 left-0 -z-10 w-screen h-screen"
    />
    <h1 className="text-white text-6xl mt-64 ml-64">You are here!</h1>
    <h2 className="text-white text-4xl ml-64">But nothing here for you #404</h2>
  </Layout>
);

export default Error404Page;
