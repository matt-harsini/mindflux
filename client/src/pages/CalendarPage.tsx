import { motion } from "framer-motion";
import { Calendar } from "../components";

export default function CalendarPage() {
  return (
    <>
      <h3 className="text-2xl text-center sm:text-3xl mx-auto lg:mx-0 text-primary-content lg:text-4xl font-bold mb-7 sm:text-start">
        Here is your month
      </h3>
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
