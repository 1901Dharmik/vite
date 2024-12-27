import React, { useCallback, useEffect, useState } from 'react'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

export const PrevButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="embla__button embla__button--prev text-lg font-semibold "
      type="button"
      {...restProps}
    >
      <div className="" >
      {/* <svg className='rotate-90' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Download-Circle--Streamline-Core" height={40} width={40} ><desc>{"Download Circle Streamline Icon: https://streamlinehq.com"}</desc><g id="download-circle--arrow-circle-down-download-internet-network-server-upload"><path id="Vector" fill="#eef8f0" d="M7 13.5a6.5 6.5 0 1 0 0 -13 6.5 6.5 0 0 0 0 13Z" strokeWidth={1} /><path id="Vector_2" stroke="#206c43" strokeLinecap="round" strokeLinejoin="round" d="M7 13.5a6.5 6.5 0 1 0 0 -13 6.5 6.5 0 0 0 0 13Z" strokeWidth={1} /><path id="Vector_3" stroke="#206c43" strokeLinecap="round" strokeLinejoin="round" d="M4.5 8 7 10.5 9.5 8" strokeWidth={1} /><path id="Vector_4" stroke="#206c43" strokeLinecap="round" strokeLinejoin="round" d="M7 10.5v-7" strokeWidth={1} /></g></svg> */}
      <svg className='rotate-180 ' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Arrow-Right-Circle-1--Streamline-Plump" height={44} width={44} ><desc>{"Arrow Right Circle 1 Streamline Icon: https://streamlinehq.com"}</desc><g id="arrow-right-circle-1--arrow-keyboard-circle-button-right"><path id="Subtract" fill="#318e4c" fillRule="evenodd" d="M46.5 24c0 12.426 -10.074 22.5 -22.5 22.5S1.5 36.426 1.5 24 11.574 1.5 24 1.5 46.5 11.574 46.5 24Z" clipRule="evenodd" strokeWidth={1} /><path id="Subtract_2" fill="#eef8f0" fillRule="evenodd" d="M24.146 24.353a0.5 0.5 0 0 0 0 -0.707l-6.498 -6.498c-0.97 -0.97 -1.169 -2.487 -0.29 -3.539 0.701 -0.838 1.537 -1.673 2.392 -2.275 1.008 -0.708 2.302 -0.376 3.218 0.447 3.274 2.942 7.602 7.329 9.779 10.211 0.919 1.218 0.92 2.797 0 4.015 -2.177 2.883 -6.505 7.27 -9.779 10.211 -0.916 0.823 -2.21 1.156 -3.218 0.447 -0.855 -0.602 -1.69 -1.436 -2.392 -2.275 -0.879 -1.052 -0.68 -2.569 0.29 -3.538l6.498 -6.499Z" clipRule="evenodd" strokeWidth={1} /></g></svg>
      </div>
      {children}
    </button>
  )
}

export const NextButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="embla__button embla__button--next text-lg font-semibold "
      type="button"
      {...restProps}
    >
      <div className="" >
      {/* <svg className='rotate-90' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Upload-Circle--Streamline-Core" height={40} width={40} ><desc>{"Upload Circle Streamline Icon: https://streamlinehq.com"}</desc><g id="upload-circle--arrow-circle-download-internet-network-server-up-upload"><path id="Vector" fill="#eef8f0" d="M7 13.5a6.5 6.5 0 1 0 0 -13 6.5 6.5 0 0 0 0 13Z" strokeWidth={1} /><path id="Vector_2" stroke="#206c43" strokeLinecap="round" strokeLinejoin="round" d="M7 13.5a6.5 6.5 0 1 0 0 -13 6.5 6.5 0 0 0 0 13Z" strokeWidth={1} /><path id="Vector_3" stroke="#206c43" strokeLinecap="round" strokeLinejoin="round" d="m4 7 3 -3.5L10 7" strokeWidth={1} /><path id="Vector_4" stroke="#206c43" strokeLinecap="round" strokeLinejoin="round" d="M7 3.5v7" strokeWidth={1} /></g></svg> */}
      <svg className='' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Arrow-Right-Circle-1--Streamline-Plump" height={44} width={44} ><desc>{"Arrow Right Circle 1 Streamline Icon: https://streamlinehq.com"}</desc><g id="arrow-right-circle-1--arrow-keyboard-circle-button-right"><path id="Subtract" fill="#318e4c" fillRule="evenodd" d="M46.5 24c0 12.426 -10.074 22.5 -22.5 22.5S1.5 36.426 1.5 24 11.574 1.5 24 1.5 46.5 11.574 46.5 24Z" clipRule="evenodd" strokeWidth={1} /><path id="Subtract_2" fill="#eef8f0" fillRule="evenodd" d="M24.146 24.353a0.5 0.5 0 0 0 0 -0.707l-6.498 -6.498c-0.97 -0.97 -1.169 -2.487 -0.29 -3.539 0.701 -0.838 1.537 -1.673 2.392 -2.275 1.008 -0.708 2.302 -0.376 3.218 0.447 3.274 2.942 7.602 7.329 9.779 10.211 0.919 1.218 0.92 2.797 0 4.015 -2.177 2.883 -6.505 7.27 -9.779 10.211 -0.916 0.823 -2.21 1.156 -3.218 0.447 -0.855 -0.602 -1.69 -1.436 -2.392 -2.275 -0.879 -1.052 -0.68 -2.569 0.29 -3.538l6.498 -6.499Z" clipRule="evenodd" strokeWidth={1} /></g></svg>
      </div>
      {children}
    </button>
  )
}
