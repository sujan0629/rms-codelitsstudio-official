"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

interface DataPoint {
  x: string;
  y: number;
}

interface AreaChartStackedProps {
  data: DataPoint[];
}

const chartConfig = {
  dataset1: {
    label: "Visitors",
    color: "hsl(43, 90%, 40%)", // Dark Gold
  },
  dataset2: {
    label: "Page Views",
    color: "hsl(43, 90%, 60%)", // Lighter Gold
  },
} satisfies ChartConfig;

export function AreaChartStacked({ data }: AreaChartStackedProps) {
  // Prepare stacked chart data
  const preparedData = data.map((d) => ({
    day: d.x,
    visitors: d.y,
    pageViews: Math.floor(d.y * 1.3), // simulated related metric
  }));

  const totalVisitors = data.reduce((acc, cur) => acc + cur.y, 0);
  const first = data[0]?.y || 0;
  const last = data[data.length - 1]?.y || 0;
  const percentageChange = first
    ? (((last - first) / first) * 100).toFixed(1)
    : "0";

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Unique Page Visitors</CardTitle>
        <CardDescription>
          Showing total unique visitors for the last {data.length} days:{" "}
          <span className="font-semibold">
            {totalVisitors.toLocaleString()}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <ChartContainer config={chartConfig}>
          <AreaChart data={preparedData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid
              vertical={false}
              stroke="#b8860b"
              strokeOpacity={0.1}
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={{ stroke: "#b8860b", strokeWidth: 1 }}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              stroke="#b8860b"
              style={{ fontWeight: "600", fontSize: "0.875rem" }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="pageViews"
              type="natural"
              fill="rgba(184, 134, 11, 0.3)"
              stroke="#b8860b"
              fillOpacity={0.4}
              stackId="a"
            />
            <Area
              dataKey="visitors"
              type="natural"
              fill="rgba(184, 134, 11, 0.6)"
              stroke="#b8860b"
              fillOpacity={0.6}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-center text-sm font-semibold">
        <div className="flex items-center gap-2 font-medium leading-none text-foreground">
          Trending {parseFloat(percentageChange) >= 0 ? "up" : "down"} by{" "}
          {percentageChange}%
          <TrendingUp className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Last {data.length} Days | cls.RmS™ Analytics
        </div>
      </CardFooter>
    </Card>
  );
}
