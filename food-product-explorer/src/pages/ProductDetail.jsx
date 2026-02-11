import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getProductByBarcode } from "../api/openFoodApi"

export default function ProductDetail() {
  const { code } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const load = async () => {
      const data = await getProductByBarcode(code)
      setProduct(data)
    }
    load()
  }, [code])

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-orange-500 text-xl font-semibold">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="bg-orange-500 p-8 flex justify-center items-center">
          <img 
            src={product.image_front_url} 
            alt={product.product_name}
            className="h-60 rounded-lg shadow-md object-contain"
          />
        </div>

        {/* Product Info Section */}
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 border-b-4 border-orange-500 pb-3">
            {product.product_name}
          </h1>

          {/* Ingredients */}
          <div className="mb-6 bg-orange-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-orange-700 mb-2">Ingredients</h2>
            <p className="text-gray-700 leading-relaxed">{product.ingredients_text}</p>
          </div>

          {/* Nutrition Facts */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Nutrition Facts</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border-2 border-orange-200 rounded-lg p-4 hover:border-orange-500 transition-colors">
                <p className="text-sm text-gray-600 uppercase font-semibold">Energy</p>
                <p className="text-2xl font-bold text-orange-600">{product.nutriments?.energy || 'N/A'}</p>
              </div>
              <div className="bg-white border-2 border-orange-200 rounded-lg p-4 hover:border-orange-500 transition-colors">
                <p className="text-sm text-gray-600 uppercase font-semibold">Fat</p>
                <p className="text-2xl font-bold text-orange-600">{product.nutriments?.fat || 'N/A'}g</p>
              </div>
              <div className="bg-white border-2 border-orange-200 rounded-lg p-4 hover:border-orange-500 transition-colors">
                <p className="text-sm text-gray-600 uppercase font-semibold">Carbs</p>
                <p className="text-2xl font-bold text-orange-600">{product.nutriments?.carbohydrates || 'N/A'}g</p>
              </div>
              <div className="bg-white border-2 border-orange-200 rounded-lg p-4 hover:border-orange-500 transition-colors">
                <p className="text-sm text-gray-600 uppercase font-semibold">Protein</p>
                <p className="text-2xl font-bold text-orange-600">{product.nutriments?.proteins || 'N/A'}g</p>
              </div>
            </div>
          </div>

          {/* Labels */}
          {product.labels && (
            <div className="bg-gradient-to-r from-orange-100 to-orange-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-orange-700 mb-2">Labels</h2>
              <p className="text-gray-700">{product.labels}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}