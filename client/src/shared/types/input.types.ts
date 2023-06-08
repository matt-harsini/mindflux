import { Dispatch, Key, SetStateAction } from "react";

export type SetMoodMeter = {
  CARD_HAPPY: null | string;
  CARD_SAD: null | string;
  CARD_ANGRY: null | string;
  CARD_ANXIOUS: null | string;
};

export type InputProps = {
  card_title: string;
  key: Key;
  setMoodMeter: Dispatch<SetStateAction<SetMoodMeter>>;
};

export type MoodMeterKey = keyof SetMoodMeter;
