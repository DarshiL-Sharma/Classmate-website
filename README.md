# Classmate Official Website

This repository contains the source code for the **official Classmate website**
(classmate.app) — the promotional site for the Classmate mobile app, built for
students of IPS Academy.

This is **not** the app itself. This repo is the Flask-powered website used to
introduce Classmate, showcase screenshots, and distribute the Android APK
directly to students until it's available on the Play Store.

## What's in here

- `main.py` — Flask app with two routes: the home/about page and the terms page
- `templates/about.html` — the landing page (features, screenshots, APK download)
- `templates/terms.html` — Terms & Conditions page
- `static/css/style.css` — shared stylesheet for both pages
- `static/js/main.js` — scroll animations, hero ticker, nav behaviour
- `static/img/` — screenshots and favicons
- `static/downloads/` — the distributed APK file

## Running locally

```bash
pip install -r requirements.txt
python main.py
```

Then open `http://localhost:5000` in a browser.

## Deployment

This site is deployed on **Vercel** using the included `vercel.json` config.

## About Classmate

Classmate is a mobile app that replaces scattered WhatsApp groups, PDFs, and
outdated college portals with one place for timetable, attendance, notes,
exams, and a campus community feed — built for IPS Academy first.

## License

Copyright © 2026 Darshil Sharma. All rights reserved. This repository is
shared for portfolio and promotional purposes only — no permission is granted
to copy, modify, distribute, or reuse this code without written consent.
