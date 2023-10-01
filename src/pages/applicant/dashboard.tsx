import { Button } from "@/components/ui/button";
import ApplicantLayout from "@/components/layout/applicant-layout";
import { ReactElement, useState } from "react";
import {
  CreateScheduleDto,
  useAppControllerGetHello,
  useAppControllerGetHelloHook,
  useApplicantControllerGetProfile,
  useAuthControllerGoogleAuth,
  useInterviewControllerCreate,
  useInterviewerControllerGetAllInterviewers,
  useInterviewerControllerGetProfile,
  useScheduleControllerFindAll,
  useUserControllerSelf,
} from "@/api/generated";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  ClockIcon,
  DollarSignIcon,
  MessageSquare,
  PenIcon,
  StarIcon,
  UserCheck2Icon,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { differenceInCalendarDays, format, isSameDay } from "date-fns";
import {
  formatTime,
  generateHourlyTimeListWithObjects,
  TimeSlot,
} from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

function isPastDate(date: Date) {
  return differenceInCalendarDays(date, new Date()) < 0;
}
function InterviewerSchduleDialog({
  open,
  id,
  onClose,
}: {
  open: boolean;
  id: number | string;
  onClose: () => void;
}) {
  const { data: schedules } = useScheduleControllerFindAll(+id);
  // const hourlyTimeList: TimeSlot[] = generateHourlyTimeListWithObjects();

  const { data: me } = useUserControllerSelf();
  const [selected, setSelected] = useState(0);
  const [date, setDate] = useState(new Date());

  // This is so fucked up:
  const { data: applicant } = useApplicantControllerGetProfile(String(me?.id));
  const { data: interviewer } = useInterviewerControllerGetProfile(String(id));

  const { mutateAsync, isLoading } = useInterviewControllerCreate();
  // const grouped = schedules?.reduce(
  //   (acc, curr) => {
  //     return {
  //       ...acc,
  //       [curr.availability_date]: [
  //         ...(acc[curr.availability_date] ?? []),
  //         curr,
  //       ],
  //     };
  //   },
  //   {} as Record<string, CreateScheduleDto[]>,
  // );
  //
  // console.log("grouped", grouped);

  const { toast } = useToast();
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl">
        <div className="flex flex-wrap gap-4">
          {schedules?.map((d, idx) => {
            const isThisSelected = selected === d.id;
            return (
              <div
                key={d.id}
                className="w-fit 0"
                onClick={() => setSelected(d.id)}
              >
                <div
                  className={`cursor-pointer  rounded flex items-center gap-2 py-2 px-4 ${
                    isThisSelected
                      ? "bg-indigo-500"
                      : "bg-slate-100 hover:bg-slate-200 hover:text-black hover:shadow "
                  }`}
                >
                  <ClockIcon
                    className={` w-5 h-5 ${
                      isThisSelected ? "text-white" : "text-slate-500"
                    }`}
                  />
                  <div
                    className={`flex flex-col  ${
                      isThisSelected ? "text-white" : "text-black"
                    }`}
                  >
                    <span>
                      {format(new Date(d.availability_date), "d MMMM yyyy")}
                    </span>
                    <span>{formatTime(d.availability_time)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end">
          <Button
            disabled={!selected}
            onClick={() => {
              const selectedSchedule = schedules?.find(
                (d) => d.id === selected,
              );

              if (selectedSchedule) {
                mutateAsync({
                  data: {
                    interviewer_id: interviewer?.id!, // This is so fucked up
                    applicant_id: applicant?.id!, // this is also fucked up
                    interview_date: selectedSchedule.availability_date,
                    interview_status: "Upcoming", // backend devs are.. I don't know..
                    interview_time: selectedSchedule.availability_time,
                    payment_id: "", // backend devs are.. I don't know.. rusy.
                  },
                }).then((res) => {
                  toast({
                    title: "Interview Scheduled Successfully",
                    description:
                      "Interview has been succesfully scheduled. Be prepared",
                  });
                });
              }
            }}
          >
            Schedule
          </Button>
        </div>
      </DialogContent>
    </Dialog>
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
      <div className="flex gap-2">
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
  );
}
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

Home.getLayout = function getLayout(page: ReactElement) {
  return <ApplicantLayout>{page}</ApplicantLayout>;
};
