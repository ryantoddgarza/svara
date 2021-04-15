import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Flex } from '@svara/ui';
import PropTypes from 'prop-types';
import { usePrevious } from '~/hooks';

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
      <h2 className="glossary__title">Glossary</h2>
      <Flex box gap={16} gapBottom>
        <Flex item cols={[1, 3]}>
          {Object.keys(entries).map((term) => (
            <button
              type="button"
              onClick={(event) => handleTermClick(event)}
              key={`key__${term}`}
              id={term}
              className="glossary__term"
            >
              {term}
            </button>
          ))}
        </Flex>
        <Flex item>
          <div ref={definitionRef} className="glossary__definition">
            {activeDefinition}
          </div>
        </Flex>
      </Flex>
    </div>
  );
});

Glossary.propTypes = {
  entries: PropTypes.objectOf(PropTypes.string),
};

Glossary.defaultProps = {
  entries: {},
};

export default Glossary;
