import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { FaTwitter, FaFacebook } from 'react-icons/fa'; 

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await axios.get('http://localhost:80/api/quote');
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
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="bg-slate-300 p-8 rounded shadow-md max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Random Quote</h1>
        <p className="text-xl italic text-gray-600 mb-4">"{quote}"</p>
        <div className="border-t border-gray-400 flex-grow"></div>
        <p className="text-md font-semibold text-gray-500 mb-8">- {author}</p>

        <div className="flex justify-center space-x-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={fetchQuote}
          >
            New Quote
          </button>


          <button
            className="bg-black text-white py-2 px-4 rounded flex items-center space-x-2"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?text=${quote} - ${author}`,
                '_blank'
              )
            }
          >
            <FaTwitter /> 
            <span>Tweet</span>
          </button>


          <button
            className="bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2"
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?quote=${quote} - ${author}`,
                '_blank'
              )
            }
          >
            <FaFacebook /> 
            <span> Facebook</span>
          </button>


        </div>
      </div>
    </div>
  );
}

export default App;
