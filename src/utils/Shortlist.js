export function getShortlist() {
  return JSON.parse(localStorage.getItem("shortlist") || "[]")
}

export function toggleShortlist(code) {
  const list = getShortlist()
  const updated = list.includes(code)
    ? list.filter(c => c !== code)
    : [...list, code]

  localStorage.setItem("shortlist", JSON.stringify(updated))
  return updated
}
