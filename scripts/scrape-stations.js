#!/usr/bin/env node
/**
 * IRCTC Retiring Room — Station Data Scraper
 * --------------------------------------------------------------
 * Run from your own machine (not from a restricted sandbox) to
 * expand data/stations.json beyond the seed list of ~120 stations.
 *
 * Usage:
 *   node scripts/scrape-stations.js
 *
 * Sources:
 *   1. https://www.rr.irctc.co.in/#/station  (official station list)
 *   2. redBus station pages (cross-reference for tariff bands)
 *
 * Output: data/stations.json — same schema as the seed file.
 *
 * NOTE: IRCTC blocks aggressive automation. Use a 2s+ delay between
 * requests and a real User-Agent. If you hit 403s, switch to a
 * residential proxy or run from a non-Cloud IP.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, '..', 'data', 'stations.json');

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';
const SLEEP_MS = 2500;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchStationList() {
  console.log('[1/3] Fetching official IRCTC station list…');
  // IRCTC exposes the station list via an internal endpoint behind their SPA.
  // Replace this URL with the live endpoint discovered via DevTools Network tab.
  const url = 'https://www.rr.irctc.co.in/rrws/api/v1/stations';

  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      Accept: 'application/json, text/plain, */*',
      Referer: 'https://www.rr.irctc.co.in/',
    },
  });

  if (!res.ok) {
    throw new Error(`IRCTC station list returned ${res.status}. Inspect Network tab for live endpoint.`);
  }

  const data = await res.json();
  console.log(`     → got ${data.length} stations from IRCTC`);
  return data;
}

async function enrichStation(station) {
  // For each station, scrape redBus or IRCTC for room types, tariff, hourly availability.
  // Implement per-station fetch here. Sleep between calls.
  await sleep(SLEEP_MS);

  // Placeholder shape — fill in once you've inspected the live API responses.
  return {
    code: station.stationCode,
    name: station.stationName,
    city: station.city || station.stationName,
    state: station.state,
    zone: station.zone,
    lat: station.lat ?? null,
    lng: station.lng ?? null,
    room_types: station.roomTypes ?? [],
    hourly: station.hourlyBooking ?? false,
    tariff: station.tariff ?? {},
  };
}

async function main() {
  // Load existing seed so we don't lose curated data
  let existing = [];
  try {
    existing = JSON.parse(await fs.readFile(OUT_PATH, 'utf8'));
    console.log(`[seed] Loaded ${existing.length} existing stations`);
  } catch {
    console.log('[seed] No existing seed file, starting fresh');
  }
  const existingByCode = new Map(existing.map((s) => [s.code, s]));

  // 1. Fetch official station list
  const rawStations = await fetchStationList();

  // 2. Enrich each one (skip those already seeded with high-quality data)
  console.log('[2/3] Enriching station data…');
  const enriched = [];
  for (const s of rawStations) {
    if (existingByCode.has(s.stationCode)) {
      enriched.push(existingByCode.get(s.stationCode));
      continue;
    }
    try {
      enriched.push(await enrichStation(s));
    } catch (err) {
      console.warn(`     ! ${s.stationCode}: ${err.message}`);
    }
  }

  // 3. Write back
  console.log('[3/3] Writing data/stations.json…');
  await fs.writeFile(OUT_PATH, JSON.stringify(enriched, null, 2));
  console.log(`     → wrote ${enriched.length} stations`);
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
