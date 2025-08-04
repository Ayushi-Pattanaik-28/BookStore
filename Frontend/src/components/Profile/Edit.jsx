import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams(); // Get book ID from the route params
    const navigate = useNavigate();

    // State to store book details
    const [bookDetails, setBookDetails] = useState({
        url: '',
        title: '',
        author: '',
        price: '',
        description: '',
        language: ''
    });

    // Fetch the book details when the page loads
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/get-book-by-id/${id}`);
                if (response.data.status === "Success") {
                    setBookDetails(response.data.data); // Set book data to state
                } else {
                    console.error("Failed to fetch book details");
                }
            } catch (err) {
                console.error("Error fetching book details:", err);
            }
        };
        fetchBookDetails();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    // Handle form submission to update the book
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'bookid': id
            };
            const response = await axios.put("http://localhost:1000/api/admin/update-book", bookDetails, { headers });

            alert(response.data.message); 
            navigate(`/view-book-details/${id}`); // Redirect back to the book details page
        } catch (err) {
            console.error("Error updating book:", err);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Book</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block text-gray-600">Image URL</label>
                    <input
                        type="text"
                        name="url"
                        value={bookDetails.url}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={bookDetails.title}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={bookDetails.author}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={bookDetails.price}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Description</label>
                    <textarea
                        name="description"
                        value={bookDetails.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Language</label>
                    <input
                        type="text"
                        name="language"
                        value={bookDetails.language}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
                >
                    Update Book
                </button>
            </form>
        </div>
    );
};

export default Edit;
