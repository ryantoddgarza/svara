import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { usePrevious } from '~/hooks';

const Glossary = forwardRef(({ entries }, ref) => {
  const [activeDefinition, setActiveDefinition] = useState();
  const [activeTermEl, setActiveTermEl] = useState();
  const prevTermEl = usePrevious(activeTermEl);

  function setGlossaryUI(term) {
    setActiveDefinition(Object.values(entries[term]));
  }

  function handleTermClick(event) {
    setGlossaryUI(event.target.id);
    setActiveTermEl(event.target);
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
    <section className="glossary" ref={ref}>
      <div className="glossary__content">
        <div className="glossary__row-top">
          <div className="glossary__title">glossary</div>
        </div>
        <div className="glossary__row-bottom">
          <ul className="glossary__col glossary__col--terms">
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
          </ul>
          <div className="glossary__col glossary__col--definition">
            <div className="glossary__definition">{activeDefinition}</div>
          </div>
        </div>
      </div>
    </section>
  );
});

Glossary.propTypes = {
  entries: PropTypes.objectOf(PropTypes.string),
};

Glossary.defaultProps = {
  entries: {},
};

export default Glossary;
