
import React from "react";
import { Link } from "react-router-dom";
import { PiChatTeardropTextLight, PiPhoneCallLight } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";
import {
  BsFacebook,
  BsInstagram,
  BsYoutube,
  BsWhatsapp,
  BsLinkedin,
  BsPhone,
} from "react-icons/bs";
import { useState } from "react";
const Footer = () => {
  return (
    <>
      {/* <div className="lastelements">
                <div><img src="https://opsg-img-cdn-gl.heytapimg.com/epb/202201/12/zQjhCZCDpasB4AB5.jpg" alt="" />
                    <div><span>Free shipping</span></div>
                </div>
                <div>
                    <img src="https://opsg-img-cdn-gl.heytapimg.com/epb/202110/22/dVpcwW2hS36AszPS.png" alt="" />
                    <div><span>Official OPPO COD</span></div>
                </div>
                <div className='relative'>
                    <img src="https://opsg-img-cdn-gl.heytapimg.com/epb/202110/22/7Xk17roJoRR5mS9i.png" alt="" />
                    <div><span>100% Secure Payments</span></div>
                </div>
                <div className='relative'>
                    <img src="https://opsg-img-cdn-gl.heytapimg.com/epb/202110/22/bRa6DB9sP9rORhgT.png" alt="" />
                    <div><span>Official Warranty Varies <br />
                        from 6-12 months</span></div>

                </div>
            </div> */}
      <div className="bg-white">
        <div class="shopify-section">
          <div class="rowd footer-top-banner theme-green-bg-color">
            <div class="w-full">
              <h3>Free Expert Phone Consultation</h3>
              <p>
                Get to know more about your health problem with easy simple
                assessment. Let’s find out.
              </p>
              <div class="inline-flex">
                <Link
                  to="tel:918490059352"
                  aria-describedby="a11y-external-message"
                >
                  <PiPhoneCallLight />
                  CALL
                </Link>
                <Link
                  to="https://wa.me/918490059352"
                  aria-describedby="a11y-external-message"
                >
                  <FaWhatsapp />
                  WHATSAPP
                </Link>
                <Link
                  to="/"
                  target="_blank"
                  aria-describedby="a11y-new-window-external-message"
                  rel="null noopener"
                >
                  <PiChatTeardropTextLight />
                  CHAT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="site-footer critical-hidden w-full">
        <div className="page-width">
          <div className="site-footer__content foo-bor-b">
            <div
              className="site-footer__item
                    
                    site-footer__item--one-quarter
                    "
            >
              <div className="site-footer__item-inner site-footer__item-inner--link_list">
                <p className="h4">Sajivan Ayurveda</p>
                <ul
                  className="site-footer__linklist
                            "
                >
                  <li className="site-footer__linklist-item">
                    <a href="/pages/about-us">About Us</a>
                  </li>
                  <li className="site-footer__linklist-item">
                    <a href="/pages/contact-us">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="site-footer__item
                    
                    site-footer__item--one-quarter
                    "
            >
              <div className="site-footer__item-inner site-footer__item-inner--link_list">
                <p className="h4">Top products</p>
                <ul
                  className="site-footer__linklist
                            "
                >
                  <li className="site-footer__linklist-item">
                    <Link to={"/product/7"}>Digestive Kit </Link>
                  </li>
                  <li className="site-footer__linklist-item">
                    <Link to={"/product/20"}>Piles Kit</Link>
                  </li>
                  <li className="site-footer__linklist-item">
                    <Link to={"/product/2"}>Icerose Powder</Link>
                  </li>
                  <li className="site-footer__linklist-item">
                    <Link to={"/product/9"}>Gesofine Powder</Link>
                  </li>
                  <li className="site-footer__linklist-item">
                    <Link to={"/product/14"}>Refresh Churna</Link>
                  </li>
                  <li className="site-footer__linklist-item">
                    <Link to={"/product/3"}>Amrutam Teblets</Link>
                  </li>
                  <li className="site-footer__linklist-item">
                    <Link to={"/product/12"}>Lexolite Teblets</Link>
                  </li>
                  <li className="site-footer__linklist-item">
                    <Link to={"/product/5"}>Constirelex Powder</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="site-footer__item
                    
                    site-footer__item--one-quarter
                    "
            >
              <div className="site-footer__item-inner site-footer__item-inner--link_list">
                <p className="h4">Helpful Links</p>
                <ul
                  className="site-footer__linklist
                            "
                >
                  <li className="site-footer__linklist-item">
                    <Link to="/terms-condition">Terms &amp; Conditions</Link>
                  </li>
                  <li className="site-footer__linklist-item">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li className="site-footer__linklist-item">
                    <Link to="/refunds-cancellation">
                      Refund &amp; Cancellation policy
                    </Link>
                  </li>
                  {/* <li className="site-footer__linklist-item">
                                    <a href="https://laserartistudios.com" aria-describedby="a11y-external-message">
                                        Packaging Partner (Laserarti Studios)
                                    </a>
                                </li> */}
                  {/* <li className="site-footer__linklist-item">
                                    <a href="/pages/bmi-calculator">
                                        BMI Calculator
                                    </a>
                                </li> */}
                  {/* <li className="site-footer__linklist-item">
                                    <a href="/pages/health-assessment">
                                        Take Health Assessment
                                    </a>
                                </li> */}
                </ul>
              </div>
            </div>
            <div className="site-footer__item site-footer__item--one-quarter">
              <div className="site-footer__item-inner site-footer__item-inner--text">
                <p className="h4">Contact Us</p>
                <div className="site-footer__rte">
                  <p>
                    Our Expert Believe That Every Human soul Can Be Purified By
                    The Help Of Ayurveda.
                  </p>
                  <p>Email: sajivanayurveda@gmail.com</p>
                  <p>Phone: +91-8160229683</p>
                  <p>
                    Address: 702/703, Elight Meghnum, Near:- Solaris Business
                    Hub, Opp:- Ustav Elegance, Bhuyangdev Cross Road,
                    Ghatlodiya, Ahmedabad, Gujarat- 390061
                  </p>
                  <p></p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div class="sec-footer">
          <div class="social-holder">
            <div class="downloadApp">
              <div class="download-text">Download App</div>
              <a href="#">
                <div class="appIconHolder">
                  <div class="icon-image">
                    {" "}
                    <BsPhone />
                  </div>
                </div>
              </a>
              <a href="#">
                <div class="appIconHolder">
                  <div class="icon-image">
                    {" "}
                    <BsWhatsapp />
                  </div>
                </div>
              </a>
            </div>
            <div class="social-icon-holder">
              <a href="#">
                <div class="appIconHolder">
                  <div class="icon-image">
                    {" "}
                    <BsFacebook />
                  </div>
                </div>
              </a>
              <a href="#">
                <div class="appIconHolder">
                  <div class="icon-image">
                    {" "}
                    <BsInstagram />
                  </div>
                </div>
              </a>
              <a href="#">
                <div class="appIconHolder">
                  <div class="icon-image">
                    <BsYoutube />
                  </div>
                </div>
              </a>
              <a href="#">
                <div class="appIconHolder">
                  <div class="icon-image">
                    <BsLinkedin />
                  </div>
                </div>
              </a>
              <a href="#">
                <div class="appIconHolder">
                  <div class="icon-image">
                    {" "}
                    <BsWhatsapp />
                  </div>
                </div>
              </a>
            </div>
            <div class="copy-right-text">
              © 2021 Online Gadget Store | All rights reserved
            </div>
          </div>
        </div> */}
        {/* <div class="text-sm mb-8 text-gray-500 sm:text-center dark:text-gray-400">© 2021-2022 <a href="#" class="hover:underline">Flowbite™</a>. All Rights Reserved.</div> */}
        {/*  */}

        <div class="sec-footer ">
          <div class="social-holder">
            <div class="downloadApp">
              <div class="download-text">Payment With</div>
              <a href="#">
                <div class="appIconHolder">
                  <div class="icon-image">
                    {" "}
                    <img src="/images/upi.jpg" alt="" />
                  </div>
                </div>
              </a>
              <a href="#">
                <div class="appIconHolder">
                  <div class="icon-image">
                    {" "}
                    <img src="/images/card pay.jpg" alt="" />
                  </div>
                </div>
              </a>
              <a href="#">
                <div class="appIconHolder">
                  <div class="icon-image">
                    {" "}
                    <img src="/images/wallet.jpg" alt="" />
                  </div>
                </div>
              </a>
              <a href="#">
                <div class="appIconHolder">
                  <div class="icon-image">
                    {" "}
                    <img src="/images/net banking.jpg" alt="" />
                  </div>
                </div>
              </a>
            </div>
            <div class="social-icon-holder ">
              <a href="#">
                <div class="appIconHolder">
                  <div class="icon-image">
                    {" "}
                    <BsFacebook className="text-3xl bg-gray-200 p-1 rounded-md shadow-sm" />
                  </div>
                </div>
              </a>
              <a href="#">
                <div class="appIconHolder">
                  <div class="icon-image">
                    {" "}
                    <BsInstagram className="text-3xl bg-gray-200 p-1 rounded-md shadow-sm" />
                  </div>
                </div>
              </a>
              {/* <a href="#">
                <div class="appIconHolder">
                  <div class="icon-image">
                    <BsYoutube className="text-3xl bg-gray-200 p-1 rounded-full shadow-sm"/>
                  </div>
                </div>
              </a> */}
              <a href="#">
                <div class="appIconHolder">
                  <div class="icon-image">
                    <BsLinkedin className="text-3xl bg-gray-200 p-1 rounded-md shadow-sm" />
                  </div>
                </div>
              </a>
              <Link to="https://wa.me/918160229683">
                <div class="appIconHolder">
                  <div class="icon-image">
                    {" "}
                    <BsWhatsapp className="text-3xl bg-gray-200 p-1 rounded-md shadow-sm" />
                  </div>
                </div>
              </Link>
            </div>
            <div class="copy-right-text">
            © {new Date().getFullYear()} Sajivan Ayurveda | All rights reserved
              {/* © 2024 Medisy Store | All rights reserved */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
