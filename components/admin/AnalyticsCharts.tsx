
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, LineChart, Pie, PieChart, Cell, Legend } from 'recharts'

const usersData = [
  { date: '2024-05-01', users: 400 },
  { date: '2024-05-05', users: 300 },
  { date: '2024-05-10', users: 450 },
  { date: '2024-05-15', users: 600 },
  { date: '2024-05-20', users: 550 },
  { date: '2024-05-25', users: 750 },
  { date: '2024-05-30', users: 800 },
];

const topPagesData = [
  { name: '/home', views: 4000 },
  { name: '/services/web-dev', views: 3000 },
  { name: '/portfolio', views: 2000 },
  { name: '/about', views: 2780 },
  { name: '/contact', views: 1890 },
];

const trafficData = [
  { name: 'Direct', value: 400, color: 'hsl(var(--chart-1))' },
  { name: 'Organic Search', value: 300, color: 'hsl(var(--chart-2))' },
  { name: 'Referral', value: 300, color: 'hsl(var(--chart-3))' },
  { name: 'Social Media', value: 200, color: 'hsl(var(--chart-4))' },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


export function AnalyticsCharts({ chartType }: { chartType: 'users' | 'traffic' | 'top-pages' }) {
    if (chartType === 'users') {
        return (
            <div className="w-full h-[350px]">
                <ResponsiveContainer>
                    <LineChart data={usersData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12}/>
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                        <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }

    if (chartType === 'traffic') {
        return (
            <div className="w-full h-[350px]">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={trafficData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {trafficData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                         <Legend iconSize={10} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        )
    }

    if (chartType === 'top-pages') {
        return (
            <div className="w-full h-[350px]">
                <ResponsiveContainer>
                    <BarChart data={topPagesData} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} width={120} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                        <Bar dataKey="views" fill="hsl(var(--primary))" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        )
    }
    
    return null;
}
