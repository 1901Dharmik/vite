 {/* <header className="fixed  left-0 right-0 top-[57px] bg-white z-10 shadow-sm">

                  <nav className="flex items-center justify-center mx-0 p-3 border-b overflow-x-auto">
                   

                    <button
                      onClick={() => scroll("left")}
                      className="transform block md:hidden  bg-gray-200  bg-opacity-50 hover:bg-opacity-75 rounded-full  p-1 z-10"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <div
                      ref={scrollContainerRef}
                      className="flex overflow-x-auto no-scrollbar space-x-6 mx-6 truncate"
                    >
                      <button
                        onClick={() => scrollToSection(section1Ref, "section1")}
                        className={`text-gray-600 font-medium ${
                          activeSection == "section1"
                            ? "text-green-600"
                            : "text-gray-600 hover:text-green-600"
                        }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => scrollToSection(section2Ref, "section2")}
                        className={`text-gray-600 w-full font-medium ${
                          activeSection == "section2"
                            ? "text-green-600"
                            : "text-gray-600 hover:text-green-600"
                        }`}
                      >
                        Problem To Cure
                      </button>
                      <button
                        onClick={() => scrollToSection(section3Ref, "section3")}
                        className={`text-gray-600 font-medium ${
                          activeSection == "section3"
                            ? "text-green-600"
                            : "text-gray-600 hover:text-green-600"
                        }`}
                      >
                        Who Should Use
                      </button>
                      <button
                        onClick={() => scrollToSection(section4Ref, "section4")}
                        className={`text-gray-600 font-medium ${
                          activeSection == "section4"
                            ? "text-green-600"
                            : "text-gray-600 hover:text-green-600"
                        }`}
                      >
                        Key Ingredients
                      </button>
                      <button
                        onClick={() => scrollToSection(section5Ref, "section5")}
                        className={`text-gray-600 font-medium ${
                          activeSection == "section5"
                            ? "text-green-600"
                            : "text-gray-600 hover:text-green-600"
                        }`}
                      >
                        How To Consume
                      </button>
                      <button
                        onClick={() => scrollToSection(section6Ref, "section6")}
                        className={`text-gray-600 font-medium ${
                          activeSection == "section6"
                            ? "text-green-600"
                            : "text-gray-600 hover:text-green-600"
                        }`}
                      >
                        Reviews
                      </button>
                      <button
                        onClick={() => scrollToSection(section7Ref, "section7")}
                        className={`text-gray-600 font-medium ${
                          activeSection == "section7"
                            ? "text-green-600"
                            : "text-gray-600 hover:text-green-600"
                        }`}
                      >
                        Releted Products
                      </button>
                    </div>
                   
                    <button
                      onClick={() => scroll("right")}
                      className=" transform block md:hidden  bg-gray-200 bg-opacity-50 hover:bg-opacity-75 rounded-full  p-1 z-10"
                      aria-label="Scroll right"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                  </nav>
                </header> */}
                import React from 'react'
import ProductListPage from '../components/ProductListPage'
                
                const Extra = () => {
                  return (
                    <div>
                      <ProductListPage/>
                    </div>
                  )
                }
                
                export default Extra
                