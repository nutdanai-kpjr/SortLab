import styles from "../../styles/Dropdown.module.css";
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
      data-cy={"algorithm-dropdown"}
      className={styles.dropdownItem}
      onChange={(e) => {
        const name = e.target.value;
        onChange(name);
      }}
    >
      {/* <optgroup> */}
      {list.map((v, i) => (
        <option key={i} value={v} className={styles.dropdownItem}>
          {v}
        </option>
      ))}
      {/* </optgroup> */}
    </select>
  );
}
