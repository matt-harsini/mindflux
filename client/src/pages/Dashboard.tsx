/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { inputIcons, colors, feelings } from "../theme";
import { useQuery } from "react-query";
import { authFetch } from "../utils";
import { useState } from "react";
import { formatISO, startOfToday, sub } from "date-fns";
import { motion } from "framer-motion";
import { Loading } from "../components";

interface pieData {
  value: number;
  name: string;
}

interface pieColors {
  Anxiety: string;
  Happiness: string;
  Sadness: string;
  Anger: string;
  [prop: string]: string;
}

const pieColors: pieColors = {
  Anxiety: "#D926A9",
  Happiness: "#22C55E",
  Sadness: "#1FB2A6",
  Anger: "#DC2626",
};

const buttons = [
  {
    text: "7d",
  },
  {
    text: "30d",
  },
  {
    text: "3m",
  },
  {
    text: "all",
  },
];

export default function Dashboard() {
  const { username } = useAuthContext();
  const [filter, setFilter] = useState(0);

  const queries = [
    `?f=${formatISO(sub(startOfToday(), { days: 7 }))}`,
    `?f=${formatISO(sub(startOfToday(), { days: 30 }))}`,
    `?f=${formatISO(sub(startOfToday(), { months: 3 }))}`,
    "",
  ];

  const { data: chartData } = useQuery({
    queryFn: () => authFetch.get(`/chart-data${queries[filter]}`),
    queryKey: [filter],
  });

  const { data: pieData } = useQuery({
    queryFn: () => authFetch.get(`/pie-data${queries[filter]}`),
    queryKey: [filter, "pie-data"],
  });

  return (
    <>
      <div className="flex flex-col gap-y-10">
        <h3 className="text-2xl text-center sm:text-3xl mx-auto lg:mx-0 text-primary-content lg:text-4xl font-bold mb-7 sm:text-start">
          Hello {username}
        </h3>
        <div className="flex self-center gap-x-10">
          {buttons.map(({ text }: { text: string }, index) => {
            return (
              <motion.button
                key={index}
                variants={{
                  hidden: {
                    opacity: 0,
                  },
                  visible: (i) => ({
                    opacity: 1,
                    transition: {
                      delay: i * 0.1,
                    },
                  }),
                }}
                initial="hidden"
                animate="visible"
                custom={index}
                onClick={() => setFilter(index)}
                className={`btn w-[50px] sm:w-[75px] md:w-[100px] lowercase ${
                  index === filter ? "btn-secondary" : "btn-primary"
                }`}
              >
                {text}
              </motion.button>
            );
          })}
        </div>
        <div className="flex flex-col gap-y-2">
          <h4 className="text-lg text-white text-center">Guide</h4>
          <div className="flex items-center justify-evenly bg-base-200 bg-opacity-75 rounded-xl">
            {Object.keys(inputIcons).map((icon, index) => {
              return (
                <motion.div
                  key={index}
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
                  className="flex flex-col items-center gap-y-1 p-4"
                >
                  <span
                    className={`text-4xl fa-solid ${inputIcons[icon][5]} ${colors[icon]}`}
                  />
                  <span className="text-white text-md">{feelings[icon]}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col 2xl:flex-row items-center justify-between w-full gap-10 mt-16">
        <ResponsiveContainer width="100%" aspect={2.5}>
          <AreaChart
            data={chartData?.data.documents}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="Anxiety" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D926A9" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#D926A9" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="Happiness" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="Anger" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2626" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="Sadness" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1FB2A6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1FB2A6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="_id" fontSize={14} tickMargin={12} />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Anxiety"
              stroke="#D926A9"
              fillOpacity={0.9}
              fill="url(#Anxiety)"
            />
            <Area
              type="monotone"
              dataKey="Happiness"
              stroke="#22C55E"
              fillOpacity={0.9}
              fill="url(#Happiness)"
            />
            <Area
              type="monotone"
              dataKey="Anger"
              stroke="#DC2626"
              fillOpacity={0.9}
              fill="url(#Anger)"
            />
            <Area
              type="monotone"
              dataKey="Sadness"
              stroke="#1FB2A6"
              fillOpacity={0.9}
              fill="url(#Sadness)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" aspect={2}>
          <PieChart width={730} height={250}>
            <Pie
              data={pieData?.data.documents[0].data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
              stroke="none"
              fillOpacity={0.9}
            >
              {pieData?.data.documents[0].data.map(
                (values: pieData, index: number) => {
                  return <Cell key={index} fill={pieColors[values.name]} />;
                }
              )}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
