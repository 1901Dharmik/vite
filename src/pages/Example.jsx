import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";

const Example = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [query, setQuery] = useState("");
  const dialogRef = useRef(null);
  const dispatch = useDispatch();
  const routes = useSelector((state) => state?.product?.product);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      setFilteredRoutes(routes);
    }
  }, [isOpen, routes]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    const filtered = routes.filter((route) =>
      route.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRoutes(filtered);
  };

  const handleRouteClick = (_id) => {
    setQuery("");
    setFilteredRoutes([]);
    setIsOpen(false);
    navigate(`/product/${_id}`);
  };

  const handleClickOutside = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <div className="w-full flex-1">
        <div onClick={() => setIsOpen(true)}>
          <div className="relative">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
          </div>
        </div>
      </div>

      {/* modal */}
      <div>
        <Transition show={isOpen} as={React.Fragment}>
          <Dialog
            className="fixed inset-0 pt-[20vh] p-4 overflow-y-auto"
            open={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <div ref={dialogRef}>
              <TransitionChild
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0 "
                enterTo="opacity-100 "
                leave="ease-in "
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="fixed inset-0 bg-muted/40 backdrop-blur-sm" />
              </TransitionChild>
              <TransitionChild
                as="div"
                enter="transition ease-in-out "
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in-out "
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Combobox
                  as="div"
                  className="relative rounded-2xl shadow-2xl ring-1 ring-black/5 max-w-md mx-auto bg-white divide-y divide-gray-100 overflow-hidden"
                  value={filteredRoutes}
                  onClose={() => setQuery("")}
                  onChange={(route) => handleRouteClick(route._id)}
                >
                  <div className="flex items-center px-4">
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
                    <ComboboxInput
                      aria-label="Assignee"
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-0 focus:ring-0 text-lg text-gray-800 placeholder:text-gray-400 h-12"
                      placeholder="Search for products..."
                    />
                    <button
                      className="ml-2 dark:text-black"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>

                  {filteredRoutes.length > 0 && (
                    <ComboboxOptions className="py-4 text-lg max-h-84 overflow-auto">
                      {filteredRoutes.map((route) => (
                        <ComboboxOption
                          className="px-4 cursor-pointer"
                          key={route._id}
                          value={route}
                        >
                          <div
                            className="space-x-1  px-2 py-2 bg-white hover:bg-gray-100 rounded-2xl hover:border-2"
                            onClick={() => handleRouteClick(route._id)}
                          >
                            <div className="flex">
                              <img
                                src={route?.images[0]?.url}
                                className="h-12 w-12 rounded-lg"
                                alt=""
                              />
                              <span className="text-md font-md text-gray-900 mx-2">
                                {route.title}
                              </span>
                            </div>
                          </div>
                        </ComboboxOption>
                      ))}
                    </ComboboxOptions>
                  )}
                  {query && filteredRoutes.length === 0 && (
                    <p className="p-4 flex justify-center">No Results Found</p>
                  )}
                </Combobox>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default Example;
