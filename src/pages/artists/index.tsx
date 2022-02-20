import * as React from 'react';
import { PageProps } from 'gatsby';
import Layout from '../../components/Layout';
import Gradient from '../../images/iridescent-gradient.png';

const Index: React.FC<PageProps> = (props: PageProps) => {
  return <Layout path={props.path}></Layout>;
};

export default Index;
