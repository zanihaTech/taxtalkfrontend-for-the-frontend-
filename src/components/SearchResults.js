import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query'); // Get search query
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/search?search=${query}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]); // No results
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <p>Loading search results...</p>;

  return (
    <div className="search-results">
      <h1>Search Results for "{query}"</h1>
      {results.length === 0 ? (
        <p>No blogs found matching your query.</p>
      ) : (
        results.map((post) => (
          <div key={post._id} className="search-result-card">
            <h2>{post.title}</h2>
            <p>{post.content.substring(0, 150)}...</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
