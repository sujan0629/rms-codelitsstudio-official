"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
  {
    browser: "cls.RmS™",
    users: 25,
    fill: "hsl(45, 90%, 50%)", // Dark Gold tone
  },
];

const chartConfig = {
  users: {
    label: "Users",
  },
  "cls.RmS™": {
    label: "cls.RmS™",
    color: "hsl(45, 90%, 50%)", // same as above
  },
} satisfies ChartConfig;

export function RadialTextChart() {
  return (
    <Card className="text-gold-500 flex flex-col bg-transparent">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={70} // increased from 60 to 75 to create more gap inside
            outerRadius={110}
          >
            <RadialBar dataKey="users" background={false} cornerRadius={10} />
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
                          className="fill-[hsl(45,90%,60%)] text-3xl font-bold" // smaller text
                        >
                          25+
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-pretty text-center text-sm">
        <div>
          Businesses using{" "}
          <span className="text-gold-400 font-medium">cls.RmS™</span>{" "}
          <TrendingUp className="inline size-4" />
        </div>
        <div className="text-gold-400 flex items-center gap-2 font-medium text-muted-foreground">
          Growing rapidly
        </div>
      </CardFooter>
    </Card>
  );
}
