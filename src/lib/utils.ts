import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateHourlyTimeList(): string[] {
  const timeList: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const ampm = hour < 12 ? "AM" : "PM";
    const formattedHour = hour % 12 || 12; // Convert 0 to 12
    const time = `${formattedHour.toString().padStart(2, "0")}:00 ${ampm}`;
    timeList.push(time);
  }
  return timeList;
}

export interface TimeSlot {
  label: string;
  value: string;
}

export function generateHourlyTimeListWithObjects(): TimeSlot[] {
  const timeList: TimeSlot[] = [];
  const formatOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0); // Set the start time to midnight

  for (let i = 0; i < 24; i++) {
    const currentTime = new Date(startDate.getTime() + i * 60 * 60 * 1000);
    const formattedTime = currentTime.toLocaleTimeString([], formatOptions);
    const formattedValue = currentTime
      .toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(":", "");

    timeList.push({ label: formattedTime, value: formattedValue });
  }

  return timeList;
}

export function formatTime(input: number): string {
  if (input < 0 || input > 2359) {
    return "Invalid input";
  }

  let hours = Math.floor(input / 100);
  const minutes = input % 100;
  const isPM = hours >= 12;

  if (hours > 12) {
    hours -= 12;
  }

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${isPM ? "PM" : "AM"}`;
}
