import { useRef, useState } from "react";

export const useStateWithRef = <T,>(initialValue: T) => {
  const ref = useRef<T>(initialValue);
  const [state, setState] = useState<T>(initialValue);

  const updateState = (newState: T) => {
    ref.current = newState;
    setState(ref.current);
  };

  return [state, updateState, ref] as const;
};
