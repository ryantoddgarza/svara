import React, { useState } from 'react';

const SynthEngineContext = React.createContext(null);

export const withSynthEngine = (Component) => {
  return function synthEngineContextProvider(props) {
    const [isPlaying, setIsPlaying] = useState(false);

    const play = () => {
      setIsPlaying(!isPlaying)
    };

    return (
      <SynthEngineContext.Provider value={ { isPlaying, setIsPlaying, play } }>
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

