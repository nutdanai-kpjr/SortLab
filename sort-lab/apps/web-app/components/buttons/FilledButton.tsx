import { NextPage } from 'next';
import styles from '../../styles/components/buttons/FilledButton.module.css';
interface Props {
  title: string;
  onClick?: () => void;
}

const FilledButton: NextPage<Props> = ({ title, onClick }) => {
  // using destructuring to get username

  return (
    <button className={styles.button} onClick={onClick}>
      {title}
    </button>
  );
};

// export component
export default FilledButton;
