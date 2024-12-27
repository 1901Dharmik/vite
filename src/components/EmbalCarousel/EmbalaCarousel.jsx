import React, { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { SelectedSnapDisplay, useSelectedSnapDisplay } from "./SnapCount";
import { PrevButton, NextButton, usePrevNextButtons } from "./ArrowBtn";
// import { Thumb } from './Thumb'
import Autoplay from "embla-carousel-autoplay";
import ImageModal from "../ImageModel";
const EmblaCarousel = (props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  // const [emblaRef, emblaApi] = useEmblaCarousel(options, [
  //     Autoplay({ playOnInit: false, delay: 3000 })
  //   ])
  const thumbnailRef = useRef(null);
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: false, delay: 3000 }),
  ]);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  //   scroll btn
  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaMainApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaMainApi);

  // autoplay
  const [isPlaying, setIsPlaying] = useState(false);
  const onButtonAutoplayClick = useCallback(
    (callback) => {
      const autoplay = emblaMainApi?.plugins()?.autoplay;
      if (!autoplay) return;

      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop;

      resetOrStop();
      callback();
    },
    [emblaMainApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaMainApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
    playOrStop();
  }, [emblaMainApi]);

  useEffect(() => {
    const autoplay = emblaMainApi?.plugins()?.autoplay;
    if (!autoplay) return;

    setIsPlaying(autoplay.isPlaying());
    emblaMainApi
      .on("autoplay:play", () => setIsPlaying(true))
      .on("autoplay:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(autoplay.isPlaying()));
  }, [emblaMainApi]);

// lightbox
  // const [lightboxImage, setLightboxImage] = useState(null);

  // // Add this function
  // const openLightbox = (image) => {
  //   setLightboxImage(image);
  // };
  return (
    <div className="embla ">
      <div className="embla__viewport mb-4 " ref={emblaMainRef || emblaRef}>
        <div className="embla__container ">
          {slides &&
            slides.map((slide, index) => (
              <div className="embla__slide flex justify-center items-center" key={index}>
                {/* <div className="embla__slide__number">{index + 1}</div> */}
                <img 
                // onClick={() => openLightbox(slide.url)}
                  src={slide.url}
                  alt=""
                  className="h-[350px] w-[350px]  object-cover rounded-md"
                />
              </div>
            ))}
        </div>
      </div>
      {/* {lightboxImage && (
        <ImageModal image={lightboxImage} onClose={() => setLightboxImage(null)} />
      )} */}
      <div className="md:hidden lg:hidden flex justify-center navigation-bar ">
        <div className=" flex glass ">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <SelectedSnapDisplay
            selectedSnap={selectedSnap}
            snapCount={snapCount}
          />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>

      {/* <div className="lg:hidden bg-white rounded-xl py-[10px] mt-4 max-w-sm">
        <div className="embla__controls flex ">
          <div className=" ">
            <SelectedSnapDisplay
              selectedSnap={selectedSnap}
              snapCount={snapCount}
            />
          </div>
          <div className="embla__buttons flex absolute right-0 mr-2">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
          <div className="flex justify-center w-24 border-2 text-white text-xl font-semibold rounded-xl border-[#206c43] items-center mr-24 bg-[#318e4c]">
            <button
              className="embla__play"
              onClick={toggleAutoplay}
              type="button"
            >
              {isPlaying ? "Stop" : "Start"}
            </button>
          </div>
        </div>{" "}
      </div> */}

      <div className="overflow-x-sroll  w-full pb-4" ref={thumbnailRef}>
        {/* <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`w-20 h-30 rounded-lg overflow-scroll mr-2 ${
                selectedIndex === index ? "border-2 border-[#206c43]" : ""
              }`}
            >
                
              <img
                src={slide.url}
                alt=""
                className="w-full h-full object-cover"
                onClick={() => emblaMainApi.scrollTo(index)}
              />
            </div>
          ))}
        </div> */}
        <div className="embla-thumbs css-dbiy7e my-2">
          <div className="embla-thumbs__viewport " ref={emblaThumbsRef}>
            <div className="embla-thumbs__container pl-2 ">
              {slides &&
                slides.map((slide, index) => (
                  <img
                    src={slide?.url}
                    alt=""
                    className={`w-[80px] ml-2 rounded-md  ${
                      selectedIndex === index
                        ? "border-2 border-green-900 rounded-md "
                        : ""
                    }`}
                    //   className="w-[100px]  h-full object-cover p-2"
                    onClick={() => emblaMainApi.scrollTo(index)}
                  />
                ))}
            </div>
          </div>
        </div>
        {/*  */}

        {/*  */}
      </div>
    </div>
  );
};

export default EmblaCarousel;
export const Thumb = (props) => {
  const { selected, index, onClick } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        {index + 1}
      </button>
    </div>
  );
};
