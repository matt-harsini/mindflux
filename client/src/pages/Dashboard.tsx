import { useQuery } from "react-query";
import { useAuthContext } from "../hooks/useAuthContext";
import { authFetch } from "../utils";
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

const fakeData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
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

export default function Dashboard() {
  const { username } = useAuthContext();
  const { data } = useQuery({
    queryFn: () => authFetch.get("/get-logs"),
    onSuccess: (data) => {
      console.log(data);
    },
    queryKey: ["all-logs"],
  });

  return (
    <>
      <div className="flex flex-col gap-y-12">
        <h3 className="text-2xl text-center sm:text-3xl mx-auto lg:mx-0 text-primary-content lg:text-4xl font-bold mb-7 sm:text-start">
          Hello {username}
        </h3>
        <div className="flex self-center gap-x-10">
          <button className="btn btn-primary w-[50px] sm:w-[75px] md:w-[100px] lowercase">
            7d
          </button>
          <button className="btn btn-primary w-[50px] sm:w-[75px] md:w-[100px] lowercase">
            30d
          </button>
          <button className="btn btn-primary w-[50px] sm:w-[75px] md:w-[100px] lowercase">
            3m
          </button>
          <button className="btn btn-primary w-[50px] sm:w-[75px] md:w-[100px] lowercase">
            All
          </button>
        </div>
        <div className="flex flex-col gap-y-4">
          <h4 className="text-lg text-white text-center">Guide</h4>
          <div className="flex items-center justify-evenly bg-base-200 bg-opacity-75 rounded-xl">
            {Object.keys(inputIcons).map((icon) => {
              return (
                <div className="flex flex-col items-center gap-y-1 p-4">
                  <span
                    className={`text-4xl fa-solid ${inputIcons[icon][5]} ${colors[icon]}`}
                  />
                  <span className="text-white text-md">{feelings[icon]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col 2xl:flex-row items-center justify-between w-full gap-10 mt-16">
        <ResponsiveContainer width="100%" aspect={2}>
          <AreaChart
            data={fakeData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              height={250}
              data={data01}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            />
            <Pie
              data={data02}
              dataKey="value"
              nameKey="name"
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
    </>
  );
}
