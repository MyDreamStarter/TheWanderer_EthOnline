"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Logo from "./logo";

import StyledWalletConnectButton from "../StyledWalletConnectButton";

export default function Header() {
  const [top, setTop] = useState<boolean>(true);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
          style={{ borderRadius: "30px", height: "60px", padding: "10px" }}
        >
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              {/* <Link
                href="/signin"
                className="btn-sm bg-white text-gray-800 shadow hover:bg-gray-50"
              >
                Login
              </Link> */}
            </li>
            <li>
              {/* <Link
                href="/signup"
                className="btn-sm bg-gray-800 text-gray-200 shadow hover:bg-gray-900"
              >
                Register
              </Link> */}
            </li>
            <li style={{ color: "grey" }}>
              <Link
                href="/"
                className=" text-gray-800  hover:bg-gray-50 "
                style={{ padding: "10px" }}
              >
                Home
              </Link>
            </li>
            <li style={{ color: "grey" }}>
              <Link
                href="/raids"
                className=" text-gray-800  hover:bg-gray-50 "
                style={{ padding: "10px" }}
              >
                Raids
              </Link>
            </li>

            <li style={{ color: "grey" }}>
              <Link
                href="/rent"
                className=" text-gray-800  hover:bg-gray-50 "
                style={{ padding: "10px" }}
              >
                Rent
              </Link>
            </li>

            <li style={{ color: "grey" }}>
              <Link
                href="#"
                className=" text-gray-800  hover:bg-gray-50 "
                style={{ padding: "10px" }}
              >
                Explore
              </Link>
            </li>

            <li style={{ color: "grey" }}>
              <Link
                href="#"
                className=" text-gray-800  hover:bg-gray-50 "
                style={{ padding: "10px" }}
              >
                Cult
              </Link>
            </li>
            <li style={{ color: "grey" }}>
              <Link
                href="/chat"
                className=" text-gray-800  hover:bg-gray-50 "
                style={{ padding: "10px" }}
              >
                Chat
              </Link>
            </li>

            {/* <li style={{ color: "grey" }}>
              <Link
                href="#"
                className=" text-gray-800  hover:bg-gray-50 "
                style={{ padding: "10px" }}
              >
                Swap USDC
              </Link>
            </li> */}


            {/* <li style={{ color: "grey" }}>
              <Link
                href="#"
                className="btn-sm text-white shadow hover:opacity-90 transition-opacity"
                style={{
                  backgroundImage:
                    "linear-gradient(15.46deg, rgb(74, 37, 225) 26.3%, rgb(123, 90, 255) 86.4%)",
                  boxShadow: "rgba(96, 60, 255, 0.48) 0px 21px 27px -10px",
                  padding: "10px",
                  borderRadius: "30px",
                  display: "inline-block",
                }}
              >
                Connect Wallet
              </Link>
            </li> */}
            <li>
              <w3m-button/>
              {/* <w3m-connect-button/> */}
              
              </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
