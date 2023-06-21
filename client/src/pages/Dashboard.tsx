/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Area,
  AreaChart,
  CartesianGrid,
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
import { endOfToday, formatISO, startOfToday, sub } from "date-fns";
import { motion } from "framer-motion";
import { Loading } from "../components";

const data01 = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];
const data02 = [
  {
    name: "Group A",
    value: 2400,
  },
  {
    name: "Group B",
    value: 4567,
  },
  {
    name: "Group C",
    value: 1398,
  },
  {
    name: "Group D",
    value: 9800,
  },
  {
    name: "Group E",
    value: 3908,
  },
  {
    name: "Group F",
    value: 4800,
  },
];

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
    `?f=${formatISO(sub(startOfToday(), { days: 7 }))}&l=${formatISO(
      endOfToday()
    )}`,
    `?f=${formatISO(sub(startOfToday(), { days: 30 }))}&l=${formatISO(
      endOfToday()
    )}`,
    `?f=${formatISO(sub(startOfToday(), { months: 3 }))}&l=${formatISO(
      endOfToday()
    )}`,
    "",
  ];

  const { data, isLoading } = useQuery({
    queryFn: () => authFetch.get(`/chart-data${queries[filter]}`),
    queryKey: [filter],
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
                className="btn btn-primary w-[50px] sm:w-[75px] md:w-[100px] lowercase"
              >
                {text}
              </motion.button>
            );
          })}
        </div>
        <div className="flex flex-col gap-y-2">
          <h4 className="text-lg text-white text-center">Guide</h4>
          <div className="flex items-center justify-evenly bg-base-200 bg-opacity-75 rounded-xl">
            {Object.keys(inputIcons).map((icon) => {
              return (
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
      {isLoading ? (
        <Loading height="max-h-max mt-48" />
      ) : (
        <div className="flex flex-col 2xl:flex-row items-center justify-between w-full gap-10 mt-16">
          <ResponsiveContainer width="100%" aspect={2}>
            <AreaChart
              data={data?.data.documents}
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
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Anxiety"
                stroke="#D926A9"
                fillOpacity={1}
                fill="url(#Anxiety)"
              />
              <Area
                type="monotone"
                dataKey="Happiness"
                stroke="#22C55E"
                fillOpacity={1}
                fill="url(#Happiness)"
              />
              <Area
                type="monotone"
                dataKey="Anger"
                stroke="#DC2626"
                fillOpacity={1}
                fill="url(#Anger)"
              />
              <Area
                type="monotone"
                dataKey="Sadness"
                stroke="#1FB2A6"
                fillOpacity={1}
                fill="url(#Sadness)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                height={250}
                data={data?.data.documents}
                dataKey="Happiness"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#8884d8"
              />
              <Pie
                data={data?.data.documents}
                dataKey="Sadness"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#82ca9d"
                label
              />
              <Pie
                data={data?.data.documents}
                dataKey="Anger"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#82ca9d"
                label
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
