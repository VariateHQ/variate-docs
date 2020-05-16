---
title: Schema
---

# Schema

The **Variate Schema** is the JSON file that describes all your experiments to the Variate Engine. This file will list all your experiments, variations, components and variables.

The structure of this schema is versioned, check out our [Variate Schema repository](https://github.com/VariateHQ/variate-schema) to learn more.

Here is an example: 

```json
{
    "experiments": {
        "nM3ntXmMj2dX86xnrvVK": {
            "id": "nM3ntXmMj2dX86xnrvVK",
            "siteId": "djGYAl2Dx0JDGuAm5mph",
            "name": "Homepage - Hero Banner",
            "environment": "production",
            "manualQualification": false,
            "targeting": {
                "views": {
                    "include": [
                        "/$"
                    ],
                    "exclude": []
                },
                "segments": {
                    "and": [
                        {
                            "==": [
                                {
                                    "var": "country"
                                },
                                "Canada"
                            ]
                        },
                        {
                            "==": [
                                {
                                    "var": "state"
                                },
                                "BC"
                            ]
                        }
                    ]
                }
            },
            "variations": {
                "GhPz7J72ABIQvOqdTtnm": {
                    "id": "GhPz7J72ABIQvOqdTtnm",
                    "experimentId": "nM3ntXmMj2dX86xnrvVK",
                    "siteId": "djGYAl2Dx0JDGuAm5mph",
                    "trafficAllocation": {
                        "max": 50,
                        "min": 0
                    },
                    "components": {
                        "Hero": {
                            "id": "PjaBNzyQYP2W8zESoELs",
                            "variationId": "GhPz7J72ABIQvOqdTtnm",
                            "experimentId": "nM3ntXmMj2dX86xnrvVK",
                            "siteId": "djGYAl2Dx0JDGuAm5mph",
                            "variables": {
                                "backgroundImage": "https://placeimg.com/1000/500/animals"
                            }
                        }
                    }
                },
                "RyQqWxnWqumQ7WpjvLr6": {
                    "id": "RyQqWxnWqumQ7WpjvLr6",
                    "experimentId": "nM3ntXmMj2dX86xnrvVK",
                    "siteId": "djGYAl2Dx0JDGuAm5mph",
                    "trafficAllocation": {
                        "max": 100,
                        "min": 51
                    },
                    "components": {
                        "Hero": {
                            "id": "PjaBNzyQYP2W8zESoELs",
                            "variationId": "RyQqWxnWqumQ7WpjvLr6",
                            "experimentId": "nM3ntXmMj2dX86xnrvVK",
                            "siteId": "djGYAl2Dx0JDGuAm5mph",
                            "variables": {
                                "backgroundImage": "https://placeimg.com/1000/500/arch"
                            }
                        }
                    }
                }
            }
        },
        "C74lbTFFVUk6Zj76ysMK": {
            "id": "C74lbTFFVUk6Zj76ysMK",
            "siteId": "djGYAl2Dx0JDGuAm5mph",
            "name": "Homepage - Hero Headline",
            "environment": "development",
            "manualQualification": true,
            "targeting": {
                "views": {
                    "include": [
                        "/$"
                    ],
                    "exclude": []
                },
                "segments": {
                    "and": [
                        {
                            "==": [
                                {
                                    "var": "country"
                                },
                                "France"
                            ]
                        },
                        {
                            "==": [
                                {
                                    "var": "state"
                                },
                                "BC"
                            ]
                        }
                    ]
                }
            },
            "variations": {
                "HmXushDwr8vroLEIYGdc": {
                    "id": "HmXushDwr8vroLEIYGdc",
                    "experimentId": "C74lbTFFVUk6Zj76ysMK",
                    "siteId": "djGYAl2Dx0JDGuAm5mph",
                    "trafficAllocation": {
                        "max": 50,
                        "min": 0
                    },
                    "components": {
                        "Hero": {
                            "id": "PjaBNzyQYP2W8zESoELs",
                            "variationId": "HmXushDwr8vroLEIYGdc",
                            "experimentId": "C74lbTFFVUk6Zj76ysMK",
                            "siteId": "djGYAl2Dx0JDGuAm5mph",
                            "variables": {
                                "headline": "Awesome control variation!"
                            }
                        }
                    }
                },
                "RHImVSAalXTbKoNtYdGM": {
                    "id": "RHImVSAalXTbKoNtYdGM",
                    "experimentId": "C74lbTFFVUk6Zj76ysMK",
                    "siteId": "djGYAl2Dx0JDGuAm5mph",
                    "trafficAllocation": {
                        "max": 100,
                        "min": 51
                    },
                    "components": {
                        "Hero": {
                            "id": "PjaBNzyQYP2W8zESoELs",
                            "variationId": "RHImVSAalXTbKoNtYdGM",
                            "experimentId": "C74lbTFFVUk6Zj76ysMK",
                            "siteId": "djGYAl2Dx0JDGuAm5mph",
                            "variables": {
                                "headline": "Awesome variation 1!"
                            }
                        }
                    }
                }
            }
        }
    }
}
```
