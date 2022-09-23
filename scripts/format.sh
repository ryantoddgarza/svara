set -e

npm run lint -- --fix
npm run prettier -- --write
