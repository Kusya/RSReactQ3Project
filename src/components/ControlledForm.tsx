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
      <div className="absolute  inset-x-144 top-16 h-128 w-84  border border-solid rounded-md p-4">
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
          placeholderText="Enter the same Password second time"
          sendChangeUp={(e) => setPass2(e.currentTarget.value)}
        />
        <RadioInput
          name="gender"
          values={['Male', 'Female', 'Other']}
          sendChangeUp={(e) => setGender(e.currentTarget.value)}
        />
        <CustomInput
          fieldName="accept"
          fieldLabel="accept Terms and Conditions agreement"
          type="checkbox"
          placeholderText="Enter the same Password second time"
          sendChangeUp={(e) => setAccept(e.currentTarget.checked)}
        />
        <div>
          <input
            type="file"
            id="image"
            className="filetype"
            onChange={(e) => setFiles(e.currentTarget.files)}
          />
        </div>
        <div>
          <SelectInput
            name="Country"
            sendChangeUp={(e) => setCountry(e.currentTarget.value)}
          />
        </div>
        <button>Reset</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
