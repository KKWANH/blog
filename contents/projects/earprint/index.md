---
title: Earprint
subtitle: A project about what we listen to.
description: Earprint explores YouTube Music listening data, artists and recommendations.
excerpt: A music project built around listening data, artist discovery and recommendations.
lang: en
category: Personal project
readTime: 2 min
showToc: false
---

Earprint is a personal music project built around YouTube Music listening data. It uses imported tracks to explore artists, listening patterns and recommendations.

**Development is on hold.**

## The project

A browser extension collects selected music-library data. The web application combines that material with music metadata to build a listening profile and routes into related artists.

The work spans the browser extension, data processing and the interface for exploring the results. Recommendations and generated descriptions are suggestions drawn from the available data, rather than a psychological assessment of the listener.

## Implementation

The project uses Next.js and TypeScript, a Chrome extension and a PostgreSQL database with vector search. Music metadata and model-assisted analysis support the exploration features.

[Visit the project site](https://earprint.kwanho.dev).
