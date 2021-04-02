# Svara is a generative music system based on the traditional rules of Hindustani ragas.

## Microsystems

The system is open-source and actively undergoing development. Developers, use packages at your own risk or await major version one before implementing any of the Svara services into your own projects. Listeners, check back often to enjoy the latest updates.

The following microsystems make up Svara.

### Kriya

Kriya – translated as "action" – is the center of the Svara system. It selects and interprets data from the API, composes musical motifs, and improvises within the parameters is defines. Learn about the creative system topology in the [documentation](https://github.com/ryantoddgarza/svara/tree/main/packages/svara-kriya).

### Svara API

The API provides data sets with melodic and rhythmic rules of Hindustani – North Indian – classical music. Prerequisite knowledge of fundamental raga concepts and integer notation is recommended but not difficult to learn. See the [documentation](https://github.com/ryantoddgarza/svara/tree/main/packages/svara-raga-data) for more information.

### Warbly

Warbly is a library of reusable audio synthesis components built for the Web Audio API. The project began coupled to the Svara system but has since been extracted and further developed independently. Visit the [Warbly](https://github.com/warbly) project to learn more.

## Player

The web player is an implementation example of the generative system. The system will select an appropriate raga based on the local time and initialize parameters to provide a unique and continuous ambient interpretation.
