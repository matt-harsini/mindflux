export type State = {
  CARD_HAPPY: boolean;
  CARD_ANXIOUS: boolean;
  CARD_SAD: boolean;
  CARD_ANGRY: boolean;
};

export type Action = {
  type: string;
};

export type CardType = keyof State;

