# Reporting

Here we will explore how to report the results of Variate experiments.

### Choose a Reporting Method
We give you the following options: 
- Use the Variate [built-in reporting](#built-in-reporter)
- Use a [custom reporter](#custom-reporter)

## Built-In Reporter
:::warning Coming Soon
Built-in experiment reporting is still in development. In the meantime, we recommend using a [custom reporter](#custom-reporter). 
:::

## Custom Reporter
To use a custom reporter (or multiple reporters), Variate provides a `reporter` method that can be used inside of the `Vue.use(Variate, [options])` method. 

When Variate is initialized in a Vue application, it may look like this: 

```js
Vue.use(Variate, {
  debug: true,
  config
});
```

By default, Variate will send events to its [built-in reporter](#built-in-reporter). To change this behavior, add the `reporter` method, which accepts `event` as argument: 

```js
Vue.use(Variate, {
  debug: true,
  tracking: {
    enabled: true,
    default: false,
    reporter(event) {
      console.log(event);
    },
  },
  config
});
```
:::tip Types of Events
To better understand the various types of events that may be sent, see the [Tracking](tracking.html) section. 
:::

## Google Analytics
To send Variate events to Google Analytics, there are a number of ways to go about it. We will explore just a few of these methods below. 

Below is an example of how Variate events can be sent as Google Analytics events while visitors also being added to a [Custom Dimension](https://support.google.com/analytics/answer/2709828).

```javascript
Vue.use(Variate, {
  debug: true,
  pageview: false,
  tracking: {
      enabled: true,
      default: false,
      reporter: async (event) => {
         console.log('Sending to Google Analytics: ' + event.name);
         console.log(event)
     
         // Create tracker
         ga('create', 'UA-XXXX-X', 'auto');
     
         if (event.type === 'pageview') {
     
           // Send pageview as nonInteraction event to avoid affecting bounce rate
           ga('send', {
             hitType: 'event',
             eventCategory: 'Variate Experiments',
             eventAction: 'pageview',
             eventLabel: 'Exp' + event.value.experimentId + '|Var' + event.value.variationId,
             nonInteraction: true
           });
         }
         else {
     
           // Send custom/purchase event 
           ga('send', {
             hitType: 'event',
             eventCategory: 'Variate Experiments',
             eventAction: event.type,
             eventLabel: event.name,
             eventValue: event.value
           });
         }
         return true
       }
  },
  config
});
```
[Follow along on GitHub](https://github.com/VariateHQ/variate-vue-demo-saas/commit/c0e57c359acd51be22aa81fa4bda9fbcd2d15cd7)

Following the example shown in the GitHub link above, a visitor that qualifies for the Experiment being run and then clicking the "Read the Docs" button will produce the following events:

<img :src="$withBase('/variate-vue-reporting-events.png')" alt="Events triggered by Variate experiment to be sent to Google Analytics.">

Which will appear in Google Analytics as such: 

<img :src="$withBase('/variate-vue-reporting-ga-events.png')" alt="Variate events, as they appear in Google Analytics.">

### Tracking Experiments as Campaigns (Experimental)
You may want to track experiments as Campaigns and Variations as Campaign Content. Below is how that could be achieved, using Filters. We strongly recommend creating a separate view to apply these filters such that other marketing campaign tracking is not affected. 

**1.** Send pageview events to Google Analytics using a standard syntax as seen above. 

**2.** Use filters to transform the Campaign field and Campaign Content fields, as seen below. 

Convert Variate pageview to variate_pageview (or any other unique string):
<img :src="$withBase('/variate-reporting-ga-filter-1.png')" alt="Convert Variate pageview to variate_pageview">
Convert variate_pageview to Campaign:
<img :src="$withBase('/variate-reporting-ga-filter-2.png')" alt="Convert variate_pageview to Campaign">
Convert variate_pageview to Campaign Content:
<img :src="$withBase('/variate-reporting-ga-filter-3.png')" alt="Convert variate_pageview to Campaign Content">

The final outcome will look something like this: 
<img :src="$withBase('/variate-reporting-ga-campaign.png')" alt="View experiments as campaigns and variations as campaign content.">

