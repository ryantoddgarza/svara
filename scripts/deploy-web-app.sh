#!/usr/bin/env sh

# Install locally until published to npm
cd packages/warbly
npm i

# Build web app
cd ../svara-web-app
npm run build
