import { useState, useContext } from "react"
import { ProductContext } from "../context/ProductContext"
import { getProductByBarcode } from "../api/openFoodApi"
import { useNavigate } from "react-router-dom"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const { setSearchQuery, setPage } = useContext(ProductContext)
  const navigate = useNavigate()

  const handleSearch = () => {
    if (!query.trim()) return

    setSearchQuery(query.trim())
    setPage(1)
  }

  const handleBarcodeSearch = async () => {
    if (!query.trim()) return

    try {
      setLoading(true)

      const cleanCode = query.trim().replace(/\s/g, "")

      if (!/^\d+$/.test(cleanCode)) {
        alert("Please enter a valid numeric barcode")
        return
      }

      const response = await fetch(`/api/api/v0/product/${cleanCode}.json`)
      const data = await response.json()

      if (data.status === 1 && data.product) {
        navigate(`/product/${data.product.code}`)
      } else {
        alert("Product not found for this barcode")
      }

    } catch (err) {
      console.error(err)
      alert("Error fetching barcode product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1 relative">
        <input
          className="w-full border-2 border-orange-200 focus:border-orange-500 focus:outline-none p-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 shadow-sm"
          placeholder="Search by name or barcode..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <svg
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <button
        onClick={handleSearch}
        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
      >
        🔍 Search
      </button>

      <button
        onClick={handleBarcodeSearch}
        disabled={loading}
        className="bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60"
      >
        {loading ? "Checking..." : "📷 Barcode"}
      </button>
    </div>
  )
}
