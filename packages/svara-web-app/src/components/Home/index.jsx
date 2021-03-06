import React, { Fragment } from 'react';
import { Flex } from '@svara/ui';
import Glossary from '~/components/Glossary';
import { home } from '~/cms';

const Home = () => {
  const {
    settings: {
      general: { subtitle },
    },
    content: { features, cards, glossary },
  } = home;

  const cardCols = [1, 2, 3];

  return (
    <div className="home">
      <section className="home__section home__section--light">
        <div className="container home__container home__article">
          <h1>{subtitle}</h1>
          {features.map(({ heading, body }) => (
            <Fragment key={`key__${heading}`}>
              <h2>{heading}</h2>
              {body}
            </Fragment>
          ))}
          <Flex box gap={16}>
            {cards.map(({ heading, body }) => (
              <Flex item cols={cardCols} key={`key__${heading}`}>
                <h3>{heading}</h3>
                {body}
              </Flex>
            ))}
          </Flex>
        </div>
      </section>
      <section className="home__section home__section--dark">
        <div className="container home__container">
          <Glossary entries={glossary} />
        </div>
      </section>
    </div>
  );
};

export default Home;
