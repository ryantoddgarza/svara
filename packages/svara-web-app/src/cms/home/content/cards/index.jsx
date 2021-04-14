import React from 'react';
import DOMPurify from 'dompurify';
import api from './api.md';
import kriya from './kriya.md';
import warbly from './warbly.md';

const cards = [
  {
    heading: 'Kriya',
    html: kriya,
  },
  {
    heading: 'API',
    html: api,
  },
  {
    heading: 'Warbly',
    html: warbly,
  },
];

export default cards.map(({ heading, html }) => ({
  heading,
  body: <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />,
}));
