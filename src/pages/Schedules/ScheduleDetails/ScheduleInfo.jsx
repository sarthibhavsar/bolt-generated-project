import { Card, CardContent } from "@/components/ui/card";

const ScheduleInfo = () => {
  const scheduleDetails = {
    machine: {
      number: "MCH001",
      name: "Press Machine A1",
      model: "Industrial Press X-1000"
    },
    schedule: {
      name: "Weekly Maintenance",
      duration: "2 hours"
    },
    config: {
      name: "WM-001",
      description: "Standard weekly maintenance procedure"
    }
  };

  return (
    <Card className="bg-slate-50">
      <CardContent className="grid grid-cols-3 gap-8 p-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Machine</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Number</p>
              <p className="font-medium">{scheduleDetails.machine.number}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="font-medium">{scheduleDetails.machine.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Model</p>
              <p className="font-medium">{scheduleDetails.machine.model}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Schedule</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="font-medium">{scheduleDetails.schedule.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Duration</p>
              <p className="font-medium">{scheduleDetails.schedule.duration}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Config</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="font-medium">{scheduleDetails.config.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Description</p>
              <p className="font-medium">{scheduleDetails.config.description}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleInfo;
