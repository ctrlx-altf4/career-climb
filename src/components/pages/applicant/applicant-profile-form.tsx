import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  githubUrl: z.string(),
  linkedUrl: z.string(),
});
function ApplicantProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubUrl: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <div className="flex flex-col">
          <p>Skills</p>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default ApplicantProfileForm;
