import { useEffect, useState, useContext } from "react"
import { fetchCategories } from "../api/openFoodApi"
import { ProductContext } from "../context/ProductContext"

export default function Filters() {
  const { setCategory, setSortOption } = useContext(ProductContext)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const load = async () => {
      const data = await fetchCategories()
      setCategories(data)
    }
    load()
  }, [])

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4">
      {/* Category Filter */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          📂 Category
        </label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-white border-2 border-orange-200 focus:border-orange-500 focus:outline-none p-3 rounded-xl text-gray-800 font-medium shadow-sm hover:border-orange-300 transition-all cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Filter */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          🔄 Sort By
        </label>
        <select
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full bg-white border-2 border-orange-200 focus:border-orange-500 focus:outline-none p-3 rounded-xl text-gray-800 font-medium shadow-sm hover:border-orange-300 transition-all cursor-pointer"
        >
          <option value="">Default</option>
          <option value="az">Name: A → Z</option>
          <option value="za">Name: Z → A</option>
          <option value="gradeAsc">Nutrition: Best First</option>
          <option value="gradeDesc">Nutrition: Worst First</option>
        </select>
      </div>
    </div>
  )
}