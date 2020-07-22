import React from 'react';

const SynthEngineContext = React.createContext(null);

// provider component.
// export const SynthEngineProvider = ({ children }) => {
//   const fooData = 'foo';

//   return (
//     <SynthEngineContext.Provider value={ fooData }>
//       { children }
//     </SynthEngineContext.Provider>
//   )
// };

// custom provider. use by wrapping a component in this HOC.
// @param {component} - the component that needs access to this context via `props`
export const withSynthEngine = (Component) => {
  return function synthEngineContextProvider(props) {
    const fooData = 'foo';

    return (
      <SynthEngineContext.Provider value={ fooData }>
        <Component {...props} />
      </SynthEngineContext.Provider>
    );
  };
};

// custom consumer. use by wrapping a component in this HOC.
// @param {component} - the component that needs access to this context via `props`
export const useSynthEngine = (Component) => {
  return function synthEngineContextConsumer(props) {
    return (
      <SynthEngineContext.Consumer>
        { (value) => <Component {...props} synthEngine={ value } /> }
      </SynthEngineContext.Consumer>
    );
  };
};

