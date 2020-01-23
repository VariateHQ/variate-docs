---
title: Getting Started
---

## Installation
::: tip Nuxt
Running Nuxt? We recommend reading the [Nuxt-specific plugin](nuxt.html) documentation instead.
:::
::: tip Demo Site
In this guide, we will be using this [Vue demo website](https://github.com/VariateApp/variate-vue-demo-saas) to install the Variate plugin. Feel free to [clone the repo](https://github.com/VariateApp/variate-vue-demo-saas), and run it locally (reference the readme). 
::: 

### Install the Variate for Vue package
[Follow along on GitHub](https://github.com/VariateApp/variate-vue-demo-saas/commit/4b2c7bb4a1e3edb67aac400efd0c35b9ed7e973b)

```bash
npm install @variate/vue
```

## Quick Start

### Create a starter config file
[Follow along on GitHub](https://github.com/VariateApp/variate-vue-demo-saas/commit/6114cd65e569fc70f9445d7c34ec7001602f79c9)

Inside of your project root directory, run the following in your terminal:
```bash
nano variate.json
```

Create a valid and empty json file to get started:
```json
{}
```

### Initialize the plugin
[Follow along on GitHub](https://github.com/VariateApp/variate-vue-demo-saas/commit/87c519820d2278ccf58a57feaf232db76e90b3ee)

In `src/main.js` or where Vue is initialized in your application, add the following: 

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
The above lines should come _before_ the following:
```js
import router from './router'
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
```

If you use `vue-router`: in `router.js`, add the following, before `export default router`:
```js
router.beforeEach((to, from, next) => {
    router.app.$variate.initialize({
        view: to,
    }, next);
});
```

To verify that Variate has been initialized, open Chrome Dev Tools. This is the message that should appear there:

<img :src="$withBase('/variate-vue-initialized.png')" alt="You should see a message in your Chrome Dev Tools that confirms that Variate has been initialized.">

## First Experiment
[Follow along on GitHub](https://github.com/VariateApp/variate-vue-demo-saas/commit/19d1b20ba41909ddcb3ea376e21f844453e213ea)

To set up an experiment using the [Vue demo site](https://github.com/VariateApp/variate-vue-demo-saas), update `variate.json` with the following: 

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
                        "trafficAllocation": {
                            "max": 50,
                            "min": 0
                        },
                        "components": {
                            "HomeHero": {
                                "id": 1,
                                "variables": {
                                    "headline": "The A/B testing tool for the modern web"
                                }
                            }
                        }
                    },
                    {
                        "id": 2,
                        "trafficAllocation": {
                            "max": 100,
                            "min": 51
                        },
                        "components": {
                            "HomeHero": {
                                "id": 1,
                                "variables": {
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
[Follow along on GitHub](https://github.com/VariateApp/variate-vue-demo-saas/commit/f3431164e1dc782c19bde681ad74934b5bfdda2d)

In the `variate.json` above, the component being targeted is `HomeHero`. That maps to the `HomeHero.vue` component (the area highlighted below): 

<img :src="$withBase('/variate-vue-homehero-component.png')" alt="Highlights component being targeted by Variate config">

The variable being modified as part of the experiment above is `headline`. For that variable to be reflected in the component, we must configure the component `HomeHero` to accept that variable. 

Add the following to `HomeHero.vue` in order to set a default value for `headline` that can be overridden by what is passed from Variate:
```js
import { mapVariables } from '@variate/vue';

export default {
    computed: {
        ...mapVariables({
            headline: 'The developer-friendly a/b testing tool',
        }),
    },
}
```

The above assumes that the `headline` variable is used in the component: 

```html
<h1>{{ headline }}</h1>
```

#### Is it working?
There are a few ways to determine whether experiment variations are appearing as expected: 

**Vue Dev Tools**

By opening [Vue Dev Tools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd), variables and their values being passed to the component should appear. Continuing with the sample experiment above, this is what opening Vue Dev Tools on the home page reveals: 

<img :src="$withBase('/variate-vue-computed-property.png')" alt="How to use Vue Dev Tools to see what is being passed to component">

**Clear Local Storage and Reload**

Variate stores the experiment and variation combinations for each user in local storage. To preview a different variation, clear your local storage with the following in Chrome console and then reload the page: 

```js
localStorage.clear();
```
 After reloading, you may see a different variation or the same one, since the bucketing of each visitor into a variation is random. The likelihood of seeing one variation or another [can be controlled](#force-a-variation).  

## Force a Variation

There are currently two ways to "force" or preview a specific variation of an experiment: 

**Method 1: Manually update local storage**

Variate assigns each visitor an `experimentBucket`. This is a random number from 1 to 100. Each variation in an experiment targets a range of that number. In the [example experiment](#first-experiment), there are two variations, each set up to receive an even 50/50 split of traffic. The `min` and `max` on each variation refer to the smallest and greatest `experimentBucket` for which that variation will appear. 

```json
"variations": [
    {
        "id": 1,
        "trafficAllocation": {
            "max": 50,
            "min": 1
        },
        "components": {
            "HomeHero": {
                "id": 1,
                "variables": {
                    "headline": "The A/B testing tool for the modern web"
                }
            }
        }
    },
    {
        "id": 2,
        "trafficAllocation": {
            "max": 100,
            "min": 51
        },
        "components": {
            "HomeHero": {
                "id": 1,
                "variables": {
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

After you reload the page, you should see the other variation. 

**Method 2: Update config to force a variation**

To guarantee that all visitors will see only one variation, update the `min` and `max` on each variation in your `variate.json` file. Below, we have increased the likelihood of seeing variation 2 to 100%: 

```json 
"variations": [
    {
        "id": 1,
        "trafficAllocation": {
            "max": 0,
            "min": 0
        },
        "components": {
            "HomeHero": {
                "id": 1,
                "variables": {
                    "headline": "The A/B testing tool for the modern web"
                }
            }
        }
    },
    {
        "id": 2,
        "trafficAllocation": {
            "max": 100,
            "min": 1
        },
        "components": {
            "HomeHero": {
                "id": 1,
                "variables": {
                    "headline": "The A/B testing tool that marketers and developers can agree on"
                }
            }
        }
    }
]
```
Now, after reloading, all visitors will be bucketed into the same variation: 

<img :src="$withBase('/variate-vue-force-variation-config.png')" alt="The same variation shows regardless of the experiment bucket">

<br>
<img :src="$withBase('/variate-vue-experiment-bucket-1.png')" alt="he same variation shows regardless of the experiment bucket">

::: warning Overriding Targeting Conditions
While it is possible to override the default bucketing behavior of Variate to preview specific variations, it is currently not possible to override targeting conditions such as view and audiences. 
:::