import React, { Fragment } from 'react';
import { Flex } from '@svara/ui';
import Glossary from '~/components/Glossary';
import { home } from '~/cms';
import { Home as StyledHome, Container, Section } from './styled';

const Home = () => {
  const {
    settings: {
      general: { subtitle },
    },
    content: { features, cards, glossary },
  } = home;

  const cardCols = [1, 2, 3];

  return (
    <StyledHome>
      <Section className="home__article">
        <Container>
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
        </Container>
      </Section>
      <Section dark>
        <Container>
          <Glossary entries={glossary} />
        </Container>
      </Section>
    </StyledHome>
  );
};

export default Home;
