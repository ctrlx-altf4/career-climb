import ApplicantLayout from "@/components/layout/applicant-layout";
import { ReactElement, useState } from "react";
import {
  useAppControllerGetHello,
  useAuthControllerGoogleAuth,
} from "@/api/generated";

import { Calendar } from "@/components/ui/calendar";
import { generateHourlyTimeListWithObjects, TimeSlot } from "@/lib/utils";
import { format } from "date-fns";
import InterviewerLayout from "@/components/layout/interviewer-layout";
export default function Home() {
  const d = useAppControllerGetHello();

  const m = useAuthControllerGoogleAuth();

  const hourlyTimeList: TimeSlot[] = generateHourlyTimeListWithObjects();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState<Record<string, boolean>>({});
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl bg-white p-4 flex flex-col justify-center gap-4 items-center min-h-[200px]">
        <p className="text-xl font-bold text-center">
          Your Dream Career is Just a single step from you
        </p>
        <div className="text-center">
          Go ahead! Complete your profile. Search for an expert and schedule a
          one-on-one interview session
        </div>
        Schedule Interview
      </div>

      <div className="rounded-2xl bg-white p-4  gap-4  min-h-[200px]">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="w-1 h-[20px] bg-indigo-500 rounded" />
            <p className="text-lg font-medium text-center">Availability</p>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(_date) => _date && setDate(_date)}
            className="rounded-md border"
          />
          <div className="flex flex-col border px-4 py-2 rounded">
            <p className="text-lg font-semibold mb-4">
              {format(date, "d MMMM yyyy")}
            </p>
            <div className="flex flex-wrap gap-2 flex-1">
              {hourlyTimeList.map((hour) => {
                const isSelected = time[hour.value];
                return (
                  <div
                    key={hour.value}
                    onClick={() => {
                      if (isSelected) {
                        const _time = time;
                        delete _time[hour.value];
                        setTime(_time);
                      } else {
                        setTime((_t) => ({ ..._t, [hour.value]: true }));
                      }
                    }}
                    className={`rounded border px-4 py-3 hover:bg-slate-200 hover:text-black ${
                      isSelected ? "bg-slate-500 text-white" : "bg-transparent"
                    } cursor-pointer h-fit`}
                  >
                    {hour.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-4"></div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <InterviewerLayout>{page}</InterviewerLayout>;
};
