---
title: How it Works
---

# How it Works
If you are familiar with the concept of feature flags, then this will be easy. Variate takes feature flags to the _next level_.

For example, say you have a component called `Banner`. This banner might have the following attributes: 

attribute|
--|
Headline|
ButtonText|

Variate makes it possible to test these various attributes (and combinations of these attributes) through a user interface after a one-time configuration by a developer. 

By logging in to Variate and creating variations of each attribute, a marketer or product owner can create variations to test and launch with no developer involvement. That means that there could be multiple variations of the same component, which could look something like this: 

attribute | control | variation 1 | variation 2
--|--|--|--
Headline| Bar Foo Foo | Foo Foo Foo | Foo Bar |
ButtonText| Get Started | Continue | Click Here| 

This is a basic example. The same approach can be expanded to more attributes per component as well as more complex logic (e.g. layout variations of a component) and/or multiple components, either as part of an a/b or multivariate test. 