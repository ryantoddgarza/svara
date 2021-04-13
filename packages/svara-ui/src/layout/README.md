# Layout

Layout components for [React](https://reactjs.org/) built with [styled-components](https://styled-components.com/).

## Flex

### Usage

The `Flex` component is centered around the `box` and `item` elements.

```js
import { Flex } from '@svara/ui';

const Component = () => (
  <Flex box>
    <Flex item>content</Flex>
    <Flex item>content</Flex>
    <Flex item>content</Flex>
  </Flex>
);
```

### Props

#### `box`

Sets the CSS styles for a flex box (container) element.

```js
<Flex box />
```

#### `gap`

Specifying a pixel value adds positive margin – rendered in `rem` – to each `item` element and a negative margin compensation to the `box` element. There is no `gap` by default.

```js
<Flex box gap={number} />
```

#### `gapBottom`

Sets each `item`s bottom margin to the `gap` value.

```js
<Flex box gap={number} gapBottom />
```

#### `item`

Sets the CSS styles for a flex item (child). Elements default to equal width columns.

```js
<Flex item />
```

#### `cols`

Set the width of an `item` element by specifying the number of columns. The result is a fluid column.

```js
<Flex item cols={3} />
```

#### Gotcha: Negative margin

Because a negative margin is applied to the `box` element, it can cause an unwanted horizontal scroll if it exceeds the document `<body>`. There are two ways to prevent this:

1. Apply padding to the parent that is a minimum of half the `gap` value.
2. Add `overflow-x: hidden;` to the parent's styles.

### Themed media queries

Use the styled-components `ThemeProvider` component to set the theme's breakpoints. Props that support breakpoints – such as `cols` – use the values from the theme's `breakpoints` property to create mobile first [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries).

```js
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Flex } from '@svara/ui';

const theme = {
  breakpoints: ['320px', '640px', '1280px', '1600px'],
};

const cols = [1, 2, 3];

const App = () => (
  <ThemeProvider theme={theme}>
    <Flex box>
      <Flex item cols={cols}>
        column
      </Flex>
      ))}
    </Flex>
  </ThemeProvider>
);
```

Breakpoints below the first value default to full-width. Queries are only created until either the breakpoints or value array no longer has a corresponding pair. For instance, in the above example no `cols` media query will be generated for the `'1600px'` breakpoint.
