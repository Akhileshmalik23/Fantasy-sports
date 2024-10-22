import React from "react";
import { Link } from "react-router-dom";
import {ReactTyped} from "react-typed";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <section className="flex-grow px-6 py-16 flex flex-col items-center bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-center bg-gradient-to-br from-green-600 to-blue-600 bg-clip-text text-transparent">
          Create Your Dream Team!
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center my-6 space-y-4 md:space-y-0 md:space-x-3">
          <ReactTyped
            className="md:text-4xl sm:text-3xl text-2xl font-semibold text-[#d0546d] text-center"
            strings={["Create", "Search", "Track", "Win"]}
            typeSpeed={90}
            backSpeed={80}
            loop
          />
        </div>

        <p className="text-lg md:text-xl text-gray-600 mt-4 text-center max-w-3xl">
          Start building your team by choosing players, searching for existing
          teams, tracking your team's points, and aiming for victory!
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/players"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:bg-white hover:border hover:text-black hover:border-blue-600 transition duration-300 w-full sm:w-auto text-center"
          >
            View All Players
          </Link>
          <Link
            to="/teams/create"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:bg-white hover:border hover:text-black hover:border-green-600 transition duration-300 w-full sm:w-auto text-center"
          >
            Start Building
          </Link>
          <Link
            to="/teams/search"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:bg-white hover:border hover:text-black hover:border-purple-600 transition duration-300 w-full sm:w-auto text-center"
          >
            Search by Team Name
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow py-6">
        <div className="container mx-auto text-center text-gray-600">
          &copy; {new Date().getFullYear()} Fantasy Game. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
