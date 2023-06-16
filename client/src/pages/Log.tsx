import { format, formatISO, startOfToday } from "date-fns";
import { Key, useReducer, useState } from "react";
import { Card } from "../components";
import Input from "../components/Input";
import { CardState } from "../shared/interfaces";
import { Action, CardType, State } from "../shared/types";
import { icons } from "../theme";
import { useMutation } from "react-query";
import { authFetch } from "../utils";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
  const [log, setLog] = useState("");
  const [moodMeter, setMoodMeter] = useState({
    CARD_HAPPY: null,
    CARD_SAD: null,
    CARD_ANGRY: null,
    CARD_ANXIOUS: null,
  });
  const [btnLogClicked, setBtnLogClicked] = useState(false);

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

  const handleLog = () => {
    mutate();
    setBtnLogClicked(true);
  };

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () =>
      authFetch.post("/log-mood", {
        moodMeter,
        log,
        date: formatISO(new Date()),
      }),
  });

  if (btnLogClicked) {
    setTimeout(() => {
      navigate("/dashboard/calendar");
    }, 2000);
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="flex flex-col items-center justify-center gap-y-3"
      >
        <h4 className="text-4xl text-white">
          Thanks for
          <span className="text-accent"> sharing!</span>
        </h4>
        <span className="text-accent fa-solid fa-face-smile-beam text-4xl mt-2" />
      </motion.div>
    );
  }

  return (
    <>
      <h3 className="text-2xl text-center sm:text-3xl mx-auto lg:mx-0 text-primary-content lg:text-4xl font-bold mb-7 sm:text-start">
        {format(startOfToday(), "MMMM do, yyy")}
      </h3>
      <div className="flex flex-col mx-auto gap-10 pb-10">
        <h4 className="text-xl text-primary-content lg:text-3xl font-bold mx-auto">
          How are you feeling?
        </h4>
        <div className="flex flex-col items-center gap-16 md:flex-row justify-between md:gap-4 max-w-[1280px] w-full mx-auto">
          {icons.map(({ icon, title, id }, i) => {
            return (
              <Card
                key={i}
                icon={icon}
                title={title}
                state={cardState[i]}
                dispatch={dispatch}
                setMoodMeter={setMoodMeter}
                id={id}
              />
            );
          })}
        </div>
        {cardClicked && (
          <h4 className="text-xl text-primary-content lg:text-3xl font-bold mx-auto text-center">
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
                  setMoodMeter={setMoodMeter}
                  moodMeter={moodMeter}
                />
              )
            );
          })}
        </div>
        {cardClicked && (
          <>
            <h4 className="text-xl text-primary-content lg:text-3xl font-bold mx-auto text-center px-8 lg:px-0">
              What has you feeling this way?
            </h4>
            <textarea
              value={log}
              onChange={(e) => {
                setLog(e.target.value);
              }}
              className="textarea resize-none text-md w-full max-w-[780px] mx-auto text-primary-content bg-base-200"
            />
            <button
              onClick={handleLog}
              type="button"
              className="btn btn-secondary self-center"
            >
              Log Mood
            </button>
          </>
        )}
      </div>
    </>
  );
}
