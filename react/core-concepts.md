### Core Concepts

<style lang="css">
  .class-name {
    color: #194d33 !important;
  }
   .tag {
     color: red !important;
   }
</style>

## Config

::: warning
  We are currently working on the Variate Dashboard app. Therefore feel free to modify the config file from the quick start section until then.  
:::

Every site has a corresponding config file. The config file is a JSON representation of the state of all experiments and components within a site. When an experiment is publish the datafile will automatically be updated on Variate's CDN (please refer to the dashboard).

## Components
There are two ways to implement variate within your components. The examples are below:

### useVariate
```jsx
...
import React from 'react';
import { useVariate } from '@variate/react';
...

const Hero = ({ defaultContent }) => {

  const { content, variate } = useVariate('HomeHero', defaultContent);
  
  return (
    <section>
      <h1>{content.headline}</h1>
    </section>
  )
}

Hero.defaultProps = {
  defaultContent: {
    headline: 'This is the original boring headline, it would be awesome if we tested it!'
  }
}
```

### VariateComponent
```jsx
...
import React from 'react';
import { VariateComponent } from '@variate/react';
...

const Hero = ({ defaultContent }) => (
    <VariateComponent>
      {({ content, variate }) => (
        <section>
          <h1>{content.headline}</h1>
        </section>
      )}
    </VariateComponent>
  )
}

Hero.defaultProps = {
  defaultContent: {
    headline: 'This is the original boring headline, it would be awesome if we tested it!'
  }
}
```

## Tracking

Tracking events can be done from any component by calling the track method. Event types can be a `revenue` type or a `custom` type and can have extra value passed to them.

```jsx
...
import React from 'react';
import { useVariate } from '@variate/react';
...

const Hero = ({ defaultContent }) => {

  const { content, variate } = useVariate('HomeHero', defaultContent);
  
  return (
    <section>
      <h1>{content.headline}</h1>
      <button onPress={() => variate.track({
        name: 'Purchases',
        type: 'revenue',
        value: {
          bonzai: 'Nah'
        },
      })}>Track this</button>
    </section>
  )
}

Hero.defaultProps = {
  defaultContent: {
    headline: 'This is the original boring headline, it would be awesome if we tested it!'
  }
}
```

The VariateContext is available in the rare case you need to track events outside a Variate component.

```jsx
...
import React, { useContext }from 'react';
import { VariateContext } from '@variate/react';
...

const StrangeComponent = ({ defaultContent }) => {

  const { variate } = useContext(VariateContext);
  
  return (
    <section>
      <button onPress={() => variate.track({
        name: 'Clicked This',
        type: 'custom',
      })}>Track this</button>
    </section>
  )
}

```

## Previewing