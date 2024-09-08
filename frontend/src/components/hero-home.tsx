"use client";
import Image from "next/image";
import PageIllustration from "@/components/page-illustration";
import Avatar01 from "@/public/images/avatar-01.jpg";
import Avatar02 from "@/public/images/avatar-02.jpg";
import Avatar03 from "@/public/images/avatar-03.jpg";
import Avatar04 from "@/public/images/avatar-04.jpg";
import Avatar05 from "@/public/images/avatar-05.jpg";
import Avatar06 from "@/public/images/avatar-06.jpg";
import "../app/css/style.css";
import "../app/css/hero-style.css";
import grid from "@/public/images/GRID.svg";
import dynamic from "next/dynamic";
import Map from "../../public/images/map.png";

export default function HeroHome() {
  return (
    <section className="relative" id="main-hero">
     
      <div className="hero-background"></div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
      
        <div className="pb-12 pt-32 md:pb-20 md:pt-40" id="main-hero">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <h1
              className="mb-6 "
              // border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              {/* Voyager <br className="max-lg:hidden" /> */}
              <div className="flex flex-col items-center p-8 relative">
                <h1 className="text-9xl font-bold bg-gradient-to-r from-[#3D1DFF] via-[#6147FF] via-[#D451FF] via-[#EC458D] to-[#FFCA8B] bg-clip-text text-transparent mb-1 z-10">
                  THE WANDERER
                </h1>
                <svg
                  className="w-64 h-120 absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                  viewBox="0 0 256 48"
                  style={{ marginTop: "-100px" }}
                >
                  <path
                    d="M8 24 Q 128 36, 248 24"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      style={{ marginTop: "-100px" }}
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#3D1DFF" />
                      <stop offset="22.3953%" stopColor="#6147FF" />
                      <stop offset="46.354%" stopColor="#D451FF" />
                      <stop offset="75.004%" stopColor="#EC458D" />
                      <stop offset="100%" stopColor="#FFCA8B" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </h1>

            {/* <Globe/> */}

            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-2xl text-gray-600"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                Unlock global adventures with blockchain-powered connections
              </p>
              <div className="relative before:absolute before:inset-0 ">
                {/* before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] */}
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  <a
                    className="btn group mb-4 w-full text-white shadow hover:opacity-90 transition-all duration-300 sm:mb-0 sm:w-auto"
                    href="#0"
                    style={{
                      backgroundImage:
                        "linear-gradient(15.46deg, rgb(74, 37, 225) 26.3%, rgb(123, 90, 255) 86.4%)",
                      boxShadow: "rgba(96, 60, 255, 0.48) 0px 21px 27px -10px",
                      padding: "10px 20px",
                      borderRadius: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "44px", // Adjust this value as needed
                    }}
                  >
                    <span className="relative inline-flex items-center justify-center">
                      Connect Wallet{" "}
                      <span className="ml-1 tracking-normal text-blue-200 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </a>
                  {/* <a
                    className="btn w-full bg-white text-gray-800 shadow hover:bg-gray-50 sm:ml-4 sm:w-auto"
                    href="#0"
                  >
                    Explore
                  </a> */}

                  <a
                    className="btn w-full bg-white text-gray-800 shadow hover:bg-gray-100 transition-colors duration-300 sm:ml-4 sm:w-auto"
                    href="#0"
                    style={{
                      padding: "15px 24px",
                      borderRadius: "30px",
                      display: "inline-block",
                      fontSize: "16px",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "500",
                      lineHeight: "1.5",
                      textAlign: "center",
                      minWidth: "160px",
                    }}
                  >
                    Explore
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Image src={Map} alt="aaa"></Image>
          {/* Hero image */}
          {/* <div
            className="mx-auto max-w-3xl"
            data-aos="zoom-y-out"
            data-aos-delay={600}
          >
            <div className="relative aspect-video rounded-2xl bg-gray-900 px-5 py-3 shadow-xl before:pointer-events-none before:absolute before:-inset-5 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] after:absolute after:-inset-5 after:-z-10 after:border-x after:[border-image:linear-gradient(to_bottom,transparent,theme(colors.slate.300/.8),transparent)1]">
              <div className="relative mb-8 flex items-center justify-between before:block before:h-[9px] before:w-[41px] before:bg-[length:16px_9px] before:[background-image:radial-gradient(circle_at_4.5px_4.5px,_theme(colors.gray.600)_4.5px,_transparent_0)] after:w-[41px]">
                <span className="text-[13px] font-medium text-white">
                  cruip.com
                </span>
              </div>
              <div className="font-mono text-gray-500 [&_span]:opacity-0">
                <span className="animate-[code-1_10s_infinite] text-gray-200">
                  npm login
                </span>{" "}
                <span className="animate-[code-2_10s_infinite]">
                  --registry=https://npm.pkg.github.com
                </span>
                <br />
                <span className="animate-[code-3_10s_infinite]">
                  --scope=@phanatic
                </span>{" "}
                <span className="animate-[code-4_10s_infinite]">
                  Successfully logged-in.
                </span>
                <br />
                <br />
                <span className="animate-[code-5_10s_infinite] text-gray-200">
                  npm publish
                </span>
                <br />
                <span className="animate-[code-6_10s_infinite]">
                  Package published.
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
