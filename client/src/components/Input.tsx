import { useState, useRef } from "react";
import { InputProps } from "../shared/types";
import { motion } from "framer-motion";
import { Feelings } from "../shared/interfaces";
import { inputIcons } from "../theme/icons";

const feelings: Feelings = {
  CARD_HAPPY: "Happiness",
  CARD_SAD: "Sadness",
  CARD_ANXIOUS: "Anxiety",
  CARD_ANGRY: "Anger",
};

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Input({ card_title }: InputProps) {
  const [input, setInput] = useState<string>("1");
  const [position, setPosition] = useState({
    x: 0,
  });
  const [isAnimation, setIsAnimating] = useState(false);
  const emoji = useRef<HTMLDivElement>(null);

  function changeInput(e: React.MouseEvent) {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.nodeName === "UL") return;
    if (!emoji.current) return;
    const emojiParent = emoji.current.closest("li");
    if (!emojiParent) return;
    const { innerText } = e.target as HTMLElement;
    const target = emoji.current
      .closest("ul")
      ?.querySelector(`[data-value='${innerText}']`) as HTMLElement;
    const targetDimensions = target.getBoundingClientRect();
    const emojiParentDimensions: DOMRect = emojiParent.getBoundingClientRect();
    setPosition({
      x: targetDimensions.left - emojiParentDimensions.left,
    });
    setInput(innerText);
  }

  function handleAnimationEnd() {
    setIsAnimating(false);
  }
  function handleAnimationStart() {
    setIsAnimating(true);
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
          <motion.span
            variants={variants}
            animate={input === "1" ? "hidden" : "visible"}
          >
            1
          </motion.span>
          <motion.div
            transition={{ ease: [0.42, 0, 0.58, 1] }}
            ref={emoji}
            animate={position}
            onAnimationStart={handleAnimationStart}
            onAnimationComplete={handleAnimationEnd}
            className={`z-30 flex items-center justify-center w-full h-full absolute pointer-events-none`}
          >
            <span
              className={`fa-solid ${inputIcons[card_title][input]} scale-[2.1] lg:scale-[3.7] text-accent`}
            />
          </motion.div>
        </li>
        <li
          data-value="2"
          className="bg-base-300 rounded-full text-xl cursor-pointer w-[64px] h-[64px] lg:w-[96px] lg:h-[96px] flex items-center justify-center relative"
        >
          <motion.span
            variants={variants}
            animate={input === "2" ? "hidden" : "visible"}
          >
            2
          </motion.span>
        </li>
        <li
          data-value="3"
          className="bg-base-300 rounded-full text-xl cursor-pointer w-[64px] h-[64px] lg:w-[96px] lg:h-[96px] flex items-center justify-center relative"
        >
          <motion.span
            variants={variants}
            animate={input === "3" ? "hidden" : "visible"}
          >
            3
          </motion.span>
        </li>
        <li
          data-value="4"
          className="bg-base-300 rounded-full text-xl cursor-pointer w-[64px] h-[64px] lg:w-[96px] lg:h-[96px] flex items-center justify-center relative"
        >
          <motion.span
            variants={variants}
            animate={input === "4" ? "hidden" : "visible"}
          >
            4
          </motion.span>
        </li>
        <li
          data-value="5"
          className="bg-base-300 rounded-full text-xl cursor-pointer w-[64px] h-[64px] lg:w-[96px] lg:h-[96px] flex items-center justify-center relative"
        >
          <motion.span
            variants={variants}
            animate={input === "5" ? "hidden" : "visible"}
          >
            5
          </motion.span>
        </li>
      </ul>
    </div>
  );
}
