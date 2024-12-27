import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, ChevronLeft, Menu, Home } from "lucide-react";
import Container from "../components/Container";
import { Link } from "react-router-dom";
const sections = [
  {
    title: "Getting Started",
    items: ["Introduction", "Quick Start", "Installation"],
  },
  {
    title: "Core Concepts",
    items: ["Components", "Props", "State"],
  },
  {
    title: "Advanced Topics",
    items: ["Hooks", "Context", "Performance"],
  },
];

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sectionRefs = useRef({});

  const toggleDropdown = (title) => {
    setOpenDropdowns((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const currentSectionIndex = sections.findIndex((section) =>
    section.items.includes(activeSection)
  );
  const currentItemIndex =
    sections[currentSectionIndex]?.items.indexOf(activeSection);

  const prevSection = () => {
    if (currentItemIndex > 0) {
      scrollToSection(
        sections[currentSectionIndex].items[currentItemIndex - 1]
      );
    } else if (currentSectionIndex > 0) {
      const prevSectionItems = sections[currentSectionIndex - 1].items;
      scrollToSection(prevSectionItems[prevSectionItems.length - 1]);
    }
  };

  const nextSection = () => {
    if (currentItemIndex < sections[currentSectionIndex].items.length - 1) {
      scrollToSection(
        sections[currentSectionIndex].items[currentItemIndex + 1]
      );
    } else if (currentSectionIndex < sections.length - 1) {
      scrollToSection(sections[currentSectionIndex + 1].items[0]);
    }
  };

  return (
    <div className="bg-gray-100">
      <Container>
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar Toggle Button (Mobile) */}
          <button
            className="fixed top-20 right-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Sidebar */}
          <aside
            className={`w-64 bg-gray-200 p-6 fixed inset-y-0 left-0 transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:relative md:translate-x-0 transition duration-200 ease-in-out z-10`}
          >
            <nav>
              <Link to="/">
              <div className="mb-6 flex text-lg font-semibold bg-gray-100 hover:bg-white p-2 rounded-xl">
                <Home className="h-5 w-5 mt-1 mr-2" />
                Back To Home
              </div>
              </Link>
              {sections.map((section) => (
                <div key={section.title} className="mb-4">
                  <button
                    onClick={() => toggleDropdown(section.title)}
                    className="flex items-center justify-between w-full text-left font-semibold mb-2"
                  >
                    {section.title}
                    {openDropdowns.includes(section.title) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {openDropdowns.includes(section.title) && (
                    <ul className="ml-4">
                      {section.items.map((item) => (
                        <li key={item} className="mb-2">
                          <button
                            onClick={() => scrollToSection(item)}
                            className={`text-sm ${
                              activeSection === item
                                ? "text-green-500 font-semibold"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="bg- white flex-1 p-8 md:ml-64 lg:p-0 lg:ml-0 overflow-y-auto h-screen">
            {/* <div className="sticky z-40 top-0 bg-gray-200 mb-6 p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta aperiam ipsam magnam, saepe a corporis consequatur porro atque odit reiciendis odio architecto, iure numquam aut perferendis, eligendi quia. Eaque, perferendis.
          </div> */}
            <div className="max-w-3xl mx-auto mt-6">
              {sections.map((section) =>
                section.items.map((item) => (
                  <div
                    key={item}
                    id={item}
                    ref={(el) => (sectionRefs.current[item] = el)}
                    className="mb-12"
                  >
                    <h2 className="text-2xl font-bold mb-4">{item}</h2>
                    <p className="text-gray-600 mb-4">
                      This is the content for the {item} section. Replace this
                      with your actual documentation content.
                    </p>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                ))
              )}

              {/* Navigation Buttons */}
              <div className="absolute bottom-2 flex justify-end items-end">
                <button
                  onClick={prevSection}
                  className="flex items-center px-4 mx-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  disabled={currentSectionIndex === 0 && currentItemIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </button>
                <button
                  onClick={nextSection}
                  className="flex items-center  px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  disabled={
                    currentSectionIndex === sections.length - 1 &&
                    currentItemIndex ===
                      sections[sections.length - 1].items.length - 1
                  }
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </Container>
    </div>
  );
}
