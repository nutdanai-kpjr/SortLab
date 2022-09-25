import { useContext } from "react";
import { ArrayCtx } from "../context/arrayContext";
import { Item } from "./sorter_abstract";
import useAudio from "./use_audio";

export const useSorterAudio = () => {
  const sortedAudio = useAudio("/audio/sorted.wav");
  const specialAudio = useAudio("/audio/special.wav");
  const defaultAudio = useAudio("/audio/default.wav");
  const winAudio = useAudio("/audio/win.wav");

  const { animate, speedRef } = useContext(ArrayCtx);

  const playSortedAudio = async () => {
    await animate(speedRef.current);

    sortedAudio.play();
  };
  const playSpecialAudio = async () => {
    specialAudio.play();
  };
  const playWinAudio = async () => {
    winAudio.play();
  };
  const playAudio = () => {
    defaultAudio.play();
  };

  return { playAudio, playSortedAudio, playSpecialAudio, playWinAudio };
};
