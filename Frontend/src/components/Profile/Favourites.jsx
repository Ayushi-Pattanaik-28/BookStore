import React, { useEffect, useState } from "react";
import axios from "axios";

const Favourites = () => {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true); // Loader state

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const fetchFavourites = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:1000/api/get-favourite-books", { headers });
            setFavourites(res.data.data);
        } catch (error) {
            console.error("Error fetching favourites:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromFavourites = async (bookId) => {
        try {
            const res = await axios.put(
                "http://localhost:1000/api/remove-book-from-favourite",
                {},
                { headers: { ...headers, bookid: bookId } }
            );
            alert(res.data.message);
            setFavourites((prev) => prev.filter((item) => item._id !== bookId));
        } catch (error) {
            console.error("Error removing from favourites:", error);
        }
    };

    useEffect(() => {
        fetchFavourites();
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen text-white p-8">


            {loading ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="border-4 border-white border-t-transparent rounded-full w-12 h-12 animate-spin mx-auto mb-4"></div>
                        <p className="text-lg text-gray-300">Loading your favourites...</p>
                    </div>
                </div>
            ) : favourites.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <h2 className="text-2xl font-semibold mb-4">No books in favourites</h2>
                    <img
                        src="https://cdn-icons-png.freepik.com/256/16295/16295266.png?semt=ais_hybrid"
                        alt="No favourites"
                        className="w-40 h-40 object-contain"
                    />



                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {favourites.map((book) => (
                        <div
                            key={book._id}
                            className="flex items-center justify-between bg-gray-800 p-4 rounded"
                        >
                            <div className="flex items-center space-x-4">
                                <img src={book.url} alt={book.title} className="w-20 h-20 object-cover" />
                                <div>
                                    <h4 className="text-lg font-semibold">{book.title}</h4>
                                    <p className="text-green-400">Rs. {book.price}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromFavourites(book._id)}
                                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favourites;
