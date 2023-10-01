import { ReactElement } from "react";
import { DataTable } from "@/components/pages/profile/data-table";
import { columns } from "@/components/pages/profile/columns";
import {
  useInterviewControllerGetInterviewerInterview,
  useInterviewerControllerGetProfile,
  useUserControllerSelf,
} from "@/api/generated";
import { format } from "date-fns";
import { formatTime } from "@/lib/utils";
import Image from "next/image";
import InterviewerLayout from "@/components/layout/interviewer-layout";
import { Badge } from "@/components/ui/badge";

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
export default function Session() {
  const { data: me } = useUserControllerSelf();

  // so fucked up
  const { data: interviewer } = useInterviewerControllerGetProfile(
    String(me?.id),
  );
  const { data: interviews } = useInterviewControllerGetInterviewerInterview(
    String(interviewer?.id),
    {
      query: {
        enabled: !!interviewer?.id,
      },
    },
  );

  console.log("interviews", interviews);

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl bg-white p-4  gap-4  min-h-[200px]">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="w-1 h-[20px] bg-indigo-500 rounded" />
            <p className="text-lg  text-center">Your Interview Sessions</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {(interviews?.length ?? 0) < 1 && (
            <p>
              Your Schedule is Free. Keep updating your profile and your
              availability. Someone will book to interview with you soon.
            </p>
          )}
          {interviews?.map((interview) => {
            return (
              <div
                key={interview?.session_id}
                className="bg-slate-100 rounded flex px-8 py-4 gap-8 items-center"
              >
                <div className="rounded-full overflow-hidden">
                  <Image
                    src={
                      interview.applicant.user?.image_url ??
                      "/image/profile.png"
                    }
                    width={50}
                    height={50}
                    alt="Interviewer Profile"
                    className="rounded-full overflow-hidden"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold">
                    Interview with {interview.applicant.user?.name}
                  </p>
                  <p>
                    {format(new Date(interview.interview_date), "dd MMMM yyyy")}
                  </p>
                  <p>{formatTime(interview.interview_time)}</p>
                </div>
                <div>
                  {interview.payment_id === "COMPLETED" ? (
                    <Badge className="bg-indigo-500">PAID</Badge>
                  ) : (
                    <Badge className="bg-slate-400">Pending</Badge>
                  )}
                </div>
              </div>
            );
          })}
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

Session.getLayout = function getLayout(page: ReactElement) {
  return <InterviewerLayout>{page}</InterviewerLayout>;
};
