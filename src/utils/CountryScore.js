export function calculateCountryScore(country) {
  let score = 0

  const languagesCount = country.languages?.length || 0
  const currency = country.currency || ""
  const continent = country.continent?.name || ""

  if (languagesCount > 1) score += 3
  if (["EUR", "USD", "GBP"].includes(currency)) score += 3
  if (continent === "Europe") score += 2
  if (country.capital) score += 2

  return score
}
