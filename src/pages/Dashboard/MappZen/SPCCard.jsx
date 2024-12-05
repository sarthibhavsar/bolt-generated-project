import {
  CheckCircleIcon,
  LockKeyholeIcon,
  PresentationIcon,
  TrendingUp,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import SPCView from "../../../assets/SPCView.svg";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
import { Button } from "@/components/ui/button"

const chartConfig = {
  desktop: {
    label: "Total",
    color: "#afc7db",
  },
  mobile: {
    label: "Accepted",
    color: "#afdbbe",
  },
};

const listItem = [
  '15 day free trial',

'No credit card required',

'Just $12/month if you want to keep it'
]

export function SPCCard() {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Card className="w-full shadow-lg border relative cursor-pointer">
          <CardHeader>
            <CardTitle className="font-semibold flex justify-between items-center">
              <div>SPC Analysis</div>
            </CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>

          <LockKeyholeIcon className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-40" />
          <CardContent className="blur-md">
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer barSize={40} data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm blur-md">
            <div className="flex gap-2 font-medium leading-none">
              Inspections accepted by 5.2% this month{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing analysis of accepted inspections
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-7xl">
        <DialogHeader className='pb-3'>
          <DialogDescription>
            That feature isn't available on your current plan.
          </DialogDescription>
          <DialogTitle>
            Upgrade to{" "}
            <span className="text-blue-600 capitalize">SPC Pro</span> to unlock
            this feature.
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-center items-start gap-4 w-full">
          <div className="w-1/2 ">
            <img src={SPCView} className="" />
          </div>
          <div className="w-1/2">
            <div className="flex justify-start items-center gap-2">
              <div className="flex justify-center items-center rounded-full bg-purple-100 p-9">
                <PresentationIcon className="text-purple-500 " />
              </div>
              <div className="flex justify-start items-start flex-col">
                <span className="text-5xl font-bold">SPC Analysis</span>
                <span className="text-xs mt-3">
                  See how a team is tracking towards their sprint forecast
                </span>
              
              </div>
            </div>

            <div className="mt-8 ">
            <span className="font-semibold">
            Start your free trial of SPC Pro to view SPC Analysis.
            </span>
            <div className="mt-5 flex justify-start items-start gap-4 flex-col">
            {
              listItem.map((data, i) => {
                return <div 
                key={i}
                className="flex justify-start items-center gap-2"
                >
                  <span className="text-blue-500">

                  <CheckCircleIcon />
                  </span>
                  <span className="text-slate-900 font-semibold">{data}</span>
                </div>

              })
            }
            </div>
            </div>

            <div className="mt-10">
              <Button className='bg-blue-500 hover:bg-blue-700'>
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
