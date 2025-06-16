"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Estimated monthly restaurant customers in Nepal (tourism-driven)
const chartData = [
  { month: "Jan", customers: 120 },
  { month: "Feb", customers: 150 },
  { month: "Mar", customers: 280 },
  { month: "Apr", customers: 300 },
  { month: "May", customers: 220 },
  { month: "Jun", customers: 140 },
];

const chartConfig = {
  customers: { label: "Customers", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

export function RadarChartSimple() {
  return (
    <Card>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="customers"
              fill="#B8860B" // Dark goldenrod hex color
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col gap-1 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-1 font-medium text-white">
          April has the highest customer
          <TrendingUp className="inline-block size-4" />
        </div>
        <div>
          Peak visits in{" "}
          <strong className="text-white">Spring (Mar–Apr)</strong>.
          <br />
          <span className="text-xs font-semibold">
            <span className="text-yellow-600">Source:</span>{" "}
            <a
              href="https://nepalindata.com/resource/arrival-tourist-nepal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline"
            >
              Nepal Tourism Board, 1992–2017
            </a>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
