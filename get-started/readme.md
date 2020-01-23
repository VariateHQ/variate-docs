---
title: Overview
---

# What is Variate?
Variate is a web experimentation (mvt and a/b testing) platform built for the modern web. Our mission is to make experimentation easy for marketers _and_ developers, resulting in greater business impact. 

It is optimized for usage on single-page applications. It comes in the form of plugins for  [React](/react/) and [Vue.js](/vue/) frameworks. Support for [Nuxt](/vue/nuxt.html), Next, and more frameworks is growing.  

Variate comes in 3 parts: 
- an [Open Source Engine](https://github.com/VariateApp/variate-vue), which contains experimentation logic (qualification, bucketing, etc..). Learn more about the [Variate Engine](/engine/).
- an Open Source framework-specific plugin to integrate with your web application
    - [React Plugin Docs](/react/)
    - [Vue.js Plugin Docs](/vue/)
        - [Nuxt Plugin Docs](/vue/nuxt.html)
- a schema JSON file, which contains your project-specific experiment data and can either be CDN-hosted or managed locally. [Learn more about the Variate schema](/engine/)
