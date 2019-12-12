# Components

## VariateProvider

The VariateProvider is required and  must wrap all components you want to run experiments on.

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
    config={config} // Object: Required
    debug={true} // Bool: Optional
    tracking={true} // Bool: Optional
    onViewChange={activate => { 
      activate({ view: window.location.pathname });
      history.listen(location => activate({ view: location.pathname }));
    }} // Function: Optional
  >
    <Router history={history}>
      ...
    </Router>
  </VariateProvider>
)

```

## useVariate

The useVariate hook must be used in any component you want to include an experiment in. If your project is not using react hooks, use the VariateComponent below instead.

```jsx
...
import React from 'react';
import { useVariate } from '@variate/react';
...

const Hero = ({ defaultContent }) => {

  const { variables, variate } = useVariate(
    'HomeHero', // String: Required
    defaultContent // Object: Optional
  );
  
  return (
    <section>
      <h1>{variables.headline}</h1>
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

The VariateComponent must be used in any component you want to include an experiment in.

```jsx
...
import React from 'react';
import { VariateComponent } from '@variate/react';
...

const Hero = ({ defaultContent }) => (
    <VariateComponent
      componentName="Hero" // String: Required
      defaultContent={defaultContent} // Object: Optional
    >
      {({ variables, variate }) => (
        <section>
          <h1>{variables.headline}</h1>
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
