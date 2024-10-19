import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, FormProvider, useWatch } from "react-hook-form";
import { z } from "zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "@/components/ui/button";
import {
  FormControl,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerComponent } from "@/components/ui/DatePicker";
import { FaRegCheckCircle } from "react-icons/fa"; // Outline check circle icon
import { FaTimes } from "react-icons/fa"; // Cross icon

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  organization: z.string().min(1, { message: "Organization is required." }),
  contact: z.object({
    contactNumber: z.string()
      .min(10, { message: "Contact number must be at least 10 digits." })
      .max(15, { message: "Contact number must be at most 15 digits." })
      .nonempty({ message: "Contact number is required." }),
  }),
  joiningDate: z.date().min(new Date(), { message: "Joining date must be today or later." }),
  role: z.enum(["Admin", "Super Admin", "Faculty"]),
  programs: z.string().optional(),
  generatePassword: z.boolean(),
  active: z.boolean(),
  inactive: z.boolean(),
});

function generateUserId() {
  const randomId = Math.floor(Math.random() * 100000);
  return `AB${randomId}`;
}

export default function UserAddPage() {
  const [showDialog, setShowDialog] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      organization: "",
      contact: {
        contactNumber: "",
      },
      joiningDate: new Date(),
      role: "Admin",
      programs: "",
      generatePassword: false,
      active: false,
      inactive: false,
    },
  });

  const role = useWatch({ control: methods.control, name: "role" });
  const active = useWatch({ control: methods.control, name: "active" });
  const inactive = useWatch({ control: methods.control, name: "inactive" });
  const userId = React.useMemo(generateUserId, []); // Generate user ID once on component mount

  const { errors } = methods.formState;

  React.useEffect(() => {
    if (active && inactive) {
      methods.setValue("inactive", false);
    }
  }, [active, inactive, methods]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.generatePassword) {
      setEmail(values.email); // Set the email address for the dialog
      setShowDialog(true);
    } else {
      console.log(values);
    }
  }

  // General error message
  const generalError = Object.keys(errors).length > 0 && "Please enter all fields to proceed ahead";

  return (
    <div className="tw-bg-white tw-w-3/4 tw-shadow-lg tw-p-6 tw-rounded-lg">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          {/* User ID Section */}
          <div className="tw-mb-6">
            <p className="tw-text-sm tw-font-semibold" style={{color:"#1d1f70"}}>User ID: <span className="tw-text-sm tw-font-normal">{userId}</span></p>
            <hr className="tw-border-t tw-border-gray-300 tw-my-2" />
          </div>

          <div className="tw-flex tw-gap-6">
            {/* Left Column */}
            <div className="tw-flex tw-flex-col tw-gap-4 tw-w-1/2">
              <FormField
                control={methods.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        placeholder="Full Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.username?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email Id</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="Email Id"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="organization">Organization</FormLabel>
                    <FormControl>
                      <Input
                        id="organization"
                        placeholder="Organization"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.organization?.message}</FormMessage>
                  </FormItem>
                )}
              />
              {/* Conditionally render Assign Program field */}
              {role === "Faculty" && (
                <FormField
                  control={methods.control}
                  name="programs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="programs">Assign Program</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="tw-w-full">
                            <SelectValue placeholder="Program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage>{errors.programs?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Right Column */}
            <div className="tw-flex tw-flex-col tw-gap-4 tw-w-1/2">
              <FormField
                control={methods.control}
                name="contact.contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="contact">Contact</FormLabel>
                    <FormControl>
                      <Controller
                        name="contact.contactNumber"
                        control={methods.control}
                        render={({ field: { onChange, value } }) => (
                          <PhoneInput
                            country={'in'}
                            value={value}
                            onChange={onChange}
                            inputClass="tw-max-w-lg tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage>{errors.contact?.contactNumber?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="joiningDate"
                render={({ field }) => (
                  <FormItem className="tw-space-y-2">
                    <FormLabel htmlFor="joiningDate">Joining Date</FormLabel>
                    <FormControl>
                      <Controller
                        name="joiningDate"
                        control={methods.control}
                        render={({ field: { onChange, value } }) => (
                          <DatePickerComponent
                            selected={value}
                            onChange={onChange}
                            {...field}
                            placeholderText="Select a date"
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage>{errors.joiningDate?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="role">Assigning Role</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="tw-w-full">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Super Admin">Super Admin</SelectItem>
                          <SelectItem value="Faculty">Faculty</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>{errors.role?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="tw-flex tw-gap-4">
            <FormField
              control={methods.control}
              name="generatePassword"
              render={({ field }) => (
                <FormItem className="tw-flex tw-items-center tw-gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked || false)
                      }
                    />
                  </FormControl>
                  <p>Generate new password and notify user immediately</p>
                </FormItem>
              )}
            />
            <div className="tw-flex tw-gap-4">
              <FormField
                control={methods.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="tw-flex tw-items-center tw-gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(checked || false)
                        }
                      />
                    </FormControl>
                    <p>Active</p>
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="inactive"
                render={({ field }) => (
                  <FormItem className="tw-flex tw-items-center tw-gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(checked || false)
                        }
                      />
                    </FormControl>
                    <p>Inactive</p>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div style={{color:"#1d1f71" , marginTop:"20px" ,}}>
            <h5 className="tw-italic">
                All fields are mandatory*
            </h5>
          </div>
          <hr className="tw-border-t tw-border-gray-300 tw-mt-2 tw-mb-3" />
          {/* Move General Error Message to the Bottom */}
          {generalError && (
            <div className="tw-text-red-500">
              {generalError}
              {/* Add horizontal line with margin */}
            </div>
          )}
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>

      {/* AlertDialog for password generation confirmation */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
  <AlertDialogContent className="relative tw-flex tw-items-center tw-justify-center tw-min-w-[300px] tw-max-w-md tw-mx-auto tw-my-auto">
    <AlertDialogHeader className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center">
      <FaRegCheckCircle className="tw-text-green-500 tw-text-6xl" />
      <div>
        <AlertDialogTitle>
          <span>Completed</span>
        </AlertDialogTitle>
        {/* Close Icon */}
        <button
          className="tw-absolute tw-top-2 tw-right-2 tw-text-gray-500 hover:tw-text-gray-900"
          onClick={() => setShowDialog(false)}
          aria-label="Close"
        >
          <FaTimes className="tw-text-xl" />
        </button>
      </div>
      <AlertDialogDescription className="tw-mt-4 tw-text-center">
        We will share a link at the email address: <strong>{email}</strong>. The user can click the link to reset the password.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter className="tw-w-full">
      <AlertDialogAction onClick={() => setShowDialog(false)}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>
  );
}
