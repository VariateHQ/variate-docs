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

::: tip
In this quick start, we will be using hooks to provide variate data to components. However, if this doesn't work for your team, don't worry, we have other implementation methods. These will be explained later in the docs.
::: 

Simply create a valid and empty config.json file to get started.

```json
{}
```

Wrap the VariateProvider around your components in the root component. Then activate variate on the first view loaded in the onViewChange, if using a routing library, lets listen to the history and reactivate variate between view changes.

```jsx
...
import React from 'react';
import { VariateProvider } from '@variate/react';
import config from 'config.json';
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
    <Router history={history} />
  </VariateProvider>
)

``` 

To verify that Variate has been initialized, take a look at Chrome Dev Tools. If you see the following message, then you are all set up!

<img :src="$withBase('/variate-vue-initialized.png')" alt="You should see a message in your Chrome Dev Tools that confirms that Variate has been initialized.">

### Create your first experiment
Update your `config.json` file with the following content if you want to view a sample experiment immediately:

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
        ]
    }
}
```

Use the Variate hook in a component that renders on the homepage. Pass it the name of the component specified in the config and some default content in case an the experiment is not running.

```jsx
...
import React from 'react';
import { useVariate } from '@variate/react';
...

const Hero = ({ defaultContent }) => {

  const { content } = useVariate('HomeHero', defaultContent);
  
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

You should see one of the headline variations appear on the homepage. As you reload the page in the same browser (without clearing local storage), you should continue to see the same headline. If you wish to see other variations, you can either open an incognito window, clear your local storage, or edit your local storage as seen in the more advanced instructions on how to preview a specific variation.