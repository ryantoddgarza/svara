import React, { useState, useEffect, forwardRef } from 'react';
import glossary from '~/data/glossary.json';

const Glossary = forwardRef((props, ref) => {
  const [activeDefinition, setActiveDefinition] = useState(undefined);
  const [activeId, setActiveId] = useState(Object.keys(glossary)[0]);

  const toggleActiveTerm = (id) => {
    document.getElementById(`${activeId}`).classList.remove('glossary__item--active');
    document.getElementById(`${id}`).classList.add('glossary__item--active');
    setActiveDefinition(Object.values(glossary[id]));
    setActiveId(id);
  };

  const handleTermClick = (e) => {
    toggleActiveTerm(e.target.id);
  };

  const createHtmlTermEls = () => {
    const termsArray = Object.keys(glossary);

    const els = termsArray.map((term) => (
      <li
        onClick={handleTermClick}
        key={term}
        id={term}
        className="glossary__item"
      >
        {term}
      </li>
    ));

    return els;
  };

  useEffect(() => {
    setActiveDefinition(Object.values(glossary)[0]);
    toggleActiveTerm(activeId);
  }, []);

  return (
    <section className="glossary" ref={ref}>
      <div className="glossary__content">
        <div className="glossary__row-top">
          <div className="glossary__title">glossary</div>
        </div>
        <div className="glossary__row-bottom">
          <ul className="glossary__terms-col">{createHtmlTermEls()}</ul>
          <div className="glossary__definition-col">
            <div className="glossary__definition">{activeDefinition}</div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Glossary;
