import { Link } from "react-router-dom"
import { useCompare } from "../context/CompareContext"

export default function CompareBar() {
  const { compare } = useCompare()

  if (compare.length < 2) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full">
      <Link to={`/compare/${compare.join(",")}`}>
        Compare selected countries →
      </Link>
    </div>
  )
}
