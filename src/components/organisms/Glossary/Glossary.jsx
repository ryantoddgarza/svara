import React, { useState, useEffect } from 'react';
import glossary from './glossary.json';

const Glossary = () => {
  const [activeDefinition, setActiveDefinition] = useState(undefined);
  const [activeId, setActiveId] = useState(Object.keys(glossary)[0]);

  const toggleActiveTerm = (key) => {
    document.getElementById(`${activeId}`).classList.remove('glossary__item--active');
    document.getElementById(`${key}`).classList.add('glossary__item--active');
    setActiveDefinition(Object.values(glossary[key]));
    setActiveId(key);
  };

  const handleTermClick = (e) => {
    toggleActiveTerm(e.target.id);
  };

  const createHtmlTermEls = () => {
    const termsArray = Object.keys(glossary);

    const els = termsArray.map((term) => (
      <li key={term} id={term} className="glossary__item" onClick={(e) => handleTermClick(e)}>{ term }</li>
    ));

    return els;
  };

  useEffect(() => {
    setActiveDefinition(Object.values(glossary)[0]);
    toggleActiveTerm(activeId);
  }, []);

  return (
    <section className="glossary">
      <div className="glossary__content">
        <div className="glossary__row-top">
          <div className="glossary__title">glossary</div>
        </div>
        <div className="glossary__row-bottom">
          <ul className="glossary__terms-col">{ createHtmlTermEls() }</ul>
          <div className="glossary__definition-col">
            <div className="glossary__definition">
              { activeDefinition }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Glossary;
