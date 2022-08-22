import styles from '../../styles/Bar.module.css'

export default function Bar({ value, color }: { value: number, color: string }) {
    return ( <div 
      style={ { height: `${value}%`, backgroundColor: color } }
      className={styles.container}
      
      >{value}</div>);
  }