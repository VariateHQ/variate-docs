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
  We are currently working on the Variate Dashboard app. Feel free to modify the config file from the quick start section until then.  
:::

Every site has a corresponding config file. The config file is a JSON representation of the state of all experiments and components within a site. When an experiment is publish the config file will automatically be updated on Variate's CDN (please refer to the Variate dashboard). [Learn more about the config file.](/engine/configuration.html)

## Components

### VariateProvider

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

### useVariate

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

## Targeting

Variate must to be reinitalize between each page / view change to target experiments correctly. This can be done in the provider by calling active in the onViewChange or by calling initialize on the variate config object.

### With the onViewChange method

```jsx
<VariateProvider
  onViewChange={activate => { 
    activate({ view: window.location.pathname });
  }
}>
  ...
</VariateProvider>
```

### Without the onViewChange method

```jsx
const App = () => {
  <VariateProvider>
    (({ variate }) => {
      variate.initialize({ view: window.location.pathname })
      return (
        ...
      )
    })
  </VariateProvider>
}
```

## Tracking

### Page Tracking

Tracking pages views is on by default. It can alose be turn on by adding the tracking prop to the VariateProvider and setting it to true.

### Custom events 
Custom tracking events can be sent from any Variate component by calling the track method on Variate. Event types can be either a `revenue` or `custom` type and can have extra data passed to them.


```jsx
...
import React from 'react';
import { useVariate } from '@variate/react';
...

const Hero = ({ defaultContent }) => {

  const { variables, track } = useVariate('HomeHero', defaultvariables);
  
  return (
    <section>
      <h1>{variables.headline}</h1>
      <button onPress={() => track({
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

## Force a Variation

::: warning Overriding Targeting Conditions
While it is possible to override the default bucketing behavior of Variate to preview specific variations, it is currently not possible to override targeting conditions such as view and audiences. 
:::

There are currently two ways to "force" or preview a specific variation of an experiment: 

**Method 1: Manually update local storage**

Variate assigns each visitor an `experimentBucket`. This is a random number from 1 to 100. Each variation in an experiment targets a range of that number. In the [example experiment](#first-experiment), there are two variations, each set up to receive an even 50/50 split of traffic. The `min` and `max` on each variation refer to the smallest and greatest `experimentBucket` for which that variation will appear. 

```json
{
  "variations": [
      {
          "id": 1,
          "traffic_allocation": {
              "max": 50,
              "min": 1
          },
          "components": {
              "HomeHero": {
                  "id": 1,
                  "attributes": {
                      "headline": "The A/B testing tool for the modern web"
                  }
              }
          }
      },
      {
          "id": 2,
          "traffic_allocation": {
              "max": 100,
              "min": 51
          },
          "components": {
              "HomeHero": {
                  "id": 1,
                  "attributes": {
                      "headline": "The A/B testing tool that marketers and developers can agree on"
                  }
              }
          }
      }
  ]
}
```

The experiment bucket number is stored in local storage and is used in subsequent visits to check if a visitor is already bucketed into an experiment. If they are already bucketed, then they are not re-bucketed into a new variation. 

Below is what the local storage looks like for a visitor bucketed into experiment 1, variation 2 (targeting `51`-`100`). 

<img :src="$withBase('/variate-vue-experiment-bucket-1.png')" alt="Experiment bucket in local storage">

To preview variation 1 instead of variation 2, the `70` can be updated to any integer between and including `1` and `50`. After updating the bucket to `30` and reloading the page, the headline was updated to match that of variation 1: 

<img :src="$withBase('/variate-vue-experiment-bucket-2.png')" alt="Experiment bucket updated in local storage">

**Method 2: Update config to force a variation**

To guarantee that all visitors will see only one variation, update the `min` and `max` on each variation. Below, we have increased the likelihood of seeing variation 2 to 100%: 

```json
"variations": [
                    {
                        "id": 1,
                        "traffic_allocation": {
                            "max": 0,
                            "min": 0
                        },
                        "components": {
                            "HomeHero": {
                                "id": 1,
                                "attributes": {
                                    "headline": "The A/B testing tool for the modern web"
                                }
                            }
                        }
                    },
                    {
                        "id": 2,
                        "traffic_allocation": {
                            "max": 100,
                            "min": 1
                        },
                        "components": {
                            "HomeHero": {
                                "id": 1,
                                "attributes": {
                                    "headline": "The A/B testing tool that marketers and developers can agree on"
                                }
                            }
                        }
                    }
                ]
```
Now, all visitors will be bucketed into the same variation: 
