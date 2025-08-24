import { useRef, useState, type FormEvent } from 'react';
import CustomInput from './CustomInput';
import { addItem } from './../store/authorizationDataSlice';
import { useAppDispatch } from './../store/hooks';
import RadioInput from './RadioInput';
import SelectInput from './SelectInput';
import { authSchema } from '../validation/authSchema';
import type { AuthFormData } from '../types/AuthFormData';

export default function UncontrolledForm() {
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const rawData: AuthFormData = {
      name: String(formData.get('name') || ''),
      age: Number(formData.get('age') || 0),
      email: String(formData.get('email') || ''),
      password: String(formData.get('password') || ''),
      password2: String(formData.get('password2') || ''),
      gender: formData.get('gender') as 'male' | 'female' | 'other',
      acceptRules: formData.get('acceptRules') === 'on',
      country: String(formData.get('country') || ''),
      image: undefined as string | undefined,
    };

    const file = (
      formRef.current.elements.namedItem('image') as HTMLInputElement
    )?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        rawData.image = base64String.split(',')[1];
      };
    }

    const result = authSchema.safeParse(rawData);

    if (!result.success) {
      const zodError = result.error;
      const fieldErrors: Record<string, string> = {};

      zodError.issues.forEach((err) => {
        const field = String(err.path[0]);
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    const user = {
      id: rawData.name + '-id',
      name: rawData.name,
      age: rawData.age,
      email: rawData.email,
      password: rawData.password,
      password2: rawData.password2,
      gender: rawData.gender,
      acceptRules: rawData.acceptRules,
      image: rawData.image ?? '',
      country: rawData.country,
    };
    dispatch(addItem(user));
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <h2>Authorization Uncontrolled</h2>
      <div className="inset-x-16 top-16 h-128 w-100 border border-solid rounded-md p-4">
        <CustomInput
          fieldName="Name"
          type="text"
          placeholderText="Enter your name"
          error={errors.name}
        />
        <CustomInput
          fieldName="Age"
          type="number"
          placeholderText="Enter your last name"
          error={errors.age}
        />
        <CustomInput
          fieldName="Email"
          type="text"
          placeholderText="Enter email"
          error={errors.email}
        />
        <CustomInput
          fieldName="Password"
          type="password"
          placeholderText="Enter Password"
          error={errors.password}
        />
        <CustomInput
          fieldName="Password2"
          fieldLabel="Password(repeat)"
          type="password"
          placeholderText="Enter the same Password"
          error={errors.password2}
        />
        <RadioInput
          name="Gender"
          values={['Male', 'Female', 'Other']}
          error={errors.gender}
        />
        <CustomInput
          fieldName="accept"
          fieldLabel="Accept Terms and Conditions agreement"
          type="checkbox"
          error={errors.acceptRules}
        />
        <div className="bg-gray-700 border border-gray-700 rounded-md flex p-4">
          <input
            type="file"
            id="image"
            name="image"
            className="filetype"
            accept="image/png,image/jpeg"
          />
          {errors.image && (
            <p className="text-red-500 text-xs">{errors.image}</p>
          )}
        </div>
        <div>
          <SelectInput name="Country" error={errors.country} />
        </div>
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
