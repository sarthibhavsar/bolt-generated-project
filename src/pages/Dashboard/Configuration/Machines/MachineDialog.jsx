import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMachine, updateMachine } from "./api";
import { useAlert } from "@/components/custom/Alert/AlertContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Button,
} from "@/components/index";

const machineSchema = z.object({
  GCMM_Code: z.string().min(1, "Code is required"),
  GCMM_Name: z.string().min(1, "Name is required"),
  GCMM_Line_Id: z.number(),
  GCMM_Mac_Address: z.string().min(1, "MAC Address is required"),
  GCMM_IP_Address: z.string().min(1, "IP Address is required"),
  GCMM_SDA_IP_Address: z.string().min(1, "SDA IP Address is required"),
});

const MachineDialog = ({ open, onOpenChange, machine }) => {
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(machineSchema),
    defaultValues: machine || {
      GCMM_Code: "",
      GCMM_Name: "",
      GCMM_Line_Id: 4,
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
      onOpenChange(false);
      form.reset();
    },
    onError: (error) => {
      showAlert("error", "Error", error.message || `Failed to ${machine ? "update" : "create"} machine`);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(machine ? { ...data, GCMM_Id: machine.GCMM_Id } : data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{machine ? "Edit" : "Add"} Machine</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="GCMM_Code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="GCMM_Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                    <Input {...field} />
                  </FormControl>
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
                    <Input {...field} />
                  </FormControl>
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MachineDialog;
