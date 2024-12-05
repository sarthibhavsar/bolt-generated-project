import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelectInput } from "@/components/custom/Inputs/MultiSelectInput";

export function ReusableForm({ fields, schema, onSubmit, initialValues, ref }) {
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const handleSubmit = async(values) => {
    let status = await onSubmit(values)
    console.log(status)
    if (status){
      form.reset()  
    }
  }

 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === "select" ? (
                    <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === "multiselect" ? (
                    <MultiSelectInput
                      data={field.options}
                      labelField="label"
                      valueField="value"
                      value={formField.value}
                      placeholder={field.placeholder}
                      onChange={formField.onChange}
                    />
                  ) : (
                    <Input
                      type={field.type}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      {...formField}
                    />
                  )}
                </FormControl>
                {field.description && <FormDescription>{field.description}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
