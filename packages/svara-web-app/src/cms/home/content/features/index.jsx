import React from 'react';
import DOMPurify from 'dompurify';
import project from './project.md';
import player from './player.md';

const features = [
  {
    heading: 'Player',
    html: player,
  },
  {
    heading: 'Project',
    html: project,
  },
];

export default features.map(({ heading, html }) => ({
  heading,
  body: <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />,
}));
