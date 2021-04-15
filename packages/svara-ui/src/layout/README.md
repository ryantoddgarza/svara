# Layout

Layout components for [React](https://reactjs.org/) built with [styled-components](https://styled-components.com/).

## Flex

### Usage

Create flexbox based layouts with the `Flex` component. The system is made of `box` and `item` elements. Pass either as a prop to the `Flex` component.

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

Sets the CSS styles for a flex box (container).

```js
<Flex box />
```

#### `item`

Sets the CSS styles for a flex item (child). `item`s default to equal width columns.

```js
<Flex item />
```

#### `cols`

Specify a number of columns to set the fluid width of an `item`. Supports responsive breakpoints.

```js
<Flex item cols={3} />
```

#### `gap`

Specify a pixel value to add a horizontal negative margin – rendered in `rem` – to the `box` and a positive margin to all direct child elements. There is no `gap` by default.

```js
<Flex box gap={number} />
```

#### `gapBottom`

Sets the bottom margin of a `box`'s direct children to the `gap` value.

```js
<Flex box gap={number} gapBottom />
```

### Themed media queries

Use the styled-components `ThemeProvider` component to set the theme's breakpoints and pass an array of values to the prop that supports responsive breakpoints. The shorter of either array determines the number of mobile first [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) that are created. For instance, in the following example no media query will be generated for the `'1600px'` breakpoint since the `cols` value array has a length of 3. Breakpoints below the first value default to full-width.

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
    </Flex>
  </ThemeProvider>
);
```

### Gotchas

#### Negative margin

Because a negative margin is applied to the `box` element, it can cause an unwanted horizontal scroll if it exceeds the document `<body>`. There are two ways to prevent this:

1. Apply padding to the parent that is a minimum of half the `gap` value.
2. Add `overflow-x: hidden;` to the parent's styles.
