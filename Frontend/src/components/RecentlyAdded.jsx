import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

const RecentlyAdded = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/admin/get-recent-books");
        setData(response.data.data || []);
      } catch (err) {
        console.error("Failed to fetch recent books", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentBooks();
  }, []);

  return (
    <div className="mt-12 px-4 sm:px-8 md:px-12 lg:px-20">
      <h2 className="text-3xl font-semibold text-[#A26769] mb-6 border-b border-[#874C62] pb-2">

        📚 Recently Added Books
      </h2>

      {loading ? (
        <div className="text-white text-lg">Loading...</div>
      ) : data.length === 0 ? (
        <div className="text-gray-300">No recent books found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((book, i) => (
            <BookCard key={i} data={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyAdded;
