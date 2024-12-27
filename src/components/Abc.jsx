import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../components/EmbalCarousel/EmbalaCarousel";
import "../components/EmbalCarousel/embala.css";
import EmblaCarousel from "../components/EmbalCarousel/EmbalaCarousel";
const images = [
  "https://sajivanayurveda.in/wp-content/uploads/2023/01/My-project-1-1-e1675763027728.png",
  "https://sajivanayurveda.in/wp-content/uploads/2023/01/My-project-3-1-e1675763296496.png",
  "https://sajivanayurveda.in/wp-content/uploads/2023/01/My-project-2-1-e1675763509294.png",
  "https://sajivanayurveda.in/wp-content/uploads/2023/01/My-project-5-e1675764220750.png",
  "https://sajivanayurveda.in/wp-content/uploads/2023/01/My-project-6-e1675763634248.png",
];

export default function Abc() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return;
      embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
  }, [embla, onSelect]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="md:sticky md:top-20 h-fit">
        <div className="relative w-full max-w-[400px] mx-auto">
          <div className="overflow-hidden" ref={mainViewportRef}>
            <div className="flex">
              {images.map((src, index) => (
                <div
                  className="flex-[0_0_100%] min-w-0 flex justify-center items-center"
                  key={index}
                >
                  <img
                    src={src}
                    alt={`Product image ${index + 1}`}
                    className="w-[400px] h-[400px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
            onClick={() => embla?.scrollPrev()}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
            onClick={() => embla?.scrollNext()}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 overflow-hidden w-full max-w-[400px] mx-auto " ref={thumbViewportRef}>
          <div className="flex justify-center items-center px-4 gap-2">
            {images.map((src, index) => (
              <button
                key={index}
                className={`flex-[0_0_20%] min-w-0 relative ${
                  index === selectedIndex ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => onThumbClick(index)}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-20 w-20 objeci-cover"
                />
              </button>
            ))}
          </div>
          
        </div>
      </div>
      <div className="flex-1 mt-12">
        <h1 className="text-3xl font-bold mb-4">OPPO F27 5G</h1>
        <p className="text-xl mb-2">
          ₹22,999 <span className="line-through text-gray-500">₹26,999</span>
        </p>
        <p className="mb-4">
          15% pa instant discount up to ₹3,299{" "}
          <span className="text-blue-500">Learn more</span>
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Save up to 18%: Get GST invoice on business purchase.</li>
          <li>
            Save more with education program.{" "}
            <span className="text-blue-500">Check </span>
          </li>
          <li>
            Get up to ₹1,500 cashback via MobiKwik wallet.
            <span className="text-blue-500">Check </span>
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
        <ul className="list-disc list-inside">
          <li>Radiant Halo Light</li>
          <li>AI Ultra-Clear Imaging</li>
          <li>32MP Ultra-Clear Selfie Camera</li>
          <li>5000mAh Large Battery & 45W SUPERVOOC Flash Charge</li>
        </ul>

        <div className="bg-secondary p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Scrollable Content</h2>
          {[...Array(10)].map((_, index) => (
            <p key={index} className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
