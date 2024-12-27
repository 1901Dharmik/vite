import React, { useState, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const ProductImageGallery = ({ images }) => {
  // State for main image gallery
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    align: 'start',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // State for lightbox modal
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxEmblaRef, lightboxEmblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    startIndex: selectedIndex,
  });

  // Handler to open lightbox
  const openLightbox = useCallback((index) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  }, []);

  // Handler to close lightbox
  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  // Thumbnail click handler
  const onThumbClick = useCallback((index) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
    setSelectedIndex(index);
  }, [emblaApi]);

  // Scroll handler for main gallery
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Ensure event handlers are attached
  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Placeholder image if no image is provided
  const placeholderImage = "https://sajivanayurveda.in/wp-content/uploads/2023/01/My-project-1-1-e1675763027728.png";

  return (
    <>
      {/* Main Product Image Gallery */}
      <div className="md:sticky md:top-20 lg:top-28 2xl:top-40 h-fit col-span-3 lg:mt-0 mt-16">
        <div className="relative w-full max-w-[400px] lg:max-w-[400px] xl:max-w-[550px] mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {images?.map((src, index) => (
                <div
                  className="flex-[0_0_100%] min-w-0 flex justify-center items-center"
                  key={index}
                >
                  <img
                    onClick={() => openLightbox(index)}
                    src={src?.url || placeholderImage}
                    alt={`Product image ${index + 1}`}
                    className="w-[400px] h-[400px] lg:w-[400px] lg:h-[400px] 2xl:w-[550px] 2xl:h-[550px] object-contain rounded-xl cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <span className="icon-[solar--round-alt-arrow-right-bold-duotone] h-14 w-14 bg-gray-800 mt-1.5 opacity-70 backdrop-blur-xl rotate-180"></span>
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => emblaApi?.scrollNext()}
          >
            <span className="icon-[solar--round-alt-arrow-right-bold-duotone] h-14 w-14 bg-gray-800 mt-1.5 opacity-70 backdrop-blur-xl"></span>
          </button>

          {/* Image Counter */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
            {selectedIndex + 1} / {images?.length}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div
          className="mt-4 overflow-hidden w-full max-w-[400px] mx-auto"
        >
          <div className="flex px-4 gap-2">
            {images?.map((src, index) => (
              <button
                key={index}
                className={`flex-[0_0_20%] min-w-0 relative ${
                  index === selectedIndex
                    ? "border-2 border-gray-400 rounded-xl"
                    : ""
                }`}
                onClick={() => onThumbClick(index)}
              >
                <img
                  src={src?.url || placeholderImage}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-18 w-20 aspect-square object-cover rounded-xl p-[2px]"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={closeLightbox}
        >
          <div 
            className="relative w-full max-w-[90%] max-h-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-2 right-2 z-60 text-white"
              onClick={closeLightbox}
            >
              <X className="h-8 w-8" />
            </button>

            {/* Lightbox Carousel */}
            <div className="relative w-full h-full" ref={lightboxEmblaRef}>
              <div className="embla__container flex">
                {images?.map((src, index) => (
                  <div 
                    key={index} 
                    className="embla__slide flex-[0_0_100%] flex justify-center items-center"
                  >
                    <img
                      src={src?.url || placeholderImage}
                      alt={`Lightbox image ${index + 1}`}
                      className="max-w-full max-h-[80vh] object-contain"
                    />
                  </div>
                ))}
              </div>
              
              {/* Lightbox Navigation Buttons */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white"
                onClick={() => lightboxEmblaApi?.scrollPrev()}
              >
                <span className="icon-[solar--round-alt-arrow-right-bold-duotone] h-14 w-14 bg-gray-800 mt-1.5 opacity-70 backdrop-blur-xl rotate-180"></span>
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white"
                onClick={() => lightboxEmblaApi?.scrollNext()}
              >
                <span className="icon-[solar--round-alt-arrow-right-bold-duotone] h-14 w-14 bg-gray-800 mt-1.5 opacity-70 backdrop-blur-xl"></span>
              </button>

              {/* Lightbox Image Counter */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                {selectedIndex + 1} / {images?.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImageGallery;