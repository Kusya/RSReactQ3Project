import { useRef, type FormEvent } from 'react';
import CustomInput from './CustomInput';
import { addItem } from './../store/authorizationDataSlice';
import { useAppDispatch } from './../store/hooks';
import { type User } from './../types/User';
import RadioInput from './RadioInput';
import SelectInput from './SelectInput';

export default function UncontrolledForm() {
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEls = formRef?.current?.elements;
    const name = (formEls?.namedItem('name') as HTMLInputElement).value;
    const age = (formEls?.namedItem('age') as HTMLInputElement).value;
    const email = (formEls?.namedItem('email') as HTMLInputElement).value;
    const pass1 = (formEls?.namedItem('password') as HTMLInputElement).value;
    const pass2 = (formEls?.namedItem('password2') as HTMLInputElement).value;
    const accept = (formEls?.namedItem('accept') as HTMLInputElement).checked;
    const gender = (formEls?.namedItem('gender') as HTMLInputElement).value;
    const country = (formEls?.namedItem('countries') as HTMLInputElement).value;
    const files = (formEls?.namedItem('image') as HTMLInputElement).files;

    const user: User = {
      id: name + '-id',
      name: name || '',
      age: parseInt(age || '1', 10),
      email: email || '',
      password: pass1 || '',
      password2: pass2 || '',
      gender: gender || '',
      acceptRules: accept,
      image: files ? URL.createObjectURL(files[0]) : '',
      country: country || '',
    };
    dispatch(addItem(user));
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className="absolute  inset-x-16 top-16 h-128 w-84  border border-solid rounded-md p-4">
        <CustomInput
          fieldName="Name"
          type="text"
          placeholderText="Enter your name"
        />
        <CustomInput
          fieldName="Age"
          type="number"
          placeholderText="Enter your last name"
        />
        <CustomInput
          fieldName="Email"
          type="text"
          placeholderText="Enter email"
        />
        <CustomInput
          fieldName="Password"
          type="password"
          placeholderText="Enter Password"
        />
        <CustomInput
          fieldName="Password2"
          fieldLabel="Password(repeat)"
          type="password"
          placeholderText="Enter the same Password second time"
        />
        <RadioInput name="gender" values={['Male', 'Female', 'Other']} />
        <CustomInput
          fieldName="accept"
          fieldLabel="accept Terms and Conditions agreement"
          type="checkbox"
          placeholderText="Enter the same Password second time"
        />
        <div>
          <input type="file" id="image" className="filetype" />
        </div>
        <div>
          <SelectInput name="Country" />
        </div>
        <button>Reset</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
