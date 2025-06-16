"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Get last 6 month names
function getLastSixMonths(): string[] {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  const result: string[] = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i);
    result.push(months[d.getMonth()]);
  }

  return result;
}

// Generate data with bigger revenue amounts
const monthNames = getLastSixMonths();

const chartData = monthNames.map((month, index) => {
  const base = 50000 + index * 10000; // Start around 50k, increase by 10k each month
  return {
    month,
    withRMS: base + 15000 + Math.floor(Math.random() * 10000), // higher growth: ~65k-80k+
    withoutRMS: Math.floor(base * 0.3) + Math.floor(Math.random() * 5000), // lower: ~15k-35k
  };
});

const chartConfig = {
  withRMS: {
    label: "Business Using cls.Rms™",
    color: "hsl(var(--chart-1))",
  },
  withoutRMS: {
    label: "Business Without RMS",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function LineChartMultiple() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Growth Comparison</CardTitle>
        <CardDescription>
          Monthly Revenue (in NPR) for Last 6 Months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{ left: 12, right: 12, bottom: 8 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickFormatter={(value) => `Rs ${value / 1000}k`}
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="withRMS"
              type="monotone"
              stroke="#b8860b" // dark gold
              strokeWidth={2.5}
              dot={false}
            />
            <Line
              dataKey="withoutRMS"
              type="monotone"
              stroke="#7a5c00" // darker gold for dashed line
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-center text-sm">
        <div className="leading-snug text-muted-foreground">
          Businesses using{" "}
          <span className="font-medium text-foreground">cls.RmS™</span> earned
          up to 5x more
          <TrendingUp className="ms-1 inline-block size-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
