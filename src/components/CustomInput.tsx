import { type ChangeEventHandler } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  fieldName: string;
  placeholderText?: string;
  type: string;
  fieldLabel?: string;
  register?: UseFormRegisterReturn;
  error?: string;
  sendChangeUp?: ChangeEventHandler<HTMLInputElement>;
}

export default function CustomInput({
  fieldName,
  placeholderText,
  type,
  fieldLabel,
  register,
  error,
}: InputProps) {
  const name = fieldName.toLowerCase();

  return (
    <>
      <div
        className={`flex m-3 ${type === 'checkbox' ? 'flex-row-reverse items-center' : ''}`}
      >
        <label className="mb-1 mr-1 text-sm font-medium" htmlFor={name}>
          {fieldLabel ?? fieldName}
        </label>
        <input
          id={name}
          className={`bg-gray-700 border ${
            error ? 'border-red-500' : 'border-gray-500'
          } border-solid rounded-md px-2 py-1 w-full`}
          type={type}
          placeholder={placeholderText}
          {...register}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
}
