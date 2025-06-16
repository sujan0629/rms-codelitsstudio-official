"use client";

import React, { useEffect, useRef, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  visitors: {
    label: "Visits",
  },
} satisfies ChartConfig;

// Gold gradient similar to original bar chart
const radialBarFill = "hsl(45, 80%, 55%)";
const radialBarBackground = "hsl(45, 60%, 75%)";

interface RadialShapeChartProps {
  // initial data can be empty or prefilled with some browsers, but it's optional now
  data?: { browser: string; visitors: number }[];
}

function getBrowserName() {
  const ua = navigator.userAgent;
  if (/chrome|chromium|crios/i.test(ua)) return "Chrome";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua) && !/chrome|chromium|crios/i.test(ua)) return "Safari";
  if (/edg/i.test(ua)) return "Edge";
  if (/opera|opr/i.test(ua)) return "Opera";
  return "Other";
}

export function RadialShapeChart({ data = [] }: RadialShapeChartProps) {
  // We'll store visit counts by browser name here:
  const [visitData, setVisitData] = useState<
    { browser: string; visitors: number }[]
  >([]);

  // Load and update visit counts from localStorage on mount
  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    if (hasIncrementedRef.current) return;

    const visitsJSON = localStorage.getItem("browserVisits");
    let visits: Record<string, number> = visitsJSON
      ? JSON.parse(visitsJSON)
      : {};

    const currentBrowser = getBrowserName();
    visits[currentBrowser] = (visits[currentBrowser] || 0) + 1;

    localStorage.setItem("browserVisits", JSON.stringify(visits));

    const visitsArray = Object.entries(visits).map(([browser, visitors]) => ({
      browser,
      visitors,
    }));

    setVisitData(visitsArray);

    hasIncrementedRef.current = true; // Prevent future runs
  }, []);

  // Calculate total visits from all browsers
  const totalVisits = visitData.reduce((sum, d) => sum + d.visitors, 0);

  // For the radial chart, we will show the percentage of visits based on total visits:
  // Since the RadialBarChart here only has a single slice (visitors: 100), keep it as is.

  const radialData = [{ visitors: 100 }];

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={radialData}
            startAngle={0}
            endAngle={360}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              polarRadius={[86, 74]}
            />
            <RadialBar
              dataKey="visitors"
              background={{ fill: radialBarBackground }}
              fill={radialBarFill}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          fill="#ffffff" // ← Change this
                          className="text-4xl font-bold"
                        >
                          {totalVisits.toLocaleString()}
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          fill="hsl(0, 0%, 50%)"
                          className="text-sm"
                        >
                          Visits
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-pretty text-center text-sm">
        <div className="font-medium leading-none text-foreground">
          {/* Show breakdown of visits by browser */}
          {visitData.length === 0 ? (
            <span>No visits tracked yet</span>
          ) : (
            visitData.map(({ browser, visitors }) => (
              <div key={browser} className="flex justify-center gap-1">
                <strong>{browser}:</strong> {visitors.toLocaleString()}{" "}
                {visitors === 1 ? "visit" : "visits"}
              </div>
            ))
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Your visit counts in cls.RmS™ web
        </div>
      </CardFooter>
    </Card>
  );
}
