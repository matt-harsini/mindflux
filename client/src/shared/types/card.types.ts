import { Dispatch } from "react";

export type Action = {
  type: string;
};

export type CardProps = {
  icon: string;
  title: string;
  id: string;
  state: boolean;
  dispatch: Dispatch<Action>;
};

export type CardData = {
  icon: string;
  title: string;
  id: string;
};
