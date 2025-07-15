import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Users, Eye, AlertCircle, Clock, BarChart } from 'lucide-react';
import { AnalyticsCharts } from '@/components/admin/AnalyticsCharts';

export default function AnalyticsPage() {
  const stats = [
    { title: 'Total Users', value: '12,345', change: '+12.5%', icon: Users },
    { title: 'Sessions', value: '28,981', change: '+8.1%', icon: Eye },
    { title: 'Bounce Rate', value: '42.3%', change: '-2.1%', icon: AlertCircle, positive: false },
    { title: 'Avg. Session Duration', value: '2m 45s', change: '+5.7%', icon: Clock },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <BarChart className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-3xl font-bold text-primary">Website Analytics</CardTitle>
              <CardDescription>An overview of your website's performance in the last 30 days.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.positive === false ? 'text-destructive' : 'text-emerald-500'}`}>
                {stat.change} vs last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Users Over Time</CardTitle>
            <CardDescription>Visitor trends for the past 30 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <AnalyticsCharts chartType="users" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Source</CardTitle>
            <CardDescription>Where your visitors are coming from.</CardDescription>
          </CardHeader>
          <CardContent>
            <AnalyticsCharts chartType="traffic" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
          <CardDescription>Your most viewed pages.</CardDescription>
        </CardHeader>
        <CardContent>
          <AnalyticsCharts chartType="top-pages" />
        </CardContent>
      </Card>
    </div>
  );
}
