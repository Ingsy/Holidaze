import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../../Styles/Search.module.scss";

function Search({ venues, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (Array.isArray(venues)) {
      const filteredSuggestions = venues.filter((venue) => {
        const lowerCaseQuery = query.toLowerCase();
        return (
          venue.name.toLowerCase().includes(lowerCaseQuery) ||
          venue.location.city.toLowerCase().includes(lowerCaseQuery) ||
          venue.location.country.toLowerCase().includes(lowerCaseQuery)
        );
      });

      onSearch(filteredSuggestions);
    }
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
  venues: PropTypes.array.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Search;
