import { useContext } from "react";
import { ArrayCtx } from "../context/arrayContext";
import { Item } from "./sorter_abstract";
import useAudio from "./use_audio";

export const useSorterAudio = () => {
  const firstAudio = useAudio("/audio/note1.mp3");
  const secondAudio = useAudio("/audio/note2.mp3");
  const thirdAudio = useAudio("/audio/note3.mp3");
  const fourthAudio = useAudio("/audio/note4.mp3");
  const fifthAudio = useAudio("/audio/note5.mp3");
  const sixthAudio = useAudio("/audio/note6.mp3");
  const seventhAudio = useAudio("/audio/note7.mp3");
  const eighthAudio = useAudio("/audio/note8.mp3");
  const ninthAudio = useAudio("/audio/note9.mp3");
  const tenthAudio = useAudio("/audio/note10.mp3");
  const eleventhAudio = useAudio("/audio/note11.mp3");
  const twelfthAudio = useAudio("/audio/note12.mp3");
  const sortedAudio = useAudio("/audio/sorted.wav");

  const { animate, speedRef } = useContext(ArrayCtx);
  const maxNote = 12;
  const getAudioFromValue = (value: number, min: number, max: number) => {
    const range = max - min;
    const valueRange = value - min;
    const percentage = valueRange / range;
    // get audio no from percentage range from 1-12;
    const audioNo = Math.floor(percentage * maxNote) + 1;
    if (audioNo > maxNote) return maxNote;
    return audioNo;
  };
  const playSortedAudio = async () => {
    await animate(speedRef.current);
    console.log("play sorted audio");
    console.log("With Speed", speedRef.current);

    const [isPlaying, toggle] = sortedAudio;
    toggle();
  };

  const playAudio = (value: number, min: number, max: number) => {
    const audioNo = getAudioFromValue(value, min, max);

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
      case 9:
        player = ninthAudio;
        break;
      case 10:
        player = tenthAudio;
        break;
      case 11:
        player = eleventhAudio;
        break;
      case 12:
        player = twelfthAudio;
        break;
    }
    const [playing, toggle] = player;
    toggle();
  };

  return { playAudio, playSortedAudio };
};
