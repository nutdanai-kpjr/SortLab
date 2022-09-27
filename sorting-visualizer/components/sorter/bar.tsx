import styles from "../../styles/Bar.module.css";

export default function Bar({
  value,
  color,
  leanMode = false,
  index,
}: {
  value: number;
  color: string;
  leanMode?: boolean;
  index: number;
}) {
  const marginLeft = leanMode ? 0 : 2;
  return (
    <div
      data-cy={`bar-${index}`}
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
