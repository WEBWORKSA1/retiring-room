import stationsRaw from '../../data/stations.json';

export const ZONE_NAMES = {
  CR: 'Central Railway',
  ER: 'Eastern Railway',
  ECR: 'East Central Railway',
  ECoR: 'East Coast Railway',
  NR: 'Northern Railway',
  NCR: 'North Central Railway',
  NER: 'North Eastern Railway',
  NFR: 'Northeast Frontier Railway',
  NWR: 'North Western Railway',
  SR: 'Southern Railway',
  SCR: 'South Central Railway',
  SER: 'South Eastern Railway',
  SECR: 'South East Central Railway',
  SWR: 'South Western Railway',
  WR: 'Western Railway',
  WCR: 'West Central Railway',
};

export const ROOM_TYPE_LABELS = {
  single_ac: 'Single AC',
  single_nonac: 'Single Non-AC',
  double_ac: 'Double AC',
  double_nonac: 'Double Non-AC',
  dormitory_ac: 'Dormitory AC',
  dormitory_nonac: 'Dormitory Non-AC',
};

export const stations = stationsRaw.map((s) => ({
  ...s,
  slug: s.code.toLowerCase(),
  citySlug: slugify(s.city),
  stateSlug: slugify(s.state),
}));

export function slugify(str) {
  return String(str).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function formatINR(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}

export function getStation(code) {
  return stations.find((s) => s.code.toLowerCase() === String(code).toLowerCase());
}

export function getCities() {
  const map = new Map();
  for (const s of stations) {
    const key = s.citySlug;
    if (!map.has(key)) map.set(key, { slug: key, city: s.city, state: s.state, stations: [] });
    map.get(key).stations.push(s);
  }
  return [...map.values()].sort((a, b) => a.city.localeCompare(b.city));
}

export function getStates() {
  const map = new Map();
  for (const s of stations) {
    const key = s.stateSlug;
    if (!map.has(key)) map.set(key, { slug: key, state: s.state, stations: [] });
    map.get(key).stations.push(s);
  }
  return [...map.values()].sort((a, b) => a.state.localeCompare(b.state));
}

export function tariffRange(station) {
  const allPrices = Object.values(station.tariff || {}).flat();
  if (!allPrices.length) return null;
  return { min: Math.min(...allPrices), max: Math.max(...allPrices) };
}

export function hasAC(station) {
  return station.room_types.some((rt) => rt.endsWith('_ac'));
}

export function hasNonAC(station) {
  return station.room_types.some((rt) => rt.endsWith('_nonac'));
}

export function hasDormitory(station) {
  return station.room_types.some((rt) => rt.startsWith('dormitory'));
}
