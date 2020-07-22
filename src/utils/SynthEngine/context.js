import React, { useState } from 'react';

const SynthEngineContext = React.createContext(null);

// provider component
// export const SynthEngineProvider = ({ children }) => {
//   const fooData = 'foo';

//   return (
//     <SynthEngineContext.Provider value={ fooData }>
//       { children }
//     </SynthEngineContext.Provider>
//   )
// };

// custom provider
// @param {component} - the component to gain access to this context
export const withSynthEngine = (Component) => {
  return function synthEngineContextProvider(props) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
      <SynthEngineContext.Provider value={ { isPlaying, setIsPlaying } }>
        <Component {...props} />
      </SynthEngineContext.Provider>
    );
  };
};

// custom consumer
// @param {component} - the component to gain access to this context
export const useSynthEngine = (Component) => {
  return function synthEngineContextConsumer(props) {
    return (
      <SynthEngineContext.Consumer>
        { (value) => <Component {...props} synthEngine={ value } /> }
      </SynthEngineContext.Consumer>
    );
  };
};

