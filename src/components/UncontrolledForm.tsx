import { useRef, type FormEvent } from 'react';
import CustomInput from './CustomInput';
import { addItem } from './../store/authorizationDataSlice';
import { useAppDispatch } from './../store/hooks';
import { type User } from './../types/User';
import RadioInput from './RadioInput';

export default function UncontrolledForm() {
  const dispatch = useAppDispatch();
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const ageInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const pass1InputRef = useRef<HTMLInputElement | null>(null);
  const pass2InputRef = useRef<HTMLInputElement | null>(null);
  const acceptInputRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef?.current?.value;
    const age = ageInputRef?.current?.value;

    const email = emailInputRef?.current?.value;
    const pass1 = pass1InputRef?.current?.value;
    const pass2 = pass2InputRef?.current?.value;
    const accept = acceptInputRef?.current?.checked;
    const genderElement = formRef?.current?.elements?.namedItem(
      'gender'
    ) as HTMLInputElement;
    const gender = genderElement.value;

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
    <form onSubmit={handleSubmit} ref={formRef}>
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
        <RadioInput name="gender" values={['Male', 'Female', 'Other']} />
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
