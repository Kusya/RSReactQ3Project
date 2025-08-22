import { useRef, type FormEvent } from 'react';
import CustomInput from './CustomInput';
import { addItem } from './../store/authorizationDataSlice';
import { useAppDispatch } from './../store/hooks';
import { type User } from './../types/User';

export default function UncontrolledForm() {
  const dispatch = useAppDispatch();
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const ageInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const pass1InputRef = useRef<HTMLInputElement | null>(null);
  const pass2InputRef = useRef<HTMLInputElement | null>(null);
  const genderInputRef = useRef<HTMLInputElement | null>(null);
  const acceptInputRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef?.current?.value;
    const age = ageInputRef?.current?.value;

    const email = emailInputRef?.current?.value;
    const pass1 = pass1InputRef?.current?.value;
    const pass2 = pass2InputRef?.current?.value;
    const gender = genderInputRef?.current?.value;
    const accept = acceptInputRef?.current?.checked;

    const selectedFile = imageRef?.current?.files
      ? imageRef?.current?.files[0]
      : undefined;

    const user: User = {
      id: name + '-id',
      name: name || '',
      age: parseInt(age || '1', 10),
      email: email || '',
      password: pass1 || '',
      password2: pass2 || '',
      gender: gender || '',
      acceptRules: accept || false,
      image: selectedFile,
    };
    dispatch(addItem(user));
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
          fieldId="age"
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
        <div>
          <input type="file" ref={imageRef} className="filetype" />
        </div>
        <div>Country</div>
        <button>Reset</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
