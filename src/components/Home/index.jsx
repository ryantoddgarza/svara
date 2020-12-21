import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import { VISUALIZER } from '~/constants/routes';
import Glossary from '~/components/Glossary';
import { tagline } from '~/data/about.json';

const Home = () => {
  const glossaryRef = useRef();
  const scrollGlossaryIntoView = () => glossaryRef.current.scrollIntoView();

  return (
    <div className="home">
      <section className="grid-module">
        <div className="grid-module grid-module__row">
          <div className="grid-module__col--8">
            <div className="grid-module__card grid-module__aspect-ratio--2x1">
              <div className="grid-module__aspect-ratio--object">
                <div className="grid-module__tile">
                  <h5>{tagline}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-module__col--4">
            <div className="grid-module__card grid-module__aspect-ratio--1x1">
              <div className="grid-module__aspect-ratio--object">
                <div className="grid-module__tile grid-module__tile--interactive">
                  <a
                    className="tile--clickable"
                    href="https://github.com/ryantoddgarza/svara"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                  <FaGithub className="id-icon" />
                  <FaExternalLinkAlt className="action-icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="grid-module__col--4">
            <div className="grid-module__card grid-module__aspect-ratio--1x1">
              <div className="grid-module__aspect-ratio--object">
                <div className="grid-module__tile grid-module__tile--interactive">
                  <span
                    className="tile--clickable"
                    onClick={scrollGlossaryIntoView}
                  >
                    Glossary
                  </span>
                  <FaGithub className="id-icon" />
                  <FaArrowRight className="action-icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="grid-module__col--8">
            <div className="grid-module__card grid-module__aspect-ratio--2x1">
              <div className="grid-module__aspect-ratio--object">
                <div className="grid-module__tile grid-module__tile--interactive">
                  <Link className="tile--clickable" to={VISUALIZER}>Visualizer</Link>
                  <FaArrowRight className="action-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Glossary ref={glossaryRef} />
    </div>
  );
};

export default Home;
