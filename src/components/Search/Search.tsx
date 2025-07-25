import { useState } from 'react';

interface SearchComponentProps {
  searchStr: string;
  sendSearchUp: (data: string) => void;
}

export default function Search(props: SearchComponentProps) {
  //tbd: is this ok to useState(props)?
  const [searchString, setsearchString] = useState(props.searchStr);

  const handleInputSearchValue = () => {
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
