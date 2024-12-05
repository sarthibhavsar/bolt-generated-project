import { TableContainer } from "@/components/custom/CustomTable";
import { Activity, ClipboardList, X } from "lucide-react";
import { useAlert } from "@/components/custom/Alert/AlertContext";
import { useNavigate } from "react-router-dom";

const ScheduleTaskList = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      name: "Weekly Maintenance",
      duration: "2 hours",
      configName: "WM-001",
      configDescription: "Standard weekly maintenance procedure",
      createdBy: "John Doe",
      createdOn: "2024-03-15",
      status: "Active"
    },
    {
      id: 2,
      name: "Monthly Inspection",
      duration: "4 hours",
      configName: "MI-002",
      configDescription: "Detailed monthly inspection routine",
      createdBy: "Jane Smith",
      createdOn: "2024-03-10",
      status: "Active"
    }
  ];

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Duration", accessor: "duration" },
    { header: "Config Name", accessor: "configName" },
    { header: "Config Description", accessor: "configDescription" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created On", accessor: "createdOn" },
    { 
      header: "Status", 
      accessor: "status",
      Cell: ({ value }) => (
        <span className={`px-2 py-1 rounded-full text-sm ${
          value === "Active" ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const actions = [
    {
      label: "Activities",
      icon: <Activity className="w-4 h-4" />,
      onClick: (item) => navigate(`/schedules/details/${item.id}`)
    },
    {
      label: "Tasks",
      icon: <ClipboardList className="w-4 h-4" />,
      onClick: (item) => console.log("View tasks for:", item)
    },
    {
      label: "Cancel",
      icon: <X className="w-4 h-4" />,
      onClick: async (item) => {
        const confirmed = await showAlert(
          "delete",
          "Cancel Schedule",
          `Are you sure you want to cancel the schedule "${item.name}"?`
        );
        if (confirmed) {
          console.log("Cancelling schedule:", item);
        }
      }
    }
  ];

  const headerButtons = [
    {
      label: "Add Schedule",
      onClick: () => console.log("Add new schedule")
    }
  ];

  return (
    <TableContainer
      data={data}
      columns={columns}
      actions={actions}
      headerButtons={headerButtons}
      globalSearch={true}
    />
  );
};

export default ScheduleTaskList;
