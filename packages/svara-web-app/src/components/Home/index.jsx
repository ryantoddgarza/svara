import React, { Fragment } from 'react';
import Glossary from '../Glossary';
import { home } from '../../cms';

const Home = () => {
  const {
    settings: {
      general: { subtitle },
    },
    content: { features, cards, glossary },
  } = home;

  return (
    <>
      <section className="section light">
        <div className="layout">
          <div className="content">
            <div className="headliner">
              <h2 className="title">{subtitle}</h2>
            </div>
            <div className="feature">
              {features.map(({ heading, body }) => (
                <div className="item" key={`key__${heading}`}>
                  <h2 className="heading">{heading}</h2>
                  <div className="body">{body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section light">
        <div className="layout">
          <div className="content">
            <div className="headliner">
              <h2 className="title">Packages</h2>
            </div>
            <div className="feature">
              <div className="grid">
                {cards.map(({ heading, body }) => (
                  <div className="item" key={`key__${heading}`}>
                    <h3 className="heading">{heading}</h3>
                    <div className="body">{body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section dark">
        <div className="layout">
          <div className="content">
            <div className="headliner">
              <h2 className="title">Glossary</h2>
            </div>
            <Glossary entries={glossary} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
