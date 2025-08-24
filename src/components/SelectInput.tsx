import { useEffect, useState } from 'react';
import type { Country } from '../types/Country';
import { fetchData } from '../service/CountriesApi';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  name: string;
  register?: UseFormRegisterReturn;
  error?: string;
}

export default function SelectInput({ name, register, error }: InputProps) {
  const [options, setOptions] = useState<Country[]>([]);
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetchData();
        setOptions(response);
      } catch (err) {
        console.error('Error fetching options:', err);
      }
    };
    fetchOptions();
  }, []);
  return (
    <div className="flex m-3">
      <label className="mr-4 flex-none" htmlFor="countries-input">
        {name}:
      </label>
      <input
        className="flex-1 bg-gray-700 border border-gray-500 border-solid rounded-md px-2"
        list="countries"
        id="countries-input"
        name="countries"
        {...register}
      />

      <datalist id="countries">
        {options.map((country: Country) => (
          <option key={country.name.common} value={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </datalist>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
