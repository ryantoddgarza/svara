import { mediaQuery, minWidthTargets } from '../utils';

function CSSDeclaration(property, callback) {
  this.property = property;
  this.callback = callback;
  this.define = (value) => {
    const cssDeclaration = (prop, val) => `${prop}: ${val};`;

    return cssDeclaration(
      this.property,
      this.callback ? this.callback(value) : value,
    );
  };
}

CSSDeclaration.prototype = {
  declare(value) {
    return this.define(value);
  },

  declareResponsive(breakpoints, values) {
    if (!Array.isArray(values)) {
      return this.define(values);
    }

    const createMediaQueries = (n) => {
      const queries = minWidthTargets(breakpoints);
      const cssDeclarations = values.map((val) => this.define(val));

      return Array.from(Array(n)).map((item, i) =>
        mediaQuery(queries[i], cssDeclarations[i]),
      );
    };

    const nQueries = Math.min(values.length, breakpoints.length);

    return createMediaQueries(nQueries);
  },
};

export default CSSDeclaration;
