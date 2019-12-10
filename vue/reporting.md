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
  reporter(event) {
    console.log(event);
  },
  config
});
```
:::tip Types of Events
To better understand the various types of events that may be sent, see the [Tracking](tracking.html) section. 
:::

## Google Analytics

```js
Vue.use(Variate, {
  debug: true,
  tracking: true,
  reporter: (event) => {
    console.log('Sending to Google Analytics: ' + event.name);
    console.log(event)
    
    // Create tracker
    ga('create', 'UA-XXX-X', 'auto');
    
    if (event.type === 'pageview') {
      
      // Set custom dimension [optional]
      var customDimensionSlot = '1';
      var customDimensionValue = 'Exp' + event.value.experimentId + '|Var' + event.value.variationId;
      ga('set', 'dimension' + customDimensionSlot, customDimensionValue);
      
      // Send event, using your preferred naming convention
      ga('send', {
        hitType: 'event',
        eventCategory: 'Variate Experiments',
        eventAction: 'qualify',
        eventLabel: 'Exp' + event.value.experimentId + '|Var' + event.value.variationId
      });
    }
    else {

      // Send non-qualification event (not experiment-specific)
      ga('send', {
        hitType: 'event',
        eventCategory: 'Variate Experiments',
        eventAction: event.type,
        eventLabel: event.name
      });
    }
```

## Segment
