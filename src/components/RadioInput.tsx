interface RadioInputProps {
  name: string;
  values: string[];
  sendChangeUp?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function RadioInput(props: RadioInputProps) {
  const name = props.name.toLocaleLowerCase();
  return (
    <div className="flex m-3">
      <label className="mr-4">{props.name}</label>
      {props.values.map((value: string) => (
        <>
          <label key={value} className="flex-none italic ">
            {value}
          </label>
          <input
            className="flex-1 mr-2 bg-gray-700 border border-gray-500 border-solid rounded-md px-2"
            type="radio"
            name={name}
            value={value}
            onChange={props.sendChangeUp}
          />
        </>
      ))}
    </div>
  );
}
