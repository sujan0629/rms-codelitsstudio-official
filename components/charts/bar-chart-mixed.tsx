"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, Cell, Tooltip, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

// Gold-themed color palette
const colors = [
  "hsl(45, 100%, 25%)", // very dark gold
  "hsl(45, 90%, 40%)", // dark gold
  "hsl(45, 80%, 55%)", // medium gold
  "hsl(45, 70%, 65%)", // light gold
  "hsl(45, 60%, 75%)", // pale yellow
];

// Initial dataset
const initialData = [
  { browser: "Chrome", visitors: 275 },
  { browser: "Safari", visitors: 200 },
  { browser: "Firefox", visitors: 187 },
  { browser: "Edge", visitors: 173 },
  { browser: "Other", visitors: 90 },
];

export function BarChartMixed() {
  const [data, setData] = useState(initialData);
  const initialTotalVisitors = useRef(
    initialData.reduce((sum, d) => sum + d.visitors, 0),
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateData = () => {
      setData((oldData) =>
        oldData.map((entry) => ({
          ...entry,
          visitors: entry.visitors + Math.floor(Math.random() * 5), // 0-4 increase
        })),
      );

      const nextInterval = 10000 + Math.random() * 10000;
      timeoutId = setTimeout(updateData, nextInterval);
    };

    updateData();
    return () => clearTimeout(timeoutId);
  }, []);

  const percentageIncrease = useMemo(() => {
    const newTotal = data.reduce((sum, d) => sum + d.visitors, 0);
    return (
      ((newTotal - initialTotalVisitors.current) /
        initialTotalVisitors.current) *
      100
    );
  }, [data]);

  // Custom tooltip renderer with colored squares
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    const { payload: entry } = payload[0];
    const index = data.findIndex((d) => d.browser === entry.browser);
    const color = colors[index % colors.length];

    return (
      <div
        style={{
          backgroundColor: "#f9f9f9",
          borderRadius: 6,
          border: "1px solid #ddd",
          padding: "8px 12px",
          color: "#333",
          fontWeight: 500,
          minWidth: 140,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            backgroundColor: color,
            borderRadius: 2,
          }}
        />
        <span>
          {entry.browser}: {entry.visitors}
        </span>
      </div>
    );
  };

  return (
    <Card className="flex flex-col">
      <CardHeader />
      <CardContent className="flex-1">
        <ChartContainer config={{}}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 0 }}
            barCategoryGap="20%"
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke="hsl(45, 90%, 40%)"
            />
            <XAxis type="number" hide />
            <Tooltip
              cursor={{ fill: "rgba(255, 223, 0, 0.1)" }}
              content={<CustomTooltip />}
            />
            <Bar dataKey="visitors" radius={[5, 5, 5, 5]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-center text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-foreground">
          Trending up by {percentageIncrease.toFixed(1)}% this month{" "}
          <TrendingUp className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Real-time browser statistics
        </div>
      </CardFooter>
    </Card>
  );
}
