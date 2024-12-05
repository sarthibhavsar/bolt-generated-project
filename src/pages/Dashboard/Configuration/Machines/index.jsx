import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MachineTable from "./MachineTable";
import MachineForm from "./MachineForm";

const Machines = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedMachine, setSelectedMachine] = useState(null);

  const handleEdit = (machine) => {
    setSelectedMachine(machine);
    setActiveTab("form");
  };

  const handleFormClose = () => {
    setSelectedMachine(null);
    setActiveTab("list");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Machine Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="list">Machine List</TabsTrigger>
            <TabsTrigger value="form">
              {selectedMachine ? "Edit Machine" : "Add Machine"}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <MachineTable onEdit={handleEdit} />
          </TabsContent>
          <TabsContent value="form">
            <MachineForm 
              machine={selectedMachine} 
              onClose={handleFormClose}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Machines;
