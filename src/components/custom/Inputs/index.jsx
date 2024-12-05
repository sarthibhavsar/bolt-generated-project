import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {CustomInput} from "./CustomInput";
import {CustomSelect} from "./CustomSelect";
import {MultiSelectInput} from "./MultiSelectInput";

const frameworks = [
  {
    value: 1,
    label: "Next.js",
  },
  {
    value: 2,
    label: "SvelteKit",
  },
  {
    value: 3,
    label: "Nuxt.js",
  },
  {
    value: 4,
    label: "Remix",
  },
  {
    value: 5,
    label: "Astro",
  },
];

const InputsDemo = () => {
  return (
    <div className="w-full">
      <Card className="mt-3 min-h-[90vh] p-3">
        <CardTitle>
          <div className="text-4xl font-bold text-center">Inputs</div>
        </CardTitle>
        <CardContent>
          <div className="flex items-start justify-start gap-4 mt-5">
            <div className="flex flex-col items-start justify-start gap-2 p-2 border rounded-lg shadow ">
              <span className="text-sm font-semibold text-slate-500">
                Type Search
              </span>
              <CustomSelect
                data={frameworks}
                placeholder="Select parts..."
                labelField="label"
                valueField="value"
                onChange={(id) => {
                  console.log(id);
                }}
              />
            </div>

            <div className="flex justify-start items-start flex-col gap-2 border p-2 rounded-lg shadow w-[300px] ">
              <span className="text-sm font-semibold text-slate-500">
                Multi Select
              </span>
              <MultiSelectInput
                data={frameworks}
                labelField="label"
                valueField="value"
                placeholder="Select framweork"
                onChange={e => {
                  console.log(e)
                }}
              />
            </div>

            <div className="flex flex-col items-start justify-start gap-2 p-2 border rounded-lg shadow ">
              <span className="text-sm font-semibold text-slate-500">
                Select
              </span>
              <CustomSelect
                data={frameworks}
                placeholder="Select parts..."
                labelField="label"
                valueField="value"
                typeSearch={false}
                onChange={(id) => {
                  console.log(id);
                }}
              />
            </div>

            <div className="flex flex-col items-start justify-start gap-2 p-2 border rounded-lg shadow ">
              <span className="text-sm font-semibold text-slate-500">
                Text Input
              </span>
              <CustomInput type="text" id="name" placeholder="Enter name..." />
            </div>

            <div className="flex flex-col items-start justify-start gap-2 p-2 border rounded-lg shadow ">
              <span className="text-sm font-semibold text-slate-500">
                Number Input
              </span>
              <CustomInput
                type="number"
                id="value"
                placeholder="Enter value..."
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InputsDemo;
