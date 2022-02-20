import * as React from 'react';
import { PageProps } from 'gatsby';
import Layout from '../../components/Layout';
import Gradient from '../../images/iridescent-gradient.png';

const Sample: React.FC<PageProps> = (props: PageProps) => {
  return (
    <Layout path={props.path}>
      <img
        src={Gradient}
        className="absolute top-0 left-0 -z-10 w-screen h-screen"
      />
    </Layout>
  );
};

export default Sample;
