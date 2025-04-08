"use client";

import React, { useState } from "react";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { FormField, FormItem, FormMessage } from "./form";

export function DatePicker({ control, fieldName, startYear, endYear }) {
  const today = new Date();
  const defaultStartYear = getYear(today) - 100;
  const defaultEndYear = getYear(today) + 100;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    {
      length: (endYear || defaultEndYear) - (startYear || defaultStartYear) + 1,
    },
    (_, i) => (startYear || defaultStartYear) + i,
  );

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => {
        const date = field.value || undefined;

        const handleMonthChange = (month) => {
          const newDate = setMonth(date, months.indexOf(month));
          field.onChange(newDate);
        };

        const handleYearChange = (year) => {
          const newDate = setYear(date, parseInt(year));
          field.onChange(newDate);
        };

        const handleSelect = (selectedDate) => {
          if (selectedDate) {
            field.onChange(selectedDate);
          }
        };

        return (
          <FormItem className="flex flex-col gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[250px] justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <div className="flex justify-between p-2">
                  <Select
                    onValueChange={handleMonthChange}
                    value={months[getMonth(date)]}
                  >
                    <SelectTrigger className="w-[110px]">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={handleYearChange}
                    value={getYear(date).toString()}
                  >
                    <SelectTrigger className="w-[110px]">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleSelect}
                  initialFocus
                  month={date}
                  onMonthChange={field.onChange}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
