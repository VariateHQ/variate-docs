---
title: What is Variate?
---

# What is Variate?
Variate is a web experimentation (mvt and a/b testing) tool built for the modern web. Our mission is to make experimentation easy for marketers _and_ developers, resulting in greater business impact. 

# How it works
If you are familiar with the concept of feature flags, then you will understand how Variate works. Variate takes feature flags to the _next level_.

For example, say you have a component called `Banner`. This banner might have the following attributes: 

attribute|
--|
Headline|
ButtonText|

Variate makes it easy to make these various elements (and combinations of these elements) easy to test by anyone, through a user-friendly interface after a one-time configuration by a developer. 

By logging in to Variate and creating variations of each element, a marketer, product owner can easily create variations to test and launch with no developer involvement. That would mean that there could be multiple variations of this one component, that could look something like this: 

attribute | control | var1 | var2
--|--|--|--
Headline| Bar Foo Foo | Foo Foo Foo | Foo Bar |
ButtonText| Get Started | Continue | Click Here| 

This is a very simple example. You can imagine this same approach being expanded to more elements per component as well as more complex logic (e.g. layout variations of a component) and/or multiple components, either as part of an a/b or mvt test. 

#### Get started with [Variate for Vue.js](/vue/) or [Variate for React](/react/)
