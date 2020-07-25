import React from 'react';

const SynthEngineContext = React.createContext(null);

export const withSynthEngine = (Component) => {
  return function synthEngineContextProvider(props) {
    const fooData = {
      bar: 'bar',
      baz: 'baz',
    },

    return (
      <SynthEngineContext.Provider value={ { fooData } }>
        <Component {...props} />
      </SynthEngineContext.Provider>
    );
  };
};

export const useSynthEngine = (Component) => {
  return function synthEngineContextConsumer(props) {
    return (
      <SynthEngineContext.Consumer>
        { (value) => <Component {...props} synthEngine={ value } /> }
      </SynthEngineContext.Consumer>
    );
  };
};

