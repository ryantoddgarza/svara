import React from 'react';
import { notFound } from '../../cms';

const NotFound = () => {
  const {
    settings: { description },
  } = notFound;

  return (
    <div className="section light">
      <div className="layout">
        <div className="content">
          <div className="headliner">
            <h2 className="title">{description}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
