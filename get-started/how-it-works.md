---
title: How it Works
---

# How it Works

## Initial Setup

Below are the 3 primary steps to getting setup with Variate: 

### 1. Create your first experiment in Variate:
- [Create a free account](https://app.variate.ca/auth/register)
- Create a [site](/get-started/sites.html) where you will be you be doing your experimentation. A site has a development and production version of your experiments so that you can control when experiments are pushed to production. 
- Create at least one [component](/get-started/components.html). In the context of Variate, a component can be any component you wish to experiment with. We suggest starting with something simple, like a `Banner`.
- Add at least one [variable](/get-started/variables.html) to this component. A variable is a property/attribute of the component that you wish to experiment with. For example `h1Text`.
- Create at least one [view](/get-started/views.html). A view is a URL pattern that you can use to target specific views of your application. For example, to target your homepage, you would use `/$`. 
- Create at least one [experiment](/get-started/experiments.html) which uses the component you've created, targets the view your created and contains at least two variations. Each variation should modify the variable in some way (so you can tell its working).

### 2. Install the relevant plugin for your application
- For React, [follow these instructions](/react/). 
- For Vue.js, [follow these instructions](/vue/).

### 3. QA and launch your first experiment
- [Preview your variations](/get-started/preview-variations.html)
- [Launch your experiment](/get-started/launch-experiments.html)

## Feature Flagging for Experimentation

If you are familiar with the concept of feature flags, then this will be easy. Variate takes feature flags to the _next level_.

For example, say you have a component called `Banner`. This banner might have the following variables: 

variable|type|description|
--|--|--|
headline|string|Headline text on the banner.|
showButton|boolean|To show or not show a button (e.g. "Shop Now")|
galleryDelay|number|Delay, in seconds, before switching to the next image in an image gallery|

Here is what this looks like in the Variate UI: 
<img :src="$withBase('/images/feature-flagging-for-experimentation.jpg')" alt="Any number of variables can be added to a component, each with a specified type.">

[Try it yourself](https://app.variate.ca/auth/login)

Variate makes it possible to experiment with these  variables (and their combinations) through a user interface after a one-time configuration by a developer. 

By logging in to Variate and creating variations of each variable, a marketer or product owner can create variations to test and launch with no developer involvement. That means that there could be multiple variations of the same component, which could look something like this: 

variable | control | variation B | variation C
--|--|--|--
headline| Crunchy Outside. Meaty Inside. | The taste your cat loves. | No Mess. No leftovers. So simple. |
showButton| TRUE | TRUE | FALSE| 
galleryDelay| 10 | 20 | 5| 

Here is what this looks like in the Variate UI: 
<img :src="$withBase('/images/feature-flagging-for-experimentation-2.jpg')" alt="Any number of variables can be added to a component, each with a specified type.">

[Try it yourself](https://app.variate.ca/auth/login)


This is a basic example. The same approach can be expanded to more variables per component as well as more complex logic (e.g. layout variations of a component) and/or multiple components, either as part of an a/b or multivariate test. 

## Experimentation Schema

The Variate Experimentation Schema is a self-contained source for all data used by the Variate Engine and corresponding framework plugin to render the correct variation(s) to the correct visitor(s). 

There are 3 primary ways to manage the file:
- Host it on the Variate CDN (easiest option). This way, any time an edit is made to an experiment (e.g. launch, pause, modify variation), the outcome is reflected nearly immediately where the experiment is running.
- Use a webhook to fetch the latest version. 
- Manually download the latest version (recommended if you wish to stay on the free plan). 

Below is what the Schema looks like with a single, simple experiment, containining one variation:

```json
{
    "experiments": {
        "FvlppPgo2ojhYOtRYJhV": {
            "name": "HomeHero Messaging 1",
            "siteId": "CkvBuG8QiffPYUHWiUkY",
            "environment": "development",
            "manualPageview": false,
            "targeting": {
                "views": {
                    "include": [
                        "/($|\\?.*)"
                    ],
                    "exclude": []
                },
                "segments": {}
            },
            "variations": {
                "5M7OOQfo1DK4mSANtRPK": {
                    "name": "Control",
                    "experimentId": "FvlppPgo2ojhYOtRYJhV",
                    "siteId": "CkvBuG8QiffPYUHWiUkY",
                    "trafficAllocation": {
                        "min": 1,
                        "max": 50
                    },
                    "components": {}
                },
                "WHwboekPi9BGYZJSt7Jr": {
                    "name": "Variation 1",
                    "experimentId": "FvlppPgo2ojhYOtRYJhV",
                    "siteId": "CkvBuG8QiffPYUHWiUkY",
                    "trafficAllocation": {
                        "min": 51,
                        "max": 100
                    },
                    "components": {
                        "HomeHero": {
                            "id": "VVgtYXqNtj0JMdGAborQ",
                            "variationId": "WHwboekPi9BGYZJSt7Jr",
                            "experimentId": "FvlppPgo2ojhYOtRYJhV",
                            "name": "HomeHero",
                            "siteId": "CkvBuG8QiffPYUHWiUkY",
                            "variables": {
                                "headlineText": "Tastes So Good, Cats Ask for It by Name",
                                "subHeadlineText": "Meow meow meow meow",
                                "showPrimaryButton": true,
                                "primaryButtonText": "Buy More Mix"
                            }
                        }
                    }
                }
            }
        }
    }
}
```

## Schema Validation
To validate your schema (in case you are creating the Schema yourself without the Variate UI), you can use this repo: [VariateHQ/variate-schema](https://github.com/VariateHQ/variate-schema)
