import { Button } from "@/components/ui/button";
import ApplicantLayout from "@/components/layout/applicant-layout";
import { ReactElement } from "react";
import Image from "next/image";
import {
  DollarSignIcon,
  HomeIcon,
  MessageSquare,
  PenIcon,
  StarIcon,
  UserCheck2Icon,
} from "lucide-react";
import { DataTable } from "@/components/pages/profile/data-table";
import { columns } from "@/components/pages/profile/columns";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
const formSchema = z.object({
  githubUrl: z.string(),
  linkedUrl: z.string(),
});
function ProfessionalDetailsForm() {
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
          <div className="flex gap-4 mt-4">
            {skills.map((skill) => {
              return (
                <div
                  className="rounded border px-4 py-1 bg-slate-50"
                  key={skill.title}
                >
                  <div>{skill.title}</div>
                  <div>{skill.yoe}</div>
                </div>
              );
            })}
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
const skills = [
  {
    title: "React",
    yoe: "2+ years",
  },
  {
    title: "Golang",
    yoe: "3+ years",
  },
  {
    title: "Postgres",
    yoe: "3 years",
  },
  {
    title: "Hadoop",
    yoe: "Less than 1 years",
  },
];
const data = [
  {
    id: "Sess-8782",
    title:
      "You can't compress the program without quantifying the open-source SSD pixel!",
    status: "in progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "Sess-7878",
    title:
      "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: "backlog",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "Sess-7839",
    title: "We need to bypass the neural TCP card!",
    status: "todo",
    label: "bug",
    priority: "high",
  },
  {
    id: "Sess-5562",
    title:
      "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
    status: "backlog",
    label: "feature",
    priority: "medium",
  },
  {
    id: "Sess-8686",
    title:
      "I'll parse the wireless SSL protocol, that should driver the API panel!",
    status: "canceled",
    label: "feature",
    priority: "medium",
  },
];
export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl bg-white p-4  gap-4  min-h-[200px]">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="w-1 h-[20px] bg-indigo-500 rounded" />
            <p className="text-lg font-medium text-center">Personal Details</p>
          </div>
          <Button variant="outline" className="gap-2">
            <PenIcon size={12} />
            Edit
          </Button>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="relative  rounded-full overflow-hidden">
            <Image
              src="/images/profile.png"
              alt="Profile"
              width={100}
              height={100}

              // className="object-fill rounded-full overflow-hidden"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <h1 className="text-lg font-semibold">Prajwal Pradhan</h1>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="flex flex-col">
                <p className="text-sm">Email</p>
                <p>prajwal@ramailo.tech</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm">Phone</p>
                <p>+977 9844697839</p>
              </div>{" "}
              <div className="flex flex-col">
                <p className="text-sm">Date Of Birth</p>
                <p>7 May, 1997</p>
              </div>{" "}
              <div className="flex flex-col">
                <p className="text-sm">Address</p>
                <p>Kathmandu, Nepal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 mt-4 gap-4">
          <div className="bg-slate-100 flex items-center gap-4 px-4 py-2 rounded-lg">
            <MessageSquare />
            <div className="flex flex-col">
              <p className="text-xl">500</p>
              <p>Total Interviews</p>
            </div>
          </div>{" "}
          <div className="bg-slate-100 flex items-center gap-4 px-4 py-2 rounded-lg">
            <StarIcon />
            <div className="flex flex-col">
              <p className="text-xl">5</p>
              <p>Overall Rating</p>
            </div>
          </div>{" "}
          <div className="bg-slate-100 flex items-center gap-4 px-4 py-2 rounded-lg">
            <UserCheck2Icon />
            <div className="flex flex-col">
              <p className="text-xl">80%</p>
              <p>Interview Success</p>
            </div>
          </div>{" "}
          <div className="bg-slate-100 flex items-center gap-4 px-4 py-2 rounded-lg">
            <DollarSignIcon />
            <div className="flex flex-col">
              <p className="text-xl">200</p>
              <p>Amount Spent</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4  gap-4  min-h-[200px]">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="w-1 h-[20px] bg-indigo-500 rounded" />
            <p className="text-lg font-medium text-center">
              Professional Details
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <PenIcon size={12} />
            Edit
          </Button>
        </div>
        <div className="flex flex-col">
          <div className="max-w-lg">
            <ProfessionalDetailsForm />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4  gap-4  min-h-[200px]">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="w-1 h-[20px] bg-indigo-500 rounded" />
            <p className="text-lg font-medium text-center">Interview History</p>
          </div>
          {/*<Button variant="outline" className="gap-2">*/}
          {/*  <PenIcon size={12} />*/}
          {/*  Edit*/}
          {/*</Button>*/}
        </div>
        <div className="flex flex-col mt-4">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <ApplicantLayout>{page}</ApplicantLayout>;
};
