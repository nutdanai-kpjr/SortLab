import { useContext, useEffect } from "react";
import { ArrayCtx } from "../context/arrayContext";
import { Item } from "./sorter_abstract";
import useAudio from "./use_audio";
import { useStateWithRef } from "./use_state_with_ref";

export interface audioPlayer {
  isAudioOn: boolean;
  toggleAudio: () => void;
  playAudio: (type: AudioType) => void;
}
export enum AudioType {
  Default = "default",
  Sorted = "sorted",
  Special = "special",
  Success = "success",
}
export const useSorterAudio = ({
  speedRef,
}: {
  speedRef: React.MutableRefObject<number>;
}) => {
  const sortedAudio = useAudio("/audio/sorted.wav");
  const specialAudio = useAudio("/audio/special.wav");
  const defaultAudio = useAudio("/audio/default.wav");
  const successAudio = useAudio("/audio/success.wav");

  const [isAudioOn, setIsAudioOn, isAudioOnRef] =
    useStateWithRef<boolean>(true);

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOnRef.current);
  };

  const playAudio = (type: AudioType) => {
    let speed = speedRef.current;
    console.log("Speed", speed);

    if (!isAudioOnRef.current) return;
    let audio = defaultAudio;
    switch (type) {
      case AudioType.Default:
        audio = defaultAudio;
        break;
      case AudioType.Sorted:
        audio = sortedAudio;
        break;
      case AudioType.Special:
        audio = specialAudio;
        break;
      case AudioType.Success:
        audio = successAudio;
        break;
    }

    if (speed >= 970 && type !== AudioType.Success) {
      audio = defaultAudio;
    }
    audio.play();
  };

  return { playAudio, toggleAudio, isAudioOn };
};
