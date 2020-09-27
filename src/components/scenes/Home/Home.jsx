import React from 'react';
import Glossary from '~/components/organisms/Glossary';
import about from '~/data/about.json';

const Home = () => (
  <div className="home">
    <div className="about__lead">
      <div className="about__banner">
        <i />
      </div>
      <div className="about__tagline-outer">
        <div className="about__tagline">{ about.tagline }</div>
      </div>
    </div>
    <Glossary />
  </div>
);

export default Home;
