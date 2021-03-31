import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import {
  FaGithub,
  FaList,
  FaArrowRight,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import { VISUALIZER } from '~/constants/routes';
import Glossary from '~/components/Glossary';
import aboutData from '~/data/about/data.json';
import aboutMd from '~/data/about/index.md';

const Home = () => {
  const glossaryRef = useRef();
  const scrollGlossaryIntoView = () => glossaryRef.current.scrollIntoView();

  return (
    <div className="home">
      <section className="home__section home__section--light">
        <div className="container home__container home__article">
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutMd) }}
          />
        </div>
      </section>
      <section className="home__section home__section--light">
        <div className="home__container grid-module">
          <div className="grid-module__row">
            <div className="grid-module__col--8">
              <div className="grid-module__card grid-module__aspect-ratio--2x1">
                <div className="grid-module__aspect-ratio--object">
                  <div className="grid-module__tile">
                    <h5>{aboutData.description}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid-module__col--4">
              <div className="grid-module__card grid-module__aspect-ratio--1x1">
                <div className="grid-module__aspect-ratio--object">
                  <div className="grid-module__tile grid-module__tile--interactive">
                    <a
                      className="tile__clickable"
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
                      className="tile__clickable"
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
                    <Link className="tile__clickable" to={VISUALIZER}>
                      Visualizer
                    </Link>
                    <FaArrowRight className="tile__action-icon icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home__section home__section--dark">
        <div className="home__container">
          <Glossary ref={glossaryRef} />
        </div>
      </section>
    </div>
  );
};

export default Home;
