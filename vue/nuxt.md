---
title: Nuxt
---

## Installation
::: tip Demo Site
In this guide, we will be using this [Nuxt demo website](https://github.com/VariateApp/variate-nuxt-demo) to install the Variate Nuxt module. Feel free to [clone the repo](https://github.com/VariateApp/variate-nuxt-demo), and run it locally (reference the readme). 
::: 

### Install the Variate for Nuxt package

```bash
npm install @variate/nuxt
```

## Quick Start

### Create a starter config file

Create a file called `variate.json` in the source directory of your Nuxt project ([as seen here](https://github.com/VariateApp/variate-nuxt-demo/tree/master/app)) with valid  json to get started:
```json
// app/variate.json
{}
```
### Create Variate middleware

Create a `middleware/variate.js` file. It will be used to initialize Variate, pass in the route object and any targeting values of your choice:
```js
export default function ({ app: { $variate }, route }) {
  if($variate) {
    $variate.initialize({
      view: route,
      targeting: {
        ...
      }
    });
  }
};
```

### Initialize the plugin
In `nuxt.config.js`, add the following:
```javascript
/*
  ** Plugins to load before mounting the App
  */
  plugins: [...],

  variate: {
    debug: true,
    pageview: false,
    tracking: {
        enabled: true,
        default: false,
        reporter: async() => true
    }, 
  }

  router: {
    middleware: 'variate'
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
      '@variate/nuxt'
  ],
```

To verify that Variate has been initialized, open Chrome Dev Tools. This is the message that should appear there:

<img :src="$withBase('/variate-vue-initialized.png')" alt="You should see a message in your Chrome Dev Tools that confirms that Variate has been initialized.">
