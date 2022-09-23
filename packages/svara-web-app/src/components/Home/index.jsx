import React, { Fragment } from 'react';
import { sanitize } from 'dompurify';
import Glossary from '../Glossary';
import { home } from '../../cms';

const Home = () => {
  const {
    settings: { description },
    content: { glossary, highlights, packages },
  } = home;

  return (
    <>
      <section className="section light">
        <div className="layout">
          <div className="content">
            <div className="headliner">
              <h2 className="title">{description}</h2>
            </div>
            <div className="feature">
              {highlights.map(({ id, name, html }) => (
                <div className="item" key={id}>
                  <h2 className="heading">{name}</h2>
                  <div
                    className="body"
                    dangerouslySetInnerHTML={{ __html: sanitize(html) }}
                  />
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
                {packages.map(({ id, name, html }) => (
                  <div className="item" key={id}>
                    <h3 className="heading">{name}</h3>
                    <div
                      className="body"
                      dangerouslySetInnerHTML={{ __html: sanitize(html) }}
                    />
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
