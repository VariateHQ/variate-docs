---
title: Why Variate ?
---
 
# Why Variate?
Variate was purpose-built to achieve the goals of experimenters without impacting application performance while making it easy for developers to setup the tool. Here is how it differs from most popular experimentation tools: 
- No JavaScript injection
- No flicker of original content
- Easy integration with modern front-end frameworks

Below are more details on each:

### No JavaScript injection
Say good-bye to DOM Manipulation. 

Variate integrates directly with modern JavaScript frameworks Vue.js and React. That means that there is no JavaScript being injected through a 3rd party after a page has already started rendering. This avoids the common issue of bugs appearing when element selectors or structure of your DOM are modified. 

### No flicker of original content
The logic to bucket a visitor into a variation happens prior to any visual elements are rendered in the visitor's browser, right within your Vue.js or React code. 

This means that if you are replacing one background image with another, the original background image never starts loading: only the variation background image will ever be loaded by the visitor's browser. 

### Integration with modern front-end frameworks
Variate currently comes in the form of a plugin for either Vue.js or React. Developers have full control over what components and what attributes of components can be tested. 
#### Get started with [Variate for Vue.js](/vue/) or [Variate for React](/react/)
