import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import CustomInput from './CustomInput';
import { addItem } from './../store/authorizationDataSlice';
import { useAppDispatch } from './../store/hooks';
import RadioInput from './RadioInput';
import SelectInput from './SelectInput';
import { authSchema } from '../validation/authSchema';
import type { AuthFormData } from '../types/AuthFormData';

interface UncontrolledFormProps {
  onClose: () => void;
}

export default function UncontrolledForm({ onClose }: UncontrolledFormProps) {
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  let filestring = '';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    const formEls = formRef?.current?.elements;

    const rawData: AuthFormData = {
      name: String(
        (formEls?.namedItem('name') as HTMLInputElement).value || ''
      ),
      age: Number((formEls?.namedItem('age') as HTMLInputElement).value || 0),
      email: String(
        (formEls?.namedItem('email') as HTMLInputElement).value || ''
      ),
      password: String(
        (formEls?.namedItem('password') as HTMLInputElement).value || ''
      ),
      password2: String(
        (formEls?.namedItem('password2') as HTMLInputElement).value || ''
      ),
      gender: (
        formEls?.namedItem('gender') as HTMLInputElement
      ).value.toLocaleLowerCase() as 'male' | 'female' | 'other',
      acceptRules: (formEls?.namedItem('accept') as HTMLInputElement).checked,
      country: String(
        (formEls?.namedItem('countries') as HTMLInputElement).value || ''
      ),
      image: undefined as string | undefined,
    };

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
      image: filestring ?? '',
      country: rawData.country,
    };
    dispatch(addItem(user));
    onClose();
  };

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        filestring = fileReader.result as string;
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files ? event?.target?.files[0] : null; // Get the first selected file
    if (file) {
      convertToBase64(file);
    }
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
          placeholderText="Enter your age"
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
          fieldLabel="Confirm password"
          type="password"
          placeholderText="Confirm Password"
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
            onChange={handleFileChange}
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
