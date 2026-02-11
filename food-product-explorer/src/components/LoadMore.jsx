import { useEffect, useRef } from "react"

export default function LoadMore({ loadMore, hasMore, loading }) {
  const observerRef = useRef(null)

  useEffect(() => {
    if (loading) return
    if (!hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [loading, hasMore, loadMore])

  return (
    <div ref={observerRef} className="h-10 flex justify-center items-center mt-6">
      {loading && <p className="text-gray-500">Loading...</p>}
      {!hasMore && <p className="text-gray-400">No more products</p>}
    </div>
  )
}
