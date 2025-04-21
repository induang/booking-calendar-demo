import { listEvents } from "@/actions";
import { CourseCalendar } from "@/components/course-calendar";
import dayjs from "@/utils/date";
import { LarkCalendarEvent } from "@/utils/type";
import { Event } from "react-big-calendar";

export default async function Home() {
  const data = await listEvents();
  console.log("data", data.data?.items);
  const events = transformEvents(data.data?.items || []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <CourseCalendar events={events} />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        footer
      </footer>
    </div>
  );
}

function transformEvents(
  events: LarkCalendarEvent[]
): Array<LarkCalendarEvent & Event> {
  return events
    ?.filter((event) => event?.status !== "cancelled")
    ?.map(({ ...rest }) => ({
      id: rest.event_id,
      title: rest.summary,
      start: dayjs
        .tz(
          parseInt(rest?.start_time?.timestamp ?? "0") * 1000,
          rest?.start_time?.timezone ?? "Asia/Shanghai"
        )
        .toDate(),
      end: dayjs
        .tz(
          parseInt(rest?.end_time?.timestamp ?? "0") * 1000,
          rest?.end_time?.timezone ?? "Asia/Shanghai"
        )
        .toDate(),
      ...rest,
    }));
}
