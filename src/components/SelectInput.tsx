import { useEffect, useState } from 'react';
import type { Country } from '../types/Country';
import { fetchData } from '../service/CountriesApi';

interface InputProps {
  name: string;
  ref: React.RefObject<HTMLSelectElement | null>;
}

export default function SelectInput(props: InputProps) {
  const [options, setOptions] = useState<Country[]>([]);
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetchData();
        setOptions(response);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    fetchOptions();
  }, []);
  return (
    <div className="flex m-2">
      <label className="mr-4 flex-1">
        {props.name}
        <select ref={props.ref}>
          {options.map((country: Country) => (
            <option key={country.name.common} value={country.name.common}>
              {country.name.common}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
