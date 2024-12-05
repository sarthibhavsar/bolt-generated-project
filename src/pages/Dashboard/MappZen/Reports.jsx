import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  BellRing,
  ClipboardEditIcon,
} from "lucide-react";
import NoDataPreview from "../../../assets/NoDataPreview.svg";

const Reports = () => {
  const data = [
    {
      id: 1,
      title: "Batch-0208204 is created by User1",
      datetime: "02-07-2024 12:05 PM",
      color: "green",
    },
    {
      id: 2,
      title: "Batch-0208204 is rejected by User1",
      datetime: "02-07-2024 12:05 PM",
      color: "red",
    },
    {
      id: 3,
      title: "Batch-0208204 is submitted by User1",
      datetime: "02-07-2024 12:05 PM",
      color: "yellow",
    },
    {
      id: 5,
      title: "Batch-0208204 is rejected by User1",
      datetime: "02-07-2024 12:05 PM",
      color: "red",
    },
    {
      id: 4,
      title: "Batch-0208204 is created by User1",
      datetime: "02-07-2024 12:05 PM",
      color: "green",
    },
    {
      id: 6,
      title: "Batch-0208204 is submitted by User1",
      datetime: "02-07-2024 12:05 PM",
      color: "yellow",
    },
  ];
  return (
    <Card className="w-full shadow-lg min-h-[50vh]">
      <CardHeader className="font-semibold  p-2 px-6">
        <div className="flex justify-start items-center gap-5">
          <BellRing className="size-6 text-red-300 shadow-red-500" id="activity_bell"/>
          <div className="flex justify-center items-start gap-1 flex-col">
            <span>Activity Monitor</span>
            <span className="text-xs text-slate-400">0 Records</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-full">
        <div className="flex justify-center items-center gap-3 flex-col pt-3 h-full">
          {!data.length ? (
            data.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`flex justify-start items-start flex-col w-full border transition  p-2 rounded-md cursor-pointer hover:shadow-lg hover:scale-[1.02] `}
                >
                  <div className="flex justify-center items-center gap-2">
                    <div className="flex justify-center items-center">
                      <ClipboardEditIcon className="font-[8px]" />
                    </div>
                    <div className="flex justify-start items-start flex-col">
                      <span className=" font-semibold flex justify-start items-start gap-4">
                        {item.title}
                      </span>
                      <span className="font-semibold text-xs">
                        {item.datetime}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center items-center flex-col h-full">
              <img src={NoDataPreview} className="" />

              <span className="text-xl font-semibold text-slate-400">
                No result found
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Reports;
