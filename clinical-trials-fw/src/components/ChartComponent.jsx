import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const ChartComponent = () => {
  return (
    <div>
      <h2>Bar Chart</h2>
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>

      <h2>Pie Chart</h2>
      <PieChart width={400} height={300}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default ChartComponent;
