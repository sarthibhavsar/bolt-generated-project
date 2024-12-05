import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import {
  CustomCard,
  CustomCardContent,
  CustomCardHeader,
} from "../../components/custom/Cards";

const Upgrade = () => {
  const data = [
    {
      id: 2,
      title: "Basic",
      price: 299,
      btnText: "Upgrade",
    },
    {
      id: 3,
      title: "Pro",
      price: 1299,
      btnText: "Upgrade",
    },
    {
      id: 4,
      title: "Enterprice",
      price: 999,
      btnText: "Upgrade",
    },
    {
      id: 1,
      title: "Custom",
      price: 0,
      btnText: "Contact Sales",
    },
  ];

  const items = [
    "All Free plan features",
    "Unlimited Storage",
    "Unlimited Spaces",
    "Unlimited Custom Fields",
    "Unlimited Gantt Charts",
    "Time Tracking",
    "AI compatible",
  ];

  return (
    <CustomCard>
      <CustomCardHeader>
        <div className="flex justify-start items-center gap-4">
          <span className="text-3xl font-semibold ">
            Upgrade to unlease everything
          </span>
          <span className="flex items-center gap-2 bg-green-100 border border-green-300 p-1 px-4 rounded-md">
            <CheckBadgeIcon className="size-4 text-green-700" />
            <span className="text-green-950 font-semibold text-[16px]">
              30 day money back guarantee
            </span>
          </span>
        </div>
      </CustomCardHeader>
      <CustomCardContent>
        <div className="flex justify-end items-center gap-8">
          {data.map((item) => {
            return (
              <div
                key={item.id}
                className="w-1/3 min-h-[70vh] cursor-pointer border rounded-lg shadow-lg transition-transform hover:shadow-inner hover:scale-95"
                // hover:bg-gradient-to-b animate-in hover:from-white hover:to-purple-200 hover:border-purple-400"
              >
                <div className="p-3">
                  <span className="font-semibold text-[24px]">
                    {item.title}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-[32px] font-semibold">
                      ${item.price}
                    </span>
                    <span className="text-[11px]">Member / Month</span>
                  </span>
                </div>
                <div className="p-3">
                  <div>
                    <div className="w-full">
                      <Button className="w-full bg-gradient-to-r from-purple-400 to-blue-500">
                        {item.btnText}
                      </Button>
                    </div>
                    <div className="w-full mt-5 text-sm">
                      <span className="font-semibold">Unlimited</span> Plan
                      Includes :
                      <div className="flex flex-col gap-2 mt-3">
                        {items.map((itm) => {
                          return (
                            <div key={itm} className="flex items-center gap-5">
                              <CheckIcon className="size-4 text-purple-800" />
                              <span className="text-[14px]">{itm}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CustomCardContent>
    </CustomCard>
  );
};

export default Upgrade;
