import { useRef, type FormEvent } from 'react';
import CustomInput from './CustomInput';

export default function UncontrolledForm() {
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef?.current?.value;
    console.log(name);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="absolute  inset-x-16 top-16 h-128 w-84  border border-solid rounded-md p-4">
        <CustomInput
          fieldName="Name"
          ref={nameInputRef}
          type="text"
          fieldId="name"
          placeholderText="Enter your name"
        />

        <button>Reset</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
