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
    <div className="flex flex-col mx-auto gap-10">
      <h3 className="mx-auto lg:mx-0 text-primary-content text-4xl font-bold">
        Hello {username}
      </h3>
    </div>
  );
}
