import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client/react"
import { GET_COUNTRIES } from "../graphql/queries"
import { calculateCountryScore } from "../utils/CountryScore"

export default function Compare() {
  const { codes } = useParams()
  const selected = codes.split(",")

  const { data, loading } = useQuery(GET_COUNTRIES)
  if (loading) return null

  const countries = data.countries.filter(c =>
    selected.includes(c.code)
  )

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        Country Comparison
      </h1>

      <div className="grid grid-cols-2 gap-6">
        {countries.map(c => (
          <div key={c.code} className="bg-white p-5 rounded-xl">
            <h2 className="text-xl font-medium">
              {c.emoji} {c.name}
            </h2>

            <p className="mt-2">
              Score: {calculateCountryScore(c)}/10
            </p>

            <p>Capital: {c.capital}</p>
            <p>Currency: {c.currency}</p>
            <p>Languages: {c.languages.length}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
