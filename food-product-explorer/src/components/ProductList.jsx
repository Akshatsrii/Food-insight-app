import ProductCard from "./ProductCard"

export default function ProductList({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products?.map((p, i) => (
        <ProductCard key={p.code || i} product={p} />
      ))}
    </div>
  )
}