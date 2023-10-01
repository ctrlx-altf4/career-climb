import ApplicantLayout from "@/components/layout/applicant-layout";
import { ReactElement } from "react";
import { HomeIcon } from "lucide-react";
import { DataTable } from "@/components/pages/profile/data-table";
import { columns } from "@/components/pages/profile/columns";
import {
  useApplicantControllerGetProfile,
  useInterviewControllerGetApplicantInterview,
  useInterviewControllerPayForInterview,
  useUserControllerSelf,
} from "@/api/generated";
import { format } from "date-fns";
import { formatTime } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

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
  const { data: applicant } = useApplicantControllerGetProfile(String(me?.id));
  const { data: interviews } = useInterviewControllerGetApplicantInterview(
    String(applicant?.id),
    {
      query: {
        enabled: !!applicant?.id,
      },
    },
  );

  const { mutateAsync: pay } = useInterviewControllerPayForInterview();
  console.log("interviews", interviews);
  const router = useRouter();
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
          {interviews?.map((interview) => {
            return (
              <div
                key={interview?.session_id}
                className="bg-slate-100 rounded flex px-8 py-4 gap-8 items-center"
              >
                <div className="rounded-full overflow-hidden">
                  <Image
                    src={
                      interview.interviewer.user?.image_url ??
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
                    Interview with {interview.interviewer.user?.name}
                  </p>
                  <p>
                    {format(new Date(interview.interview_date), "dd MMMM yyyy")}
                  </p>
                  <p>{formatTime(interview.interview_time)}</p>
                </div>
                <div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      pay({
                        data: {
                          session_id: interview.session_id,
                        },
                      }).then((res) => {
                        console.log("res", res);
                        router.replace(res.payment_url);
                      });
                    }}
                  >
                    Pay With
                    <Image
                      src="/images/khalti.png"
                      alt="Khalti Logo"
                      width={30}
                      height={30}
                    />
                  </Button>
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
  return <ApplicantLayout>{page}</ApplicantLayout>;
};
