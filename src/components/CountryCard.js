import { useState } from "react"
import { toggleFavorite, getFavorites } from "../utils/favorites"
import { calculateCountryScore } from "../utils/CountryScore"
import { getCountryTags } from "../utils/CountryTags"
import { Link } from "react-router-dom"

export default function CountryCard({ country, exchangeRate }) {
  const score = calculateCountryScore(country)
  const tags = getCountryTags(country)
  const [favorites, setFavorites] = useState(getFavorites())

  const isFav = favorites.includes(country.code)

  function handleFavorite(e) {
    e.preventDefault()
    setFavorites(toggleFavorite(country.code))
  }

  return (
    <Link to={`/country/${country.code}`}>
      <div className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition">
        <div className="bg-slate-100 p-4 rounded-t-2xl flex justify-between">
          <div>
            <p className="text-sm text-slate-500">{country.code}</p>
            <h2 className="text-xl font-semibold">{country.name}</h2>
          </div>

          <button
            onClick={handleFavorite}
            className={`text-xl ${isFav ? "text-blue-600" : "text-slate-400"}`}
          >
            ★
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-slate-500">Suitability</span>
            <span className="bg-green-100 px-3 py-1 rounded-lg font-semibold">
              {score}/10
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="bg-blue-50 px-3 py-1 rounded-full text-xs text-blue-700">
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 text-sm">
            <div>
              <p className="text-slate-500">Capital</p>
              <p>{country.capital || "N/A"}</p>
            </div>
            <div>
              <p className="text-slate-500">Exchange</p>
              <p className="text-blue-600">{exchangeRate || "—"}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
