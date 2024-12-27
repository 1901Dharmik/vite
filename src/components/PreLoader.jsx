import React, { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import NewPage from '../pages/NewPage'

// Loader component
const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <Loader2 className="w-12 h-12 animate-spin text-primary" />
  </div>
)

// Simulated content component with artificial delay
const Content = React.lazy(() => new Promise(resolve => 
  setTimeout(() => resolve(import('../pages/NewPage')), 2000)
))

// Main component using Suspense
export default function PreLoader() {
  return (
    <Suspense fallback={<Loader />}>
      <Content />
    </Suspense>
  )
}

