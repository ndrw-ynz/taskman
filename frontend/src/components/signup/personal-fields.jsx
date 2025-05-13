import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Input } from "../ui/input";
import { DatePicker } from "../ui/date-picker";

export default function PersonalFields({ form }) {
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  return (
    <div className="space-y-5">
      {/* Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormDescription>
              This name will appear on your profile
            </FormDescription>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Date of Birth */}
      <div className="space-y-3">
        <FormLabel>Date of Birth</FormLabel>
        <DatePicker control={form.control} fieldName="dateOfBirth" />
      </div>
      {/* Gender */}
      <div>
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex w-[80%] flex-wrap justify-between"
                >
                  <FormItem className="flex items-center space-y-0 space-x-2">
                    <FormControl>
                      <RadioGroupItem value="MAN" />
                    </FormControl>
                    <FormLabel className="font-normal">Man</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-y-0 space-x-2">
                    <FormControl>
                      <RadioGroupItem value="WOMAN" />
                    </FormControl>
                    <FormLabel className="font-normal">Woman</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-y-0 space-x-2">
                    <FormControl>
                      <RadioGroupItem value="NON_BINARY" />
                    </FormControl>
                    <FormLabel className="font-normal">Non-binary</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-y-0 space-x-2">
                    <FormControl>
                      <RadioGroupItem value="SOMETHING_ELSE" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Something else
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-y-0 space-x-2">
                    <FormControl>
                      <RadioGroupItem value="PREFER_NOT_TO_SAY" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Prefer not to say
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
