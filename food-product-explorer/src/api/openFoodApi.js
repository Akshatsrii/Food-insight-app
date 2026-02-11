const BASE_URL = "https://world.openfoodfacts.org"

export const fetchProductsByCategory = async (category, page = 1) => {
  const res = await fetch(`${BASE_URL}/category/${category}.json?page=${page}`)
  const data = await res.json()
  return data.products
}

export const searchProducts = async (query, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/cgi/search.pl?search_terms=${query}&json=true&page=${page}`
  )
  const data = await res.json()
  return data.products
}

export const getProductByBarcode = async (barcode) => {
  const res = await fetch(
    `${BASE_URL}/api/v0/product/${barcode}.json`
  )
  const data = await res.json()
  return data.product
}
export const fetchCategories = async () => {
  const res = await fetch(
    "https://world.openfoodfacts.org/categories.json"
  )
  const data = await res.json()
  return data.tags.slice(0, 20)
}
