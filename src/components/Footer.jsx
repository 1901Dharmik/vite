import { Phone, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="bg-primary-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-2">
            Free Expert Phone Consultation
          </h2>
          <p className="text-center mb-6">
            Get to know more about your health problem with easy simple
            assessment. Let's find out.
          </p>
          <div className="flex justify-center space-x-4 overflow-x-auto no-scrollbar">
            <button className="flex items-center border border-dashed px-6 py-2 rounded hover:bg-primary-700 transition duration-300">
              <Phone className="mr-2" size={20} />
              CALL
            </button>
            <button className="flex items-center border border-dashed px-6 py-2 rounded hover:bg-primary-700 transition duration-300">
              <svg
                className="mr-2"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WHATSAPP
            </button>
            <button className="flex items-center border border-dashed px-6 py-2 rounded hover:bg-primary-700 transition duration-300">
              <MessageSquare className="mr-2" size={20} />
              CHAT
            </button>
          
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Sajivan Ayurveda</h3>
              <ul className="space-y-4">
                <li>
                  <a href="/pages/about-us" className="hover:text-primary-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/pages/contact-us"
                    className="hover:text-primary-600"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-8">Products</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="hover:text-primary-600">
                    Digestive Kit 1
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600">
                    Digestive Kit 2
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600">
                    Piles Kit
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600">
                    Icerose Powder
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600">
                    Gesofine Powder
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600">
                    Refresh Churna
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600">
                    Amrutam Teblets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600">
                    Lexolite Teblets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600">
                    Constirelex Powder
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Helpful Links</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="hover:text-primary-600">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600">
                    Refund & Cancellation policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="mb-4">
                Our Experts believe that every human soul can be purified by the
                help of Ayurveda.
              </p>
              <p className="mb-2">Email: sajivanayurveda@gmail.com</p>
              <p className="mb-2">Phone: +91-8160229683</p>
              <p>
                Address: 702/703, Elight Meghnum, Near:- Solaris Business Hub,
                Opp:- Ustav Elegance, Bhuyangdev Cross Road, Ghatlodiya,
                Ahmedabad, Gujarat- 390061
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Sajivan Ayurveda | All rights reserved
        </div>
      </div>
    </footer>
  );
}
