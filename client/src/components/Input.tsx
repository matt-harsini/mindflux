import { useState } from "react";
import { Feelings } from "../shared/interfaces";
import { InputProps } from "../shared/types";
import { motion } from "framer-motion";

const feelings: Feelings = {
  CARD_HAPPY: "Happiness",
  CARD_SAD: "Sadness",
  CARD_ANXIOUS: "Anxiety",
  CARD_ANGRY: "Anger",
};

export default function Input({ card_title }: InputProps) {
  const [input, setInput] = useState("1");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function changeInput(e: React.MouseEvent) {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.nodeName === "UL") return;

    const { innerText } = e.target as HTMLElement;
    const emoji = document.getElementById(
      `${feelings[card_title]}-emoji`
    ) as HTMLElement;

    const target = emoji
      .closest("ul")
      ?.querySelector(`[data-value='${innerText}']`) as HTMLElement;

    const targetDimensions = target.getBoundingClientRect();
    setTarget(targetDimensions);
    setInput(innerText);
  }

  return (
    <div className="flex flex-col gap-4 ">
      <h6 className="text-center font-semibold text-lg">
        {feelings[card_title]}
      </h6>
      <ul onClick={changeInput} className="flex justify-evenly">
        <li
          data-value="1"
          className="bg-base-300 rounded-full text-xl cursor-pointer w-[64px] h-[64px] lg:w-[96px] lg:h-[96px] flex items-center justify-center relative"
        >
          <span>1</span>
          <div
            id={`${feelings[card_title]}-emoji`}
            className="flex items-center justify-center w-full h-full absolute transition-transform duration-1000 pointer-events-none"
          >
            <motion.span className="fa-solid fa-face-smile scale-[2.1] lg:scale-[3.7] text-accent" />
          </div>
        </li>
        <li
          data-value="2"
          className="bg-base-300 rounded-full text-xl cursor-pointer w-[64px] h-[64px] lg:w-[96px] lg:h-[96px] flex items-center justify-center relative"
        >
          <span>2</span>
        </li>
        <li
          data-value="3"
          className="bg-base-300 rounded-full text-xl cursor-pointer w-[64px] h-[64px] lg:w-[96px] lg:h-[96px] flex items-center justify-center relative"
        >
          <span>3</span>
        </li>
        <li
          data-value="4"
          className="bg-base-300 rounded-full text-xl cursor-pointer w-[64px] h-[64px] lg:w-[96px] lg:h-[96px] flex items-center justify-center relative"
        >
          <span>4</span>
        </li>
        <li
          data-value="5"
          className="bg-base-300 rounded-full text-xl cursor-pointer w-[64px] h-[64px] lg:w-[96px] lg:h-[96px] flex items-center justify-center relative"
        >
          <span>5</span>
        </li>
      </ul>
    </div>
  );
}
