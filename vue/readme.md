---
title: Introduction
---

## Variate For Vue

Variate comes in the form of an [open source plugin for Vue.js](https://github.com/VariateApp/variate-vue).

### About the plugin

The Variate plugin for Vue.js comes in two parts: 

**The Variate Engine** This is where the experimentation logic sits. 

**The Vue.js Plugin** This is what makes it possible to integrate that logic inside of your Vue.js application. 

## Installation

::: warning Note For Nuxt Users
Variate for Vue does not currently support Nuxt, but this is on the roadmap.
:::

::: tip Clone Demo Site
In this guide, we will be using this [Vue demo website](https://github.com/VariateApp/variate-vue-demo-saas) to install the Variate plugin. Feel free to install it locally and use it as a playground for the following steps.
::: 

### Install the Variate for Vue package
```bash
npm install @variate/vue
```
[Follow along on GitHub](https://github.com/VariateApp/variate-vue-demo-saas/commit/6416597cd468b134b35746141d29471d71923dec)
## Quick Start

### Create a starter config file
```bash
nano variate.json
```

Create a valid and empty json file to get started. 

```json
{}
```
[Follow along on GitHub](https://github.com/VariateApp/variate-vue-demo-saas/commit/6114cd65e569fc70f9445d7c34ec7001602f79c9)
### Initialize the plugin
In the `main.js`, add the following: 

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
If using `vue-router`: in `router.js`, add the following, before `export default router`:
```js
router.beforeEach((to, from, next) => {
    router.app.$variate.initialize({
        view: to,
    }, next);
});
```
[Follow along on GitHub](https://github.com/VariateApp/variate-vue-demo-saas/commit/f02b7403cc55c2660287b616f4944736d5db5b78)

To verify that Variate has been initialized, open Chrome Dev Tools. This is the message that should appear there:

<img :src="$withBase('/variate-vue-initialized.png')" alt="You should see a message in your Chrome Dev Tools that confirms that Variate has been initialized.">

## First Experiment
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
[Follow along on GitHub](https://github.com/VariateApp/variate-vue-demo-saas/commit/0ee98a4a31a54fb15b94b76c629953cc3c6d3d46)

#### Update the component being targeted
In the `variate.json` above, the component being targeted is `HomeHero`. That maps to the `HomeHero.vue` component (the area highlighted below): 

<img :src="$withBase('/variate-vue-homehero-component.png')" alt="Highlights component being targeted by Variate config">

The attribute being modified as part of the experiment above is `headline`. For that attribute to be reflected in the component, we must configure the component `HomeHero` to accept that attribute. 

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

Then, to show the correct headline based on what is passed to the component, we must tweak the hard-coded headline as follows:

**BEFORE:** 
```html
<h1>The developer-friendly a/b testing tool</h1>
```
**AFTER:**
```html
<h1>{{ headline || 'The developer-friendly a/b testing tool' }}</h1>
```
[Follow along on GitHub](https://github.com/VariateApp/variate-vue-demo-saas/commit/473c164a1528886876a0f22c575b7eebcd13d84f)

#### Is it working?
There are a few ways to determine whether experiment variations are appearing as expected: 

**Vue Dev Tools**

By opening [Vue Dev Tools]("https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd"), attributes and their values being passed to the component should appear. Continuing with the sample experiment above, this is what opening Vue Dev Tools on the home page reveals: 

<img :src="$withBase('/variate-vue-computed-property.png')" alt="How to use Vue Dev Tools to see what is being passed to component">

**Clear Local Storage and Reload**

Variate stores the experiment and variation combinations for each user in local storage. To preview a different variation, clear your local storage with the command below: 

```js
localStorage.clear();
```
Then reload the page. You may see a different variation or the same one, since the bucketing of each visitor into a variation is random. The likelihood of seeing one variation or another can be controlled. 

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
Now, all visitors will be bucketed into the same variation: 

<img :src="$withBase('/variate-vue-force-variation-config.png')" alt="The same variation shows regardless of the experiment bucket">

<br>
<img :src="$withBase('/variate-vue-experiment-bucket-1.png')" alt="Experiment bucket in local storage">