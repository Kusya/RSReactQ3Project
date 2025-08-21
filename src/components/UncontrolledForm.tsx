import { useRef, type FormEvent } from 'react';
import CustomInput from './CustomInput';

export default function UncontrolledForm() {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const ageInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const pass1InputRef = useRef<HTMLInputElement | null>(null);
  const pass2InputRef = useRef<HTMLInputElement | null>(null);
  const genderInputRef = useRef<HTMLInputElement | null>(null);
  const acceptInputRef = useRef<HTMLInputElement | null>(null);

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
        <CustomInput
          fieldName="Age"
          ref={ageInputRef}
          type="number"
          fieldId="lastname"
          placeholderText="Enter your last name"
        />
        <CustomInput
          fieldName="Enter Email"
          ref={emailInputRef}
          type="text"
          fieldId="email"
          placeholderText="Enter email"
        />
        <CustomInput
          fieldName="Password"
          ref={pass1InputRef}
          type="password"
          fieldId="password"
          placeholderText="Enter Password"
        />
        <CustomInput
          fieldName="Password(second enter)"
          ref={pass2InputRef}
          type="password"
          fieldId="password2"
          placeholderText="Enter the same Password second time"
        />
        <div>
          <CustomInput
            fieldName="Gender"
            ref={genderInputRef}
            fieldLabel="Male"
            type="radio"
            fieldId="gender"
            placeholderText="Enter the same Password second time"
          />
          <CustomInput
            fieldName="Gender"
            ref={genderInputRef}
            fieldLabel="Female"
            type="radio"
            fieldId="gender"
            placeholderText="Enter the same Password second time"
          />
          <CustomInput
            fieldName="Gender"
            ref={genderInputRef}
            fieldLabel="Other"
            type="radio"
            fieldId="gender"
            placeholderText="Enter the same Password second time"
          />
        </div>
        <CustomInput
          fieldName="accept Terms and Conditions agreement"
          ref={acceptInputRef}
          type="checkbox"
          fieldId="accept"
          placeholderText="Enter the same Password second time"
        />
        <div>Picture</div>
        <div>Country</div>
        <button>Reset</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
