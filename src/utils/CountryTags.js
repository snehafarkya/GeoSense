export function getCountryTags(country) {
  const tags = []

  const languagesCount = country.languages?.length || 0
  const currency = country.currency || ""
  const continent = country.continent?.name || ""

  if (languagesCount > 1) tags.push("Tourist-friendly")
  if (["EUR", "USD", "GBP"].includes(currency)) tags.push("Student-friendly")
  if (continent === "Europe") tags.push("Global exposure")
  if (country.capital) tags.push("Well-connected")

  return tags
}
