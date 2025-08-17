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
    <div className="flex">
      <input
        name="search-input"
        className="ml-4 pl-2 rounded-md"
        placeholder="Enter pokemon"
        value={searchString}
        onChange={handleInputChange}
      ></input>
      <button onClick={handleInputSearchValue}>Search</button>
    </div>
  );
}
