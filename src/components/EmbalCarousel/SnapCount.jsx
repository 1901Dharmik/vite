import React, { useCallback, useEffect, useState } from 'react'

export const useSelectedSnapDisplay = (emblaApi) => {
  const [selectedSnap, setSelectedSnap] = useState(0)
  const [snapCount, setSnapCount] = useState(0)

  const updateScrollSnapState = useCallback((emblaApi) => {
    setSnapCount(emblaApi.scrollSnapList().length)
    setSelectedSnap(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    updateScrollSnapState(emblaApi)
    emblaApi.on('select', updateScrollSnapState)
    emblaApi.on('reInit', updateScrollSnapState)
  }, [emblaApi, updateScrollSnapState])

  return {
    selectedSnap,
    snapCount
  }
}

export const SelectedSnapDisplay = (props) => {
  const { selectedSnap, snapCount } = props

  return (
    <div className="flex p-[6px] m-2 text-white text-xl font-bold mx-2 border-2 rounded-2xl bg-[#318E4C] border-[#206c43]">
      {selectedSnap + 1} / {snapCount}
    </div>
  )
}
