import { Button } from "@/components/ui/button";
import ApplicantLayout from "@/components/layout/applicant-layout";
import { ReactElement, useState } from "react";
import { useInterviewerControllerGetAllInterviewers } from "@/api/generated";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  DollarSignIcon,
  MessageSquare,
  StarIcon,
  UserCheck2Icon,
} from "lucide-react";
import InterviewerSchduleDialog from "@/components/pages/applicant/interviewer-schedule-dialog";

export default function Home() {
  const [showScheduler, setShowScheduler] = useState(false);
  if (showScheduler) {
    return <Scheduler />;
  }
  return (
    <div className="rounded-2xl bg-white p-4 flex flex-col justify-center gap-4 items-center min-h-[200px]">
      <p className="text-xl font-bold text-center">
        Your Dream Career is Just a single step from you
      </p>
      <div className="text-center">
        Go ahead! Complete your profile. Search for an expert and schedule a
        one-on-one interview session
      </div>
      <Button onClick={() => setShowScheduler(true)}>Schedule Interview</Button>
    </div>
  );
}

function Scheduler() {
  const { data: allInterviewers } =
    useInterviewerControllerGetAllInterviewers();

  const [showInterviewerSchedule, setShowIntervewerSchedule] = useState<{
    open: boolean;
    id: null | number | string;
  }>({ open: false, id: null });

  return (
    <div className="rounded-2xl bg-white p-4   gap-4 items-center min-h-[200px]">
      <div className="flex gap-2 bg-white sticky top-[95px] py-4 px-2">
        <Input placeholder="find interviewers" />
        <Button>Search</Button>
      </div>
      <div className="text-sm text-slate-700 mb-4 mt-1">
        Search and book interview session with one of the industry experts.
      </div>
      {!!showInterviewerSchedule.id && (
        <InterviewerSchduleDialog
          open={showInterviewerSchedule.open}
          id={showInterviewerSchedule.id}
          onClose={() => setShowIntervewerSchedule({ open: false, id: null })}
        />
      )}

      <div className="flex gap-4 flex-col">
        {allInterviewers?.map((i, idx) => {
          return (
            <div
              className="rounded-2xl border  cursor-pointer bg-slate-50 p-4  gap-4  min-h-[200px]"
              onClick={() => {
                setShowIntervewerSchedule({ open: true, id: i.user_id });
              }}
              key={idx}
            >
              <div className="flex gap-4 mt-4">
                <div className=" rounded-full ">
                  <Image
                    src={i.user.image_url ?? ""}
                    alt="Profile"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <h1 className="text-lg font-semibold">{i.user.name}</h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    <div className="flex flex-col">
                      <p className="text-sm">Email</p>
                      <p>prajwal@ramailo.techsss</p>
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
          );
        })}
      </div>
    </div>
  );
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <ApplicantLayout>{page}</ApplicantLayout>;
};
