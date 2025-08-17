'use client';
import { useState } from 'react';
import React from 'react';

import { useTranslations } from 'next-intl';

interface SearchComponentProps {
  searchStr: string;
  sendSearchUp: (data: string) => void;
}

export default function Search(props: SearchComponentProps) {
  const [searchString, setsearchString] = useState(props.searchStr);
  const t = useTranslations('Search');

  const handleInputSearchValue = () => {
    props.sendSearchUp(searchString);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchString(e.currentTarget.value);
  };

  return (
    <div className="flex border border-solid border-gray-300 rounded-md mx-4">
      <input
        name="search-input"
        className="px-2 bg-gray-100 rounded-md"
        placeholder="Enter pokemon"
        value={searchString}
        onChange={handleInputChange}
      ></input>
      <button className="mx-2" onClick={handleInputSearchValue}>
        {t('btn_text')}
      </button>
    </div>
  );
}
