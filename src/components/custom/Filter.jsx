import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



export function Filter({ column, label, type, options, value, onChange }) {
  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor={`filter-${column}`}>{label}</Label>
      {type === 'text' ? (
        <Input
          id={`filter-${column}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="max-w-sm"
        />
      ) : (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="max-w-sm">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            {options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  )
}
