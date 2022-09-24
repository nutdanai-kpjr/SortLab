import { useContext } from "react";
import { ArrayCtx } from "../context/arrayContext";
import useAudio from "./use_audio";

export const useSorterAudio = () => {
  const firstAudio = useAudio("/audio/1-do.wav");
  const secondAudio = useAudio("/audio/2-re.wav");
  const thirdAudio = useAudio("/audio/3-mi.wav");
  const fourthAudio = useAudio("/audio/4-fa.wav");
  const fifthAudio = useAudio("/audio/5-sol.wav");
  const sixthAudio = useAudio("/audio/6-la.wav");
  const seventhAudio = useAudio("/audio/7-si.wav");
  const eighthAudio = useAudio("/audio/8-do-octave.wav");

  const { itemArrayRef } = useContext(ArrayCtx);

  const getAudioNoFromIndex = (index: number) => {
    const totalLength = [...itemArrayRef.current].length;
    const audioNo = Math.ceil(((index + 1) / totalLength) * 8);
    return audioNo;
  };
  const playAudio = (index: number) => {
    const audioNo = getAudioNoFromIndex(index);
    let player = firstAudio;
    switch (audioNo) {
      case 1:
        player = firstAudio;
        break;
      case 2:
        player = secondAudio;
        break;
      case 3:
        player = thirdAudio;
        break;
      case 4:
        player = fourthAudio;
        break;
      case 5:
        player = fifthAudio;
        break;
      case 6:
        player = sixthAudio;
        break;
      case 7:
        player = seventhAudio;
        break;
      case 8:
        player = eighthAudio;
        break;
    }
    const [playing, toggle] = player;
    toggle();
  };

  return { playAudio };
};
