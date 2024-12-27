import React, { useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function OppoCarousel({ images }) {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, setScrollSnaps, onSelect])

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images?.map((src, index) => (
            <div className="flex-[0_0_100%] min-w-0 relative " key={index}>
              <img
                src={src.url}
                alt={`OPPO phone ${index + 1}`}
                // width={600}
                // height={400}
                className="w-full h-auto"
              />
              {/* {index === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white bg-opacity-50 rounded-full flex items-center justify-center">
                    <ChevronRight className="w-8 h-8 text-white" />
                  </div>
                </div>
              )} */}
            </div>
          ))}
        </div>
      </div>
      <div className="relative lg:absolute lg:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2  rounded-full p-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-12 h-12 flex-shrink-0 rounded-md overflow-hidden ${
              index === selectedIndex ? 'ring-2 ring-white' : ''
            }  `}
            onClick={() => scrollTo(index)}
          >
            <img
              src={images[index]?.url || ''}
              alt={`Thumbnail ${index + 1}`}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      <button
        className={`absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2`}
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2"
        onClick={scrollNext}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
        {selectedIndex + 1}/{scrollSnaps.length}
      </div>
    </div>
  )
}