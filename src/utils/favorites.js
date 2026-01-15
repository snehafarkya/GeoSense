const KEY = "favorite-countries"

export function getFavorites() {
  return JSON.parse(localStorage.getItem(KEY) || "[]")
}

export function toggleFavorite(code) {
  const favorites = getFavorites()
  const updated = favorites.includes(code)
    ? favorites.filter(c => c !== code)
    : [...favorites, code]

  localStorage.setItem(KEY, JSON.stringify(updated))
  return updated
}
