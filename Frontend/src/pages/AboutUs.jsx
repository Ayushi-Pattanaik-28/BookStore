import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight leading-tight">
          About Us
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Learn more about who we are, what we do, and how we make a difference.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="flex flex-col justify-center items-start">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We are dedicated to providing the best products and services to our
            customers. We aim to deliver value, quality, and satisfaction at every
            step of the customer journey.
          </p>
        </div>

        <div className="flex flex-col justify-center items-start">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg text-gray-600 leading-relaxed">
            <li>Integrity and Transparency</li>
            <li>Customer Satisfaction</li>
            <li>Innovation and Excellence</li>
            <li>Collaboration and Teamwork</li>
          </ul>
        </div>
      </section>

      <section className="mt-20 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-8">Meet the Team</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
          <div className="bg-white p-8 shadow-xl rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
            <img
              src="https://via.placeholder.com/150"
              alt="Team member 1"
              className="w-36 h-36 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800">John Doe</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          <div className="bg-white p-8 shadow-xl rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
            <img
              src="https://via.placeholder.com/150"
              alt="Team member 2"
              className="w-36 h-36 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800">Jane Smith</h3>
            <p className="text-gray-600">Lead Developer</p>
          </div>
          <div className="bg-white p-8 shadow-xl rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
            <img
              src="https://via.placeholder.com/150"
              alt="Team member 3"
              className="w-36 h-36 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800">Alice Brown</h3>
            <p className="text-gray-600">Marketing Manager</p>
          </div>
        </div>
      </section>

      <footer className="mt-20 text-center">
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We are committed to providing an exceptional shopping experience. Feel free to contact us for more information.
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;
