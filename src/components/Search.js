import React, { useState } from "react";
import Link from "next/link";
import styles from "@/styles/Search.css";

const Search = ({ courses }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  var data = courses.map((course) => ({ courseName: course.name, id: course.id }));

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const words = term.trim().split(" ");
    const lastWord = words[words.length - 1];

    if (lastWord.length > 0) {
      const filteredResults = data.filter((result) =>
        result.courseName.toLowerCase().startsWith(lastWord.toLowerCase())
      );
      setSearchResults(filteredResults.slice(0, 10));
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (result) => {
    setSearchTerm(result.courseName);
    setSearchResults([]);
  };

  return (
    <div className="SearchContainer">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        name="text" className="SearchBar"
      />
      {searchResults.length > 0 && (
        <ul className="searchResultBox">
          {searchResults.map((result) => (
            <Link className="SearchText" href={`/course/${result.id}/0/0`}>
            <li className="searchResultCourse"
              key={result.courseName}
              onClick={() => handleResultClick(result)}
              style={{ cursor: "pointer" }}
            >
                {result.courseName}
            </li>
              </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
