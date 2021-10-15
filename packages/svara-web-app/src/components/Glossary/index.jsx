import React, { useState, useEffect, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { usePrevious } from '../../hooks';

const Glossary = forwardRef(({ entries }, ref) => {
  const [activeDefinition, setActiveDefinition] = useState();
  const [activeTermEl, setActiveTermEl] = useState();
  const prevTermEl = usePrevious(activeTermEl);
  const definitionRef = useRef(null);
  const scrollToDefinition = () => definitionRef.current.scrollIntoView();

  function setGlossaryUI(term) {
    setActiveDefinition(Object.values(entries[term]));
  }

  function handleTermClick(event) {
    setGlossaryUI(event.target.id);
    setActiveTermEl(event.target);
    scrollToDefinition();
  }

  useEffect(() => {
    if (activeTermEl) {
      activeTermEl.classList.add('active');
    }

    if (prevTermEl) {
      prevTermEl.classList.remove('active');
    }
  }, [handleTermClick]);

  return (
    <div className="glossary" ref={ref}>
      <div className="grid">
        <div className="aside">
          {Object.keys(entries).map((term) => (
            <button
              type="button"
              onClick={(event) => handleTermClick(event)}
              key={`key__${term}`}
              id={term}
              className="term"
            >
              {term}
            </button>
          ))}
        </div>
        <div className="main">
          <div ref={definitionRef} className="definition">
            {activeDefinition}
          </div>
        </div>
      </div>
    </div>
  );
});

Glossary.propTypes = {
  entries: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Glossary;
