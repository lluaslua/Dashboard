"use client"


import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A line chart with dots"

const chartData = [
  { Date: "14/03", kwh: 210},
  { Date: "15/03", kwh: 260},
  { Date: "16/03", kwh: 200},
  { Date: "17/03", kwh: 290},
  { Date: "18/03", kwh: 270},
  { Date: "19/03", kwh: 220},
  { Date: "20/03", kwh: 300}
]

const chartConfig = {
  kwh: {
    label: "kwh",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function EnergyChart() {

  const maxKwh = Math.max(...chartData.map((data) => data.kwh));
  const maxTick = Math.ceil(maxKwh / 150) * 150;
  const dynamicTicks = [];
  for (let i = 0; i <= maxTick; i += 150) {
    dynamicTicks.push(i);}

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Comparação de Energia(7 dias)</CardTitle>
        <CardDescription>Comparação entre produção real e esperada</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <LineChart 
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              bottom: 10,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              ticks={dynamicTicks}
              domain={[0, maxTick]} 
              label={{ 
                value: 'kWh', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' }
              }}
            />
                
        
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="kwh"
              type="natural"
              stroke="oklch(0.546 0.245 262.881)"
              strokeWidth={3}
              dot={{
                fill: "oklch(0.546 0.245 262.881)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 m-auto font-medium text-blue-600 before:content-[''] before:block before:w-3 before:h-3 before:rounded-full before:bg-blue-600">
          Produção Real
        </div>
        
      </CardFooter>
    </Card>
  )
}
