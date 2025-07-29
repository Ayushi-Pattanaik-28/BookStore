import React from "react";

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: "https://img.freepik.com/premium-photo/portrait-handsome-smiling-middle-aged-businessman-wearing-suit-looking-camera_116547-27858.jpg",
  },
  {
    name: "Jane Smith",
    role: "Lead Developer",
    image: "https://static.vecteezy.com/system/resources/thumbnails/065/368/597/small/portrait-of-a-sleepy-young-businessman-standing-in-the-office-arms-crossed-on-his-chest-confidently-and-smilingly-looking-at-the-camera-photo.jpg",
  },
  {
    name: "Vinod Gupta",
    role: "Marketing Manager",
    image: "https://media.istockphoto.com/id/1636023306/photo/portrait-of-young-hispanic-businessman-inside-office-boss-in-business-suit-smiling-and.jpg?s=612x612&w=0&k=20&c=3aC2P0heBBWlaVdFq6P711W3TMw7Lqgb5Wru6xwH8_w=",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#c49a6c] px-6 py-12 sm:px-12 lg:px-24 text-[#4b3d2a] font-serif">
      {/* Header */}
      <header className="text-center mb-24">
        <h1 className="text-5xl font-bold text-[#3e2714] leading-snug drop-shadow-md">
          About <span className="italic text-[#6a3e26]">BookHaven</span>
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-[#3a2a1c] opacity-90 leading-relaxed">
          Discover our mission, values, and the passionate team behind BookHaven
        </p>
        <div className="mt-8 w-24 h-1 bg-[#6a3e26] mx-auto rounded-full"></div>
      </header>

      {/* Mission & Values */}
      <section className="grid md:grid-cols-2 gap-12 mb-28">
        <div className="bg-[#f9efe2] p-10 rounded-xl shadow-lg border border-[#e0d2b8] transition hover:shadow-xl">
          <h2 className="text-3xl font-bold text-[#7b4a32] mb-6 border-b border-[#c49a6c] pb-3">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed text-[#4b3d2a] opacity-90">
            At BookVerse, we aim to ignite a love for reading by offering a curated
            selection of books and delivering an exceptional online bookstore experience.
          </p>
        </div>

        <div className="bg-[#f9efe2] p-10 rounded-xl shadow-lg border border-[#e0d2b8] transition hover:shadow-xl">
          <h2 className="text-3xl font-bold text-[#7b4a32] mb-6 border-b border-[#c49a6c] pb-3">
            Our Values
          </h2>
          <ul className="list-disc list-inside space-y-3 text-lg text-[#4b3d2a] opacity-90">
            <li>Integrity & Transparency</li>
            <li>Customer First Mindset</li>
            <li>Passion for Literature</li>
            <li>Innovation & Growth</li>
          </ul>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-24 text-center">
        <h2 className="text-4xl font-bold text-[#5e3b1c] mb-12">Meet the Team</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#f9efe2] p-6 rounded-2xl shadow-md border border-[#e0d2b8] hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 rounded-full mx-auto mb-5 object-cover border-4 border-[#d4bfa6]"
              />
              <h3 className="text-xl font-bold text-[#4b3d2a]">{member.name}</h3>
              <p className="text-[#8b5e3c] italic mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center border-t border-[#e0d2b8] pt-10 mt-20">
        <p className="text-lg max-w-xl mx-auto text-[#4b3d2a] opacity-80 leading-relaxed">
          We're always here to help. Reach out to us anytime to learn more about our journey and offerings.
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;
