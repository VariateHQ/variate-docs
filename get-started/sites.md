---
title: Sites
---

# Sites
When using Variate, Sites are equivalent to projects. They are containers for your [Experiments](/experiments.html) and where you can invite other team members to join. Pricing tiers are calculated based on the total number of unique visitors tracked in Experiments as well as any Events being tracked at a Site-level.

## Managing Sites
When you first join Variate, you will be asked to create at least one Site. This is where you create your Experiments, Components, Views, and Variations. 

Below is a heirarchical view of how Sites and other content relate to each other:

<img :src="$withBase('/images/variate-heirarchy.svg')" alt="Sites contain Experiments, Views, Components, Segments which are shared by Variations.">

**Learn more about:**
- [Experiments](/experiments.html)
- [Views](/views.html)
- [Segments](/segments.html)
- [Components](/components.html)

## Site Environments
Each Site has two environments: **Development** and **Production** ("Dev" and "Prod" for short). There is a separate Schema file for each environment. When an Experiment is first created, it will be added to the Development Schema. It can be copied to the Production Schema via the Variate UI or added manually.

We recommend using the Development Schema on a development or staging environment such that experiments can be previewed, QA'd and prepared prior to launch.