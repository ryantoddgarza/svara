import mediaQueryFeature from './mediaQueryFeature';

function minWidthTargets(queries) {
  return queries.map((query) => mediaQueryFeature('min-width', query));
}

export default minWidthTargets;
