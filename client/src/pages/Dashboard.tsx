/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { inputIcons, colors, feelings, chartColors } from "../theme";
import { useQuery } from "react-query";
import { authFetch } from "../utils";
import { useState } from "react";
import { formatISO, startOfToday, sub } from "date-fns";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

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
    keepPreviousData: true,
  });

  const { data: pieData } = useQuery({
    queryFn: () => authFetch.get(`/pie-data${queries[filter]}`),
    queryKey: [filter, "pie-data"],
    keepPreviousData: true,
  });

  return (
    <>
      <div className="flex flex-col gap-y-[46px] pt-12">
        <h3 className="text-2xl text-center sm:text-3xl mx-auto lg:mx-0 text-primary-content lg:text-4xl font-bold mb-7 sm:text-start">
          Hello {username}
        </h3>
        <div className="flex flex-col gap-y-2">
          <h4 className="text-lg text-white text-center">Guide</h4>
          <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-evenly bg-base-200 bg-opacity-75 rounded-xl">
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
                  className="flex flex-col items-center gap-y-1 p-3 lg:p-4"
                >
                  <span
                    className={`text-2xl lg:text-4xl fa-solid ${inputIcons[icon][5]} ${colors[icon]}`}
                  />
                  <span className="text-white text-sm lg:text-md">
                    {feelings[icon]}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>{" "}
      </div>
      {!!chartData?.data.documents.length &&
      !!pieData?.data.documents.length ? (
        <div className="flex flex-col 2xl:flex-row items-center justify-between w-full gap-10 lg:mt-16 pb-8">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData?.data?.documents[0]?.data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                stroke="none"
                fillOpacity={0.9}
              >
                {pieData?.data?.documents[0]?.data.map(
                  (values: pieData, index: number) => (
                    <Cell key={index} fill={pieColors[values.name]} />
                  )
                )}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" aspect={2}>
            <LineChart
              data={chartData.data?.documents}
              margin={{
                top: 10,
                right: 45,
              }}
            >
              <XAxis
                dataKey="_id"
                fontSize={13}
                tickMargin={12}
                stroke="#ffffff"
              />
              <YAxis stroke="#ffffff" fontSize={13} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Happiness"
                stroke={chartColors.Happiness}
              />
              <Line
                type="monotone"
                dataKey="Sadness"
                stroke={chartColors.Sadness}
              />
              <Line
                type="monotone"
                dataKey="Anger"
                stroke={chartColors.Anger}
              />
              <Line
                type="monotone"
                dataKey="Anxiety"
                stroke={chartColors.Anxiety}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <h4 className="text-center text-xl mt-48 text-white">
          No data yet, please log your mood to start populating your charts
        </h4>
      )}

      <div className="flex items-center justify-center mt-12 gap-x-6 lg:gap-x-10">
        {buttons.map(({ text }: { text: string }, index) => {
          return (
            <button
              key={index}
              onClick={() => setFilter(index)}
              className={`btn w-[50px] sm:w-[75px] md:w-[100px] lowercase ${
                index === filter
                  ? "btn-accent"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {text}
            </button>
          );
        })}
      </div>
    </>
  );
}
