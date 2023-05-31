import { useState, useRef } from "react";
import { InputProps } from "../shared/types";
import { motion } from "framer-motion";
import { Feelings } from "../shared/interfaces";

const feelings: Feelings = {
  CARD_HAPPY: "Happiness",
  CARD_SAD: "Sadness",
  CARD_ANXIOUS: "Anxiety",
  CARD_ANGRY: "Anger",
};

export default function Input({ card_title }: InputProps) {
  const [input, setInput] = useState("1");
  const [position, setPosition] = useState({ x: 0 });
  const emoji = useRef<HTMLDivElement>(null);

  function changeInput(e: React.MouseEvent) {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.nodeName === "UL") return;
    if (!emoji.current) return;

    const { innerText } = e.target as HTMLElement;
    const target = emoji.current
      ?.closest("ul")
      ?.querySelector(`[data-value='${innerText}']`) as HTMLElement;

    const targetDimensions = target.getBoundingClientRect();
    const emojiDimensions: DOMRect = emoji.current.getBoundingClientRect();
    console.log(targetDimensions);

    setPosition({
      x: targetDimensions.left - emojiDimensions.left,
    });
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
          <motion.div
            ref={emoji}
            animate={position}
            className="z-30 flex items-center justify-center w-full h-full absolute transition-transform duration-1000 pointer-events-none"
          >
            <span className="fa-solid fa-face-smile scale-[2.1] lg:scale-[3.7] text-accent" />
          </motion.div>
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
