import { useState, useRef } from "react";
import { InputProps } from "../shared/types";
import { motion } from "framer-motion";
import { colors, inputIcons } from "../theme";
import { feelings } from "../theme";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Input({ card_title, setMoodMeter }: InputProps) {
  const [input, setInput] = useState<string>("1");
  const emoji = useRef<HTMLDivElement>(null);
  const emojiParent = useRef<HTMLUListElement>(null);

  function changeInput(e: React.MouseEvent) {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.nodeName === "UL") return;
    if (!emoji.current) return;
    if (!emojiParent) return;
    if (e.target.innerText === input) return;
    const { innerText } = e.target as HTMLElement;
    const target = emojiParent.current?.querySelector(
      `[data-value='${innerText}']`
    ) as HTMLElement;
    setInput(innerText);
    setMoodMeter((prevState) => {
      return { ...prevState, [card_title]: Number(innerText) };
    });
    target.appendChild(emoji.current as Node);
  }

  return (
    <div className="flex flex-col gap-4 ">
      <h6 className="text-center font-semibold text-md">
        {feelings[card_title]}
      </h6>
      <ul
        onClick={changeInput}
        className="flex justify-evenly"
        ref={emojiParent}
      >
        <li
          data-value="1"
          className="bg-base-200 rounded-full text-xl cursor-pointer w-[64px] h-[64px] lg:w-[80px] lg:h-[80px] xl:w-[96px] xl:h-[96px] flex items-center justify-center relative"
        >
          <motion.span
            variants={variants}
            animate={input === "1" ? "hidden" : "visible"}
            className="w-full h-full flex items-center justify-center"
          >
            1
          </motion.span>
          <motion.div
            ref={emoji}
            className={`z-30 flex items-center justify-center w-full h-full absolute pointer-events-none`}
          >
            <span
              className={`fa-solid ${inputIcons[card_title][input]} text-5xl lg:text-6xl xl:text-7xl ${colors[card_title]}`}
            />
          </motion.div>
        </li>
        <li
          data-value="2"
          className="bg-base-200 rounded-full text-xl cursor-pointer w-[64px] h-[64px] lg:w-[80px] lg:h-[80px] xl:w-[96px] xl:h-[96px] flex items-center justify-center relative"
        >
          <motion.span
            variants={variants}
            animate={input === "2" ? "hidden" : "visible"}
            className="w-full h-full flex items-center justify-center"
          >
            2
          </motion.span>
        </li>
        <li
          data-value="3"
          className="bg-base-200 rounded-full text-xl cursor-pointer w-[64px] h-[64px] lg:w-[80px] lg:h-[80px] xl:w-[96px] xl:h-[96px] flex items-center justify-center relative"
        >
          <motion.span
            variants={variants}
            animate={input === "3" ? "hidden" : "visible"}
            className="w-full h-full flex items-center justify-center"
          >
            3
          </motion.span>
        </li>
        <li
          data-value="4"
          className="bg-base-200 rounded-full text-xl cursor-pointer w-[64px] h-[64px] lg:w-[80px] lg:h-[80px] xl:w-[96px] xl:h-[96px] flex items-center justify-center relative"
        >
          <motion.span
            variants={variants}
            animate={input === "4" ? "hidden" : "visible"}
            className="w-full h-full flex items-center justify-center"
          >
            4
          </motion.span>
        </li>
        <li
          data-value="5"
          className="bg-base-200 rounded-full text-xl cursor-pointer w-[64px] h-[64px] lg:w-[80px] lg:h-[80px] xl:w-[96px] xl:h-[96px] flex items-center justify-center relative"
        >
          <motion.span
            variants={variants}
            animate={input === "5" ? "hidden" : "visible"}
            className="w-full h-full flex items-center justify-center"
          >
            5
          </motion.span>
        </li>
      </ul>
    </div>
  );
}
