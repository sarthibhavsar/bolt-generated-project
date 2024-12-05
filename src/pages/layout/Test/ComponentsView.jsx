import React, { useState, useRef, useEffect } from "react";
import {
  Button as CustomButton,
  // buttonVariants as customButtonVariants,
} from "@/components/custom/Inputs/Buttons";
import { Button, Button as UiButton } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SplitButton } from "@/components/custom/SplitButton";
// import { Component as FileUploader } from "@/components/custom/FileUploader";
import { CompactFileUploader } from "@/components/custom/CompactFileUploader";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import { CustomSelect } from "@/components/custom/Inputs/CustomSelect";
// import { CustomInput } from "@/components/custom/Inputs/CustomInput";
// import { MultiSelectInput } from "@/components/custom/Inputs/MultiSelectInput";
// import { getMenuItems } from "../../api/getMenuItems";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Eye, Edit, Trash2, FormInput } from "lucide-react";
// import { toast } from "sonner";
import {useToastStore} from "../../store/toastStore";
import { TableContainer } from "@/components/custom/CustomTable";
import { useAlert } from "../../components/custom/Alert/AlertContext";
import UserRegistrationForm from "./UserRegistrationForm";
import { usePostFormData } from "../../api/postFormData";
// import { useAlert } from "../../components/custom/Alert/AlertContext";

function ComponentsView() {
  const [open, setOpen] = React.useState(false);
  // console.log(formData, "formData");
  const {
    // defaultToast,
    // descriptionToast,
    successToast,
    infoToast,
    warningToast,
    errorToast,
    actionToast,
    // promiseToast,
    // customToast,
  } = useToastStore();

  const { showAlert } = useAlert();

  // const id = 6;
  // const {data, isLoading, isError} = getMenuItems(id);
  // console.log(data,isLoading, "menuItems");

  const testFormData = new FormData();
  testFormData.append("title", "foo");
  testFormData.append("body", "bar");
  testFormData.append("userId", 1);

  const {mutate: postFormData} = usePostFormData();

  const handlePrimaryAction = () => {
    console.log("Primary action clicked");
  };
  const handleSelectedItems = (selectedItems) => {
    console.log("Selected Items:", selectedItems);
  };

  const options = [
    { label: "Option 1", onClick: () => console.log("Option 1 clicked") },
    { label: "Option 2", onClick: () => console.log("Option 2 clicked") },
    { label: "Option 3", onClick: () => console.log("Option 3 clicked") },
  ];

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2023-01-15",
      salary: 75000,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Active",
      joinDate: "2023-02-20",
      salary: 65000,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Editor",
      status: "Inactive",
      joinDate: "2023-03-10",
      salary: 70000,
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "User",
      status: "Active",
      joinDate: "2023-04-05",
      salary: 62000,
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie@example.com",
      role: "Admin",
      status: "Inactive",
      joinDate: "2023-05-12",
      salary: 80000,
    },
  ];

  /**
   * Reusable Table Component
   */

  /**
   * Accepts data, columns, actions as props
   * -- data: Array of objects(users in this example)
   * -- columns: {header: string, accessor: string}
   * -- actions: {label: string, icon: JSX.Element, onClick: (selectedItems: Array<Object>) => void}[]}
   * -- tableHeaderButtons: {label: string, onClick: () => void}[]
   */

  const columns = [
    { header: "Name", accessor: "name" }, //filterType: 'text'
    { header: "Email", accessor: "email" }, //, filterType: 'text'
    {
      header: "Role",
      accessor: "role",
      // filterType: 'select',
      // options: ['Admin', 'User', 'Editor']
    },
    {
      header: "Status",
      accessor: "status",
      // filterType: 'select',
      // options: ['Active', 'Inactive']
    },
    { header: "Join Date", accessor: "joinDate" }, //filterType: 'date',
    { header: "Salary", accessor: "salary" }, //filterType: 'number',
  ];

  const actions = [
    {
      label: "View",
      icon: <Eye className="w-4 h-4" />,
      onClick: (user) => {
        console.log(user, "heleeeeeeeeeeeeee");
        console.log("View users:", user);
      },
    },
    {
      label: "Edit",
      icon: <Edit className="w-4 h-4" />,
      onClick: (selectedUsers) => {
        console.log("Edit users:", selectedUsers);
      },
    },
    {
      label: "Delete",
      icon: <Trash2 className="w-4 h-4" />,
      onClick: (selectedUsers) => {
        console.log("Delete users:", selectedUsers);
      },
    },
  ];

  const tableHeaderButtons = [
    {
      label: "Add User",
      onClick: async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        console.log("Fetched users:", data);
      },
    },
    {
      label: "Export",
      onClick: () => console.log("Export clicked"),
    },
    {
      label: "Group Edit",
      onClick: () => console.log("Group Edit clicked"),
    },
    {
      label: "Defaults",
      onClick: () => console.log("Defaults clicked"),
    },
  ];

  return (
    <div className="overflow-y-auto pb-8 w-full h-full">
      <Button onClick={() => postFormData(testFormData)}>Post Form Data</Button>
      {/*---------------------- Button Component ------------------------*/}
      <div className="flex gap-3">
        <CustomButton>Default Button</CustomButton>
        <CustomButton variant="destructive">Destructive</CustomButton>
        <CustomButton variant="outline">Outline</CustomButton>
        <CustomButton variant="secondary">Secondary</CustomButton>
        <CustomButton variant="ghost">Ghost</CustomButton>
        <CustomButton variant="link">Link</CustomButton>
        <CustomButton size="sm">Small</CustomButton>
        <CustomButton size="lg">Large</CustomButton>
        <CustomButton disabled>Disabled</CustomButton>
      </div>
      <br />
      {/*---------------------- Ui Button Component ------------------------*/}
      <div className="flex gap-3">
        <UiButton>Default Button</UiButton>
        <UiButton variant="destructive">Destructive</UiButton>
        <UiButton variant="outline">Outline</UiButton>
        <UiButton variant="secondary">Secondary</UiButton>
        <UiButton variant="ghost">Ghost</UiButton>
        <UiButton variant="link">Link</UiButton>
        <UiButton size="sm">Small</UiButton>
        <UiButton size="lg">Large</UiButton>
        <UiButton disabled>Disabled</UiButton>
      </div>
      <br />
      {/*---------------------- Avatar Component ------------------------*/}
      <div className="flex gap-3 items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="h-6">
          <Badge variant="">Badge</Badge>
          <Badge variant="outline">Badge</Badge>
          <Badge variant="secondary">Badge</Badge>
          <Badge variant="destructive">Badge</Badge>
        </div>
      </div>
      {/*---------------------- Split Button Component ------------------------*/}
      <div className="flex gap-3 mt-6">
        <SplitButton
          primaryActionLabel="Primary Action"
          primaryActionOnClick={handlePrimaryAction}
          options={options}
        />
        <SplitButton
          primaryActionLabel="Another Action"
          primaryActionOnClick={() => console.log("Another action clicked")}
          options={[
            { label: "Custom Option", onClick: () => console.log("Custom option clicked") },
            { label: "Do Something", onClick: () => console.log("Doing something") },
          ]}
        />
      </div>
      {/*---------------------- File Uploader Compoent ------------------------*/}
      {/* <div className="flex flex-col gap-2 mt-6">
        <p className="font-semibold">File Uploader</p>
        <FileUploader />
      </div> */}
      {/*---------------------- Compact File Uploader Component ------------------------*/}
      <div className="flex flex-col gap-2 mt-6">
        <h1>Compact File Uploader</h1>
        <CompactFileUploader  />
      </div>
      {/*---------------------- Sheet Component ------------------------*/}
      <div className="flex gap-2 mt-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button>Top Sheet</Button>
          </SheetTrigger>
          <SheetContent side={"top"}>
            <SheetHeader>
              <SheetTitle>Are you absolutely top?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Bottom Sheet</Button>
          </SheetTrigger>
          <SheetContent side={"bottom"}>
            <SheetHeader>
              <SheetTitle>Are you absolutely bottom?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Sheet modal={false}>
          <SheetTrigger asChild>
            <Button>Left Sheet</Button>
          </SheetTrigger>
          <SheetContent onInteractOutside={(e) => e.preventDefault()} side={"left"}>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Right Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      {/*---------------------- Dialog Component ------------------------*/}
      <div className="flex gap-2 mt-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Modal</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" defaultValue="John Doe" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" defaultValue="@JohnDoe" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  setOpen(false);
                  // showAlert(
                  //   "success",
                  //   "Changes Saved",
                  //   "Your profile changes have been saved successfully."
                  // );
                }}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/*---------------------- Alert Component ------------------------*/}
      <div className="flex gap-2 mt-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              setOpen(false);
              showAlert("success", "Saved Successfully", "Successfully processed your request!");
            }}
          >
            Success Alert
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              setOpen(false);
              showAlert("error", "Error Occurred", "There was an error processing your request.");
            }}
          >
            Error Alert
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              setOpen(false);
              showAlert("delete", "Confirm Deletion", "Are you sure you want to delete this item?");
            }}
          >
            Delete Alert
          </Button>
        </div>
      </div>
      {/*---------------------- Toast Component ------------------------*/}

      <div className="flex gap-2 mt-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() =>
              successToast("Success! Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
                position: "top-right",
              })
            }
          >
            Success Toast
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              infoToast("Info! This is an informational message", {
                position: "top-right",
              })
            }
          >
            Info Toast
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              warningToast("Warning! This is a warning message", {
                position: "top-right",
              })
            }
          >
            Warning Toast
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              errorToast("Error! Something went wrong", {
                position: "bottom-right",
              })
            }
          >
            Error Toast
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              actionToast("Event Has Been Created!", {
                position: "top-right",

                label: "Undo",
                onClick: () => console.log("Undo"),
              })
            }
          >
            Action Toast
          </Button>
        </div>
      </div>
      {/*---------------------- Table Component ------------------------*/}
      <Card className="mt-2">
        <CardContent className="px-0">
          <TableContainer
            getSelectedItems={handleSelectedItems}
            headerButtons={tableHeaderButtons}
            data={users}
            columns={columns}
            actions={actions}
            itemsPerPage={5}
          />
        </CardContent>
      </Card>

      {/* ---------------------- User Registration Form ---------------------- */}
      <div className="flex flex-col gap-2 mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Registration Form</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>User Registration</DialogTitle>
            <DialogDescription>Fill out the form to register a new user.</DialogDescription>
            <UserRegistrationForm
              onSubmit={(data) => {
                console.log(data);
                // setFormData(data); // Set form data in temporary state
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* ---------------------- Form Component ---------------------- */}
      <div className="flex flex-col gap-2 mt-6">
        {/* <CustomSelect label="Select an option" options={options} />
        <CustomInput label="Enter your name" placeholder="Enter your name" />
        <CustomTextArea label="Enter your message" placeholder="Enter your message" />
        <CustomDatePicker label="Select a date" />
        <MultiSelect label="Select multiple options" options={options} /> */}
      </div>
    </div>
  );
}

export default ComponentsView;
