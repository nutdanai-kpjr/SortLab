export default function Dropdown({
  list,
  defaultValue,
  onChange,
}: {
  list: string[];
  defaultValue: string;
  onChange: (value: string) => void;
}) {
  return (
    <select
      onChange={(e) => {
        const name = e.target.value;
        console.log(name);
        onChange(name);
      }}
    >
      {list.map((v, i) => (
        <option key={i} value={v}>
          {v}
        </option>
      ))}
    </select>
  );
}
