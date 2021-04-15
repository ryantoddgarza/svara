import React from 'react';
import DOMPurify from 'dompurify';
import microsystems from './microsystems.md';
import player from './player.md';

const features = [
  {
    heading: 'Player',
    html: player,
  },
  {
    heading: 'Microsystems',
    html: microsystems,
  },
];

export default features.map(({ heading, html }) => ({
  heading,
  body: <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />,
}));
