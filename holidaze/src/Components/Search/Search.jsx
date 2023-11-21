// Search.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../../Styles/Search.module.scss";

function Search({ venues, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (query) => {
    try {
      const results = await venues.get(query);

      if (!Array.isArray(results)) {
        console.error("Venues is not an array:", results);
        return;
      }

      const filteredSuggestions = results.filter((venue) => {
        const lowerCaseQuery = query.toLowerCase();
        return (
          venue.name.toLowerCase().includes(lowerCaseQuery) ||
          venue.location.city.toLowerCase().includes(lowerCaseQuery) ||
          venue.location.country.toLowerCase().includes(lowerCaseQuery)
        );
      });

      onSearch(filteredSuggestions);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query); // Trigger search when the query changes
  };

  useEffect(() => {
    return () => {
      setSearchQuery("");
    };
  }, []);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      <button
        type="button"
        onClick={() => onSearch(searchQuery)}
        className={styles.searchButton}
      >
        Search
      </button>
    </div>
  );
}

Search.propTypes = {
  venues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onSearch: PropTypes.func.isRequired,
};

export default Search;
