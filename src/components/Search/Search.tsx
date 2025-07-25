import { useState } from 'react';

interface SearchComponentProps {
  sendSearchUp: (data: string) => void;
}

export default function Search(props: SearchComponentProps) {
  const [searchString, setsearchString] = useState(
    localStorage.getItem('searchInput') || ''
  );

  const handleInputSearchValue = () => {
    localStorage.setItem('searchInput', searchString);
    props.sendSearchUp(searchString);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchString(e.currentTarget.value);
  };

  return (
    <>
      <div>
        <input
          name="search-input"
          value={searchString}
          onChange={handleInputChange}
        ></input>
        <button onClick={handleInputSearchValue}>Search</button>
      </div>
    </>
  );
}
