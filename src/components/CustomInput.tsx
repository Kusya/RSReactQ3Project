interface InputProps {
  fieldName: string;
  fieldId: string;
  placeholderText: string;
  type: string;
  fieldLabel?: string;
  ref: React.RefObject<HTMLInputElement | null>;
}
export default function Input(props: InputProps) {
  const name = props.fieldName.toLocaleLowerCase() + '-field';
  const id = props.fieldId.toLocaleLowerCase() + '-field';
  return (
    <div className="flex m-2">
      <label className="mr-4 flex-none" htmlFor={id}>
        {props.fieldLabel ? props.fieldLabel + ' ' : props.fieldName + ' '}
        <input
          className="flex-1 bg-gray-700 border border-gray-500 border-solid rounded-md px-2"
          ref={props.ref}
          type={props.type}
          name={name}
          id={id}
          placeholder={props.placeholderText}
        />
      </label>
    </div>
  );
}
