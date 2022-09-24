import { useMemo, useEffect, useState } from "react";

const useAudio = (url: string) => {
  const audio = useMemo<HTMLAudioElement | undefined>(
    () => (typeof Audio !== "undefined" ? new Audio(url) : undefined),
    []
  );
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio?.play() : audio?.pause();
  }, [playing]);

  useEffect(() => {
    audio?.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio?.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle] as const;
};

export default useAudio;
