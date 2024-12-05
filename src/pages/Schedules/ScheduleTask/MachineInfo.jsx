import { Card, CardContent } from "@/components/ui/card";

const MachineInfo = () => {
  const machineDetails = {
    machineNumber: "MCH001",
    modelName: "Industrial Press X-1000",
    machineName: "Press Machine A1"
  };

  return (
    <Card className="bg-slate-50">
      <CardContent className="grid grid-cols-3 gap-4 p-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Machine Number</p>
          <p className="font-medium">{machineDetails.machineNumber}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Model Name</p>
          <p className="font-medium">{machineDetails.modelName}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Machine Name</p>
          <p className="font-medium">{machineDetails.machineName}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MachineInfo;
