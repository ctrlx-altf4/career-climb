import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import {
  useInterviewerControllerCreate,
  useUserControllerSelf,
} from "@/api/generated";
import { parsePhoneNumber } from "libphonenumber-js";
import { Loader2 } from "lucide-react";
import AddSkillsForm from "@/components/pages/applicant/add-skills-form";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

//
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

const formSchema = z.object({
  price: z.number().default(500),
  address: z.string(),
  phone: z.string().refine((value) => {
    if (!value) return false;

    try {
      const phoneNumber = parsePhoneNumber(value);
      return phoneNumber.isValid();
    } catch {
      return false;
    }
  }, "Invalid phone number. Enter your country code as well"),
  current_company: z.string(),
});
function ApplicantProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 500,
    },
  });

  const { data: me } = useUserControllerSelf();
  const { mutateAsync, isLoading } = useInterviewerControllerCreate();

  const [showSkillsForm, setShowSkillsForm] = useState(false);
  const { toast } = useToast();
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    // TODO: handle properly
    if (!me) return;
    mutateAsync({
      data: {
        experience: 0,
        interview_count: 0,
        dob: "2023-10-01T03:45:18.318Z",
        address: values.address,
        phone: values.phone,
        current_company: values.current_company,
        price: values.price,
        user_id: me.id,
        rating: 0,
      },
    })
      .then(() => {
        setShowSkillsForm(true);
      })
      .catch(() => {
        toast({
          title: "Failed to submit",
          description: "Please Try again, Something went wrong",
        });
      });
  }

  if (showSkillsForm) return <AddSkillsForm />;
  return (
    <div>
      <h1 className="text-lg font-medium ">Please Complete Your Profile</h1>
      <span className="text-xs text-slate-700">
        Completing your profile helps us evaluate your need. You can then be
        found by the candidates who want to schedule interview with you.
      </span>
      <div className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Kathmandu" {...field} />
                  </FormControl>
                  {/*<FormDescription>*/}
                  {/*  This is your public display name.*/}
                  {/*</FormDescription>*/}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+97798XXXXXXXX" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter number with your country codes
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="current_company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current company</FormLabel>
                  <FormControl>
                    <Input placeholder="Ramailo tech" {...field} />
                  </FormControl>
                  {/*<FormDescription>*/}
                  {/*  This is your public display name.*/}
                  {/*</FormDescription>*/}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="500" {...field} />
                  </FormControl>
                  <FormDescription>
                    Set price for an hour of interview with you
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              <div className="flex items-center">
                {isLoading && (
                  <Loader2 className="mt-3 w-4 h-4  animate-spin" />
                )}
                <span>Submit</span>
              </div>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ApplicantProfileForm;
