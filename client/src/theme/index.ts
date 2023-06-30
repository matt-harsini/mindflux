import { CardData } from "../shared/types";
import {
  Colors,
  Feelings,
  InputIcons,
} from "../shared/interfaces/input.interface";

export const icons: CardData[] = [
  {
    icon: "fa-face-smile",
    title: "Happy",
    id: "CARD_HAPPY",
  },
  {
    icon: "fa-face-worried",
    title: "Anxious",
    id: "CARD_ANXIOUS",
  },
  {
    icon: "fa-face-disappointed",
    title: "Sad",
    id: "CARD_SAD",
  },
  {
    icon: "fa-face-angry",
    title: "Angry",
    id: "CARD_ANGRY",
  },
];

export const inputIcons: InputIcons = {
  CARD_ANXIOUS: {
    1: "fa-face-diagonal-mouth",
    2: "fa-face-confused",
    3: "fa-face-worried",
    4: "fa-face-sad-sweat",
    5: "fa-face-anxious-sweat",
  },
  CARD_HAPPY: {
    1: "fa-face-meh",
    2: "fa-face-smile",
    3: "fa-face-smile-beam",
    4: "fa-face-grin-beam",
    5: "fa-face-laugh-beam",
  },
  CARD_SAD: {
    1: "fa-face-frown-slight",
    2: "fa-face-frown",
    3: "fa-face-disappointed",
    4: "fa-face-sad-tear",
    5: "fa-face-sad-cry",
  },
  CARD_ANGRY: {
    1: "fa-face-expressionless",
    2: "fa-face-unamused",
    3: "fa-face-angry",
    4: "fa-face-pouting",
    5: "fa-face-nose-steam",
  },
};

export const colors: Colors = {
  CARD_HAPPY: "text-green-500",
  CARD_SAD: "text-accent",
  CARD_ANXIOUS: "text-secondary",
  CARD_ANGRY: "text-red-400",
};

export const progressColors: Colors = {
  CARD_HAPPY: "progress-success",
  CARD_SAD: "progress-accent",
  CARD_ANXIOUS: "progress-secondary",
  CARD_ANGRY: "progress-error",
};

export const feelings: Feelings = {
  CARD_HAPPY: "Happiness",
  CARD_SAD: "Sadness",
  CARD_ANXIOUS: "Anxiety",
  CARD_ANGRY: "Anger",
};
