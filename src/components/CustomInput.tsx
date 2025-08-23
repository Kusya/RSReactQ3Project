interface InputProps {
  fieldName: string;
  placeholderText: string;
  type: string;
  fieldLabel?: string;
}
export default function Input(props: InputProps) {
  const name = props.fieldName.toLocaleLowerCase();
  return (
    <div className="flex m-2">
      <label className="mr-4 flex-none" htmlFor={name}>
        {props.fieldLabel ? props.fieldLabel + ' ' : props.fieldName + ' '}
        <input
          className="flex-1 bg-gray-700 border border-gray-500 border-solid rounded-md px-2"
          type={props.type}
          name={name}
          placeholder={props.placeholderText}
        />
      </label>
    </div>
  );
}
