import React, { useState } from "react";
import Knowdetail from "./Knowdetail";

const Knowledge = () => {
  const [toggle, settoggle] = useState(1);

  function updateToggle(id) {
    settoggle(id);
  }
  // const [selectedItem, setSelectedItem] = useState("item1");
  // const handleChange = (event) => {
  //   setSelectedItem(event.target.value);
  // };
  // const [currentSection, setCurrentSection] = useState(1);
  // const handleClick = (section) => {
  //   setCurrentSection(section);
  // };
  const [selectedItem, setSelectedItem] = useState("item1");
  const [currentSection, setCurrentSection] = useState(1); // Default section for item1

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedItem(selectedValue);

    // Set default section based on the selected item
    if (selectedValue === "item1") {
      setCurrentSection(1); // Default section for item1
    } else if (selectedValue === "item2") {
      setCurrentSection(4); // Default section for item2
    }
  };

  const handleClick = (section) => {
    setCurrentSection(section);
  };

  return (
    <div>
      <div className=" bg-[#f8f8f8]"  >
        <div class="knowledge-banner">
          {selectedItem === "" && (
            <div>
              <img
                src="https://cdn.shopify.com/s/files/1/0575/8920/3125/files/Knowledge_Center_banner_3.jpg?v=1645100614"
                alt="Selected Image"
              />
            </div>
          )}
          {selectedItem === "item1" && (
            <div>
              <img
                src="https://cdn.shopify.com/s/files/1/0575/8920/3125/files/Knowledge_Center_banner_3.jpg?v=1645100614"
                alt="Selected Image"
              />
            </div>
          )}
          {selectedItem === "item2" && (
            <div>
              <img
                src="https://cdn.shopify.com/s/files/1/0575/8920/3125/files/Knowledge_Center_banner_a4b79260-4d3e-4896-a8c6-d656844a2f6f.jpg?v=1645009992"
                alt="Selected Image"
              />
            </div>
          )}
        </div>

        <div className="w-full px-4">
          <div className="flex align-middle items-center">
            <div className="w-[22%] relative p-5">
              <select
                value={selectedItem}
                onChange={handleChange}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-xl focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-600"
              >
                <option className="text-lg" value="item1">Digestive Care</option>
                <option className="text-lg" value="item2">Piles Care</option>
              </select>
            </div>

            <div className="p-5 w-[78%] hispan">
              {selectedItem === "item1" && (
                <div>
                  <div id="Digestive_Care">
                    <span
                      onClick={() => handleClick(1)}
                      className={`digestive-kit ${
                        currentSection === 1 ? "active text-green-600" : ""
                      }`}
                    >
                      <a href="#Stomach_Gas">Stomach Gas</a>
                    </span>
                    <span
                      onClick={() => handleClick(2)}
                      className={`digestive-kit ${
                        currentSection === 2 ? "active text-green-600" : ""
                      }`}
                    >
                      <a href="#Acidity">Acidity</a>
                    </span>
                    <span
                      onClick={() => handleClick(3)}
                      className={`digestive-kit ${
                        currentSection === 3 ? "active text-green-600" : ""
                      }`}
                    >
                      <a href="#Constipation">Constipation</a>
                    </span>
                  </div>
                </div>
              )}

              {selectedItem === "item2" && (
                <div>
                  <div id="Piles_care">
                    <span
                      onClick={() => handleClick(4)}
                      className={`digestive-kit ${
                        currentSection === 4 ? "active text-green-600" : ""
                      }`}
                    >
                      <a href="#Piles">Piles</a>
                    </span>
                    <span
                      onClick={() => handleClick(5)}
                      className={`digestive-kit ${
                        currentSection === 5 ? "active text-green-600" : ""
                      }`}
                    >
                      <a href="#Fissure">Fissure</a>
                    </span>
                    <span
                      onClick={() => handleClick(6)}
                      className={`digestive-kit ${
                        currentSection === 6 ? "active text-green-600" : ""
                      }`}
                    >
                      <a href="#Fistula">Fistula</a>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentSection === 2 && (
        <Knowdetail
          tittle="Acidity"
          text="The stomach secretes acid which is used to digest food. Spicy food or a weak LES(muscles that prevent stomach contents from travelling back) can trigger excess production of acid causing pain and a burning sensation which is called acidity."
          src="https://cdn.shopify.com/s/files/1/0575/8920/3125/files/KC_-Acidity.jpg?v=1645099952"
          h1="Carbonated Drinks"
          h2="Stomach Ulcer"
          h3="Eating Habits"
          h4="Food Intolerance"
          h5="Frequent Constipation"
          h6="Bacteria Overgrowth"
          p1="Drinks like soda, beer contributes to more swallowed air in the tummy that causes gas."
          p2="It can cause a feeling of bloating, heaviness and pain in the morning or after meals."
          p3="Not chewing the food properly increase the efforts of the digestive system that causes gas."
          p4="The inability to break certain food particles in the digestive system causes gas."
          p5="Constipation obstructs the discharge of intestinal matter that leads to stomach gas."
          p6="Due to surgeries or medical issues, excess bacterial growth can occur in the small intestine."
          name="Causes Of Acidity"
          head="The problem of acidity occurs due to"
          name2="Do You Know"
          head2="Find home remedies, exercise, yoga and more to treat your problems here"
          kimg1="./images/kimg/9.png"
          kimg2="./images/kimg/10.png"
          kimg3="./images/kimg/11.png"
          kimg4="./images/kimg/12.png"
          kimg5="./images/kimg/13.png"
          kimg6="./images/kimg/14.png"
        />
      )}

      {currentSection === 1 && (
        <div>
          <Knowdetail
            tittle="પેટ નો ગેસ"
            text="પેટ નો ગેસ, પાચન તંત્રની એ સ્થિતિ ને કહે છે, જે ખાતી કે પીતી વખતે ગળી ગયેલી હવા અને આપણા આંતરડામાં પચાયેલ ખોરાક ગેસ ઉત્પન્ન કરે છે. આ ગેસ ગુદામાર્ગ અથવા મોં દ્વારા બહાર નીકળે છે, પરંતુ વધુ પડતો ગેસ જે પાચનતંત્રમાં ફસાઈ જાય છે તે અસ્વસ્થતાનું કારણ બને છે તેને પેટનો ગેસ કહેવાય છે."
            src="https://cdn.shopify.com/s/files/1/0575/8920/3125/files/Knowledge_-_Video_thumbnail_f9cc127b-2d43-4791-842c-fdd1d6e41938.jpg?v=1645103426"
            h1="મસાલેદાર ખોરાક"
            h2="ડેરી ઉત્પાદનો"
            h3="નિયંતર કબજિયાત"
            h4="હળવા પીણા"
            h5="ફાયબર યુક્ત ખોરાક"
            h6="બેક્ટેરિયાનો વિકાસ"
            p1="Drinks like soda, beer contributes to more swallowed air in the tummy that causes gas."
            p2="It can cause a feeling of bloating, heaviness and pain in the morning or after meals."
            p3="Not chewing the food properly increase the efforts of the digestive system that causes gas."
            p4="The inability to break certain food particles in the digestive system causes gas."
            p5="Constipation obstructs the discharge of intestinal matter that leads to stomach gas."
            p6="Due to surgeries or medical issues, excess bacterial growth can occur in the small intestine."
            name="ગેસ થવાના મુખ્ય કારણો"
            head="The problem of Stomach Gas occurs due to"
            name2="Do You Know"
            head2="Find home remedies, exercise, yoga and more to treat your problems here"
            kimg1="./images/kimg/9.png"
            kimg2="./images/kimg/10.png"
            kimg3="./images/kimg/11.png"
            kimg4="./images/kimg/12.png"
            kimg5="./images/kimg/13.png"
            kimg6="./images/kimg/14.png"
          />
          {/* <section class="relative py-10 overflow-hidden bg-black sm:py-16 lg:py-24 xl:py-32">
            <div class="absolute inset-0">
              <img class="object-cover w-full h-full md:object-left md:scale-150 md:origin-top-left" src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/5/girl-working-on-laptop.jpg" alt="" />
            </div>

            <div class="absolute inset-0 hidden bg-gradient-to-r md:block from-black to-transparent"></div>

            <div class="absolute inset-0 block bg-black/60 md:hidden"></div>

            <div class="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <div class="text-center md:w-2/3 lg:w-1/2 xl:w-1/3 md:text-left">
                <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Stomach Gas</h2>

                <p class="mt-4 text-base text-gray-200">Swallowed air while eating or drinking and undigested food in our intestine produces gas. This gas is released through the rectum or mouth, but excessive gas that can be trapped in the digestive tract causes discomfort is called stomach gas.</p>

                <form action="#" method="POST" class="mt-8 lg:mt-12">
                  <div class="flex flex-col items-center sm:flex-row sm:justify-center">
                    <div class="flex-1 w-full min-w-0 px-4 sm:px-0">

                    </div>


                  </div>
                </form>
              </div>
            </div>
          </section> */}
          <div />
        </div>
      )}
      {/* section 1 end hear */}

      {currentSection === 3 && <div></div>}
      {currentSection === 4 && (
        <div>
          <h2>Section 4</h2>
          <p>This is the content of section 4.</p>
        </div>
      )}

      {currentSection === 5 && (
        <div>
          <h2>Section 5</h2>
          <p>This is the content of section 5.</p>
        </div>
      )}

      {currentSection === 6 && (
        <div>
          <h2>Section 6</h2>
          <p>This is the content of section 6.</p>
        </div>
      )}
    </div>
  );
};

export default Knowledge;
