# CarConnect24 — Export Car Listing Platform

Fast car listing site for exporting vehicles from Belgium to Europe & Africa.

## Features
- **Public listings**: server-side filtering (brand, model, year, price, mileage, fuel, gearbox, body), type-to-search brand selector, sort, pagination, card image carousels.
- **Car detail pages**: full gallery with thumbnails, specs, features, description.
- **Admin dashboard** (private login): add/edit/delete cars in under 2 minutes, drag-and-drop photo upload (auto-resized), one-click "mark sold", add any new brand on the fly, inventory search.

## Stack
Node.js + Express + SQLite (better-sqlite3) + Sharp (image processing). Indexed queries for fast filtering at scale.

## Run locally
```
npm install
node server.js      # http://localhost:3000
```
Default admin: `admin` / `carconnect2026` (change via ADMIN_USER / ADMIN_PASS env vars).
