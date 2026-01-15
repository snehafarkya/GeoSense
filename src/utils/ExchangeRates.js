const EXCHANGE_API_URL = "https://open.er-api.com/v6/latest/USD"
const CACHE_KEY = "exchange-rates"
const CACHE_TIME = 1000 * 60 * 60 * 24 // 24 hours

export async function getExchangeRates() {
  const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}")
  const now = Date.now()

  // Use cached if not expired
  if (cached.timestamp && now - cached.timestamp < CACHE_TIME) {
    return cached.rates
  }

  try {
    const res = await fetch(EXCHANGE_API_URL)
    const { rates, result } = await res.json()

    if (result === "success") {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ timestamp: now, rates })
      )
      return rates
    }
  } catch (err) {
    console.error("Exchange rate fetch failed:", err)
  }

  // fallback: return cached if available
  return cached.rates || {}
}
