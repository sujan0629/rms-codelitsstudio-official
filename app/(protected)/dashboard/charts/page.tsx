import prisma from "@/lib/prisma";
import { constructMetadata } from "@/lib/utils";
import { AreaChartStacked } from "@/components/charts/area-chart-stacked";
import { BarChartMixed } from "@/components/charts/bar-chart-mixed";
import { InteractiveBarChart } from "@/components/charts/interactive-bar-chart";
import { LineChartMultiple } from "@/components/charts/line-chart-multiple";
import { RadarChartSimple } from "@/components/charts/radar-chart-simple";
import { RadialChartGrid } from "@/components/charts/radial-chart-grid";
import { RadialShapeChart } from "@/components/charts/radial-shape-chart";
import { RadialStackedChart } from "@/components/charts/radial-stacked-chart";
import { RadialTextChart } from "@/components/charts/radial-text-chart";
import { DashboardHeader } from "@/components/dashboard/header";

export const metadata = constructMetadata({
  title: "Charts – cls.Rms™ | Codelits Studio Pvt. Ltd.",
  description: "Interactive charts powered by real analytics",
});

// Helper function to get date strings — declare first
const toISODate = (date: Date): string => date.toISOString().split("T")[0];

// Fallback data generation
async function generateFallbackData() {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);

  // Generate dates for last 7 days
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    // Create new Date instance per iteration to avoid mutating the same object
    const d = new Date(sevenDaysAgo);
    d.setDate(sevenDaysAgo.getDate() + i);

    // Use toISODate here safely
    dates.push(toISODate(d));
  }

  // Generate visitors data for last 7 days
  const visitorsLast7Days = dates.map((date) => ({
    x: date,
    y: Math.floor(Math.random() * 50) + 20,
  }));

  // Generate page views data
  const pageViewsLast7Days = dates.map((date) => ({
    label: date,
    value: Math.floor(Math.random() * 200) + 100,
  }));

  // Browser distribution (realistic percentages)
  const browserDistribution = [
    { browser: "Chrome", visitors: 275 },
    { browser: "Safari", visitors: 200 },
    { browser: "Firefox", visitors: 187 },
    { browser: "Edge", visitors: 173 },
    { browser: "Other", visitors: 90 },
  ];

  // Device distribution
  const deviceDistribution = [
    { label: "Desktop", value: 65 },
    { label: "Mobile", value: 35 },
  ];

  // Visitor type distribution
  const visitorTypeDistribution = [
    { label: "New", value: 60 },
    { label: "Returning", value: 40 },
  ];

  // Line data
  const lineData = dates.map((date) => ({
    date,
    visitors: Math.floor(Math.random() * 50) + 20,
    pageviews: Math.floor(Math.random() * 200) + 100,
  }));

  return {
    totalVisitors: browserDistribution.reduce((sum, d) => sum + d.visitors, 0),
    visitorsLast7Days,
    pageViewsLast7Days,
    browserDistribution,
    deviceDistribution,
    visitorTypeDistribution,
    lineData,
  };
}

// Main data fetching function
async function fetchChartData() {
  try {
    // Try to fetch from Plausible first
    const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    const plausibleAPIKey = process.env.PLAUSIBLE_API_KEY;

    if (!plausibleDomain || !plausibleAPIKey) {
      throw new Error("Plausible credentials not configured");
    }

    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);

    // Format dates for API
    const dateFormat = (date: Date) => date.toISOString().split("T")[0];
    const startDate = dateFormat(sevenDaysAgo);
    const endDate = dateFormat(today);

    // Fetch aggregate data
    const aggregateRes = await fetch(
      `https://plausible.io/api/v1/stats/aggregate?site_id=${plausibleDomain}&period=custom&date=${startDate},${endDate}`,
      {
        headers: { Authorization: `Bearer ${plausibleAPIKey}` },
      },
    );

    if (!aggregateRes.ok) throw new Error("Failed to fetch aggregate data");

    const aggregateData = await aggregateRes.json();
    const totalVisitors = aggregateData.results.visitors.value;

    // Fetch timeseries data
    const timeseriesRes = await fetch(
      `https://plausible.io/api/v1/stats/timeseries?site_id=${plausibleDomain}&period=custom&date=${startDate},${endDate}&interval=day`,
      {
        headers: { Authorization: `Bearer ${plausibleAPIKey}` },
      },
    );

    if (!timeseriesRes.ok) throw new Error("Failed to fetch timeseries data");

    const timeseriesData = await timeseriesRes.json();

    // Fetch browser breakdown
    const breakdownRes = await fetch(
      `https://plausible.io/api/v1/stats/breakdown?site_id=${plausibleDomain}&period=custom&date=${startDate},${endDate}&property=visit:browser&limit=5`,
      {
        headers: { Authorization: `Bearer ${plausibleAPIKey}` },
      },
    );

    if (!breakdownRes.ok) throw new Error("Failed to fetch breakdown data");

    const breakdownData = await breakdownRes.json();

    // Process timeseries data
    const visitorsLast7Days = timeseriesData.results.map((day: any) => ({
      x: day.date,
      y: day.visitors,
    }));

    const pageViewsLast7Days = timeseriesData.results.map((day: any) => ({
      label: day.date,
      value: day.pageviews,
    }));

    // Process browser data
    const browserDistribution = breakdownData.results.map((browser: any) => ({
      browser: browser.browser,
      visitors: browser.visitors,
    }));

    // Estimate device distribution (Plausible doesn't provide this directly)
    const deviceDistribution = [
      { label: "Desktop", value: Math.floor(totalVisitors * 0.65) },
      { label: "Mobile", value: Math.floor(totalVisitors * 0.35) },
    ];

    // Estimate visitor type
    const visitorTypeDistribution = [
      { label: "New", value: Math.floor(totalVisitors * 0.6) },
      { label: "Returning", value: Math.floor(totalVisitors * 0.4) },
    ];

    // Line data
    const lineData = timeseriesData.results.map((day: any) => ({
      date: day.date,
      visitors: day.visitors,
      pageviews: day.pageviews,
    }));

    return {
      totalVisitors,
      visitorsLast7Days,
      pageViewsLast7Days,
      browserDistribution,
      deviceDistribution,
      visitorTypeDistribution,
      lineData,
    };
  } catch (error) {
    console.error(
      "Failed to fetch Plausible data. Using fallback data:",
      error,
    );
    return generateFallbackData();
  }
}

export default async function ChartsPage() {
  const {
    totalVisitors,
    visitorsLast7Days,
    pageViewsLast7Days,
    browserDistribution,
    deviceDistribution,
    visitorTypeDistribution,
    lineData,
  } = await fetchChartData();

  return (
    <>
      <DashboardHeader
        heading="Analytics Dashboard"
        text="Interactive metrics and visualizations"
      />
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          <RadialTextChart />

          <AreaChartStacked data={visitorsLast7Days} />

          <BarChartMixed />

          <RadarChartSimple />
        </div>

        <InteractiveBarChart />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          <RadialChartGrid />

          <RadialShapeChart />

          <LineChartMultiple />

          <RadialStackedChart />
        </div>
      </div>
    </>
  );
}
