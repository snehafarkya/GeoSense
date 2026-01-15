import { useParams, Link } from "react-router-dom"
import { useQuery } from "@apollo/client/react"
import { GET_COUNTRY } from "../graphql/queries"
import { getExchangeRates } from "../utils/ExchangeRates"
import { useState, useEffect } from "react"

export default function CountryDetails() {
  const { code } = useParams()

  const { data, loading } = useQuery(GET_COUNTRY, {
    variables: { code },
  })

  const [usdRateText, setUsdRateText] = useState("")

  // ✅ Hook is ALWAYS called
  useEffect(() => {
    if (!data?.country?.currency) return

    async function fetchRate() {
      const rates = await getExchangeRates()
      const rate = rates[data.country.currency]

      if (rate) {
        setUsdRateText(
          `1 USD ≈ ${rate.toFixed(2)} ${data.country.currency}`
        )
      }
    }

    fetchRate()
  }, [data])

  // ✅ Early return is now SAFE
  if (loading || !data) {
    return <p className="text-center mt-10">Loading...</p>
  }

  const c = data.country

  const insights = [
    c.languages?.length > 1 && "Good for international travelers",
    c.currency?.includes("EUR") && "Student-friendly region",
    c.continent?.name === "Europe" && "Strong public infrastructure",
  ].filter(Boolean)

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-sm text-gray-500">
          ← Back to search
        </Link>

        <div className="mt-6">
          <h1 className="text-5xl font-semibold">
            {c.emoji} {c.name}
          </h1>
          <p className="text-gray-500 mt-2">
            {c.continent.name} · {c.currency || "Local currency"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <InfoCard label="Capital" value={c.capital || "N/A"} />
          <InfoCard
            label="Languages"
            value={c.languages.map(l => l.name).join(", ")}
          />
          <InfoCard
            label="Currency"
            value={
              <>
                {c.currency || "N/A"}
                {usdRateText && (
                  <p className="text-xs text-gray-500 mt-1">
                    {usdRateText}
                  </p>
                )}
              </>
            }
          />
          <InfoCard label="Region" value={c.continent.name} />
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-medium mb-3">
            Why consider this country?
          </h2>
          <ul className="space-y-2 text-gray-700">
            {insights.length > 0
              ? insights.map((i, idx) => (
                  <li key={idx}>✔ {i}</li>
                ))
              : "General-purpose destination with balanced opportunities."}
          </ul>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Exchange rates fetched from open.er-api.com and cached daily.
        </p>
      </div>
    </div>
  )
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <div className="mt-1 font-medium text-gray-800">
        {value}
      </div>
    </div>
  )
}
