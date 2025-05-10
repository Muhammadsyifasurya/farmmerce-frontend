"use client";
import { IconButton } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import iconFarmmerce from "../../../../public/farmmerce-iconic.svg";

const FooterPage = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          {/* Logo & Description */}
          <div className="max-w-[400px]">
            <div className="mb-4 flex items-center justify-center gap-2 lg:justify-start">
              <Image
                src={iconFarmmerce}
                alt="Farmmerce Icon"
                width={40}
                height={40}
              />
              <h2 className="text-2xl font-bold tracking-wide">FARMMERCE</h2>
            </div>
            <p className="text-center text-sm text-gray-400 lg:text-left">
              Empowering agriculture through innovative e-commerce solutions.
              Connecting farmers and consumers directly.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center lg:text-left">
            <h3 className="mb-4 text-lg font-semibold">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 transition hover:text-white"
                >
                  Buy & Sell
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-300 transition hover:text-white"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-300 transition hover:text-white"
                >
                  Giving Back
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 transition hover:text-white"
                >
                  Blog & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center lg:text-left">
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: support@farmmerce.com</li>
              <li>Phone: +62 812-3456-7890</li>
              <li>Jl. Tani Makmur No.10, Jakarta</li>
            </ul>
          </div>

          {/* Newsletter & Socials */}
          <div className="text-center lg:text-left">
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
            <p className="mb-3 text-sm text-gray-400">
              Stay updated with our latest news and offers.
            </p>
            <form className="flex flex-col gap-2 sm:flex-row sm:justify-center lg:justify-start">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-md bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium transition hover:bg-green-700"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-5 flex justify-center gap-4 lg:justify-start">
              <IconButton
                aria-label="facebook"
                className="transition-transform duration-300 hover:scale-110"
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "#1877F2",
                    backgroundColor: "rgba(24, 119, 242, 0.1)",
                  },
                }}
              >
                <FacebookIcon />
              </IconButton>

              <IconButton
                aria-label="twitter"
                className="transition-transform duration-300 hover:scale-110"
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "#1DA1F2",
                    backgroundColor: "rgba(29, 161, 242, 0.1)",
                  },
                }}
              >
                <TwitterIcon />
              </IconButton>

              <IconButton
                aria-label="instagram"
                className="transition-transform duration-300 hover:scale-110"
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "#E4405F",
                    backgroundColor: "rgba(228, 64, 95, 0.1)",
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Farmmerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
