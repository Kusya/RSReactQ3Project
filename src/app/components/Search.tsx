'use client';
import { useState } from 'react';
import React from 'react';

interface SearchComponentProps {
  searchStr: string;
  sendSearchUp: (data: string) => void;
}

export default function Search(props: SearchComponentProps) {
  const [searchString, setsearchString] = useState(props.searchStr);

  const handleInputSearchValue = () => {
    props.sendSearchUp(searchString);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchString(e.currentTarget.value);
  };

  return (
    <div className="flex border-solid border-gray-300 rounded-md mx-4">
      <input
        name="search-input"
        className="mx-2"
        placeholder="Enter pokemon"
        value={searchString}
        onChange={handleInputChange}
      ></input>
      <button className="mx-2" onClick={handleInputSearchValue}>
        Search
      </button>
    </div>
  );
}
