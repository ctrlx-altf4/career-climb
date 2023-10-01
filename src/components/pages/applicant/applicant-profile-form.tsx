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
  getUserControllerSelfQueryKey,
  useApplicantControllerCreate,
  useUserControllerSelf,
} from "@/api/generated";
import { parsePhoneNumber } from "libphonenumber-js";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  githubUrl: z
    .string()
    .regex(
      /^(https:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+(\/)?$/,
      "Invalid Github Url",
    ),
  linkedUrl: z
    .string()
    .regex(
      new RegExp(
        /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/[\w-]+\/?$/,
      ),
      "Invalid Linkedin url",
    ),
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
      githubUrl: "",
    },
  });

  const router = useRouter();

  const { data: me } = useUserControllerSelf();
  const { mutateAsync, isLoading } = useApplicantControllerCreate();

  const { toast } = useToast();

  const queryClient = useQueryClient();
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    if (!me) return;
    mutateAsync({
      data: {
        experience: 0,
        interview_count: 0,
        address: values.address,
        github_url: values.githubUrl,
        linkedin_url: values.linkedUrl,
        phone: values.phone,
        current_company: values.current_company,
        dob: "2023-10-01T03:45:18.318Z",
        user_id: me.id,
        rating: 0,
      },
    })
      .then(async () => {
        await queryClient.invalidateQueries({
          queryKey: getUserControllerSelfQueryKey(),
        });
        void router.push("/applicant/dashboard");
      })
      .catch(() => {
        toast({
          title: "Failed to submit",
          description: "Please Try again, Something went wrong",
        });
      });
  }

  return (
    <div>
      <h1 className="text-lg font-medium ">Please Complete Your Profile</h1>
      <span className="text-xs text-slate-700">
        Completing your profile helps us evaluate your need. You can then
        explore the experts based on your experience
      </span>
      <div className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                    Enter number with your country code
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
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github Url</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com" {...field} />
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
              name="linkedUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Linked In Url</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com" {...field} />
                  </FormControl>
                  {/*<FormDescription>*/}
                  {/*  This is your public display name.*/}
                  {/*</FormDescription>*/}
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
