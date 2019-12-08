## Installation

<style lang="css">
  .class-name {
    color: #194d33 !important;
  }
   .tag {
     color: red !important;
   }
</style>

```
npm install @variate/react 
```
OR
```
yarn add @variate/react
```

## Quick Start

::: warning
In this quick start, we will be using hooks to provide variate data to components. However, if hooks dont work for your team, don't worry, we have other implementation methods. These will be explained later in the docs.
:::

::: tip Clone Demo Site
  In this guide, we will be using this [React Demo Site](https://github.com/VariateApp/variate-react-demo) to install the Variate plugin. Feel free to install it locally and use it as a playground for the following steps.
:::

### Add the config file
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
Wrap the VariateProvider around your components in the root component. If your using react-router, activate variate on the first view loaded and on page changes. [Click here](http://0.0.0.0:8080/react/core-concepts.html#targeting) for example of how to initialize without react-router

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