"use client";

import { TrendingUp } from "lucide-react";
import { PolarGrid, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// RMS providers with feature scores
const chartData = [
  { provider: "cls.Rms™", score: 8.3, fill: "#B8860B" }, // dark goldenrod
  { provider: "FoodSoft", score: 8.1, fill: "#DAA520" }, // goldenrod
  { provider: "RestroPro", score: 7.5, fill: "#FFD700" }, // gold
  { provider: "TableMaster", score: 6.8, fill: "#F0E68C" }, // khaki
  { provider: "DineTrack", score: 6.4, fill: "#EEE8AA" }, // pale goldenrod
];

const chartConfig = {
  score: {
    label: "Feature Score",
    color: "#B8860B", // dark yellow for legend if needed
  },
  clsRms: { label: "cls.Rms™" },
  FoodSoft: { label: "FoodSoft" },

  RestroPro: { label: "RestroPro" },
  TableMaster: { label: "TableMaster" },
  DineTrack: { label: "DineTrack" },
} satisfies ChartConfig;

export function RadialChartGrid() {
  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={100}>
            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (!payload || !payload.length) return null;
                const { provider, score, fill } = payload[0].payload;
                return (
                  <div
                    style={{
                      backgroundColor: "#000",
                      padding: "6px 10px",
                      borderRadius: 4,
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: "bold",
                      minWidth: 140,
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: fill,
                        borderRadius: 2,
                      }}
                    />
                    <span>{provider}</span>
                    <span style={{ marginLeft: 6 }}>
                      Score: {score.toFixed(1)}
                    </span>
                  </div>
                );
              }}
            />

            <PolarGrid gridType="circle" />
            <RadialBar
              dataKey="score"
              background
              cornerRadius={6}
              fillOpacity={0.9}
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          cls.Rms™ ranks 1st among top RMS providers
        </div>
        <div className="leading-none text-muted-foreground">
          Showing RMS feature scores (out of 10)
        </div>
      </CardFooter>
    </Card>
  );
}
