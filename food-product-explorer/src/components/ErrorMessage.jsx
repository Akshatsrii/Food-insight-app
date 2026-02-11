export default function ErrorMessage({ message }) {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-4">
        {/* Error Icon */}
        <div className="flex-shrink-0">
          <div className="bg-red-500 rounded-full p-3">
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-red-800 mb-1">Oops! Something went wrong</h3>
          <p className="text-red-700">{message}</p>
        </div>
      </div>
    </div>
  )
}