import styles from "../../styles/Bar.module.css";

export default function Bar({
  value,
  color,
  leanMode = false,
}: {
  value: number;
  color: string;
  leanMode?: boolean;
}) {
  const marginLeft = leanMode ? 0 : 2;
  return (
    <div
      style={{
        height: `${value}%`,
        backgroundColor: color,
        marginLeft: `${marginLeft}px`,
      }}
      className={styles.container}
    >
      {!leanMode ? value : ""}
    </div>
  );
}
