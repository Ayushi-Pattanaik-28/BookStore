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
      const response = await axios.put("http://localhost:1000/api/remove-book-from-favourite", {}, { headers });
      alert(response.data.message); 
    } catch (error) {
      console.error("Failed to remove book from favourites:", error);
      alert("Failed to remove book from favourites.");
    }
  };

  return (
    <div>
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-800 p-4 rounded flex flex-col items-center">
          <img src={data.url} alt="Book cover" className="h-[25vh] w-[150px] mb-4" />
          <h2 className="text-xl text-white font-semibold mb-2">{data.title}</h2>
          <p className="text-zinc-400 font-semibold mb-2">by {data.author}</p>
          <p className="text-zinc-200 font-semibold text-xl">RS. {data.price}</p>
        </div>
      </Link>

      {favourite && (
        <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded" onClick={handleRemoveBook}>
          Remove from favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
