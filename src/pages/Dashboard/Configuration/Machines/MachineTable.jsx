import { TableContainer } from "@/components/custom/CustomTable";
import { Eye, Edit, Trash2, Calendar, ListTodo } from "lucide-react";
import { useAlert } from "@/components/custom/Alert/AlertContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMachine, getMachines } from "./api";

const MachineTable = ({ onEdit }) => {
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  const { data: machines = [], isLoading } = useQuery({
    queryKey: ["machines"],
    queryFn: getMachines,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMachine,
    onSuccess: () => {
      queryClient.invalidateQueries(["machines"]);
      showAlert("success", "Success", "Machine deleted successfully");
    },
    onError: (error) => {
      showAlert("error", "Error", error.message || "Failed to delete machine");
    },
  });

  const handleDelete = async (machine) => {
    const confirmed = await showAlert(
      "delete",
      "Delete Machine",
      `Are you sure you want to delete ${machine.GCMM_Name}?`
    );
    if (confirmed) {
      deleteMutation.mutate(machine.GCMM_Id);
    }
  };

  const columns = [
    { header: "Code", accessor: "GCMM_Code" },
    { header: "Name", accessor: "GCMM_Name" },
    { header: "Line", accessor: "GCMM_Line_Name" },
    { header: "MAC Address", accessor: "GCMM_Mac_Address" },
    { header: "IP Address", accessor: "GCMM_IP_Address" },
    { header: "SDA IP Address", accessor: "GCMM_SDA_IP_Address" },
    {
      header: "Status",
      accessor: "GCMM_Status",
      Cell: ({ value }) => (
        <span className={`px-2 py-1 rounded-full text-sm ${
          value === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value === 1 ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: "View",
      icon: <Eye className="w-4 h-4" />,
      onClick: (machine) => console.log("View machine:", machine),
    },
    {
      label: "Edit",
      icon: <Edit className="w-4 h-4" />,
      onClick: onEdit,
    },
    {
      label: "Delete",
      icon: <Trash2 className="w-4 h-4" />,
      onClick: handleDelete,
    },
    {
      label: "Schedule List",
      icon: <Calendar className="w-4 h-4" />,
      onClick: (machine) => console.log("View schedule list:", machine),
    },
    {
      label: "Schedule Task",
      icon: <ListTodo className="w-4 h-4" />,
      onClick: (machine) => console.log("Schedule task:", machine),
    },
  ];

  return (
    <TableContainer
      data={machines}
      columns={columns}
      actions={actions}
      isLoading={isLoading}
    />
  );
};

export default MachineTable;
