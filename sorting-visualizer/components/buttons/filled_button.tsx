import { NextPage } from "next";

interface Props {
  title: string;
  onClick?: () => void;
}

const FilledButton: NextPage<Props> = ({ title, onClick }) => {
  // using destructuring to get username

  return <button onClick={onClick}>{title}</button>;
};

// export component
export default FilledButton;
