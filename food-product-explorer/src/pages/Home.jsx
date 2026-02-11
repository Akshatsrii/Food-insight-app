import { useEffect, useContext, useState, useRef, useCallback } from "react"
import { ProductContext } from "../context/ProductContext"
import { fetchProductsByCategory, searchProducts } from "../api/openFoodApi"
import SearchBar from "../components/SearchBar"
import Filters from "../components/Filters"
import ProductList from "../components/ProductList"
import Spinner from "../components/Spinner"
import ErrorMessage from "../components/ErrorMessage"

export default function Home() {
  const {
    products,
    setProducts,
    category,
    page,
    setPage,
    sortOption,
    searchQuery
  } = useContext(ProductContext)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  const observerRef = useRef(null)

  // Reset when category or search changes
  useEffect(() => {
    setProducts([])
    setPage(1)
    setHasMore(true)
  }, [category, searchQuery])

  // Load data
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)

        let data = []

        if (searchQuery) {
          data = await searchProducts(searchQuery, page)
        } else {
          data = await fetchProductsByCategory(category, page)
        }

        if (!data || data.length === 0) {
          setHasMore(false)
        } else {
          setProducts((prev) => {
            const combined = [...prev, ...data]

            const uniqueProducts = Array.from(
              new Map(
                combined
                  .filter(item => item?.code)
                  .map(item => [item.code, item])
              ).values()
            )

            return uniqueProducts
          })
        }

      } catch (err) {
        setError("Failed to load products.")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [category, page, searchQuery])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1)
    }
  }, [loading, hasMore, setPage])

  // Infinite scroll observer
  useEffect(() => {
    if (!observerRef.current || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMore()
        }
      },
      { rootMargin: "200px" }
    )

    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [loadMore, loading, hasMore])

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "az")
      return a.product_name?.localeCompare(b.product_name)
    if (sortOption === "za")
      return b.product_name?.localeCompare(a.product_name)
    if (sortOption === "gradeAsc")
      return a.nutrition_grades?.localeCompare(b.nutrition_grades)
    if (sortOption === "gradeDesc")
      return b.nutrition_grades?.localeCompare(a.nutrition_grades)
    return 0
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-white">

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Product Explorer
          </h1>
          <p className="text-orange-100">
            Discover nutritious products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Search + Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-orange-100">
          <SearchBar />
          <div className="mt-6 pt-6 border-t border-orange-100">
            <Filters />
          </div>
        </div>

        {/* Error */}
        {error && <ErrorMessage message={error} />}

        {/* Initial Loader */}
        {page === 1 && loading && (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        )}

        {/* Product Grid */}
        {sortedProducts.length > 0 && (
          <ProductList products={sortedProducts} />
        )}

        {/* No Products */}
        {!loading && sortedProducts.length === 0 && !error && (
          <div className="text-center py-20 text-gray-600">
            No products found
          </div>
        )}

        {/* Loading More */}
        {loading && page > 1 && (
          <div className="flex justify-center py-6">
            <Spinner />
          </div>
        )}

        {/* Load More Button */}
        {hasMore && !loading && sortedProducts.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl shadow-lg transition"
            >
              Load More
            </button>
          </div>
        )}

        {/* Infinite Scroll Trigger */}
        <div ref={observerRef} className="h-10"></div>

      </div>
    </div>
  )
}
