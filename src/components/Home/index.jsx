import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FaGithub,
  FaList,
  FaArrowRight,
  FaExternalLinkAlt,
} from 'react-icons/fa';
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
                  <FaGithub className="tile__id-icon icon__lg--responsive" />
                  <FaExternalLinkAlt className="tile__action-icon icon" />
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
                  <FaList className="tile__id-icon icon__lg--responsive" />
                  <FaArrowRight className="tile__action-icon icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="grid-module__col--8">
            <div className="grid-module__card grid-module__aspect-ratio--2x1">
              <div className="grid-module__aspect-ratio--object">
                <div className="grid-module__tile grid-module__tile--interactive">
                  <Link className="tile--clickable" to={VISUALIZER}>
                    Visualizer
                  </Link>
                  <FaArrowRight className="tile__action-icon icon" />
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
