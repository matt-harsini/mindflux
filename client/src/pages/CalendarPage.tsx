import { motion } from "framer-motion";
import { Calendar } from "../components";
import { useMutation } from "react-query";
import { authFetch } from "../utils";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function CalendarPage() {
  const { mutate } = useMutation({
    mutationFn: () => authFetch.post("/notify-calendar"),
    onSuccess: () => {
      toast("Click on one of the days to see all logs for that day!", {
        toastId: "calendar_notify",
      });
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

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
