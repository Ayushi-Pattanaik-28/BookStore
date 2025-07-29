import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom'; // Import Link from React Router
import BookCard from '../components/BookCard';

const AllBooks = () => {
  const [Data, setData] = useState([]);
  
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/admin/get-all-books");
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className='bg-[#c49a6c] h-auto px-12 py-8'>
      <h4 className='text-3xl text-yellow-100'>All books</h4>
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
        {Data && Data.map((item, i) => (
          <div key={i}>
            {/* Wrap BookCard with Link */}
            <BookCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
