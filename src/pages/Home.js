import { useQuery } from "@apollo/client/react";
import { GET_COUNTRIES } from "../graphql/queries";
import { useEffect, useState } from "react";
import { getExchangeRates } from "../utils/ExchangeRates";
import Header from "../components/Header";
import CountryCard from "../components/CountryCard";
import { getCountryTags } from "../utils/CountryTags";
import { calculateCountryScore } from "../utils/CountryScore";

const FILTERS = [
  "Global exposure",
  "Student-friendly",
  "Tourist-friendly",
  "Well-connected",
];

export default function Home() {
  const { data, loading } = useQuery(GET_COUNTRIES);
  const [search, setSearch] = useState("");
  const [rates, setRates] = useState({});
  const [activeFilter, setActiveFilter] = useState(null);
  const [sortBy, setSortBy] = useState("score");

  useEffect(() => {
    getExchangeRates().then(setRates);
  }, []);

  if (loading || !data) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  let countries = data.countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  if (activeFilter) {
    countries = countries.filter((c) =>
      getCountryTags(c).includes(activeFilter)
    );
  }

  countries = [...countries].sort((a, b) => {
    if (sortBy === "score") {
      return calculateCountryScore(b) - calculateCountryScore(a);
    }

    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "exchange") {
      const ra = rates[a.currency] || Infinity;
      const rb = rates[b.currency] || Infinity;
      return ra - rb;
    }

    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <Header />

        {/* Search */}
        <div className="relative mb-5">
          <input
            type="text"
            placeholder="Search countries by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200  px-4 py-3  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() =>
                setActiveFilter(activeFilter === filter ? null : filter)
              }
              className={`rounded-full px-3 py-1 text-sm border ${
                activeFilter === filter
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-4 text-sm mb-6">
          <span className="text-slate-500">Sort by:</span>

          {[
            { id: "score", label: "Score" },
            { id: "name", label: "Name" },
            { id: "exchange", label: "Exchange Rate" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSortBy(opt.id)}
              className={`px-4 py-1 rounded-full ${
                sortBy === opt.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
        >
          {countries.map((country) => (
            <CountryCard
              key={country.code}
              country={country}
              exchangeRate={
                rates[country.currency]
                  ? `${rates[country.currency].toFixed(2)} ${country.currency}`
                  : null
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
