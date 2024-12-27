import { React, useState } from "react";
const Knowdetail = (propsk) => {
  const [toggle, settoggle] = useState(1);

  function updateToggle(id) {
    settoggle(id);
  }

  return (
    <div >
      <div>
        <div class="bg-white">
          <div class="flex py-8">
            <div class="col-md-6 content m-auto pad-right-10per w-1/2">
              <h3 class="text-3xl font-semibold ">{propsk.tittle}</h3>
              <hr class="rounded-[15px] w-[5%] h-1.5 inline-flex bg-gray-700 ml-1" />

              <p class="text-[20px]  mr-4 my-4 guj">
                {propsk.text}
              </p>
            </div>
            <div class="col-md-6 w-1/2">
              <img src={propsk.src} />
            </div>
          </div>
        </div>
        <div className="container section-margin-top-30 bg-white">
          <div className="what-is-new-section">
            <div className="container ">
              <div className="col-md-12 section-margin-top-40 heading-part ">
                <h2 className="guj">{propsk.name}</h2>
                <hr className="weight-loss-kit-bg-color" />
                <p>{propsk.head}</p>
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <section class="py-10 bg-white sm:py-16 lg:py-6">
          <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
              <div>
                <div class="relative flex items-center justify-center mx-auto">
                  <svg
                    class="text-blue-100"
                    width="72"
                    height="75"
                    viewBox="0 0 72 75"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M63.6911 28.8569C68.0911 48.8121 74.6037 61.2674 53.2349 65.9792C31.8661 70.6909 11.6224 61.2632 7.22232 41.308C2.82229 21.3528 3.6607 12.3967 25.0295 7.68503C46.3982 2.97331 59.2911 8.90171 63.6911 28.8569Z" />
                  </svg>
                  <svg
                    class="absolute text-blue-600 w-9 h-9"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </div>
                <h3 class="mt-8 text-[20px] font-semibold text-black guj">
                  {propsk.h1}
                </h3>
                <p class="mt-4 text-base text-gray-600">{propsk.p1}</p>
              </div>

              <div>
                <div class="relative flex items-center justify-center mx-auto">
                  <svg
                    class="text-orange-100"
                    width="62"
                    height="64"
                    viewBox="0 0 62 64"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M62 13.001C62 33.4355 53.9345 64.001 33.5 64.001C13.0655 64.001 0 50.435 0 30.0005C0 9.56596 2.56546 4.00021 23 4.00021C43.4345 4.00021 62 -7.43358 62 13.001Z" />
                  </svg>
                  <svg
                    class="absolute text-orange-600 w-9 h-9"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 class="mt-8 text-[20px] font-semibold text-black guj">
                  {propsk.h2}
                </h3>
                <p class="mt-4 text-base text-gray-600">{propsk.p2}</p>
              </div>

              <div>
                <div class="relative flex items-center justify-center mx-auto">
                  <svg
                    class="text-green-100"
                    width="66"
                    height="68"
                    viewBox="0 0 66 68"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z" />
                  </svg>
                  <svg
                    class="absolute text-green-600 w-9 h-9"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </div>
                <h3 class="mt-8 text-[20px] font-semibold text-black guj">
                  {propsk.h3}
                </h3>
                <p class="mt-4 text-base text-gray-600">{propsk.p3}</p>
              </div>

              <div>
                <div class="relative flex items-center justify-center mx-auto">
                  <svg
                    class="text-purple-100"
                    width="66"
                    height="68"
                    viewBox="0 0 66 68"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z" />
                  </svg>
                  <svg
                    class="absolute text-purple-600 w-9 h-9"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </div>
                <h3 class="mt-8 text-[20px] font-semibold text-black guj">
                  {propsk.h4}
                </h3>
                <p class="mt-4 text-base text-gray-600">{propsk.p4}</p>
              </div>

              <div>
                <div class="relative flex items-center justify-center mx-auto">
                  <svg
                    class="text-gray-100"
                    width="65"
                    height="70"
                    viewBox="0 0 65 70"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M64.5 26C64.5 46.4345 56.4345 70 36 70C15.5655 70 0 53.9345 0 33.5C0 13.0655 13.0655 0 33.5 0C53.9345 0 64.5 5.56546 64.5 26Z" />
                  </svg>
                  <svg
                    class="absolute text-gray-600 w-9 h-9"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 class="mt-8 text-[20px] font-semibold text-black guj">
                  {propsk.h5}
                </h3>
                <p class="mt-4 text-base text-gray-600">{propsk.p5}</p>
              </div>

              <div>
                <div class="relative flex items-center justify-center mx-auto">
                  <svg
                    class="text-yellow-100"
                    width="78"
                    height="78"
                    viewBox="0 0 78 78"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.49996 28.0002C4.09993 47.9554 14.1313 66.7885 35.5 71.5002C56.8688 76.2119 68.0999 58.4553 72.5 38.5001C76.9 18.5449 68.3688 12.711 47 7.99931C25.6312 3.28759 12.9 8.04499 8.49996 28.0002Z" />
                  </svg>
                  <svg
                    class="absolute text-yellow-500 w-9 h-9"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </div>
                <h3 class="mt-8 text-[20px] font-semibold text-black guj">
                  {propsk.h6}
                </h3>
                <p class="mt-4 text-base text-gray-600">{propsk.p6}</p>
              </div>
            </div>
          </div>
        </section>
        {/* tittle */}
        <div className="">
          <div className="container section-margin-top-30 bg-white">
            <div className="what-is-new-section">
              <div className="container">
                <div className="col-md-12 section-margin-top-40 heading-part">
                  <h2>{propsk.name2}</h2>
                  <hr className="weight-loss-kit-bg-color" />
                  <p>{propsk.head2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tab-section mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul
            className="nav-tabs justify-center flex flex-wrap -mb-px text-sm font-medium text-center"
            id="myTab"
            data-tabs-toggle="#myTabContent"
            role="tablist"
          >
            <li className="mr-2 nav-li" role="presentation">
              <button
                onClick={() => updateToggle(1)}
                className={`inline-block p-3 mx-1 mb-4 tab-btn rounded-xl nav-link ${
                  toggle === 1
                    ? "bg-primary-100 text-green-800 text-md font-medium  "
                    : "bg-white text-gray-700 text-md font-medium"
                }`}
                id="profile-tab"
                data-tabs-target="#Home-Remedies"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected={toggle === 1}
              >
                Home-Remedies
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                onClick={() => updateToggle(2)}
                className={`inline-block p-3 mx-1 mb-4 tab-btn rounded-xl nav-link ${
                  toggle === 2
                    ? "bg-primary-100 text-green-800 text-md font-medium  "
                    : "bg-white text-gray-700 text-md font-medium"
                }`}
                id="dashboard-tab"
                data-tabs-target="#Dashboard"
                type="button"
                role="tab"
                aria-controls="dashboard"
                aria-selected={toggle === 2}
              >
                Exercise
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                onClick={() => updateToggle(3)}
                className={`inline-block p-3 mx-1 mb-4 tab-btn rounded-xl nav-link ${
                  toggle === 3
                    ? "bg-primary-100 text-green-800 text-md font-medium  "
                    : "bg-white text-gray-700 text-md font-medium"
                }`}
                id="settings-tab"
                data-tabs-target="#Awareness"
                type="button"
                role="tab"
                aria-controls="Awareness"
                aria-selected={toggle === 3}
              >
                Awareness
              </button>
            </li>
          </ul>
        </div>

        <div id="myTabContent" className="contant-section">
          <div
            className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
              toggle === 1 ? "show-contatent" : "hidden"
            }`}
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="grid gap-6 lg:grid-cols-3 grid-rows-2 md:grid-cols-2 mx-5 sm:grid-cols-1">
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={propsk.kimg1}
                  alt="SAJIVAN AYURVEDA"
                />
              </div>
              {/* Other images */}
            </div>
          </div>
          <div
            className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
              toggle === 2 ? "show-contatent" : "hidden"
            }`}
            id="dashboard"
            role="tabpanel"
            aria-labelledby="dashboard-tab"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content for the{" "}
              <strong className="font-medium text-gray-800 dark:text-white">
                Exercise tab's content
              </strong>
              .
            </p>
          </div>
          <div
            className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
              toggle === 3 ? "show-contatent" : "hidden"
            }`}
            id="settings"
            role="tabpanel"
            aria-labelledby="settings-tab"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content for the{" "}
              <strong className="font-medium text-gray-800 dark:text-white">
                Awareness tab's content
              </strong>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Knowdetail;
