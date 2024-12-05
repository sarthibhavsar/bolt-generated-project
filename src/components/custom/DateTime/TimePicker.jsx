import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./TimePickerInput";

function TimePicker({ date, setDate, onChange = () => {}, showLables = true, ...props }) {
  const minuteRef = React.useRef(null);
  const hourRef = React.useRef(null);
  const secondRef = React.useRef(null);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        {showLables && (
          <Label htmlFor="hours" className="text-xs">
            Hours
          </Label>
        )}
        <TimePickerInput
          picker="hours"
          onChange={onChange}
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
          {...props}
        />
      </div>
      <div className="grid gap-1 text-center">
        {
          showLables && (
            <Label htmlFor="minutes" className="text-xs">
              Minutes
            </Label>
          )
        }
        <TimePickerInput
          picker="minutes"
          date={date}
          onChange={onChange}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
          {...props}
        />
      </div>
      <div className="grid gap-1 text-center">
        {
          showLables && (
            <Label htmlFor="seconds" className="text-xs">
              Seconds
            </Label>
          )
        }
        <TimePickerInput
          picker="seconds"
          date={date}
          onChange={onChange}
          setDate={setDate}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
          {...props}
        />
      </div>
      {/* <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div> */}
    </div>
  );
}

export { TimePicker };
