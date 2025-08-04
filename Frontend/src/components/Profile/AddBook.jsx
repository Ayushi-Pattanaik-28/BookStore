import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    description: "",
    language: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    if (!token || !userId) {
      setMessage("You are not authorized to add a book.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:1000/api/admin/add-book",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId, // this must be set correctly
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data.message || "Book added successfully!");
      setFormData({
        url: "",
        title: "",
        author: "",
        price: "",
        description: "",
        language: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        setMessage(
          error.response.data.message ||
            "Failed to add book. Please check your input."
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        setMessage("No response from server. Is it running?");
      } else {
        console.error("Request setup error:", error.message);
        setMessage("Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>

      {message && (
        <p
          className={`text-center mb-4 ${
            message.toLowerCase().includes("success")
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {["url", "title", "author", "price", "description", "language"].map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700 capitalize"
            >
              {field === "url" ? "Book Image URL" : field}
            </label>
            {field === "description" ? (
              <textarea
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                rows="4"
                required
              />
            ) : (
              <input
                type={field === "price" ? "number" : "text"}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                required
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
