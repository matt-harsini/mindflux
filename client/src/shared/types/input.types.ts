import { Dispatch, Key, SetStateAction } from "react";

type SetMoodMeter = {
  CARD_HAPPY: null;
  CARD_SAD: null;
  CARD_ANGRY: null;
  CARD_ANXIOUS: null;
};

export type InputProps = {
  card_title: string;
  key: Key;
  setMoodMeter: Dispatch<SetStateAction<SetMoodMeter>>;
};
