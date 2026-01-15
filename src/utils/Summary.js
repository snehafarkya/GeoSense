export function countrySummary(score) {
  if (score >= 8)
    return "This country is highly suitable for international students, travelers, and global professionals."
  if (score >= 5)
    return "This country offers a balanced mix of regional familiarity and international exposure."
  return "This country is more suitable for region-specific travel or local exploration."
}
