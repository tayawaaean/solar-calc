import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/'
const PVWATTS_API_KEY = import.meta.env.VITE_PVWATTS_API_KEY

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Simple in-memory cache for irradiance keyed by rounded lat/lon
const irradianceCache = new Map()
const cacheKeyFromCoords = (lat, lon) => {
  const rLat = Number(lat).toFixed(2) // ~1-2 km precision
  const rLon = Number(lon).toFixed(2)
  return `${rLat},${rLon}`
}

export async function getIrradiance(lat, lon) {
  if (!PVWATTS_API_KEY) {
    throw new Error('VITE_PVWATTS_API_KEY is not set')
  }

  const key = cacheKeyFromCoords(lat, lon)
  if (irradianceCache.has(key)) {
    return irradianceCache.get(key)
  }

  const tilt = Math.max(0, Math.min(60, Math.abs(lat)))
  const params = {
    api_key: PVWATTS_API_KEY,
    lat,
    lon,
    system_capacity: 1, // kW to derive kWh/kW
    azimuth: 180,
    tilt,
    array_type: 1, // Fixed open rack
    module_type: 1, // Standard
    losses: 14, // % typical
  }
  const url = 'https://developer.nrel.gov/api/pvwatts/v8.json'
  const { data } = await axios.get(url, { params })
  const acAnnual = data?.outputs?.ac_annual
  if (!acAnnual) {
    const message = data?.errors?.[0]?.message || 'PVWatts response missing ac_annual'
    throw new Error(message)
  }
  const value = {
    acAnnualKWhPerKW: acAnnual, // kWh per 1 kW system
    stationInfo: data?.station_info || null,
    inputs: data?.inputs || null,
  }
  irradianceCache.set(key, value)
  return value
}

export async function submitQuote(payload) {
  // Future: post to DRF endpoint, ensure CORS configured server-side
  const endpoint = 'quotes/'
  const response = await apiClient.post(endpoint, payload)
  return response.data
}

export function computeSystemFromConsumption({ consumptionKWhPerYear, acAnnualKWhPerKW }) {
  if (!acAnnualKWhPerKW || acAnnualKWhPerKW <= 0) return { systemKW: 0, panels: 0, savingsPerYear: 0 }
  const systemKW = consumptionKWhPerYear / acAnnualKWhPerKW
  const panelWatt = 400 // reasonable default W per panel
  const panels = Math.ceil((systemKW * 1000) / panelWatt)
  const gridCostPerKWh = 0.18 // USD placeholder; could be localized later
  const savingsPerYear = consumptionKWhPerYear * gridCostPerKWh
  return { systemKW, panels, savingsPerYear }
}
