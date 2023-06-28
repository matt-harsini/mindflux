import { Dispatch, SetStateAction } from "react";

export type MoodMeter = {
  CARD_HAPPY: null;
  CARD_SAD: null;
  CARD_ANGRY: null;
  CARD_ANXIOUS: null;
};

export type InputProps = {
  card_title: string;
  setMoodMeter: Dispatch<SetStateAction<MoodMeter>>;
  moodMeter: MoodMeter;
};

export type MoodMeterKey = keyof MoodMeter;
