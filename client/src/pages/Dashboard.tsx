import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { useAuthContext } from "../hooks/useAuthContext";
const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];

const renderLineChart = (
  <LineChart width={600} height={300} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
);

export default function Dashboard() {
  const { username } = useAuthContext();

  return (
    <>
      <h3 className="text-center text-3xl mx-auto lg:mx-0 text-primary-content lg:text-4xl font-bold mb-7 sm:text-start">
        Hello {username}
      </h3>
      <div className="flex flex-col mx-auto gap-10"></div>
    </>
  );
}
