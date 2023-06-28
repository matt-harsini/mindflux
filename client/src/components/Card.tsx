import { motion } from "framer-motion";
import { CardProps } from "../shared/types";
import { colors } from "../theme";

const variants = {
  hover: {
    y: -20,
    transition: {
      type: "spring",
      bounce: 0.25,
    },
  },
  default: {
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.25,
    },
  },
};

export default function Card({
  icon,
  title,
  state,
  dispatch,
  id,
  setMoodMeter,
}: CardProps) {
  return (
    <motion.div
      className="card w-32 xl:w-48 2xl:w-64 md:max-w-none bg-base-200 shadow-md items-center justify-center p-4 cursor-pointer"
      variants={variants}
      animate={state ? "hover" : "default"}
      onClick={() => {
        dispatch({ type: id });
        setMoodMeter((prevState) => {
          return { ...prevState, [id]: 1 };
        });
      }}
    >
      <figure className="card-body">
        <span className={`fa-solid ${icon} ${colors[id]} scale-[3.3]`} />
      </figure>
      <span className="sm:text-md text-primary-content md:text-lg lg:text-xl">
        {title}
      </span>
    </motion.div>
  );
}
