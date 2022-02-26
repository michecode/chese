import * as React from 'react';
import { PageProps } from 'gatsby';
import Layout from '../../components/Layout';
import Gradient from '../../images/iridescent-gradient.png';

const Index: React.FC<PageProps> = (props: PageProps) => {
  return (
    <Layout path={props.path}>
      <h1 className="text-8xl ml-10 mt-20">UNDER CONSTRUCTION!</h1>
    </Layout>
  );
};

export default Index;
