import { useState, type FormEvent } from 'react';
import CustomInput from './CustomInput';
import { addItem } from '../store/authorizationDataSlice';
import { useAppDispatch } from '../store/hooks';
import { type User } from '../types/User';
import RadioInput from './RadioInput';
import SelectInput from './SelectInput';

export default function UncontrolledForm() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [accept, setAccept] = useState(false);
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [files, setFiles] = useState<FileList | null>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
    <form onSubmit={handleSubmit}>
      <h2>Controlled</h2>
      <div className="inset-x-144 top-16 h-128 w-100  border border-solid rounded-md p-4">
        <CustomInput
          fieldName="Name"
          type="text"
          placeholderText="Enter your name"
          sendChangeUp={(e) => setName(e.currentTarget.value)}
        />
        <CustomInput
          fieldName="Age"
          type="number"
          placeholderText="Enter your last name"
          sendChangeUp={(e) => setAge(e.currentTarget.value)}
        />
        <CustomInput
          fieldName="Email"
          type="text"
          placeholderText="Enter email"
          sendChangeUp={(e) => setEmail(e.currentTarget.value)}
        />
        <CustomInput
          fieldName="Password"
          type="password"
          placeholderText="Enter Password"
          sendChangeUp={(e) => setPass1(e.currentTarget.value)}
        />
        <CustomInput
          fieldName="Password2"
          fieldLabel="Password(repeat)"
          type="password"
          placeholderText="Enter the same Password"
          sendChangeUp={(e) => setPass2(e.currentTarget.value)}
        />
        <RadioInput
          name="Gender"
          values={['Male', 'Female', 'Other']}
          sendChangeUp={(e) => setGender(e.currentTarget.value)}
        />
        <CustomInput
          fieldName="accept"
          fieldLabel="Accept Terms and Conditions agreement"
          type="checkbox"
          sendChangeUp={(e) => setAccept(e.currentTarget.checked)}
        />
        <div className="bg-gray-700 border border-gray-700 rounded-md flex p-4">
          <input
            type="file"
            id="image"
            className="filetype"
            onChange={(e) => setFiles(e.currentTarget.files)}
          />
        </div>
        <SelectInput
          name="Country"
          sendChangeUp={(e) => setCountry(e.currentTarget.value)}
        />
        <div className="m-4">
          <button className="m-4">Reset</button>
          <button className="m-4" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
