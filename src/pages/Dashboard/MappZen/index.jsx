import { HeaderCard } from "./HeaderCard";
import Details from "./Details";
// import { ColumnChart } from "../../components/custom/ColumnChart";
import Reports from "./Reports";
import { SPCCard } from "./SPCCard";
// import BreadCrumb from "../Utility/BreadCrumb";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { LucideExpand, MoreHorizontal } from "lucide-react";

const data = [
  {
    id: 1,
    to: "/plans",
    title: "Inactive Plans",
    value: 154,
    footer: "plans",
  },
  {
    id: 1,
    to: "/plans",
    title: "Active Plans",
    value: 24,
    footer: "plans",
  },
  {
    id: 1,
    to: "/inspections",
    title: "Pending Inspections",
    value: 101,
    footer: "inspections",
  },
  {
    id: 1,
    to: "/inspections",
    title: "Rejected Inspections",
    value: 98,
    footer: "inspections",
  },
];

const MappZen = () => {
  return (
    <div className="w-full">
      {/* <div className="mb-3 flex justify-between items-center">
        <BreadCrumb />
        <div className="flex justify-center items-center gap-8">
          <div className="cursor-pointer">
            <ArrowDownTrayIcon className="size-4" />
          </div>
          <div className="cursor-pointer">
            <LucideExpand className="size-4" />
          </div>
          <div className="cursor-pointer">
            <MoreHorizontal className="size-4" />
          </div>
        </div>
      </div> */}
      <HeaderCard />

      <div className=" flex justify-center items-start gap-3">
        <div className="w-[70%] mt-3 ">
          <div className="flex justify-between items-center flex-wrap ">
            {data.map((data, i) => (
              <Details data={data} key={i} />
            ))}
          </div>
          <div className="flex justify-between items-center gap-3">
            <div className="mt-2 w-1/2">{/* <ColumnChart /> */}</div>
            <div className="mt-3 w-1/2">
              <SPCCard />
            </div>
          </div>
        </div>
        <div className="w-[30%] mt-3 flex justify-evenly items-center">
          <Reports />
        </div>
      </div>
    </div>
  );
};

export default MappZen;
