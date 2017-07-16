---
layout: post
title: "Memory monitor"
date: 2017-07-16
excerpt: "Simple memory monitor."
tags: [flask, memory, monitor, simple, real-time, metricsgraphics, d3]
comments: true
project: true

---

## Memmon

This simple flask app provides an interface and API to monitoring
the server memory consumption. the footprint is relatively small.
Easy to extend with other memory metrics. It uses MetricsGraphics
what is actually top on D3 library.


The API is the following:

/memory
```json
{
    "total": 7798468608,
    "avail": 1524699136,
    "percent": 80.4,
    "used": 5029199872,
    "free": 889483264,
    "active": 4651147264,
    "inactive": 1847402496,
    "buffers": 58912768,
    "cached": 1820872704,
    "shared": 943616000,
    "timestamp": "2017-07-16T11:03:52.794286"
}
```

 [GITHUB](https://github.com/p0lish/memmon)
