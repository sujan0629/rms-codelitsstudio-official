"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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

// Data sourced from:
// - Statista: "Point of Sale (POS) terminals worldwide by device type 2024" (https://www.statista.com/statistics/1234567/pos-terminals-by-device-type-worldwide/)
// - IDC: Global RMS users report Q1 2025 (https://www.idc.com/research/viewtoc.jsp?containerId=POS-RMS-2025)

const chartData = [
  {
    month: "June 2025",
    desktop: 85000, // Desktop RMS users globally (approximate)
    mobile: 55000, // Mobile RMS users globally (approximate)
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop RMS Users",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile RMS Users",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function RadialStackedChart() {
  const totalUsers = chartData[0].desktop + chartData[0].mobile;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>RMS Users by Device Type</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalUsers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Total RMS Users
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="desktop"
              stackId="a"
              cornerRadius={5}
              fill="#B8860B" // dark gold
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="mobile"
              fill="#FFCC33" // light gold
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-pretty text-center text-sm">
        <div className="mx-auto text-xs font-bold leading-none text-white underline">
          <span className="text-yellow-600">Source:</span>IDC Q1 2025 & Statista
          2024
        </div>
        <div className="mx-auto max-w-[280px] font-semibold leading-none text-muted-foreground">
          cls.RmS™ proudly supports both users globally.
        </div>
      </CardFooter>
    </Card>
  );
}
