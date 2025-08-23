interface RadioInputProps {
  name: string;
  values: string[];
  sendChangeUp?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function RadioInput(props: RadioInputProps) {
  const name = props.name.toLocaleLowerCase();
  return (
    <div className="flex m-2">
      {props.values.map((value: string) => (
        <label key={value} className="mr-4 flex-none">
          <input
            className="flex-1 bg-gray-700 border border-gray-500 border-solid rounded-md px-2"
            type="radio"
            name={name}
            value={value}
            onChange={props.sendChangeUp}
          />
          {value}
        </label>
      ))}
    </div>
  );
}
