import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Favourites = ({ wishlist }) => {
    const [favouriteBooks, setFavouriteBooks] = useState([]);
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    // Fetch favourite books
    const fetchFavourites = async () => {
        try {
            const response = await axios.get('http://localhost:1000/api/get-favourite-books', { headers });
            setFavouriteBooks(response.data.data || []); // Update state with favourite books
        } catch (error) {
            console.error("Error fetching favourite books:", error);
        }
    };

    // Remove a book from favourites
    const removeFromFavourites = async (bookId) => {
        try {
            const response = await axios.delete("http://localhost:1000/api/remove-book-from-favourite", {
                data: { bookid: bookId }, // Pass the bookId in the body
                headers,
            });
            if (response.status === 200) {
                setFavouriteBooks(favouriteBooks.filter(book => book._id !== bookId)); 
            }
        } catch (error) {
            console.error("Error removing from favourites:", error);
        }
    };

    // Fetch favourites when the component mounts
    useEffect(() => {
        fetchFavourites();
    }, []);

    return (
        <div className='grid grid-cols-4 gap-4'>
            {/* Show the favourite books */}
            {favouriteBooks.length > 0 ? (
                favouriteBooks.map((item, i) => (
                    <div key={i} className="relative border p-4 rounded-lg shadow-md">
                        {/* Book details */}
                        <img src={item.url} alt={item.title} className="w-full h-40 object-cover mb-4 rounded-lg" />
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.author}</p>
                        <button
                            onClick={() => removeFromFavourites(item._id)} // Remove favourite when clicked
                            className="absolute top-0 right-0 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                        >
                            Remove
                        </button>
                    </div>
                ))
            ) : (
                <p>No favourite books available</p>
            )}

           
        </div>
    );
};

export default Favourites;
