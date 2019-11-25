# Quick Start

::: warning
Variate for Vue does not currently support Nuxt, but we are working on it! 
:::

::: tip
In this guide, we will be using this [Vue demo website](https://github.com/VariateApp/variate-vue-demo-saas) to install the Variate plugin. Feel free to install it locally and use it as a playground for the following steps.
::: 

### Install the Variate for Vue package
```
npm install @variate/vue
```
### Create a starter config file
```
nano variate.json
```

Simply create a valid and empty json file to get started. 

```json
{}
```
### Initialize the plugin
In your `main.js` file, add the following: 

```js
...
import config from '../variate.json';
import Variate from '@variate/vue';
...
Vue.use(Variate, {
    debug: true,
    tracking: true,
    config,
});

```
If you are using `vue-router`: in `router.js`, add the following, just before `export default router`:
```js
router.beforeEach((to, from, next) => {
    router.app.$variate.initialize({
        view: to,
    }, next);
});
```
To verify that Variate has been initialized, take a look at Chrome Dev Tools. If you see the following message, then you are all set up!

<img :src="$withBase('/variate-vue-initialized.png')" alt="You should see a message in your Chrome Dev Tools that confirms that Variate has been initialized.">

### Create your first experiment
Update your `variate.json` file with the following content if you are using the [Vue demo website](https://github.com/VariateApp/variate-vue-demo-saas) and want to setup an experiment immediately:

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

#### Update the component being targeted
As you can see in the json above, the component being targeted is `HomeHero`. That maps directly to our `HomeHero.vue` component (aka the homepage of the demo website). 

The attribute being modified as part of the experiment above is the `headline`. Here is how to go about enabling that attribute to be experimented through Variate: 

Add the following to `HomeHero.vue`:
```js
import { mapAttributes } from '@variate/vue';

export default {
    computed: {
        ...mapAttributes([
            'headline',
        ]),
    },
}
```

Since in the sample experiment, we are changing the headline attribute, we need a way to set the headline to whatever is passed from Variate and override the current headline. Here is a basic way to achieve that: 

```js
<h1 v-if="headline">{{ headline }}</h1>
<h1 v-else>The developer-friendly a/b testing tool</h1>
```

You should see one of the headline variations appear on the homepage. As you reload the page in the same browser (without clearing local storage), you should continue to see the same headline. If you wish to see other variations, you can either open an incognito window, clear your local storage, or edit your local storage as seen in the more advanced instructions on how to preview a specific variation. 