import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BsCart3 } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, addToCart } from '../store/auth'; // Update with correct path
import Cart from '../pages/Cart';

const ViewBookDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Extract book id from URL
    const [Data, setData] = useState();
    const [error, setError] = useState('');
    const [x, setx] = useState('false');
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const userId = useSelector((state) => state.auth.userId);


    console.log("in details")
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/get-book-by-id/${id}`);
                setData(response.data.data);
            } catch (err) {
                setError("Failed to load book data.");
                console.error("Error fetching book data:", err);
            }
        };
        fetch();
        const y = localStorage.getItem("x")
        setx(y)
        console.log(x)

    }, [id,x]);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const handleFavourites = async () => {
        try {
            const response = await axios.put(
                "http://localhost:1000/api/add-book-to-favourite",
                { bookId: id }, // Pass bookId in the body
                { headers }
            );
            alert(response.data.message); // Display success message
            dispatch(addToWishlist(Data)); // Update Redux store
        } catch (err) {
            console.log("Error adding book to favourites:", err.response || err.message);
            alert("Error occurred while adding to favourites.");
        }
    };

    const handleCart = async () => {
        try {
            const response = await axios.put("http://localhost:1000/api/add-to-cart", {}, { headers });

            alert(response.data.message);
            dispatch(addToCart(Data)); // Add item to Redux cart
        } catch (err) {
            console.log("Error adding book to cart:", err);
        }
    };




    const handleDelete = async () => {
        try {
            const response = await axios.delete("http://localhost:1000/api//delete-book", { headers });
            if (response.status === 200) {
                alert(response.data.message);
                navigate('/'); // Redirect to homepage or books list after deletion
            } else {
                alert('Failed to delete the book');
            }
        } catch (err) {
            console.error("Error deleting book:", err);
            alert("Error occurred while deleting the book.");
        }
    };


    return (
        <>
            {Data && (
                <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start'>
                    <div className='w-full lg:w-3/6'>
                        <div className='flex justify-around bg-zinc-800 p-12 rounded'>
                            <img
                                src={Data.url}
                                alt="Book cover"
                                className='h-[50vh] lg:h-[70vh] rounded object-cover'
                            />
                            {isLoggedIn && role === "user" && (
                                <div className='flex flex-col gap-4'>
                                    {/* Wishlist Button */}
                                    <button
                                        className='flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-6 rounded-full shadow-lg transition transform hover:scale-105 hover:from-pink-600 hover:to-red-600'
                                        onClick={handleFavourites}
                                    >
                                        <IoHeartOutline className='text-xl mr-2' />
                                        Add to Wishlist
                                    </button>

                                    {/* Cart Button */}
                                    {x  && <button
                                        className='flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-6 rounded-full shadow-lg transition transform hover:scale-105 hover:from-blue-600 hover:to-teal-600'
                                        onClick={handleCart}
                                    >
                                        <BsCart3 className='text-xl mr-2' />
                                        Add to Cart
                                    </button>}
                                </div>





                            )
                            }
                            {isLoggedIn && role === "admin" && (
                                <div className='flex flex-col gap-4'>
                                    {/* Edit Button */}
                                    <Link
                                        to={`/editProduct/${id}`}
                                        className=" flex items-center justify-center bg-red-500 text-white py-3 px-6 rounded-full shadow-lg transition transform hover:scale-105 hover:bg-red-600"
                                    >
                                        Edit
                                    </Link>

                                    <Link
                                        to={"/addBook"}
                                        className=" flex items-center justify-center bg-red-500 text-white py-3 px-6 rounded-full shadow-lg transition transform hover:scale-105 hover:bg-red-600"
                                    >
                                        Add Book
                                    </Link>

                                    {/* Delete Button */}
                                    <button
                                        className='flex items-center justify-center bg-red-500 text-white py-3 px-6 rounded-full shadow-lg transition transform hover:scale-105 hover:bg-red-600'
                                        onClick={handleDelete}
                                    >
                                        Delete Book
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-4 w-full lg:w-3/6 text-white">
                        <h1 className="text-3xl font-bold">{Data.title}</h1>
                        <p className="text-lg mb-2">by {Data.author}</p>
                        <p>{Data.description}</p>
                        <p> Rs. {Data.price}</p>
                        <p>{Data.language}</p>

                    </div>
                </div>
            )}
        </>
    );
};

export default ViewBookDetails;
