import { ReusableForm } from "@/components/custom/Form/Form"
import * as z from "zod"

const userFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  roles: z.array(z.object({
    value: z.string(),
    label: z.string()
  })).min(1, "Please select at least one role").default([]),
})

const userFormFields = [
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
    description: "This will be your unique identifier on the platform",
  },
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email address",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    description: "Password must be at least 8 characters long",
  },
  {
    name: "roles",
    label: "Roles",
    type: "multiselect",
    placeholder: "Select your roles",
    options: [
      { value: "user", label: "User" },
      { value: "admin", label: "Admin" },
      { value: "manager", label: "Manager" },
      { value: "developer", label: "Developer" },
    ],
  },
]

// Example initial values (optional)
const initialUserData = {
  username: "johndoe",
  fullName: "John Doe",
  email: "john.doe@example.com",
  roles:[
    {
        "value": "user",
        "label": "User"
    },
]
}

export default function UserRegistrationForm() {
  const handleSubmit = (data) => {
    console.log("Form submitted with data:", data)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="mb-4 text-2xl font-bold">User Registration</h2>
      <ReusableForm
        fields={userFormFields}
        schema={userFormSchema}
        onSubmit={handleSubmit}
        initialValues={initialUserData} // Remove this line to start with an empty form
      />
    </div>
  )
}
