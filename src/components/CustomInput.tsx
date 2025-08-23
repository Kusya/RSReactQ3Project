interface InputProps {
  fieldName: string;
  placeholderText?: string;
  type: string;
  fieldLabel?: string;
  sendChangeUp?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input(props: InputProps) {
  const name = props.fieldName.toLocaleLowerCase();

  return (
    <div
      className={
        'flex m-3 ' + (props.type == 'checkbox' ? 'flex-row-reverse' : '')
      }
    >
      <label className="mr-4 flex-none" htmlFor={name}>
        {props.fieldLabel ? props.fieldLabel + ' ' : props.fieldName + ' '}
      </label>
      <input
        className="flex-1 bg-gray-700 border border-gray-500 border-solid rounded-md px-2"
        type={props.type}
        name={name}
        placeholder={props.placeholderText}
        onChange={props.sendChangeUp}
      />
    </div>
  );
}
