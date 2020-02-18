---
title: Experiments
---

# Experiments

To create an Experiment, click "New Experiment" on the Sites > Experiments screen of the Variate App. 

Every Experiment is composed of the following: 
- Targeting: 
    - by Views
    - by Segments
    - by Manual Qualification
- Variations:
    - Component(s)
- Metrics

Currently, only A/B/n experiment designs are supported. 

## Targeting
Experiment Targeting determines which visitors should be qualified into an Experiment. 

The most common targeting settings for an Experiment rely on [Views](/views.html) and [Segments](/segments.html).

An added method to control visitor qualification is to use Manual Qualifiation. When enabled, it will be supplementary to the existing qualification criteria. For example: 

- I set up an Experiment on my homepage that qualifies all visitors who visit the page. In addition, I have enabled manual qualification such that only when a visitor scrolls past 50% of the page should they be counted in my Experiment. 
- When a visitor lands on the homepage, they will not be counted in the Experiment until they scroll past 50% of the page.

If not using Manual Qualification, all visitors who meet the View and/or Segment criteria will automatically be counted as part of an Experiment.

## Traffic Allocation

(COMING SOON)

The percentage of visitors among those who could have qualified can be controlled at the Experiment level. This is separate from the Variation level traffic allocation. 

## Environments
Experiments can be moved between [Environments](/sites.html#site-environments) (Development, Production). When moving between the two, the Experiment will appear, identically in both environments, except for the status field. 

## Statuses
(COMING SOON)

In addition to being able to move Experiments between environments, it is possible to switch the status of an Experiment between "draft" and "live," such that - regardless of the environment - an Experiment can be turned on or off. 


## Archiving
(COMING SOON)

Another useful status is "Archived," which simply means that the Experiment in question is removed from both Production and Development Schemas and is instead only found in the Variate App. 

A previously archived Experiment can be unarchived. 