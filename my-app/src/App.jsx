import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [favorites, setFavorites] = useState([]);

  const fetchQuote = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/quote');
      setQuote(response.data.quote);
      setAuthor(response.data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };



  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Random Quote</h1>
        <p className="text-xl italic text-gray-600 mb-4">"{quote}"</p>
        <p className="text-md font-semibold text-gray-500 mb-8">- {author}</p>

        <div className="flex justify-center space-x-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={fetchQuote}
          >
            New Quote
          </button>
          <button
            className="bg-black text-white py-2 px-4 rounde"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?text=${quote} - ${author}`,
                '_blank'
              )
            }
          >
            Share on X
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded "
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?quote=${quote} - ${author}`,
                '_blank'
              )
            }
          >
            Share on Facebook
          </button>
        </div>
      </div>

      {favorites.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded shadow-md max-w-lg w-full">
          <h2 className="text-xl font-bold mb-4">Liked Quotes</h2>
          <ul className="space-y-4">
            {favorites.map((fav, index) => (
              <li key={index} className="text-gray-800">
                "{fav.quote}" - {fav.author}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
