---
title: Getting Started
---

Variate comes in the form of an [open source plugin for React](https://github.com/VariateApp/variate-react).

## About the plugin

The Variate plugin for React.js comes in two parts: 

**The Variate Engine** This is where the experimentation logic sits. 

**The Variate Context Library** This is what makes it easy to integrate that logic inside of your React.js application.

The Variate React.js Library uses the Context API to access variate experiment data from React components. These are available both through a component or a custom hook. Read more about the context library [here](https://reactjs.org/docs/context.html).

## Installation
```
npm install @variate/react 
```
OR
```
yarn add @variate/react
```

## Quick Start

::: warning
In this quick start, we will be using hooks to provide variate data to components. However, if hooks don't work for your team, don't worry, we have other implementation methods. These will be explained later in the docs.
:::

::: tip Clone Demo Site
  In this guide, we will be using this [React Demo Site](https://github.com/VariateApp/variate-react-demo) to install the Variate plugin. Feel free to install it locally and use it as a playground for the following steps.
:::

## First Experiment
Create a `variate.json` file with the following sample config.

```json
{
    "live": {
        "experiments": [
            {
                "id": 1,
                "name": "Homepage - Hero Content",
                "status": "live",
                "targeting": {
                    "views": {
                        "include": [
                            "/$"
                        ],
                        "exclude": []
                    },
                    "audiences": {}
                },
                "variations": [
                    {
                        "id": 1,
                        "traffic_allocation": {
                            "max": 50,
                            "min": 0
                        },
                        "components": {
                            "HomeHero": {
                                "id": 1,
                                "attributes": {
                                    "headline": "The A/B testing tool for the modern web",
                                    "backgroundColor": "#779ecb"
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
                                    "headline": "The A/B testing tool that marketers and developers can agree on",
                                    "backgroundColor": "#77dd77"
                                }
                            }
                        }
                    }
                ]
            }
        ]
    }
}
```
### Add a Variate Provider
Wrap the VariateProvider around your components in the root component. If your using react-router, activate Variate on the first view loaded and on page changes. [Click here](http://0.0.0.0:8080/react/core-concepts.html#targeting) for an example on how to initialize without react-router.

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

To verify that Variate has been initialized, take a look at Chrome Dev Tools. If you see the following message, then you are all set up!

<img :src="$withBase('/variate-react-initialized.png')" alt="You should see a message in your Chrome Dev Tools that confirms that Variate has been initialized.">

### Add your first Variate Component

Now it's time to add your first variate component. Use the Variate hook in a component that renders on the homepage. Pass it the name of the component specified in the config and some default content in case an experiment is not running.

::: tip
In this example, we are using styled-components to modify the variations styles. The implementation of styles will changed based on the library your team is using.
:::

```jsx
...
import React from 'react';
import { useVariate } from '@variate/react';
import styled from 'styled-components';
...

const HeroContainer = styled.section`
  height: 400px;
  width: 100%;
  backgroundColor: ${props => props.backgroundColor};
`;

const Hero = ({ defaultContent }) => {

  const { variables } = useVariate('HomeHero', defaultContent);
  
  return (
    <HeroContainer backgroundColor={variables.backgroundColor}>
      <h1>{variables.headline}</h1>
    </HeroContainer>
  )
}

Hero.defaultProps = {
  defaultContent: {
    headline: 'This is the original boring headline, it would be awesome if we tested it!',
    backgroundColor: '#fff'
  }
}

```

You should see one of the headline variations appear on the homepage. As you reload the page in the same browser (without clearing local storage), you should continue to see the same headline. If you wish to see other variations, you can either open an incognito window, clear your local storage, or edit your local storage as seen in the more advanced instructions on how to preview a specific variation.

## Force a Variation

::: warning Overriding Targeting Conditions
While it is possible to override the default bucketing behavior of Variate to preview specific variations, it is currently not possible to override targeting conditions such as view and audiences. 
:::

There are currently two ways to "force" or preview a specific variation of an experiment: 

**Method 1: Manually update local storage**

Variate assigns each visitor an `experimentBucket`. This is a random number from 1 to 100. Each variation in an experiment targets a range of that number. In the [example experiment](#first-experiment), there are two variations, each set up to receive an even 50/50 split of traffic. The `min` and `max` on each variation refer to the smallest and greatest `experimentBucket` for which that variation will appear. 

```json
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
Now, all visitors will be bucketed into the same variation.
