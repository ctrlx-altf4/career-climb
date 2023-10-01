import { ReactElement, useEffect, useState } from "react";
import {
  getScheduleControllerFindAllQueryKey,
  useScheduleControllerBulkCreate,
  useScheduleControllerFindAll,
  useUserControllerSelf,
} from "@/api/generated";

import { Calendar } from "@/components/ui/calendar";
import { generateHourlyTimeListWithObjects, TimeSlot } from "@/lib/utils";
import { format, isSameDay } from "date-fns";
import InterviewerLayout from "@/components/layout/interviewer-layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { DayPicker, Row, RowProps } from "react-day-picker";

import { differenceInCalendarDays } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";

function isPastDate(date: Date) {
  return differenceInCalendarDays(date, new Date()) < 0;
}

function OnlyFutureRow(props: RowProps) {
  const isPastRow = props.dates.every(isPastDate);
  if (isPastRow) return <></>;
  return <Row {...props} />;
}
export default function Home() {
  const hourlyTimeList: TimeSlot[] = generateHourlyTimeListWithObjects();
  const { data: me } = useUserControllerSelf();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState<Record<string, boolean>>({});

  const { mutateAsync } = useScheduleControllerBulkCreate();

  const { toast } = useToast();
  const { data: schedules } = useScheduleControllerFindAll(me?.id!);

  useEffect(() => {
    if (schedules) {
      console.log("schedules", schedules);
    }
  }, [schedules]);

  const queryClient = useQueryClient();
  const onSubmit = () => {
    if (!me?.id) return;
    mutateAsync({
      data: {
        data: Object.keys(time)?.map((t) => ({
          availability_date: date.toString(),
          availability_time: Number(t),
          interviewer_id: me?.id,
          status: true,
        })),
      },
    }).then(async () => {
      toast({
        title: "Availability Updated Successfully",
        description: "Your Availability has been updated Successfully",
      });
      await queryClient.invalidateQueries({
        queryKey: getScheduleControllerFindAllQueryKey(me?.id),
      });
    });
  };

  const schedulesOnSelectedDate = schedules?.filter((s) =>
    isSameDay(new Date(s.availability_date), new Date(date)),
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl bg-white p-4 flex flex-col justify-center gap-4 items-center min-h-[200px]">
        <p className="text-xl font-bold text-center">
          Get ready to start interviewing candidates and get paid for it.
        </p>
        <div className="text-center">
          Complete your profile. Set your availability and wait for candidates
          to choose you to interview them.
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4  gap-4  min-h-[200px]">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="w-1 h-[20px] bg-indigo-500 rounded" />
            <p className="text-lg font-medium text-center">
              Availability Calendar
            </p>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <Calendar
            mode="single"
            selected={date}
            disabled={isPastDate}
            showOutsideDays
            onSelect={(_date) => {
              _date && setDate(_date);
              setTime({});
            }}
            className="rounded-md border"
          />
          <div className="flex flex-col border px-4 py-2 rounded">
            <p className="text-lg font-semibold mb-4">
              {format(date, "d MMMM yyyy")}
            </p>
            <div className="flex flex-wrap gap-2 flex-1" key={date.toString()}>
              {hourlyTimeList.map((hour) => {
                const isSelected = time[hour.value];
                const isAlreadySet = schedulesOnSelectedDate?.some(
                  (s) => +s.availability_time === +hour.value,
                );

                return (
                  <div
                    key={hour.value + date.toString()}
                    onClick={() => {
                      if (isAlreadySet) {
                        alert(
                          "Editing Already set feature isn't implemented yet",
                        );
                      }
                      if (isSelected) {
                        const _time = time;
                        delete _time[hour.value];
                        setTime(_time);
                      } else {
                        setTime((_t) => ({ ..._t, [hour.value]: true }));
                      }
                    }}
                    className={`rounded border px-4 py-3 hover:bg-slate-200 hover:text-black ${
                      isSelected || isAlreadySet
                        ? "bg-indigo-500 text-white"
                        : "bg-transparent"
                    } cursor-pointer h-fit`}
                  >
                    {hour.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex  justify-end mt-4">
          <Button onClick={() => onSubmit()}>Save My availability</Button>
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <InterviewerLayout>{page}</InterviewerLayout>;
};
