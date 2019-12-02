# Tracking

Here we will explore how to set up Variate Vue for tracking. 

## Built-In Tracking


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
