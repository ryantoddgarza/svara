import React from 'react';
import Glossary from '~/components/Glossary';
import { tagline } from '~/data/about.json';

const Home = () => (
  <div className="home">
    <div className="about__lead">
      <div className="about__banner">
        <i />
      </div>
      <div className="about__tagline-outer">
        <div className="about__tagline">{tagline}</div>
      </div>
    </div>
    <Glossary />
  </div>
);

export default Home;
