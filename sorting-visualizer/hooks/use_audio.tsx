import { useMemo, useEffect, useState } from "react";

const useAudio = (url: string) => {
  const audio = useMemo<HTMLAudioElement | undefined>(
    () => (typeof Audio !== "undefined" ? new Audio(url) : undefined),
    []
  );
  const [playing, setPlaying] = useState(false);

  const play = () => audio?.play();

  return { play };
};

export default useAudio;
