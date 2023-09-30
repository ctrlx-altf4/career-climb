import ApplicantLayout from "@/components/layout/applicant-layout";
import { ReactElement } from "react";
import { HomeIcon, PenIcon } from "lucide-react";
import { DataTable } from "@/components/pages/profile/data-table";
import { columns } from "@/components/pages/profile/columns";

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
            <p className="text-lg font-medium text-center">
              Register for New Session
            </p>
          </div>
        </div>
        <div className="flex gap-4 mt-4"></div>

        <div className="grid grid-cols-4 mt-4 gap-4">
          <div className="bg-slate-100 flex items-center gap-4 px-4 py-2 rounded-lg">
            <HomeIcon />
            <div className="flex flex-col">
              <p className="text-xl">500</p>
              <p>Total Interviews</p>
            </div>
          </div>{" "}
          <div className="bg-slate-100 flex items-center gap-4 px-4 py-2 rounded-lg">
            <HomeIcon />
            <div className="flex flex-col">
              <p className="text-xl">500</p>
              <p>Total Interviews</p>
            </div>
          </div>{" "}
          <div className="bg-slate-100 flex items-center gap-4 px-4 py-2 rounded-lg">
            <HomeIcon />
            <div className="flex flex-col">
              <p className="text-xl">500</p>
              <p>Total Interviews</p>
            </div>
          </div>{" "}
          <div className="bg-slate-100 flex items-center gap-4 px-4 py-2 rounded-lg">
            <HomeIcon />
            <div className="flex flex-col">
              <p className="text-xl">500</p>
              <p>Total Interviews</p>
            </div>
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
