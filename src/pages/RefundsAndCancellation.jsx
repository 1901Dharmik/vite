import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";

const RefundsAndCancellation = () => {
  return (
    <div>
      <>
        <Meta title={"Refund & Cancellation policy"} />
        <BreadCrumb title="Refund & Cancellation policy" />
        <div className="">
          <Container>
            <section class="py-4 bg-white pb-8 mx-3">
              <div class="">
                {/* <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2> */}

                <div class="flow-root mt-12 sm:mt-16">
                  <div class="divide-y divide-gray--200 -my-9">
                    <div class="py-9">
                      <p class="text-xl font-semibold text-black">
                        Refund & Cancellation Policy
                      </p>
                      <p class="mt-3 text-base text-gray-600">
                        Our priority is complete customer satisfaction. If you
                        are not happy with any of our products or services
                        already provided, we will refund you money subject to
                        genuine reasons given, true and proved through
                        investigation. Please read the fine prints carefully, it
                        provides all the details about the product or services
                        you purchase. In case you are not happy with our product
                        or services in the process, customers have the freedom
                        to cancel their product and request a refund from us.
                      </p>
                    </div>

                    <div class="py-9">
                      <p class="text-xl font-semibold text-black">
                        Shipping & Membership Policy
                      </p>
                      <p class="mt-3 text-base text-gray-600">
                        1. When you place an order, the order will contain all
                        the details of membership, shipping and services. We
                        will call you for confirmation after you place your
                        order through websites, Facebook, Instagram or any other
                        medium.
                      </p>
                      <p class="mt-3 text-base text-gray-600">
                        2. We will ship your product within two business days of
                        placing the order and deliver your product in 3 to 10
                        business days. The timing will depend on the area and
                        state you are ordering from.
                      </p>
                      <p class="mt-3 text-base text-gray-600">
                        3. You can track your order anytime on our website.
                      </p>
                    </div>

                    <div class="py-9">
                      <p class="text-xl font-semibold text-black">
                        Cancellation Policy
                      </p>
                      <p class="mt-3 text-base text-gray-600">
                        For Cancellations please contact us via the “contact us”
                        (https://sajivanayurveda.in) link. You can cancel your
                        order anytime within 24 hours of your purchase, and we
                        will cancel your order on the basis of genuine reason
                        provided. After the product is dispatched you cannot
                        cancel your order. We will try our best to create
                        suitable design concepts for our clients. We will refund
                        using the same payment mode and on the same account you
                        used to place an order with us. The refund will be
                        credited back in your account within 7 to 10 business
                        days.
                      </p>
                    </div>

                    <div class="py-9">
                      <p class="text-xl font-semibold text-black">
                        Refund /Return/ Replace Policy
                      </p>
                      <p class="mt-3 text-base text-gray-600">
                        We can’t provide Refund, Return and Replacement for the
                        product once delivered to you, if the delivered order is
                        the same as described during placing the order. If you
                        are not happy with any of our products or services
                        already delivered, we will refund your money subject to
                        genuine reasons given, true and proved through
                        investigation.
                      </p>
                    </div>

                    <div class="py-9">
                      <p class="text-xl font-semibold text-black">Contact us</p>
                      <p class="mt-3 text-base text-gray-600">
                        If you have any questions about our Shipping,
                        Cancellation, Returns, and Refunds Policy, please
                        contact us :-{" "}
                        <a
                          href="#"
                          title=""
                          class="mt-3 text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
                        >
                          sajivanayurveda@gamil.com
                        </a>
                        <br />
                        <a
                          href="#"
                          title=""
                          class="mt-3 text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
                        >
                          +91 8160229683
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Container>
        </div>
      </>
    </div>
  );
};

export default RefundsAndCancellation;
