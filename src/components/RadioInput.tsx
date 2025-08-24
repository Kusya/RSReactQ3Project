import type { UseFormRegisterReturn } from 'react-hook-form';

interface RadioInputProps {
  name: string;
  values: string[];
  register?: UseFormRegisterReturn;
  error?: string;
}
export default function RadioInput({
  name,
  values,
  register,
  error,
}: RadioInputProps) {
  name = name.toLocaleLowerCase();
  return (
    <div className="flex m-3">
      <label className="mr-4">{name}</label>
      {values.map((value: string) => (
        <>
          <label key={value} className="flex-none italic " htmlFor={value}>
            {value}
            <input
              className="flex-1 mr-2 bg-gray-700 border border-gray-500 border-solid rounded-md px-2"
              type="radio"
              name={name}
              id={value}
              value={value}
              {...register}
            />
          </label>
        </>
      ))}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
