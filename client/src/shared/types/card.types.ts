import { Dispatch, DispatchWithoutAction, SetStateAction } from "react";

type MoodMeter = {
  CARD_HAPPY: null;
  CARD_SAD: null;
  CARD_ANXIOUS: null;
  CARD_ANGRY: null;
};

export type Action = {
  type: string;
};

export type CardProps = {
  icon: string;
  title: string;
  id: string;
  state: boolean;
  dispatch: Dispatch<Action>;
  setMoodMeter: Dispatch<SetStateAction<MoodMeter>>;
};

export type CardData = {
  icon: string;
  title: string;
  id: string;
};
