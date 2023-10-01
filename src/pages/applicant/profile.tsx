import { Button } from "@/components/ui/button";
import ApplicantLayout from "@/components/layout/applicant-layout";
import { ReactElement, useState } from "react";
import Image from "next/image";
import {
  DollarSignIcon,
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
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useApplicantControllerGetProfile,
  useSkillControllerFindOne,
  useUserControllerSelf,
} from "@/api/generated";
import { experienceArray } from "@/lib/constant";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddSkillsForm from "@/components/pages/applicant/add-skills-form";
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

  const { data: me } = useUserControllerSelf();

  const { data: profile } = useApplicantControllerGetProfile(String(me?.id!));

  const { data: skills } = useSkillControllerFindOne(String(me?.id));

  const [addSkillsModal, setAddSkillsModal] = useState(false);
  function onSubmit(values: z.infer<typeof formSchema>) {
    alert("NOT implemented");
    console.log("values", values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel>Github Url</FormLabel>
          <FormControl>
            <Input
              placeholder="https://github.com"
              value={profile?.github_url}
              disabled
            />
          </FormControl>

          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Linked In Url</FormLabel>
          <FormControl>
            <Input
              placeholder="https://linked.com"
              value={profile?.linkedin_url}
              disabled
            />
          </FormControl>

          <FormMessage />
        </FormItem>

        <div className="flex flex-col">
          <p>Skills</p>
          <div className="flex gap-4 mt-4">
            {skills?.map((skill) => {
              return (
                <div
                  className="rounded border px-4 py-1 bg-slate-50"
                  key={skill.skill_id}
                >
                  <div>{skill?.skill?.skill_name}</div>
                  <div>{experienceArray[skill.skill_experience].label}</div>
                </div>
              );
            })}
          </div>
          <div>
            <Dialog
              open={addSkillsModal}
              onOpenChange={() => setAddSkillsModal(false)}
            >
              <Button onClick={() => setAddSkillsModal(true)}>
                Add Skills
              </Button>
              <DialogContent>
                <AddSkillsForm onClose={() => setAddSkillsModal(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </form>
    </Form>
  );
}

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
  const { data: me } = useUserControllerSelf();

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
          <div className=" rounded-full ">
            <Image
              src={me?.image_url!}
              alt="Profile"
              width={100}
              height={100}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <h1 className="text-lg font-semibold">{me?.name}</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
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

        <div className="grid grid-cols-2 sm:grid-cols-4 mt-4 gap-4">
          <div className="bg-slate-100 flex items-center gap-2 md:gap-4 px-2 md:px-4 py-1 md:py-2 rounded-lg">
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
            <div className="flex flex-col">
              <p className="text-lg md:text-xl">500</p>
              <p>Interviews</p>
            </div>
          </div>{" "}
          <div className="bg-slate-100 flex items-center gap-2 md:gap-4 px-2 md:px-4 py-1 md:py-2 rounded-lg">
            <StarIcon className="w-5 h-5 md:w-6 md:h-6" />
            <div className="flex flex-col">
              <p className="text-lg md:text-xl">500</p>
              <p>Avg. Rating</p>
            </div>
          </div>
          <div className="bg-slate-100 flex items-center gap-2 md:gap-4 px-2 md:px-4 py-1 md:py-2 rounded-lg">
            <UserCheck2Icon className="w-5 h-5 md:w-6 md:h-6" />
            <div className="flex flex-col">
              <p className="text-lg md:text-xl">500</p>
              <p>Success Rate</p>
            </div>
          </div>
          <div className="bg-slate-100 flex items-center gap-2 md:gap-4 px-2 md:px-4 py-1 md:py-2 rounded-lg">
            <DollarSignIcon className="w-5 h-5 md:w-6 md:h-6" />
            <div className="flex flex-col">
              <p className="text-lg md:text-xl">500</p>
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
