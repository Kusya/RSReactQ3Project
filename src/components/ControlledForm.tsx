import { useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomInput from './CustomInput';
import { addItem } from '../store/authorizationDataSlice';
import { useAppDispatch } from '../store/hooks';
import RadioInput from './RadioInput';
import SelectInput from './SelectInput';
import { authSchema } from '../validation/authSchema';
import type { AuthFormData } from '../types/AuthFormData';

interface ControlledFormProps {
  onClose: () => void;
}
export default function ControlledForm({ onClose }: ControlledFormProps) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
  });
  const [filestring, setFS] = useState<string>();

  const onSubmit = (data: AuthFormData) => {
    const user = {
      id: data.name + '-id',
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      password2: data.password2,
      gender: data.gender,
      acceptRules: data.acceptRules,
      image: filestring ?? '',
      country: data.country,
    };
    dispatch(addItem(user));
    onClose();
  };

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setFS(fileReader.result as string);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Authorization Controlled</h2>
      <div className="w-128 border border-solid rounded-md">
        <CustomInput
          fieldName="Name"
          type="text"
          placeholderText="Enter your name"
          register={register('name')}
          error={errors.name?.message}
        />
        <CustomInput
          fieldName="Age"
          type="number"
          placeholderText="Enter your age"
          register={register('age', { valueAsNumber: true })}
          error={errors.age?.message}
        />
        <CustomInput
          fieldName="Email"
          type="text"
          placeholderText="Enter email"
          register={register('email')}
          error={errors.email?.message}
        />
        <CustomInput
          fieldName="Password"
          type="password"
          placeholderText="Enter Password"
          register={register('password')}
          error={errors.password?.message}
        />
        <CustomInput
          fieldName="Password2"
          fieldLabel="Password (repeat)"
          type="password"
          placeholderText="Enter the same Password"
          register={register('password2')}
          error={errors.password2?.message}
        />
        <RadioInput
          name="Gender"
          values={['male', 'female', 'other']}
          register={register('gender')}
          error={errors.gender?.message}
        />
        <CustomInput
          fieldName="acceptRules"
          fieldLabel="Accept Terms and Conditions agreement"
          type="checkbox"
          register={register('acceptRules')}
          error={errors.acceptRules?.message}
        />
        <div className="bg-gray-700 border border-gray-700 rounded-md flex p-4">
          <input
            type="file"
            id="image"
            className="filetype"
            onChange={handleFileChange}
          />
        </div>
        <SelectInput
          name="Country"
          register={register('country')}
          error={errors.country?.message}
        />
        <div className="m-4">
          <button className="m-3" type="reset">
            Reset
          </button>
          <button
            type="submit"
            //disabled={!isValid}
            className={`m-3 px-4 py-2 rounded ${
              isValid
                ? 'bg-blue-500 text-white cursor-pointer'
                : 'bg-gray-500 text-gray-300 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
