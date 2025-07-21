import React from "react";

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Jane Smith",
    role: "Lead Developer",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Alice Brown",
    role: "Marketing Manager",
    image: "https://via.placeholder.com/150",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-zinc-900 px-6 py-12 sm:px-12 lg:px-20 text-white">
      {/* Header */}
      <header className="text-center mb-20">
        <h1 className="text-5xl font-extrabold text-white leading-tight">
          About <span className="text-pink-500">BookVerse</span>
        </h1>
        <p className="mt-4 text-lg text-zinc-300 max-w-2xl mx-auto">
          Discover our mission, values, and the passionate team behind BookVerse.
        </p>
      </header>

      {/* Mission & Values Section */}
      <section className="grid md:grid-cols-2 gap-16 mb-24">
        <div className="bg-zinc-800 p-8 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-3xl font-bold text-pink-400 mb-4">Our Mission</h2>
          <p className="text-zinc-300 text-lg leading-relaxed">
            At BookVerse, we aim to ignite a love for reading by offering a curated
            selection of books and delivering an exceptional online bookstore experience.
          </p>
        </div>

        <div className="bg-zinc-800 p-8 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-3xl font-bold text-pink-400 mb-4">Our Values</h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 text-lg">
            <li>Integrity & Transparency</li>
            <li>Customer First Mindset</li>
            <li>Passion for Literature</li>
            <li>Innovation & Growth</li>
          </ul>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-24 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-10">
          Meet the Team
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-zinc-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white">{member.name}</h3>
              <p className="text-pink-400 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-center mt-16">
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
          We're always here to help. Reach out to us anytime to learn more about our journey and offerings.
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;
