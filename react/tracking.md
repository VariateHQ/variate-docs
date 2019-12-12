# Tracking

## Page Tracking

Tracking pages views is on by default. It can alose be turn on by adding the tracking prop to the VariateProvider and setting it to true.

## Custom events 
Custom tracking events can be sent from any Variate component by calling the track method on Variate. Event types can be either a `revenue` or `custom` type and can have extra data passed to them.


```jsx
...
import React from 'react';
import { useVariate } from '@variate/react';
...

const Hero = ({ defaultContent }) => {

  const { variables, track } = useVariate('HomeHero', defaultvariables);
  
  return (
    <section>
      <h1>{variables.headline}</h1>
      <button onPress={() => track({
        name: 'Purchases',
        type: 'revenue',
        value: {
          amount: 1000 
        },
      })}>Track this</button>
    </section>
  )
}

Hero.defaultProps = {
  defaultContent: {
    headline: 'This is the original boring headline, it would be awesome if we tested it!'
  }
}
```

The VariateContext is available in the rare case you need to track events outside a Variate component.

```jsx
...
import React, { useContext }from 'react';
import { VariateContext } from '@variate/react';
...

const StrangeComponent = ({ defaultContent }) => {

  const { variate } = useContext(VariateContext);
  
  return (
    <section>
      <button onPress={() => variate.track({
        name: 'clicked_strange',
        type: 'custom',
      })}>Track this</button>
    </section>
  )
}

```