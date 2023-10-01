import {
  useApplicantControllerGetProfile,
  useInterviewControllerCreate,
  useInterviewerControllerGetProfile,
  useScheduleControllerFindAll,
  useUserControllerSelf,
} from "@/api/generated";
import { useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ClockIcon } from "lucide-react";
import { format } from "date-fns";
import { formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function InterviewerSchduleDialog({
  open,
  id,
  onClose,
}: {
  open: boolean;
  id: number | string;
  onClose: () => void;
}) {
  const { data: schedules } = useScheduleControllerFindAll(+id);

  const { data: me } = useUserControllerSelf();
  const [selected, setSelected] = useState(0);

  // This is so fucked up:
  const { data: applicant } = useApplicantControllerGetProfile(String(me?.id));
  const { data: interviewer } = useInterviewerControllerGetProfile(String(id));

  const { mutateAsync, isLoading } = useInterviewControllerCreate();

  const router = useRouter();

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
                  router.push("/applicant/session");

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
