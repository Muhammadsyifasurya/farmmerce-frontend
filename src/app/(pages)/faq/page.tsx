"use client";
import React, { useState } from "react";
import Link from "next/link";

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section className="mx-auto mt-[70px] min-h-screen max-w-5xl px-4 py-10 md:px-8">
      {/* Title Section */}
      <h2 className="text-center text-4xl font-extrabold text-green-700">
        Frequently Asked Questions
      </h2>
      <p className="mt-4 text-center text-lg text-gray-700">
        Got questions? We&apos;ve got answers. Here are some of the most common
        queries about Farmmerce.
      </p>

      {/* FAQ Accordion */}
      <div className="mt-10 space-y-6">
        <div>
          <button
            onClick={() => toggleAnswer(0)}
            className="w-full transform rounded-lg bg-gray-100 px-6 py-4 text-left shadow-md transition-all duration-300 ease-in-out hover:bg-gray-200 focus:outline-none"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              How does Farmmerce work?
            </h3>
          </button>
          <div
            className={`${
              open === 0 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            } transform overflow-hidden transition-all duration-500 ease-in-out`}
          >
            {open === 0 && (
              <div className="rounded-lg bg-gray-50 px-6 py-4 shadow-sm">
                <p className="text-gray-600">
                  Farmmerce connects consumers directly with local farmers,
                  allowing you to purchase fresh, organic products straight from
                  trusted sources. Our platform leverages technology to ensure
                  seamless transactions and farm-to-door delivery.
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <button
            onClick={() => toggleAnswer(1)}
            className="w-full transform rounded-lg bg-gray-100 px-6 py-4 text-left shadow-md transition-all duration-300 ease-in-out hover:bg-gray-200 focus:outline-none"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              What products are available on Farmmerce?
            </h3>
          </button>
          <div
            className={`${
              open === 1 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            } transform overflow-hidden transition-all duration-500 ease-in-out`}
          >
            {open === 1 && (
              <div className="rounded-lg bg-gray-50 px-6 py-4 shadow-sm">
                <p className="text-gray-600">
                  We offer a wide variety of fresh produce, including fruits,
                  vegetables, dairy, grains, and more. All products are sourced
                  directly from local farmers and are guaranteed to be fresh and
                  organic.
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <button
            onClick={() => toggleAnswer(2)}
            className="w-full transform rounded-lg bg-gray-100 px-6 py-4 text-left shadow-md transition-all duration-300 ease-in-out hover:bg-gray-200 focus:outline-none"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              How do I place an order on Farmmerce?
            </h3>
          </button>
          <div
            className={`${
              open === 2 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            } transform overflow-hidden transition-all duration-500 ease-in-out`}
          >
            {open === 2 && (
              <div className="rounded-lg bg-gray-50 px-6 py-4 shadow-sm">
                <p className="text-gray-600">
                  Simply browse our marketplace, select the products you want to
                  purchase, and proceed to checkout. We accept various payment
                  methods to make your experience convenient and secure.
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <button
            onClick={() => toggleAnswer(3)}
            className="w-full transform rounded-lg bg-gray-100 px-6 py-4 text-left shadow-md transition-all duration-300 ease-in-out hover:bg-gray-200 focus:outline-none"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              Can I track my order?
            </h3>
          </button>
          <div
            className={`${
              open === 3 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            } transform overflow-hidden transition-all duration-500 ease-in-out`}
          >
            {open === 3 && (
              <div className="rounded-lg bg-gray-50 px-6 py-4 shadow-sm">
                <p className="text-gray-600">
                  Yes! Once your order is shipped, you&apos;ll receive a
                  tracking number via email, allowing you to track your order in
                  real-time.
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <button
            onClick={() => toggleAnswer(4)}
            className="w-full transform rounded-lg bg-gray-100 px-6 py-4 text-left shadow-md transition-all duration-300 ease-in-out hover:bg-gray-200 focus:outline-none"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              How do I become a seller on Farmmerce?
            </h3>
          </button>
          <div
            className={`${
              open === 4 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            } transform overflow-hidden transition-all duration-500 ease-in-out`}
          >
            {open === 4 && (
              <div className="rounded-lg bg-gray-50 px-6 py-4 shadow-sm">
                <p className="text-gray-600">
                  To become a seller on Farmmerce, you need to register as a
                  farmer or local producer, provide relevant information, and go
                  through our verification process. Once approved, you&apos;ll
                  be able to list your products on our platform.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact for Further Queries */}
      <div className="mt-10 text-center">
        <p className="text-lg text-gray-600">
          Can&apos;t find the answer you&apos;re looking for? Feel free to{" "}
          <Link href="/contact" className="font-semibold text-green-700">
            contact us
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default FAQ;
