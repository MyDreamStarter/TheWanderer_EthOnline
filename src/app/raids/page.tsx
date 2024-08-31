import Image from "next/image";
import Link from "next/link";
import raids_1 from "../../../public/assets/raids_1.png";
import raids_2 from "../../../public/assets/raids_2.png";
import raids_3 from "../../../public/assets/raids_3.png";
import raids_4 from "../../../public/assets/raids_4.png";
import raids_5 from "../../../public/assets/raids_5.png";
import raids_solo from "../../../public/assets/RAIDS_SOLO.png";
import raids_group from "../../../public/assets/RAIDS_GROUP.png";
import r1 from "../../../public/assets/r1.png";
import r2 from "../../../public/assets/r2.png";
import Nav from "@/components/ui/header";
import "@/app/css/style.css";
import {
  BoltIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

interface FeatureProps {
  Icon: any;
  text: string;
}

const Feature: React.FC<FeatureProps> = ({ Icon, text }) => (
  <div className="flex items-center space-x-3">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
      <Icon className="w-5 h-5" />
    </div>
    <p className="text-gray-700">{text}</p>
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-transparent" id="main-hero_raids">
      <Nav />
      <div className="hero-background_raids"></div>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-8 relative z-10">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <Image
            src={raids_1}
            alt="Travel illustration"
            width={800}
            height={800}
            priority
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left ">
          <h1 className="mt-40 text-6xl md:text-9xl font-bold bg-gradient-to-r from-[#3D1DFF] via-[#6147FF] via-[#D451FF] via-[#EC458D] to-[#FFCA8B] bg-clip-text text-transparent mb-4">
            RAIDS
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
            Embark on Unforgettable Adventures
          </h2>
          <a
            className="btn group mb-4 w-1/3 text-white shadow hover:opacity-90 transition-all duration-300 sm:mb-0"
            href="/raids/all"
            style={{
              backgroundImage:
                "linear-gradient(15.46deg, rgb(74, 37, 225) 26.3%, rgb(123, 90, 255) 86.4%)",
              boxShadow: "rgba(96, 60, 255, 0.48) 0px 21px 27px -10px",
              padding: "10px 20px",
              borderRadius: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "44px",
            }}
          >
            <span className="relative inline-flex items-center justify-center">
              Explore{" "}
              <span className="ml-1 tracking-normal text-blue-200 transition-transform group-hover:translate-x-0.5">
                -&gt;
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* Solo Trip Section */}
      <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gray-100 min-h-screen ">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-sm font-semibold text-indigo-600 mb-2">
            SOLO TRIP
          </h2>
          <h1 className="text-4xl font-bold mb-4">
            Explore the World on Your Own Terms
          </h1>
          <p className="text-gray-600 mb-6">
            Discover the freedom and adventure of solo travel. Tailor your
            journey to your interests and pace, and meet new people along the
            way. Whether it’s a weekend getaway or a long-term adventure, solo
            trips offer a unique experience.
          </p>
          <div className="space-y-4">
            <Feature
              Icon={BoltIcon}
              text="Personalized itineraries that suit your style"
            />
            <Feature
              Icon={DocumentTextIcon}
              text="Connect with other solo travelers"
            />
            <Feature
              Icon={BoltIcon}
              text="Flexibility to change plans on the go"
            />
            <Feature
              Icon={CurrencyDollarIcon}
              text="Affordable options for every budget"
            />
          </div>
        </div>

        <div className="md:w-1/4 relative mr-200">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-pink-500 opacity-50 blur-[124px] z-0" />
          <div className="relative z-10 bg-white rounded-lg shadow-xl p-6">
            <Image
              src={raids_solo}
              alt="Solo Trip Preview"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Group Trip Section */}
      <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gray-100 min-h-screen">
        <div className="md:w-1/3 relative mr-200">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-pink-500 opacity-50 blur-[124px] z-0" />
          <div className="relative z-10 bg-white rounded-lg shadow-xl p-6">
            <Image
              src={raids_group}
              alt="Group Trip Preview"
              className="w-full rounded-lg"
            />
          </div>
        </div>

        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-sm font-semibold text-indigo-600 mb-2">
            GROUP TRIP
          </h2>
          <h1 className="text-4xl font-bold mb-4">
            Travel Together, Create Memories
          </h1>
          <p className="text-gray-600 mb-6">
            Experience the joy of traveling with friends or family. Group trips
            are perfect for bonding, sharing experiences, and making
            unforgettable memories. Choose your destination and let the
            adventure begin!
          </p>
          <div className="space-y-4">
            <Feature
              Icon={BoltIcon}
              text="Collaborative planning for shared interests"
            />
            <Feature
              Icon={DocumentTextIcon}
              text="Group discounts on accommodations and activities"
            />
            <Feature
              Icon={BoltIcon}
              text="Create lasting friendships and connections"
            />
            <Feature
              Icon={CurrencyDollarIcon}
              text="Easier logistics with a shared itinerary"
            />
          </div>
        </div>
      </div>

      {/* Event Trip Section */}
      <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gray-100 min-h-screen">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-sm font-semibold text-indigo-600 mb-2">
            EVENT TRIP
          </h2>
          <h1 className="text-4xl font-bold mb-4">
            Join the Excitement of Live Events
          </h1>
          <p className="text-gray-600 mb-6">
            Don't miss out on the thrill of live events! Whether it's a concert,
            festival, or sports event, plan your trip around exciting happenings
            and enjoy the energy of being part of something big.
          </p>
          <div className="space-y-4">
            <Feature
              Icon={BoltIcon}
              text="Stay updated on upcoming events and festivals"
            />
            <Feature
              Icon={DocumentTextIcon}
              text="Travel packages tailored around events"
            />
            <Feature
              Icon={BoltIcon}
              text="Meet fellow fans and create shared experiences"
            />
            <Feature
              Icon={CurrencyDollarIcon}
              text="Exclusive deals for event attendees"
            />
          </div>
        </div>

        <div className="md:w-1/3 relative mr-200">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-pink-500 opacity-50 blur-[124px] z-0" />
          <div className="relative z-10 bg-white rounded-lg shadow-xl p-6">
            <Image
              src={raids_3}
              alt="Event Trip Preview"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
