import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScheduleTaskList from "./ScheduleTaskList";
import MachineInfo from "./MachineInfo";

const ScheduleTask = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>PM Schedules List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <MachineInfo />
        <ScheduleTaskList />
      </CardContent>
    </Card>
  );
};

export default ScheduleTask;
