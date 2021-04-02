import glossary from './glossary.json';
import aboutData from './about.json';
import aboutExcerpt from './aboutExcerpt.md';

const about = {
  ...aboutData,
  excerpt: aboutExcerpt,
};

export default { about, glossary };
