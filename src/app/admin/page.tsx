import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, Users, BarChart } from 'lucide-react';

export default function AdminDashboardPage() {
  // In a real app, you'd fetch this data.
  const stats = [
    { title: "Total Submissions", value: "125", icon: Briefcase },
    { title: "Unique Visitors", value: "1,200", icon: Users },
    { title: "Conversion Rate", value: "5.7%", icon: BarChart },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
           <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>A quick look at the latest messages.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* You can add a summary table here later */}
            <p className="text-muted-foreground">Recent submissions will be displayed here.</p>
          </CardContent>
        </Card>
       </div>
    </div>
  );
}
