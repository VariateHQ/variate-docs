# Core Concepts

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

Every site has a corresponding config file. The config file is a JSON representation of the state of all experiments and components within a site. When an experiment is publish the config file will automatically be updated on Variate's CDN (please refer to the dashboard). [Learn more about the config file.](/engine/configuration.html)

## Components

### VariateProvider
```jsx
...
import React from 'react';
import { VariateProvider } from '@variate/react';
import config from './variate.json';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
...

const history = createBrowserHistory();

const App = () => (
  <VariateProvider 
    config={config} 
    debug={true} 
    tracking={true}
    onViewChange={activate => {
      activate({ view: window.location.pathname });
      history.listen(location => activate({ view: location.pathname }));
    }}
  >
    <Router history={history}>
      ...
    </Router>
  </VariateProvider>
)

```

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

Tracking events can be done from any component by calling the track method on variate. Event types can be either a `revenue` or `custom` type and can have extra data passed to them.

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
          amount: 1000 
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
        name: 'clicked_strange',
        type: 'custom',
      })}>Track this</button>
    </section>
  )
}

```

## Previewing