import { createContext, useContext, useState } from "react"

const CompareContext = createContext()

export function CompareProvider({ children }) {
  const [compare, setCompare] = useState([])

  function toggleCompare(code) {
    setCompare(prev =>
      prev.includes(code)
        ? prev.filter(c => c !== code)
        : prev.length < 2
        ? [...prev, code]
        : prev
    )
  }

  return (
    <CompareContext.Provider value={{ compare, toggleCompare }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  return useContext(CompareContext)
}
