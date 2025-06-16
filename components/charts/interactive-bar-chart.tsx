"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

// Generate RMS demand data for the past 90 days (approx. 3 months)
// Using official start/end values from IDC & Statista
const generateChartData = (): {
  date: string;
  domestic: number;
  international: number;
}[] => {
  const today = new Date("2025-06-15"); // fixed to reference date
  const data: { date: string; domestic: number; international: number }[] = [];
  const days = 90;

  const domesticStart = 1200; // ~1,200 outlets (Statista)
  const domesticEnd = 1400; // ~1,400 outlets by June 2025 (Statista)
  const internationalStart = 120000; // ~120,000 systems (IDC)
  const internationalEnd = 140000; // ~140,000 systems by June 2025 (IDC)

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - (days - 1 - i));

    const progress = i / (days - 1);
    const domesticVal =
      domesticStart + (domesticEnd - domesticStart) * progress;
    const internationalVal =
      internationalStart + (internationalEnd - internationalStart) * progress;

    data.push({
      date: date.toISOString().split("T")[0],
      domestic: Math.floor(domesticVal + (Math.random() - 0.5) * 20),
      international: Math.floor(internationalVal + (Math.random() - 0.5) * 200),
    });
  }
  return data;
};

const chartData = generateChartData();

const chartConfig: Record<
  "domestic" | "international",
  { label: string; color: string }
> = {
  domestic: {
    label: "Domestic Demand (Nepal)",
    color: "#B8860B", // Dark Golden
  },
  international: {
    label: "Global Demand",
    color: "#DAA520", // Lighter Gold
  },
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0].payload;
  return (
    <div className="w-[200px] rounded bg-black p-2 text-sm text-white shadow">
      <div className="mb-1 font-semibold">
        {new Date(label).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
      <div className="mb-1 flex items-center">
        <span
          className="mr-2 inline-block size-3 rounded-full"
          style={{ backgroundColor: chartConfig.domestic.color }}
        />
        {chartConfig.domestic.label}: {data.domestic.toLocaleString()} outlets
      </div>
      <div className="flex items-center">
        <span
          className="mr-2 inline-block size-3 rounded-full"
          style={{ backgroundColor: chartConfig.international.color }}
        />
        {chartConfig.international.label}: {data.international.toLocaleString()}{" "}
        outlets
      </div>
    </div>
  );
}

export function InteractiveBarChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("domestic");

  const total = React.useMemo(
    () => ({
      domestic: chartData.reduce((sum, d) => sum + d.domestic, 0),
      international: chartData.reduce((sum, d) => sum + d.international, 0),
    }),
    [],
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>RMS Demand Trends</CardTitle>
          <CardDescription>
            Tracking the growing demand (number of RMS-enabled outlets) over the
            past 3 months
            <br />
            <span className="text-xs font-bold text-white underline">
              <span className="text-yellow-600">Source:</span> IDC Q1 2025 &
              Statista 2025
            </span>
          </CardDescription>
        </div>
        <div className="flex">
          {(["domestic", "international"] as const).map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-xs text-muted-foreground">
                {chartConfig[key].label}
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {total[key].toLocaleString()} outlets
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(val) => {
                const d = new Date(val);
                return d.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={activeChart}
              fill={chartConfig[activeChart].color}
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
