import { motion } from "framer-motion";
import { Calendar } from "../components";

export default function CalendarPage() {
  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
          },
        }}
        initial="hidden"
        animate="visible"
        className="flex flex-col mx-auto gap-10"
      >
        <Calendar />
      </motion.div>
    </>
  );
}
