import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/remove-book-from-favourite",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Failed to remove book from favourites:", error);
      alert("Failed to remove book from favourites.");
    }
  };

  return (
    <div className="font-serif">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-[#f5ecd2] p-4 rounded-lg border border-[#d5c3aa] shadow-md hover:shadow-lg transition flex flex-col items-center">
          <img
            src={data.url}
            alt="Book cover"
            className="h-[25vh] w-[150px] mb-4 rounded border border-[#c1aa8b] shadow-sm"
          />
          <h2 className="text-lg text-[#3e2c1c] font-bold mb-1 text-center">{data.title}</h2>
          <p className="text-[#5c4327] text-sm italic mb-1">by {data.author}</p>
          <p className="text-[#4e3b25] font-semibold text-base">Rs. {data.price}</p>
        </div>
      </Link>

      {favourite && (
        <button
          className="mt-3 w-full bg-[#b44c43] text-white px-4 py-2 rounded hover:bg-[#993d36] transition"
          onClick={handleRemoveBook}
        >
          Remove from favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
