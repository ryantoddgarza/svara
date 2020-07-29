import React, { useState } from 'react';
import about from './about.json';
import glossary from './glossary.json';

const Home = () => {
  const [activeDefinition, setActiveDefinition] = useState(Object.values(glossary)[0]);

  const getDefinition = (e) => {
    setActiveDefinition(Object.values(glossary[e.target.id]));
    // console.log(e.target)
  };

  const createHtmlTermEls = () => {
    const termsArray = Object.keys(glossary);

    const els = termsArray.map((term) => (
      <li key={term} id={term} onClick={(e) => getDefinition(e)}>{ term }</li>
    ));

    return els;
  };

  return (
    <div className="home about">
      <div className="about__lead">
        <div className="about__banner">
          <i />
        </div>
        <div className="about__tagline">{ about.tagline }</div>
      </div>
      <div className="glossary">
        <ul className="glossary__terms">{ createHtmlTermEls() }</ul>
        <div className="glossary__definition">{ activeDefinition }</div>
      </div>
    </div>
  );
};

export default Home;
