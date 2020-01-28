---
title: Is Variate Right For You?
---

# Is Variate Right For You?
Variate was purpose-built to achieve the goals of experimenters without impacting application performance while making it easy for developers to setup the tool. 

Here are just a few ways Variate differs from most, popular experimentation tools: 
- No JavaScript injection
- No flicker of original content
- Easy integration with modern front-end frameworks

## Component-Based Approach
Variate has been built with the idea that as a developer, you wish to configure [components](/get-started/components.html) individually for experimentation. Each component has [variables](/get-started/variables.html), each with a specific type.

Multiple components can be combined to create a single [variation](/get-started/variations.html). 

<img :src="$withBase('/images/component-based-approach.jpg')" alt="Components added to a variation, with variable values specific to the variation">

## Framework Agnostic
The Variate Engine and its frameworks-specific plugins make it possible to integrate with any type of front-end framework, given that a corresponding plugin exists. 

## Flicker-Free Client-Side Testing
The logic to bucket a visitor into a variation happens prior to any visual elements are rendered in the visitor's browser, right within your Vue.js or React code, meaning that there is no flicker and no need to delay render. 

This means that if you are replacing one background image with another, the original background image never starts loading; only the variation background image will ever be loaded by the visitor's browser. 

## Time-to-Implementation
It can take as little as 10 minutes to launch your first "Hello World" test with Variate. From there, enabling components for experimentation will depend on the complexity of the variables you wish to pass to the component. 

Once Variate is implemented in an application, enabling new components or new variables of already enabled components all there is to set up. 

## Advanced Feature Flagging
Variate takes the concept of feature flagging and combines it with complex experimentation. Rather than having a simple "ON/OFF" switch, we give product teams re-usable variables within components that can be mixed and matched to create multi-variate or simple a/b/n tests. 

You still have the option to use Variate as a simple feature flag tool when the job calls for it. 

## Quick Iteration
Once a component is configured to accept [variables](/get-started/variables.html) from Variate, marketing and product team members are free to create and launch new experiments using that component with little-to-no developer involvement, depending on your chosen workflow. 

## No ‘WYSIWYG’ Editing
That's right: Variate has no [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) editor. This is intentional: having a WYSIWYG editor in experimentation implies that your experimentation code is being injected using traditional methods (jQuery) after the DOM has already begun rendering. 

On the other hand, Variate does make it very easy to create variations and preview variations.

## Requires Developers to Implement 
Variate is not a tool made for the "lone-marketer" who is attempting to run experiments with no developer support. It requires installation by a developer. Also, experiments that include components that are not already enabled for Variate will require setup by a developer as well. 

On the other hand, for teams that wish to iterate multiple times on the same component, experimenting with the same set of variables, a developer-free workflow is possible and is one of the big benefits of using Variate. 

## No JavaScript injection
Variate integrates directly with modern JavaScript frameworks Vue.js and React. That means that there is no JavaScript being injected through a 3rd party after a page has already started rendering. This avoids the common issue of bugs appearing when element selectors or structure of your DOM are modified. 
