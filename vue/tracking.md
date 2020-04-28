# Tracking

Here we will explore how to set up tracking of experiments in Variate for Vue.

## Enablement

By default, Variate will track all visitors unless they enabled `navigator.doNotTrack`.

To control the enablement of tracking, use the following line: 

```js
Vue.use(Variate, {
    tracking: {
        enabled: false, // If set to false, no tracking events will be triggered by Variate
    }, 
    ...
});
```
**Potential use cases:**
- Ability to track only visitors who have opted in to being tracked (e.g. GDPR controls). 
- You prefer to use your own tracking mechanism while letting Variate control targeting, randomized bucketing and persistence of the experience.

## Syntax
To track any event in Variate, follow this pattern: 

```js
this.$variate.track(name, type, [value])
```

**Example**: to track a click on a button

```js
this.$variate.track('myButton_click', 'custom')
```

**Example**: to track a purchase

```js
this.$variate.track('purchase', 'revenue', 20.00)
```

## Types of Events

Below are the types of events to track when using Variate: 

|type|description|
|--|--|
|`pageview`|Triggered every time a visitor meets the following criteria for any **active** experiments:<br><br> <ul><li>the current `view` passes targeting critera</li><li>the visitor passes `audience` targeting criteria </li><li>the visitor has been bucketed into the experiment</li></ul>|
|`custom`|Manually set up to track any of the following:<br><br><ul><li>clicks</li><li>form submits</li><li>purchases</li></ul>|
|`revenue`|In addition to tracking purchase events as `custom` events, you have the option to send revenue data using a revenue event|

## Pageviews
By default, when a visitor passes all qualification criteria for an active experiment (view, audience, bucketing), the `pageview` event will be triggered. Where you decide to send the `pageview` event is up to you and is covered in [Reporting](reporting.html).

If you followed the [Quick Start](/vue/#quick-start), you may have initialized Variate as follows: 

```js
Vue.use(Variate, {
  debug: true,
  config,
});
```

### Manual Pageview Tracking
If you prefer to track pageviews manually (for all experiments), then add `pageview: false` as follows:

```js
Vue.use(Variate, {
  debug: true,
  pageview: false, // Pageviews will not be automatically recorded
  config,
});
```
If set to `false`, it is up to you to send the pageview event manually, for every experiment. 

To send a pageview manually, use the following syntax, as seen inside of a component: 

```js
methods: {
    variateTrackPageview() {
        this.$variate.track({
            name: 'Pageview',
            type: 'pageview',
            value: this.$variate.experiments
        });
    }
},
mounted() {
    this.variateTrackPageview();
}
```

## Custom Events
To track a custom event, use the following syntax: 

```js
this.$variate.track({
    name: 'myCustomEventName',
    type: 'custom'    
});
```
Custom events are not associated to a specific experiment, since a single visitor may be qualified into multiple experiments. Also, an event may be triggered far from where the visitor originally qualified into an experiment. Therefore, a single event might show up in the reporting for multiple experiments. 

## Revenue
To send revenue data, use the following syntax:

```js
this.$variate.track({
    name: 'myPurchaseEvent',
    type: 'revenue',
    value: 29.99
});
```
