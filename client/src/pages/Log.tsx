import { format, startOfToday } from "date-fns";
import { Key, useReducer } from "react";
import { Card } from "../components";
import Input from "../components/Input";
import { CardState } from "../shared/interfaces";
import { Action, CardType, State } from "../shared/types";
import { icons } from "../theme/icons";

const defaultCardState = {
  CARD_HAPPY: false,
  CARD_ANXIOUS: false,
  CARD_SAD: false,
  CARD_ANGRY: false,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "CARD_HAPPY":
      return {
        ...state,
        CARD_HAPPY: !state.CARD_HAPPY,
      };
    case "CARD_ANXIOUS":
      return {
        ...state,
        CARD_ANXIOUS: !state.CARD_ANXIOUS,
      };
    case "CARD_SAD":
      return {
        ...state,
        CARD_SAD: !state.CARD_SAD,
      };
    case "CARD_ANGRY":
      return {
        ...state,
        CARD_ANGRY: !state.CARD_ANGRY,
      };
  }
  throw new Error(`No matching ${action.type}`);
}

export default function Log() {
  const [state, dispatch] = useReducer(reducer, defaultCardState);

  const stateData = Object.keys(state).map((key: string) => [
    key,
    state[key as CardType],
  ]);

  const cardState: CardState = {
    0: state.CARD_HAPPY,
    1: state.CARD_ANXIOUS,
    2: state.CARD_SAD,
    3: state.CARD_ANGRY,
  };

  const cardClicked: boolean =
    state.CARD_ANGRY ||
    state.CARD_ANXIOUS ||
    state.CARD_HAPPY ||
    state.CARD_SAD;

  return (
    <main className="flex flex-col max-w-[1280px] mx-auto px-6 mb-4">
      <h3 className="mx-auto lg:mx-0 text-primary-content text-4xl font-bold">
        {format(startOfToday(), "MMMM do, yyy")}
      </h3>
      <h4 className="text-primary-content text-3xl font-bold mx-auto my-16">
        How are you feeling?
      </h4>
      <div className="flex flex-col items-center gap-12 md:flex-row justify-between md:gap-4">
        {icons.map(({ icon, title, id }, i) => {
          return (
            <Card
              key={i}
              icon={icon}
              title={title}
              state={cardState[i]}
              dispatch={dispatch}
              id={id}
            />
          );
        })}
      </div>
      {cardClicked && (
        <h4 className="text-primary-content text-3xl font-bold mx-auto my-16">
          How strong are these feelings?
        </h4>
      )}
      <div className="flex flex-col gap-12">
        {stateData.map(([card_title, flag]) => {
          return (
            flag && (
              <Input
                key={card_title as Key}
                card_title={card_title as string}
              />
            )
          );
        })}
      </div>
      {cardClicked && (
        <>
          <h4 className="text-primary-content text-3xl font-bold mx-auto my-16">
            What has you feeling this way?
          </h4>
          <textarea className="textarea resize-none text-md w-full max-w-[780px] mx-auto text-primary-content bg-base-300" />
          <button type="button" className="btn btn-secondary self-center mt-12">
            Log Mood
          </button>
        </>
      )}
    </main>
  );
}
