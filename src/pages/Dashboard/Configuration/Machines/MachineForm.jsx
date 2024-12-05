import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMachine, updateMachine } from "./api";
import { useAlert } from "@/components/custom/Alert/AlertContext";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  Input,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/index";
import { getProductionLines } from "./api";

const machineSchema = z.object({
  GCMM_Code: z.string().min(1, "Machine code is required")
    .max(50, "Machine code cannot exceed 50 characters"),
  GCMM_Name: z.string().min(1, "Machine name is required")
    .max(100, "Machine name cannot exceed 100 characters"),
  GCMM_Line_Id: z.number({
    required_error: "Production line is required",
    invalid_type_error: "Production line must be selected",
  }),
  GCMM_Status: z.number({
    required_error: "Status is required",
    invalid_type_error: "Status must be selected",
  }),
  GCMM_Mac_Address: z.string()
    .min(1, "MAC address is required")
    .regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, "Invalid MAC address format (XX:XX:XX:XX:XX:XX)"),
  GCMM_IP_Address: z.string()
    .min(1, "IP address is required")
    .regex(/^(\d{1,3}\.){3}\d{1,3}$/, "Invalid IP address format"),
  GCMM_SDA_IP_Address: z.string()
    .min(1, "SDA IP address is required")
    .regex(/^(\d{1,3}\.){3}\d{1,3}$/, "Invalid IP address format"),
});

const MachineForm = ({ machine, onClose }) => {
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  const { data: productionLines = [] } = useQuery({
    queryKey: ["productionLines"],
    queryFn: getProductionLines,
  });

  const form = useForm({
    resolver: zodResolver(machineSchema),
    defaultValues: machine || {
      GCMM_Code: "",
      GCMM_Name: "",
      GCMM_Line_Id: undefined,
      GCMM_Status: 1,
      GCMM_Mac_Address: "",
      GCMM_IP_Address: "",
      GCMM_SDA_IP_Address: "",
    },
  });

  const mutation = useMutation({
    mutationFn: machine ? updateMachine : createMachine,
    onSuccess: () => {
      queryClient.invalidateQueries(["machines"]);
      showAlert("success", "Success", `Machine ${machine ? "updated" : "created"} successfully`);
      onClose();
    },
    onError: (error) => {
      showAlert("error", "Error", error.message || `Failed to ${machine ? "update" : "create"} machine`);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(machine ? { ...data, GCMM_Id: machine.GCMM_Id } : data);
  };

  return (
    <div className="mx-auto  mt-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid px-2  grid-cols-2 max-h-[60vh] overflow-y-auto gap-6">
            <FormField
              control={form.control}
              name="GCMM_Code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Machine Code</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Enter machine code"
                    />
                  </FormControl>
                  <FormDescription>
                    Unique identifier for the machine
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="GCMM_Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Machine Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Enter machine name"
                    />
                  </FormControl>
                  <FormDescription>
                    Descriptive name for the machine
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="GCMM_Line_Id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Production Line</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select production line" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {productionLines.map((line) => (
                        <SelectItem 
                          key={line.GCML_Id} 
                          value={line.GCML_Id.toString()}
                        >
                          {line.GCML_Name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Production line where the machine is located
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="GCMM_Status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Active</SelectItem>
                      <SelectItem value="0">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Current operational status of the machine
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="GCMM_Mac_Address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MAC Address</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="XX:XX:XX:XX:XX:XX"
                    />
                  </FormControl>
                  <FormDescription>
                    Physical address of the machine (format: XX:XX:XX:XX:XX:XX)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="GCMM_IP_Address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IP Address</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="192.168.1.1"
                    />
                  </FormControl>
                  <FormDescription>
                    Network IP address of the machine
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="GCMM_SDA_IP_Address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SDA IP Address</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="192.168.1.2"
                    />
                  </FormControl>
                  <FormDescription>
                    SDA system IP address for the machine
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              {machine ? "Update" : "Create"} Machine
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MachineForm;
