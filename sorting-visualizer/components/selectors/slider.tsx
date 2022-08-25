import { useState } from "react";
import styles from "../../styles/Bar.module.css";

export const Slider = ({ onValueChanged }: { onValueChanged: () => void }) => {
  const [value, setValue] = useState(10);
  const handleChange = (e: any) => {
    onValueChanged();
  };

  return <div className={styles.container}>{value}</div>;
};
