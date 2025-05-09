import Image from "next/image";
import React from "react";

const AboutUs: React.FC = () => {
  return (
    <section className="relative mx-auto mt-[70px] max-w-5xl px-4 py-10 md:px-8">
      <div>
        <Image
          src="/about2.jpg"
          alt="Connecting Agriculture and Technology"
          width={1200}
          height={800}
          className="h-72 w-full rounded-xl object-cover shadow-sm"
        />

        <h2 className="mt-8 text-4xl font-extrabold text-green-700">
          Welcome to Farmmerce
        </h2>
        <p className="text-jus mt-4 text-lg leading-relaxed tracking-wide text-balance text-gray-700">
          Farmmerce is a digital movement born from the soil of rural
          communities and shaped by innovation. We are building a future where
          local farmers no longer stand behind — but lead — the next revolution
          in food sustainability. By blending modern technology with the
          richness of local agriculture, we offer more than just products — we
          deliver purpose.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-gray-800">
          🌱 Our Mission
        </h2>
        <p className="mt-4 leading-relaxed tracking-wide text-gray-600">
          To revolutionize the agricultural supply chain by empowering rural
          farmers with digital access, fair market value, and national reach.
          Farmmerce exists to bridge tradition and innovation — ensuring every
          harvest tells a story of impact, transparency, and opportunity.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-gray-800">
          🚀 Why Choose Farmmerce?
        </h2>
        <ul className="mt-4 list-inside list-disc space-y-2 leading-relaxed tracking-wide text-gray-600">
          <li>
            Curated, organic products directly from empowered local farmers
          </li>
          <li>
            Digitally enhanced platform with a seamless, secure experience
          </li>
          <li>
            Rooted in social impact — every purchase supports rural growth
          </li>
          <li>Driven by sustainability, tech innovation, and transparency</li>
        </ul>

        <div className="mt-12 grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
          <div>
            <h3 className="text-3xl font-bold text-green-700">1.2K+</h3>
            <p className="text-sm text-gray-600">Produk Terjual</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-green-700">300+</h3>
            <p className="text-sm text-gray-600">Petani Terlibat</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-green-700">98%</h3>
            <p className="text-sm text-gray-600">Customer Satisfaction</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-green-700">12</h3>
            <p className="text-sm text-gray-600">Provinsi Terjangkau</p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            📣 What Farmers Say
          </h2>
          <div className="space-y-6">
            <div className="rounded-xl bg-gray-100 p-4 shadow-sm">
              <p className="text-gray-700 italic">
                “Sejak gabung Farmmerce, hasil panen saya lebih cepat laku dan
                harganya lebih stabil. Terima kasih, Farmmerce!”
              </p>
              <p className="mt-2 text-sm text-gray-500">
                – Pak Budi, Petani Cabai dari Garut
              </p>
            </div>
            {/* Bisa tambah lagi */}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800">
            🌍 Our Future Vision
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            We envision a future where every farmer, no matter how remote, has
            access to fair markets, modern tools, and national recognition.
            Farmmerce will continue to innovate and expand—connecting more
            people to real, honest, locally grown food.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-bold text-gray-800">
          🤝 Meet the Founders
        </h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <div className="flex flex-col items-center rounded-xl p-4 shadow-md transition hover:scale-[1.02] hover:shadow-lg">
            <div className="h-[130px] w-[130px] overflow-hidden rounded-full shadow-md">
              <Image
                src="/founder-alex1.png"
                alt="Muhammad Syifa Surya Saputra"
                width={130}
                height={130}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              Muhammad Syifa Surya Saputra
            </h3>
            <p className="text-sm text-gray-600">
              Co-Founder & Product Visionary
            </p>
          </div>

          <div className="flex flex-col items-center rounded-xl p-4 shadow-md transition hover:scale-[1.02] hover:shadow-lg">
            <div className="h-[130px] w-[130px] overflow-hidden rounded-full shadow-md">
              <Image
                src="/founder-andi.png"
                alt="Andika Septalonika"
                width={130}
                height={130}
                className="h-full w-full object-cover object-[center_30%]"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              Andika Septalonika
            </h3>
            <p className="text-sm text-gray-600">
              Co-Founder & Tech Strategist
            </p>
          </div>
        </div>
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Ready to support local farmers?
          </h3>
          <p className="mt-2 text-gray-600">
            Join the movement. Shop fresh. Shop smart. Shop Farmmerce.
          </p>
          <button className="mt-4 rounded-full bg-green-600 px-6 py-2 text-white transition hover:bg-green-700">
            Start Shopping
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-400">
          Farmmerce — Empowering Farmers. Connecting Futures. 🌾
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
